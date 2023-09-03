import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlashMessage from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Auth} from "../api/config";

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
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'AuthScreen'}>
          <Stack.Screen 
            name="AuthScreen" 
            component={AuthScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
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

function AuthScreen({ navigation, route }) {
  useEffect(() => {
    AsyncStorage.getItem('aud', (error, result) => {
      if (!result) return navigation.navigate("Login");
      Auth.aud = result;
      navigation.navigate("Home");
    });
  }, []);
  return;
}
