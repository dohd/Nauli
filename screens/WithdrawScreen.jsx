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
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <AppBar
        title="Withdraw Deposit"
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
          <View style={{ margin: 16, marginBottom: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text variant="subtitle1" color="gray">
                Available Balance
              </Text>
              <Text variant="h5">20,000</Text>
            </View>
          </View>
          <Divider leadingInset={26} trailingInset={26} />

          <View style={{ margin: 16, marginBottom: 10, paddingTop: 16 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text variant="subtitle1" color="gray">
                Withdraw Amount
              </Text>
              <TextInput
                variant="standard"
                style={{ minWidth: 150, fontSize: 20 }}
                // onChangeText={handleChange('password')}
                // onBlur={handleBlur('password')}
                // value={values.password}
              />
            </View>
          </View>

          <Button
            title="Withdraw"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "60%",
              marginTop: 20,
            }}
            onPress={() => {
              // handleSubmit();
              // navigation.navigate("Home");
              setModalVisible(true);
            }}
          />

          <ConfirmWithdrawalModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>
    </>
  );
}

function ConfirmWithdrawalModal({ modalVisible, setModalVisible }) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Formik
              initialValues={{ password: "", username: "" }}
              onSubmit={(values) => console.log(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                  <TextInput
                    label="OTP Code *"
                    variant="standard"
                    onChangeText={handleChange("otp_code")}
                    onBlur={handleBlur("otp_code")}
                    value={values.otp_code}
                    style={{ minWidth: 200, marginBottom: 5 }}
                  />

                  <Button
                    title="Confirm"
                    style={{ marginTop: 10 }}
                    onPress={() => {
                      handleSubmit();
                      setModalVisible(!modalVisible)
                    }}
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainCardView: {
    height: 300,
    backgroundColor: "white",
    borderRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 16,
    marginBottom: 6,
    marginLeft: 10,
    marginRight: 10,
  },
  // modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    padding: 35,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  }, 
});
