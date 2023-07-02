import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import { AppBar, ListItem, IconButton, HStack, VStack, Divider } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { PasswordModal } from "./PasswordModal";

export default function SettingsMenuScreen({ navigation, route }) {
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
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
            title="Username"
            secondaryText="Super Admin"
            leading={<Icon name="account-circle" size={24} />}
            trailing={(props) => <Icon name="chevron-right" {...props} />}
          />
          <ListItem
            title="Phone Number"
            secondaryText="0788222400"
            leading={<Icon name="phone" size={24} />}
            trailing={(props) => <Icon name="chevron-right" {...props} />}
          />
          <ListItem
            title="Password"
            secondaryText="******"
            leading={<Icon name="lock" size={24} />}
            trailing={(props) => <Icon name="chevron-right" {...props} />}
            onPress={() => {
              setPasswordModalVisible(true);
              // navigation.navigate("Login");
              // navigation.reset({ index: 0, routes: [{ name: "Login" }] });
            }}
          />
          
          <ListItem
            title="Logout"
            leading={<Icon name="logout-variant" size={24} />}
            onPress={() => {
              navigation.navigate("Login");
              navigation.reset({ index: 0, routes: [{ name: "Login" }] });
            }}
          />    

          <PasswordModal passwordModalVisible={passwordModalVisible} setPasswordModalVisible={setPasswordModalVisible} />      
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
