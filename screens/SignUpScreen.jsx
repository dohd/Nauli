import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, TextInput } from "@react-native-material/core";
import { Formik } from "formik";

export default function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 15 }}>
        Sign Up
      </Text>
      <Formik
        initialValues={{ password: "", username: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              label="Phone Number *"
              variant="standard"
              onChangeText={handleChange("phone_no")}
              onBlur={handleBlur("phone_no")}
              value={values.phone_no}
              style={{ minWidth: 300, marginBottom: 5 }}
            />
            <TextInput
              label="Username"
              variant="standard"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
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
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={{ minWidth: 300, marginBottom: 5 }}
            />
            <Button
              title="Sign up"
              style={{ marginTop: 20 }}
              onPress={() => {
                handleSubmit();
                navigation.navigate("Home", { name: "Logged In user" });
              }}
            />
          </View>
        )}
      </Formik>
      <View style={{ flexDirection: "row", marginTop: 25 }}>
        <Text style={{ fontWeight: "bold", paddingTop: 8 }}>
          Already have an account?{" "}
        </Text>
        <Button
          title="Login"
          variant="outline"
          onPress={() => {
            navigation.navigate("Login");
          }}
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
