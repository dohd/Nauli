import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, VStack, Text, ActivityIndicator } from "@react-native-material/core";
import { Formik } from "formik";
import * as Yup from "yup";
import SyncStorage from 'sync-storage';
import { showMessage } from "react-native-flash-message";
import Api from "../api/config";

export default function LoginScreen({ navigation }) {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .required('username / phone required!'),
    password: Yup.string()
      .required('password required!'),
  });

  return (
    <View style={styles.container}>
      <Text variant="h4" style={{ fontWeight: "bold", marginBottom: 20 }}>
        Welcome
      </Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          setLoaderVisible(true);
          // fetch access token
          Api.post('/login', values)
          .then(data => {
            setLoaderVisible(false);
            SyncStorage.set('accessToken', data.token);
            SyncStorage.set('aud', data.aud);
            navigation.navigate("Home");
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
            <TextInput
              label="Password"
              variant="standard"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && touched.password ? (<Text variant="subtitle1" color="red">{errors.password}</Text>) : null}
            <Button
              title="Login"
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

      <Button
        title="Reset Password?"
        uppercase={false}
        variant="text"
        style={{ marginTop: 15 }}
        onPress={() => navigation.navigate("ForgotPassword")}
      />

      <View style={{ flexDirection: 'row', marginTop: 30 }}>
        <Text style={{ fontWeight: "bold", paddingTop: 7 }}>Create an account?</Text>
        <Button
          title="SignUp"
          variant="text"
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
