import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, VStack, ActivityIndicator } from "@react-native-material/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { showMessage } from "react-native-flash-message";
import Api from "../api/config";

export default function ForgotPasswordScreen({ navigation }) {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const UsernameSchema = Yup.object().shape({
    username: Yup.string()
      .required('username / phone required!'),
  });

  return (
    <View style={styles.container}>
      <Text variant="h5" style={{ fontWeight: "bold", marginBottom: 20 }}>
        Forgot Password
      </Text>
      <Formik
        initialValues={{ username: "" }}
        validationSchema={UsernameSchema}
        onSubmit={(values) => {
          setLoaderVisible(true);
          // generate password reset otp code
          Api.post('/password/forgot', values)
          .then(data => {
            setLoaderVisible(false);
            showMessage({message: data.message, type: 'success'});
            navigation.navigate("ResetPassword");
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
              label="Username / Phone Number"
              variant="standard"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            {errors.username && touched.username ? (<Text variant="subtitle1" color="red">{errors.username}</Text>) : null}
            <Button
              title="Submit"
              style={{ marginTop: 20 }}
              trailing={props => (
                loaderVisible ? 
                <ActivityIndicator size="small" color="on-primary" /> :
                null
              )}         
              disabled={loaderVisible}
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
