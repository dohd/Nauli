import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, VStack, ActivityIndicator } from "@react-native-material/core";
import { Formik } from "formik";
import * as Yup from "yup";
import SyncStorage from 'sync-storage';
import { showMessage } from "react-native-flash-message";
import Api from "../api/config";

export default function SignUpScreen({ navigation }) {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const SignUpSchema = Yup.object().shape({
    phone: Yup.string()
      .required('phone number required!'),
    name: Yup.string()
      .required('full name required!')
      .test('otp_code', 'first and last name required', function(value){
        return value.split(' ').length > 1;
      }),
    password: Yup.string()
      .required('password required!'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match!')
      .required('confirm password required!'),  
  });

  return (
    <View style={styles.container}>
      <Text variant="h4" style={{ fontWeight: "bold", marginBottom: 20 }}>
        Sign Up
      </Text>
      <Formik
        initialValues={{ phone: '', name: '', password: '' }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          setLoaderVisible(true);
          // sign up
          Api.post('/register', values)
          .then(data => {
            setLoaderVisible(false);
            SyncStorage.set('accessToken', data.token);
            SyncStorage.set('aud', data.aud);
            showMessage({message: 'Account created successfully', type: 'success'});
            navigation.navigate("Home");
          })
          .catch(error => { 
            setLoaderVisible(false);
            showMessage({message: error.message, type: 'danger'});
          });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
          <VStack spacing={15} style={{ minWidth: 280 }}>
            <TextInput
              label="Phone Number"
              variant="standard"
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
            />
            {errors.phone && touched.phone ? (<Text variant="subtitle1" color="red">{errors.phone}</Text>) : null}
            <TextInput
              label="Full Name"
              variant="standard"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {errors.name && touched.name ? (<Text variant="subtitle1" color="red">{errors.name}</Text>) : null}
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
              title="Sign up"
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
      <View style={{ flexDirection: "row", marginTop: 25 }}>
        <Text style={{ fontWeight: "bold", paddingTop: 7 }}>
          Already have an account? 
        </Text>
        <Button
          title="Login"
          variant="text"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
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
