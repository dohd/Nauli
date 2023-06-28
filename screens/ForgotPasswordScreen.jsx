import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, TextInput } from "@react-native-material/core";
import { Formik } from "formik";

export default function ForgotPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
        Forgot Password
      </Text>
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
              style={{ minWidth: 300, marginBottom: 5 }}
            />

            <Button
              title="Submit"
              style={{ marginTop: 10 }}
              onPress={() => {
                handleSubmit();
                navigation.navigate("ResetPassword", {
                  name: "Logged In user",
                });
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
