import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput, Stack} from "@react-native-material/core";
import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Formik } from 'formik';


const StackNavigator = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator>
        <StackNavigator.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        <StackNavigator.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            headerLeft: () => null, 
            title: 'Welcome User' 
          }}
        />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}


function Login({navigation}) {
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
      </Stack>
    </View>
  );
}

function HomeScreen({navigation, route}) {
  return (
    <Stack spacing={2} style={{ margin: 16, fontSize: 20 }}>
      <Text>This is {route.params.name}'s profile</Text>
      <Button
        title="Logout"
        style={{ marginTop: 10 }}
        onPress={() => {
          navigation.navigate('Login');
          navigation.reset({index: 0, routes: [{name: 'Login'}]});
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
