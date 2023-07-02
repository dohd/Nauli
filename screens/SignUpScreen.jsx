import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, VStack, ActivityIndicator } from "@react-native-material/core";
import { Formik } from "formik";

export default function SignUpScreen({ navigation }) {
  const [loaderVisible, setLoaderVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Text variant="h5" style={{ fontWeight: "bold", marginBottom: 20 }}>
        Sign Up
      </Text>
      <Formik
        initialValues={{ password: "", username: "" }}
        onSubmit={(values) => {
          console.log(values);
          setLoaderVisible(true);
          // api call
          setTimeout(() => {
            setLoaderVisible(false);
            navigation.navigate("Home");
          }, 1000);
        }}
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
