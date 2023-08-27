import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import {
  Button,
  Text,
  TextInput,
  Divider,
} from "@react-native-material/core";
import { Formik } from "formik";
import * as Yup from 'yup';
import accounting from "accounting-js";

export function WithdrawModal(props) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.withdrawModalVisible}
        onRequestClose={() => {
          props.setWithdrawModalVisible(!props.withdrawModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.mainCardView}>
            <View style={{ paddingTop: 50, minWidth: 350 }}>
              <View style={{ margin: 16, marginBottom: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text variant="subtitle1" color="gray">
                    Available Balance
                  </Text>
                  <Text variant="h5">{props.accountBalance}</Text>
                </View>
              </View>
              <Divider leadingInset={26} trailingInset={26} />

              <FormInput {...props} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function FormInput(props) {
  const balance = accounting.unformat(props.accountBalance);
  const AmountSchema = Yup.object().shape({
    withdraw_amount: Yup.string()
      .required('amount required!')
      .test('withdraw_amount', 'not allowed', function(value){
        return value >= 5 && value <= balance;
      }),
  });

  return (
      <Formik
        initialValues={{ withdraw_amount: "" }}
        validationSchema={AmountSchema}
        onSubmit={(values) => {
          props.setWithdrawModalVisible(false)
          setTimeout(() => props.navigation.navigate("Withdraw", values),1000);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
          <>
            <View style={{ margin: 16, paddingTop: 16 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text variant="subtitle1" color="gray">Withdraw Amount</Text>
                <TextInput
                  variant="standard"
                  style={{ minWidth: 150, fontSize: 20 }}
                  onChangeText={handleChange('withdraw_amount')}
                  onBlur={handleBlur('withdraw_amount')}
                  value={values.withdraw_amount}
                />
              </View>
              {errors.withdraw_amount && touched.withdraw_amount ? (<Text style={{ textAlign: "right" }} variant="subtitle1" color="red">{errors.withdraw_amount}</Text>) : null}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
              <Button
                title="Cancel"
                variant="outlined"
                style={{ width: "40%", marginLeft: 15 }}
                onPress={() => {
                  props.setWithdrawModalVisible(false);
                }}
              />
              <Button
                title="Proceed"
                style={{ width: "40%", marginRight: 15 }}
                onPress={() => handleSubmit()}
              />
            </View>
          </>
        )}
      </Formik>
  );
}

const styles = StyleSheet.create({
  mainCardView: {
    minHeight: 350,
    backgroundColor: "white",
    borderRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 16,
    marginBottom: 6,
  },
  // modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});
