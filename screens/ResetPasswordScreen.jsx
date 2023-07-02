import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, VStack, ActivityIndicator } from "@react-native-material/core";
import { Formik } from "formik";

export default function ResetPasswordScreen({ navigation }) {
  const [loaderVisible, setLoaderVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Text variant="h5" style={{ fontWeight: "bold", marginBottom: 20 }}>
        Reset Password
      </Text>
      <Formik
        initialValues={{ password: "" }}
        onSubmit={(values) => {
          console.log(values);
          setLoaderVisible(true);
          // api call
          setTimeout(() => {
            setLoaderVisible(false);
            navigation.navigate("Login");
          }, 1000);
        }}
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
