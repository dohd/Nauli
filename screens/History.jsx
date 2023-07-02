import React from "react";
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import FareHistory from "./FareHistory";
import WithdrawHistory from "./WithdrawHistory";

const Tab = createMaterialTopTabNavigator();

export default function HistoryScreen({ navigation, route }) {
  return (
    <>
      <AppBar
        title="Transactions"
        leading={(props) => (
          <IconButton
            onPress={() => navigation.navigate("Home")}
            icon={(props) => <Icon name="keyboard-backspace" {...props} />}
            {...props}
          />
        )}
      />
      <Tab.Navigator>
        <Tab.Screen name="Fare Deposits" component={FareHistory} />
        <Tab.Screen name="Withdrawals" component={WithdrawHistory} />
      </Tab.Navigator>
    </>
  );
}
