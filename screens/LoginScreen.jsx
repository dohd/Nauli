import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, VStack, Text } from "@react-native-material/core";
import { Formik } from "formik";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text variant="h4" style={{ fontWeight: "bold", marginBottom: 20 }}>
        Welcome
      </Text>
      <Formik
        initialValues={{ password: "", username: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <VStack spacing={20} style={{ minWidth: 280 }}>
            <TextInput
              label="Username / Phone"
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
              style={{ marginTop: 20 }}
              onPress={() => {
                handleSubmit();
                navigation.navigate("Home", { name: "Logged In user" });
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
        <Text style={{ fontWeight: "bold", paddingTop: 8 }}>Create an account?</Text>
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
