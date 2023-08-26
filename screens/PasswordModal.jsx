import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Button, Text, TextInput, HStack, VStack } from "@react-native-material/core";
import { Formik } from "formik";
import { showMessage } from "react-native-flash-message";
import Api from "../api/config";

export function PasswordModal(props) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.passwordModalVisible}
        onRequestClose={() => {
          props.setPasswordModalVisible(!props.passwordModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.mainCardView}>
            <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 10, marginRight: 10 }}>
              <Text variant="h6" color="gray" style={{ marginBottom: 20 }}>Update Password</Text>
              <FormInput {...props} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function FormInput(props) {
  const {user} = props;
  return (
    <Formik
      initialValues={{ current_password: '', password: '', confirm_password: '' }}
      onSubmit={(values) => {
        props.setPasswordModalVisible(false);
        const {current_password, password} = values;
        if (current_password && password) {
          // update password
          Api.patch(`/users/${user.id}`, {current_password, password})
          .then(data => {
            showMessage({message: 'Password updated successfully', type: 'success'});
          })
          .catch(error => {
            showMessage({message: error.message, type: 'danger'});
          });
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <VStack spacing={15}>
          <TextInput
            label="Current Password*"
            variant="standard"
            style={{ fontSize: 20 }}
            onChangeText={handleChange('current_password')}
            onBlur={handleBlur('current_password')}
            value={values.current_password}
          />

          <TextInput
            label="New Password*"
            variant="standard"
            style={{ fontSize: 20 }}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />

          <TextInput
            label="Confirm Password*"
            variant="standard"
            style={{ fontSize: 20 }}
            onChangeText={handleChange('confirm_password')}
            onBlur={handleBlur('confirm_password')}
            value={values.confirm_password}
          />

          <HStack spacing={40} style={{ marginTop: 20 }}>
            <Button
              title="Cancel"
              variant="outlined"
              style={{ width: "40%", marginLeft: 10 }}
              onPress={() => props.setPasswordModalVisible(false)}
            />
            <Button
              title="Save"
              style={{ width: "40%" }}
              onPress={() => handleSubmit()}
            />
          </HStack>
        </VStack>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  mainCardView: {
    height: 350,
    backgroundColor: "white",
    borderRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 16,
    justifyContent: "center",
  },
  // modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});
