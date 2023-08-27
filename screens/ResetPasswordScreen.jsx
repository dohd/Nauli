import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, VStack, ActivityIndicator } from "@react-native-material/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { showMessage } from "react-native-flash-message";
import Api from "../api/config";

export default function ResetPasswordScreen({ navigation }) {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const PasswordResetSchema = Yup.object().shape({
    otp_code: Yup.string()
      .required('otp code required!')
      .test('otp_code', 'invalid number', function(value){
        return !isNaN(value);
      }),
    password: Yup.string()
      .required('password required!'), 
    confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match!')
    .required('confirm password required!'),   
  });

  return (
    <View style={styles.container}>
      <Text variant="h5" style={{ fontWeight: "bold", marginBottom: 20 }}>
        Reset Password
      </Text>
      <Formik
        initialValues={{ otp_code: '', password: '', confirm_password: '' }}
        validationSchema={PasswordResetSchema}
        onSubmit={(values) => {
          setLoaderVisible(true);
          // reset password
          Api.post('/password/reset', values)
          .then(data => {
            setLoaderVisible(false);
            showMessage({message: data.message, type: 'success'});
            navigation.navigate("Login");
          })
          .catch(error => { 
            setLoaderVisible(false);
            showMessage({message: error.message, type: 'danger'});
          });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
          <VStack spacing={20} style={{ minWidth: 280 }}>
            <TextInput
              label="OTP Code"
              variant="standard"
              onChangeText={handleChange("otp_code")}
              onBlur={handleBlur("otp_code")}
              value={values.otp_code}
            />
            {errors.otp_code && touched.otp_code ? (<Text variant="subtitle1" color="red">{errors.otp_code}</Text>) : null}
            <TextInput
              label="Password"
              variant="standard"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && touched.password ? (<Text variant="subtitle1" color="red">{errors.password}</Text>) : null}
            <TextInput
              label="Confirm Password"
              variant="standard"
              onChangeText={handleChange("confirm_password")}
              onBlur={handleBlur("confirm_password")}
              value={values.confirm_password}
            />
            {errors.confirm_password && touched.confirm_password ? (<Text variant="subtitle1" color="red">{errors.confirm_password}</Text>) : null}
            <Button
              title="Reset"
              trailing={props => (
                loaderVisible ? 
                <ActivityIndicator size="small" color="on-primary" /> :
                null
              )}         
              disabled={loaderVisible}
              style={{ marginTop: 20 }}
              onPress={() => handleSubmit()}
            />
          </VStack>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
