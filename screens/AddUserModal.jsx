import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Button, Text, TextInput, HStack, VStack } from "@react-native-material/core";
import { Formik } from "formik";
import { showMessage } from "react-native-flash-message";
import Api from "../api/config";

export function AddUserModal(props) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.addUserModalVisible}
        onRequestClose={() => props.setAddUserModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.mainCardView}>
            <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 10, marginRight: 10 }}>
              <Text variant="h6" color="gray" style={{ marginBottom: 20 }}>Create User</Text>
              <FormInput {...props} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function FormInput(props) {
  return (
    <Formik
      initialValues={{ name: "", phone:"" }}
      onSubmit={(values) => {
        props.setAddUserModalVisible(false);
        if (values.name && values.phone) {
          // Create conductor
          Api.post(`/conductors`, values)
          .then(data => {
            showMessage({message: data.message, type: 'success'});
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
            label="Full Name"
            variant="standard"
            style={{ fontSize: 20 }}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          <TextInput
            label="Phone Number"
            variant="standard"
            style={{ fontSize: 20 }}
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
          />

          <HStack spacing={40} style={{ marginTop: 30 }}>
            <Button
              title="Cancel"
              variant="outlined"
              style={{ width: "40%", marginLeft: 10 }}
              onPress={() => props.setAddUserModalVisible(false)}
            />
            <Button
              title="Save"
              style={{ width: "40%" }}
              onPress={() => {
                handleSubmit();
              }}
            />

          </HStack>
        </VStack>
      )}
    </Formik>
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
