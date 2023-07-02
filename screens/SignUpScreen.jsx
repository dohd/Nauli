import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, VStack } from "@react-native-material/core";
import { Formik } from "formik";

export default function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text variant="h5" style={{ fontWeight: "bold", marginBottom: 20 }}>
        Sign Up
      </Text>
      <Formik
        initialValues={{ password: "", username: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <VStack spacing={20} style={{ minWidth: 280 }}>
            <TextInput
              label="Phone Number *"
              variant="standard"
              onChangeText={handleChange("phone_no")}
              onBlur={handleBlur("phone_no")}
              value={values.phone_no}
            />
            <TextInput
              label="Username"
              variant="standard"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
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
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <Button
              title="Sign up"
              style={{ marginTop: 20 }}
              onPress={() => {
                handleSubmit();
                navigation.navigate("Home", { name: "Logged In user" });
              }}
            />
          </VStack>
        )}
      </Formik>
      <View style={{ flexDirection: "row", marginTop: 25 }}>
        <Text style={{ fontWeight: "bold", paddingTop: 7 }}>
          Already have an account? 
        </Text>
        <Button
          title="Login"
          variant="text"
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
