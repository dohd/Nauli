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
import * as Yup from 'yup';
import accounting from "accounting-js";
import { showMessage } from "react-native-flash-message";
import Api from "../api/config";

export default function WithdrawScreen({ navigation, route }) {
  // withdraw amount
  let withdrawAmount = accounting.unformat(route.params.withdraw_amount);
  withdrawAmount = accounting.formatNumber(withdrawAmount, {precision: 0});

  const [loaderVisible, setLoaderVisible] = useState(false);

  const WithdrawSchema = Yup.object().shape({
    otp_code: Yup.string()
      .required('otp code required!')
      .test('otp_code', 'invalid number', function(value){
        return !isNaN(value);
      }),
    password: Yup.string()
      .required('password required!'),  
  });

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
        <View style={{ paddingTop: 30 }}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text variant="h5" color="gray" style={{ marginBottom: 20 }}>
              Proceed To Withdraw
            </Text>
            <Text variant="h5" style={{ marginBottom: 25 }}>
              Ksh. {withdrawAmount}
            </Text>
          </View>

          <Formik
            initialValues={{ otp_code: "", password: "" }}
            validationSchema={WithdrawSchema}
            onSubmit={(values) => {
              setLoaderVisible(true);
              // initiate cashout
              values.amount = withdrawAmount;
              Api.post(`/cashouts/init`, values)
              .then(data => {
                setLoaderVisible(false);
                navigation.navigate("Home");
                showMessage({message: data.message, type: 'success'});
              })
              .catch(error => {
                setLoaderVisible(false);
                showMessage({message: error.message, type: 'danger'});
              });
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
              <VStack spacing={15}>
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <TextInput
                    label="OTP Code"
                    variant="standard"
                    style={{ minWidth: 150, fontSize: 20, marginBottom: 5 }}
                    onChangeText={handleChange("otp_code")}
                    onBlur={handleBlur("otp_code")}
                    value={values.otp_code}
                  />
                  {errors.otp_code && touched.otp_code ? (<Text style={{ marginBottom: 5 }} variant="subtitle1" color="red">{errors.otp_code}</Text>) : null}
                  <TextInput
                    label="Password"
                    variant="standard"
                    style={{ minWidth: 150, fontSize: 20 }}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  {errors.password && touched.password ? (<Text variant="subtitle1" color="red">{errors.password}</Text>) : null}
                  <Button
                    title="Confirm"
                    trailing={(props) => loaderVisible ? (<ActivityIndicator size="small" color="on-primary" />) : null}
                    disabled={loaderVisible}
                    style={{ width: "50%", marginTop: 30 }}
                    onPress={() => handleSubmit()}
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
    minHeight: 400,
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
