import React, { useState } from "react";
import { View, StyleSheet, Modal,  } from "react-native";
import {
  AppBar,
  Button,
  Text,
  TextInput,
  IconButton,
  Divider,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Formik } from "formik";

export default function WithdrawScreen({ navigation, route }) {
  return (
    <>
      <AppBar
        title="Confirm Withdrawal"
        leading={(props) => (
          <IconButton
            onPress={() => navigation.navigate("Home")}
            icon={(props) => <Icon name="keyboard-backspace" {...props} />}
            {...props}
          />
        )}
      />

      <View style={styles.mainCardView}>
        <View style={{ paddingTop: 50 }}>
          
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text variant="h5" color="gray" style={{ marginBottom: 25 }}>Proceed To Withdraw</Text>
            <Text variant="h5" style={{ marginBottom: 25 }}>Ksh. 20,000</Text>
            <TextInput
              label="Enter OTP Code*"
              variant="standard"
              style={{ minWidth: 150, fontSize: 20 }}
              // onChangeText={handleChange('password')}
              // onBlur={handleBlur('password')}
              // value={values.password}
            />
          </View>
          
          <Button
            title="Confirm"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "60%",
              marginTop: 40,
            }}
            onPress={() => {
              // handleSubmit();
              navigation.navigate("Home");
            }}
          />

          <Button
            title="Cancel"
            variant="outlined"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "40%",
              marginTop: 30,
            }}
            onPress={() => {
              // handleSubmit();
              navigation.navigate("Home");
            }}
          />
        </View>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  mainCardView: {
    height: 400,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 10,
  },
});
