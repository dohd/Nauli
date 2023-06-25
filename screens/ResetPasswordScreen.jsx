import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput, Stack} from "@react-native-material/core";
import { Formik } from 'formik';


export default function ResetPasswordScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Stack spacing={2} style={{ margin: 16 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', alignSelf: 'flex-start' }}>
            Reset Password
          </Text>
            <Formik
              initialValues={{ password: '', username: '' }}
              onSubmit={values => console.log(values)}
            >
              {
                ({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View style={{ marginTop: 10 }}>
                    <TextInput
                      label="OTP Code *"
                      variant="standard"
                      onChangeText={handleChange('otp_code')}
                      onBlur={handleBlur('otp_code')}
                      value={values.otp_code}
                    />
  
                    <TextInput
                      label="Password *"
                      variant="standard"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <TextInput
                      label="Confirm Password *"
                      variant="standard"
                      onChangeText={handleChange('confirm_password')}
                      onBlur={handleBlur('confirm_password')}
                      value={values.confirm_password}
                    />
                    
                    <Button 
                      title="Reset" 
                      style={{ marginTop: 10 }} 
                      onPress={() => { 
                        handleSubmit(); 
                        navigation.navigate('Login', {name: 'Logged In user'}); 
                      }}
                    />
                  </View>
                )
              }
            </Formik>
        </Stack>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});