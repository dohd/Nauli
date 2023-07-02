import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, VStack, ActivityIndicator } from "@react-native-material/core";
import { Formik } from "formik";

export default function ForgotPasswordScreen({ navigation }) {
  const [loaderVisible, setLoaderVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Text variant="h5" style={{ fontWeight: "bold", marginBottom: 20 }}>
        Forgot Password
      </Text>
      <Formik
        initialValues={{ username: "" }}
        onSubmit={(values) => {
          console.log(values);
          setLoaderVisible(true);
          // api call
          setTimeout(() => {
            setLoaderVisible(false);
            navigation.navigate("ResetPassword");
          }, 1000);
        }}
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
              trailing={props => (
                loaderVisible ? 
                <ActivityIndicator size="small" color="on-primary" /> :
                null
              )}         
              disabled={loaderVisible}
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
