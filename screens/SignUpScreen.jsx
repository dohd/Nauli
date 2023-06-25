import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput, Stack} from "@react-native-material/core";
import { Formik } from 'formik';

export default function SignUpScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Stack spacing={2} style={{ margin: 16 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'flex-start' }}>
            Sign Up
          </Text>
            <Formik
              initialValues={{ password: '', username: '' }}
              onSubmit={values => console.log(values)}
            >
              {
                ({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View style={{ marginTop: 10 }}>
                    <TextInput
                      label="Phone Number *"
                      variant="standard"
                      onChangeText={handleChange('phone_no')}
                      onBlur={handleBlur('phone_no')}
                      value={values.phone_no}
                    />
                    <TextInput
                      label="Username"
                      variant="standard"
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
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
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <Button 
                      title="Sign up" 
                      style={{ marginTop: 10 }} 
                      onPress={() => { 
                        handleSubmit(); 
                        navigation.navigate('Home', {name: 'Logged In user'}); 
                      }}
                    />
                  </View>
                )
              }
            </Formik>
            <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 25 }}>
              Already have an account?   
              <Button 
                style={{ marginTop: 10}} 
                title="Login" 
                variant="outline"
                onPress={() => { 
                  navigation.navigate('Login'); 
                }}
              />
            </Text>
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