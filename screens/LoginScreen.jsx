import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput, Stack} from "@react-native-material/core";
import { Formik } from 'formik';


export default function LoginScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Stack spacing={2} style={{ margin: 16 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'flex-start' }}>
            Login
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
                    <TextInput
                      label="Password"
                      variant="standard"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    
                    <Button 
                      title="Login" 
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
            <Text 
              style={{ alignSelf: 'flex-start', marginTop: 15, fontSize: 12, color: '#651fff' }}
              onPress={() => { 
                navigation.navigate('ForgotPassword'); 
              }}
              >
              Reset Password?
            </Text>
            <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 25 }}>
              Create an account?   
              <Button 
                title="SignUp" 
                variant="outline"
                style={{ marginTop: 10 }} 
                onPress={() => { 
                  navigation.navigate('Signup'); 
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