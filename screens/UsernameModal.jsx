import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Button, Text, TextInput, HStack, VStack } from "@react-native-material/core";
import { Formik } from "formik";
import { showMessage } from "react-native-flash-message";
import Api from "../api/config";

export function UsernameModal(props) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.usernameModalVisible}
        onRequestClose={() => props.setUsernameModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.mainCardView}>
            <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 10, marginRight: 10 }}>
              <Text variant="h6" color="gray" style={{ marginBottom: 20 }}>Update Username</Text>
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
      initialValues={{ username: user.username }}
      onSubmit={(values) => {
        props.setUsernameModalVisible(false);
        if (values.username) {
          // update username
          Api.patch(`/users/${user.id}`, values)
          .then(data => {
            return data;
          })
          .catch(error => {
            showMessage({message: error.message, type: 'danger'});
          });
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <VStack spacing={20}>
          <TextInput
            label="Username"
            variant="standard"
            style={{ fontSize: 20 }}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          />
        
          <HStack spacing={40} style={{ marginTop: 40 }}>
            <Button
              title="Cancel"
              variant="outlined"
              style={{ width: "40%", marginLeft: 10 }}
              onPress={() => props.setUsernameModalVisible(false)}
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
    height: 250,
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
