import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput, Stack} from "@react-native-material/core";


export default function HomeScreen({navigation, route}) {
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