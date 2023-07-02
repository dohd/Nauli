import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, VStack } from "@react-native-material/core";
import { Formik } from "formik";

export default function ForgotPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text variant="h5" style={{ fontWeight: "bold", marginBottom: 20 }}>
        Forgot Password
      </Text>
      <Formik
        initialValues={{ password: "", username: "" }}
        onSubmit={(values) => console.log(values)}
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

            <Button
              title="Submit"
              style={{ marginTop: 20 }}
              onPress={() => {
                handleSubmit();
                navigation.navigate("ResetPassword", {
                  name: "Logged In user",
                });
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
