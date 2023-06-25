import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput, Stack} from "@react-native-material/core";
import { Formik } from 'formik';

export default function ForgotPasswordScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Stack spacing={2} style={{ margin: 16 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', alignSelf: 'flex-start' }}>
            Forgot Password
          </Text>
            <Formik
              initialValues={{ password: '', username: '' }}
              onSubmit={values => console.log(values)}
            >
              {
                ({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View style={{ marginTop: 10 }}>
                    <TextInput
                      label="Username / Phone"
                      variant="standard"
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                    />
                    
                    <Button 
                      title="Submit" 
                      style={{ marginTop: 10 }} 
                      onPress={() => { 
                        handleSubmit(); 
                        navigation.navigate('ResetPassword', {name: 'Logged In user'}); 
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