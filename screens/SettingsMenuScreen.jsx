import React from "react";
import { View, StyleSheet } from 'react-native';
import { 
    AppBar, 
    ListItem,
    IconButton,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


export default function SettingsMenuScreen({navigation, route}) {
  return (
    <View>
      <AppBar
        title="Settings Menu"
        leading={props => (
          <IconButton
              onPress={() => navigation.navigate('Home')}
              icon={props => <Icon name="keyboard-backspace" {...props} />}
              {...props}
          />
        )}
      />
      <View style={styles.mainCardView}>
          <View>
            <ListItem
              title="Profile"
              leading={<Icon name="account-circle" size={24} />}
              trailing={props => <Icon name="chevron-right" {...props} />}
            />
            <ListItem
              title="Security"
              leading={<Icon name="account-lock" size={24} />}
              trailing={props => <Icon name="chevron-right" {...props} />}
            />
            <ListItem
              title="Logout"
              leading={<Icon name="logout-variant" size={24} />}
              // trailing={props => <Icon name="chevron-right" {...props} />}
              onPress={() => {
                navigation.navigate('Login');
                navigation.reset({index: 0, routes: [{ name: 'Login' }]})
              }}
            />
            {/* <ListItem
              title="Trash"
              trailing={props => <Icon name="chevron-right" {...props} />}
            />
            <ListItem
              title="Spam"
              trailing={props => <Icon name="chevron-right" {...props} />}
            /> */}
          </View>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCardView: {
    height: 300,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
  },
});