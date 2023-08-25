import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  AppBar,
  Button,
  Text,
  TextInput,
  IconButton,
  VStack,
  ActivityIndicator,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Formik } from "formik";
import accounting from "accounting-js";

export default function WithdrawScreen({ navigation, route }) {
  const [loaderVisible, setLoaderVisible] = useState(false);

  // withdraw amount
  let withdrawAmount = route.params.withdraw_amount;
  withdrawAmount = accounting.formatNumber(accounting.unformat(withdrawAmount));

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
        <View style={{ paddingTop: 40 }}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text variant="h5" color="gray" style={{ marginBottom: 20 }}>
              Proceed To Withdraw
            </Text>
            <Text variant="h5" style={{ marginBottom: 25 }}>
              Ksh. { withdrawAmount }
            </Text>
          </View>

          <Formik
            initialValues={{ username: "", phone: "" }}
            onSubmit={(values) => {
              setLoaderVisible(true);
              // api call
              setTimeout(() => {
                setLoaderVisible(false);
                navigation.navigate("Home");
              }, 1000);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <VStack spacing={15}>
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <TextInput
                    label="Enter OTP Code*"
                    variant="standard"
                    style={{ minWidth: 150, fontSize: 20 }}
                    onChangeText={handleChange("otp_code")}
                    onBlur={handleBlur("otp_code")}
                    value={values.otp_code}
                  />

                  <Button
                    title="Confirm"
                    trailing={(props) =>
                      loaderVisible ? (
                        <ActivityIndicator size="small" color="on-primary" />
                      ) : null
                    }
                    disabled={loaderVisible}
                    style={{ width: "40%", marginTop: 30 }}
                    onPress={() => {
                      handleSubmit();
                    }}
                  />
                </View>
              </VStack>
            )}
          </Formik>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainCardView: {
    height: 350,
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
