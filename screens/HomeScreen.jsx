import React from "react";
import { View, StyleSheet } from 'react-native';
import { 
  AppBar, 
  Button, 
  Text,
  Stack, 
  Pressable, 
  Icon,
  IconButton,
  IconComponentProvider
} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


export default function HomeScreen({navigation, route}) {
  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <View>
        <AppBar
          title="Home"
          leading={props => (
            <IconButton
              icon={props => <Icon name="menu" {...props} />}
              {...props}
            />
          )}
        />

        <Stack spacing={2} style={{ margin: 16, fontSize: 20 }}>
          <Pressable onPress={() => navigation.navigate('History')}>
            <View style={styles.mainCardView}>
              <View style={{flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.subCardView}>
                  <Icon name="wallet" size={60} />
                </View>
                <View style={{marginLeft: 12}}>
                  <Text variant='subtitle1' color="gray">Total Balance</Text>
                  <View style={{ marginTop: 4, borderWidth: 0 }}>
                    <Text variant='h5'>20,000.00</Text>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>

          <Button
            title="Logout"
            style={{ marginTop: 10, marginLeft: 80, marginRight: 80 }}
            onPress={() => {
              navigation.navigate('Login');
              navigation.reset({index: 0, routes: [{name: 'Login'}]});
            }}
          />
        </Stack>
      </View>
    </IconComponentProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainCardView: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    // backgroundColor: "#651fff",
    borderRadius: 15,
    // shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    // height: 50,
    // width: 50,
    // borderRadius: 25,
    // backgroundColor: Colors.history_back,
    // borderColor: Colors.color_eeeeee,
    // borderWidth: 1,
    // borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
