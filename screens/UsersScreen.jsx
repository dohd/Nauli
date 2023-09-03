import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, FlatList, Pressable, ActivityIndicator} from "react-native";
import {
  AppBar,
  IconButton,
  ListItem,
  Switch,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { showMessage } from "react-native-flash-message";
import Api, {Auth} from "../api/config";

import { AddUserModal } from "./AddUserModal";
import { EditUserModal } from "./EditUserModal";

export default function UsersScreen({navigation, route}) {
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [user, setUser] = useState({});
  const [userUpdated, setUserUpdated] = useState(false);

  const [usersData, setUsersData] = useState({loaded: false, users: []});
  useEffect(() => {
    // fetch users
    const aud = Auth.aud;
    Api.get(`/users/${aud}/conductors`)
    .then(data => {
      setUsersData({ loaded: true, users: data });
    })
    .catch(error => { 
      setUsersData({ loaded: true,  users: []});
      showMessage({message: error.message, type: 'danger'});
    });
  }, [userUpdated]);   

  return (
    <>
      <AppBar
        title="User Management"
        leading={(props) => (
          <IconButton
            onPress={() => navigation.navigate("SettingsMenu")}
            icon={(props) => <Icon name="keyboard-backspace" {...props} />}
            {...props}
          />
        )}
      /> 
      <View style={styles.mainCardView}>
        <SafeAreaView>
        {
          (
            !usersData.loaded? <ActivityIndicator style={{marginTop: 20 }} size="large" /> :
            <FlatList
              data={
                usersData.users.map(v => ({
                  id: v.id,
                  name: v.name,
                  phone: v.phone,
                  active: v.active
                }))
              }
              renderItem={({item}) => (
                <User 
                  {...item}
                  user={user}
                  setUser={setUser}
                  editUserModalVisible={editUserModalVisible} 
                  setEditUserModalVisible={setEditUserModalVisible} 
                />
              )}
              keyExtractor={item => item.id}
            />
          )
        }
        </SafeAreaView>
      </View> 

      <AddUserModal userUpdated={userUpdated} setUserUpdated={setUserUpdated} addUserModalVisible={addUserModalVisible} setAddUserModalVisible={setAddUserModalVisible} />
      <EditUserModal userUpdated={userUpdated} setUserUpdated={setUserUpdated} editUserModalVisible={editUserModalVisible} setEditUserModalVisible={setEditUserModalVisible} user={user} />
      <Pressable style={styles.container} onPress={() => setAddUserModalVisible(true)}>
        <Icon name="plus" size={24} color="white" />
      </Pressable>
    </>
  );
}

function User(props) {
  const [switchValue, setSwitchValue] = useState(Boolean(props.active));
  const onSwitchValueChange = (value) => {
    // update user status
    Api.post(`/conductors/status`, {user_id: props.id, status: value? 1: 0})
    .then(data => {
      setSwitchValue(!switchValue);
    })
    .catch(error => { 
      showMessage({message: error.message, type: 'danger'});
    });
  }

  return (
    <ListItem
      title={props.name}
      secondaryText={props.phone}
      leading={<Icon name="account-circle" size={24} />}
      trailing={(trailingProps) => (
        <IconButton
          icon={(iconProps) => <Switch value={switchValue} onValueChange={(value) => onSwitchValueChange(value)} />}
          style={{ marginRight: 10 }}
          {...trailingProps}
        />
      )}
      onPress={() => {
        props.setUser({id: props.id, name: props.name, phone: props.phone});
        props.setEditUserModalVisible(true);
      }}
    />
  );
}

const styles = StyleSheet.create({
  mainCardView: {
    minHeight: 600,
    backgroundColor: "white",
    borderRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  // FAB
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6200EE",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});
