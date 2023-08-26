import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, VStack, Text, ActivityIndicator } from "@react-native-material/core";
import { Formik } from "formik";
import SyncStorage from 'sync-storage';
import { showMessage } from "react-native-flash-message";
import Api from "../api/config";

export default function LoginScreen({ navigation }) {
  const [loaderVisible, setLoaderVisible] = useState(false);
  
  return (
    <View style={styles.container}>
      <Text variant="h4" style={{ fontWeight: "bold", marginBottom: 20 }}>
        Welcome
      </Text>
      <Formik
        initialValues={{ username: "", password: "" }}
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
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <VStack spacing={20} style={{ minWidth: 280 }}>
            <TextInput
              label="Username / Phone Number"
              variant="standard"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            <TextInput
              label="Password"
              variant="standard"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />

            <Button
              title="Login"
              trailing={props => (
                loaderVisible ? 
                <ActivityIndicator size="small" color="on-primary" /> :
                null
              )}         
              disabled={loaderVisible}
              style={{ marginTop: 20 }}
              onPress={() => {
                handleSubmit();
              }}
            />
          </VStack>
        )}
      </Formik>

      <Button
        title="Reset Password?"
        uppercase={false}
        variant="text"
        style={{ marginTop: 15 }}
        onPress={() => {
          navigation.navigate("ForgotPassword");
        }}
      />

      <View style={{ flexDirection: 'row', marginTop: 30 }}>
        <Text style={{ fontWeight: "bold", paddingTop: 7 }}>Create an account?</Text>
        <Button
          title="SignUp"
          variant="text"
          onPress={() => {
            navigation.navigate("Signup");
          }}
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
