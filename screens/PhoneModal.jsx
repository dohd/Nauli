import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Button, Text, TextInput, HStack, VStack } from "@react-native-material/core";
import { Formik } from "formik";
import * as Yup from 'yup';
import { showMessage } from "react-native-flash-message";
import Api from "../api/config";

export function PhoneModal(props) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.phoneModalVisible}
        onRequestClose={() => props.setPhoneModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.mainCardView}>
            <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 10, marginRight: 10 }}>
              <Text variant="h6" color="gray" style={{ marginBottom: 20 }}>Update Phone Number</Text>
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
  const PhoneSchema = Yup.object().shape({
    phone: Yup.string()
      .min(10, 'number too short!')
      .max(15, 'number too long!')
      .required('number required!'),
  });

  return (
    <Formik
      initialValues={{ phone: user.phone }}
      validationSchema={PhoneSchema}
      onSubmit={(values) => {
        props.setPhoneModalVisible(false);
        // update phone number
        Api.patch(`/users/${user.id}`, values)
        .then(data => {
          props.setUserUpdated(!props.userUpdated);
        })
        .catch(error => {
          showMessage({message: error.message, type: 'danger'});
        });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
        <VStack spacing={20}>
          <TextInput
            label="Phone Number"
            variant="standard"
            style={{ fontSize: 20 }}
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
          />
          {errors.phone && touched.phone ? (<Text variant="subtitle1" color="red">{errors.phone}</Text>) : null}
          <HStack spacing={40} style={{ marginTop: 40 }}>
            <Button
              title="Cancel"
              variant="outlined"
              style={{ width: "40%", marginLeft: 10 }}
              onPress={() => props.setPhoneModalVisible(false)}
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
