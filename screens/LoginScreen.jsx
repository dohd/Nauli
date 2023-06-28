import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, TextInput } from "@react-native-material/core";
import { Formik } from "formik";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 15 }}>Welcome</Text>
      <Formik
        initialValues={{ password: "", username: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              label="Username / Phone"
              variant="standard"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              style={{ minWidth: 300 }}
            />
            <TextInput
              label="Password"
              variant="standard"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={{ minWidth: 300, marginTop: 5 }}
            />

            <Button
              title="Login"
              style={{ minWidth: 300, marginTop: 20 }}
              onPress={() => {
                handleSubmit();
                navigation.navigate("Home", { name: "Logged In user" });
              }}
            />
          </View>
        )}
      </Formik>

      <Text
        style={{ marginTop: 15, fontSize: 14, color: "#651fff" }}
        onPress={() => {
          navigation.navigate("ForgotPassword");
        }}
      >
        Reset Password?
      </Text>

      <View style={{ flexDirection: 'row', marginTop: 30 }}>
        <Text style={{ fontWeight: "bold", paddingTop: 8 }}>Create an account?</Text>
        <Button
          title="SignUp"
          variant="outline"
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
