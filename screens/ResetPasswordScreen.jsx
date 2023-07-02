import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, VStack } from "@react-native-material/core";
import { Formik } from "formik";

export default function ResetPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text variant="h5" style={{ fontWeight: "bold", marginBottom: 20 }}>
        Reset Password
      </Text>
      <Formik
        initialValues={{ password: "", username: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <VStack spacing={20} style={{ minWidth: 280 }}>
            <TextInput
              label="OTP Code *"
              variant="standard"
              onChangeText={handleChange("otp_code")}
              onBlur={handleBlur("otp_code")}
              value={values.otp_code}
            />

            <TextInput
              label="Password *"
              variant="standard"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <TextInput
              label="Confirm Password *"
              variant="standard"
              onChangeText={handleChange("confirm_password")}
              onBlur={handleBlur("confirm_password")}
              value={values.confirm_password}
            />

            <Button
              title="Reset"
              style={{ marginTop: 20 }}
              onPress={() => {
                handleSubmit();
                navigation.navigate("Login", { name: "Logged In user" });
              }}
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
