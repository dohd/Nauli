import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, TextInput } from "@react-native-material/core";
import { Formik } from "formik";

export default function ResetPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
        Reset Password
      </Text>
      <Formik
        initialValues={{ password: "", username: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              label="OTP Code *"
              variant="standard"
              onChangeText={handleChange("otp_code")}
              onBlur={handleBlur("otp_code")}
              value={values.otp_code}
              style={{ minWidth: 300, marginBottom: 5 }}
            />

            <TextInput
              label="Password *"
              variant="standard"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={{ minWidth: 300, marginBottom: 5 }}
            />
            <TextInput
              label="Confirm Password *"
              variant="standard"
              onChangeText={handleChange("confirm_password")}
              onBlur={handleBlur("confirm_password")}
              value={values.confirm_password}
              style={{ minWidth: 300, marginBottom: 5 }}
            />

            <Button
              title="Reset"
              style={{ marginTop: 10 }}
              onPress={() => {
                handleSubmit();
                navigation.navigate("Login", { name: "Logged In user" });
              }}
            />
          </View>
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
