import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList, Pressable} from "react-native";
import {
  AppBar,
  IconButton,
  ListItem,
  Switch,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { AddUserModal } from "./AddUserModal";
import { EditUserModal } from "./EditUserModal";

export default function UsersScreen({navigation, route}) {
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
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
          <FlatList
            data={
            [
              "Fuxi Isak",
              "Lola Azra",
              "Sujata Devyn",
              "Ida Roman",
              "Sherry Argider",
              "Fuxi Isak",
              "Lola Azra",
              "Sujata Devyn",
              "Ida Roman",
              "Sherry Argider",
              "Fuxi Isak",
              "Lola Azra",
              "Sujata Devyn",
              "Ida Roman",
              "Sherry Argider",
              "Fuxi Isak",
              "Lola Azra",
              "Sujata Devyn",
              "Ida Roman",
              "Sherry Argider",
              "Fuxi Isak",
              "Lola Azra",
              "Sujata Devyn",
              "Ida Roman",
              "Sherry Argider",
              "Fuxi Isak",
              "Lola Azra",
              "Sujata Devyn",
              "Ida Roman",
              "Sherry Argider",
            ]
            .map((v, i) => ({id: i, value: v}))
          }
            renderItem={({item}) => (
              <User 
                id={item.id} 
                value={item.value} 
                editUserModalVisible={editUserModalVisible} 
                setEditUserModalVisible={setEditUserModalVisible} 
              />
            )}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View> 

      <AddUserModal addUserModalVisible={addUserModalVisible} setAddUserModalVisible={setAddUserModalVisible} />
      <EditUserModal editUserModalVisible={editUserModalVisible} setEditUserModalVisible={setEditUserModalVisible} />
      <Pressable 
        style={styles.container} 
        onPress={() => setAddUserModalVisible(true)}
      >
        <Icon name="plus" size={24} color="white" />
      </Pressable>
    </>
  );
}

function User({id, value, setEditUserModalVisible}) {
  return (
    <ListItem
      title={value}
      secondaryText={'07' + Math.random().toString().slice(2, 10)}
      leading={<Icon name="account-circle" size={24} />}
      trailing={(props) => (
        <IconButton
          icon={(props) => <Switch value={id % 2 == 0? true : false} onValueChange={() => null} />}
          {...props}
          style={{ marginRight: 10 }}
        />
      )}
      onPress={() => {
        setEditUserModalVisible(true);
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
