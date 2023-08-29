import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlashMessage from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/History";
import WithdrawScreen from "./screens/WithdrawScreen";
import SettingsScreen from "./screens/SettingsScreen";
import UsersScreen from "./screens/UsersScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [aud, setAud] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('aud', (error, result) => setAud(result));
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={aud? 'Home' : 'Login'}>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            initialParams={{setAud}}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Signup" 
            component={SignUpScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ForgotPassword" 
            component={ForgotPasswordScreen} 
            options={{ title: '' }}
          />
          <Stack.Screen 
            name="ResetPassword" 
            component={ResetPasswordScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={{ headerShown: false}}
          />
          <Stack.Screen
            name="Withdraw"
            component={WithdrawScreen}
            options={{ headerShown: false}}
          />
          <Stack.Screen
            name="SettingsMenu"
            component={SettingsScreen}
            options={{ headerShown: false}}
          />
          <Stack.Screen
            name="Users"
            component={UsersScreen}
            options={{ headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  );
}
