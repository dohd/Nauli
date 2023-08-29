import React, {useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import { AppBar, ListItem, IconButton, VStack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api, {Auth} from "../api/config";

import { PasswordModal } from "./PasswordModal";
import { PhoneModal } from './PhoneModal';
import { UsernameModal } from './UsernameModal';

export default function SettingsScreen({ navigation, route }) {
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [usernameModalVisible, setUsernameModalVisible] = useState(false);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);

  const [user, setUser] = useState({});
  useEffect(() => {
    // fetch user 
    const aud = Auth.aud;
    Api.get(`/users/${aud}`)
    .then(data => {
      setUser(data);
    })
    .catch(error => {
      showMessage({message: error.message, type: 'danger'});
    });
  }, [userUpdated]);

  const handleLogout = () => {
    navigation.navigate("Login");
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    AsyncStorage.removeItem('aud');
    // logout user
    Api.post(`/logout`)
    .then(data => {
      // clear Bearer token header
      delete Api.defaults.headers.common.Authorization;
      return data;
    })
    .catch(error => {
      showMessage({message: error.message, type: 'danger'});
    });
  };

  return (
    <>
      <AppBar
        title="Settings"
        leading={(props) => (
          <IconButton
            onPress={() => navigation.navigate("Home")}
            icon={(props) => <Icon name="keyboard-backspace" {...props} />}
            {...props}
          />
        )}
      />

      <View style={styles.mainCardView}>
        <VStack>
          <ListItem
            title="User Management"
            disabled={Boolean(user.rel_id)}
            secondaryText="Add or Disable User"
            leading={<Icon name="account-multiple-plus" size={24} />}
            trailing={(props) => <Icon name="chevron-right" {...props} />}
            onPress={() => navigation.navigate('Users')}
          />
          
          <ListItem
            title="Username"
            secondaryText={user.username || '_'}
            leading={<Icon name="account-circle" size={24} />}
            trailing={(props) => <Icon name="chevron-right" {...props} />}
            onPress={() => setUsernameModalVisible(true)}
          />
          <ListItem
            title="Phone Number"
            secondaryText={user.phone || '_'}
            leading={<Icon name="phone" size={24} />}
            trailing={(props) => <Icon name="chevron-right" {...props} />}
            onPress={() => setPhoneModalVisible(true)}
          />
          <ListItem
            title="Password"
            secondaryText="******"
            leading={<Icon name="lock" size={24} />}
            trailing={(props) => <Icon name="chevron-right" {...props} />}
            onPress={() => setPasswordModalVisible(true)}
          />
          
          <ListItem
            title="Logout"
            secondaryText="End Session"
            leading={<Icon name="logout-variant" size={24} />}
            onPress={() => handleLogout()}
          />    

          <UsernameModal user={user} userUpdated={userUpdated} setUserUpdated={setUserUpdated} usernameModalVisible={usernameModalVisible} setUsernameModalVisible={setUsernameModalVisible} />      
          <PhoneModal user={user} userUpdated={userUpdated} setUserUpdated={setUserUpdated} phoneModalVisible={phoneModalVisible} setPhoneModalVisible={setPhoneModalVisible} />      
          <PasswordModal user={user} userUpdated={userUpdated} setUserUpdated={setUserUpdated} passwordModalVisible={passwordModalVisible} setPasswordModalVisible={setPasswordModalVisible} />      
        </VStack>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainCardView: {
    height: 400,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 20
  },
});
