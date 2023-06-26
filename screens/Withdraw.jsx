import React from "react";
import { View, StyleSheet } from 'react-native';
import { 
  AppBar, 
  Button, 
  Text,
  TextInput,
  Icon,
  IconButton,
  IconComponentProvider,
  Divider
} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


export default function WithdrawScreen({navigation, route}) {
  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <View>
        <AppBar
          title="Withdraw Deposit"
          leading={props => (
            <IconButton
                onPress={() => navigation.navigate('Home')}
                icon={props => <Icon name="keyboard-backspace" {...props} />}
                {...props}
            />
          )}
        />

        <View style={styles.mainCardView}>
          <View style={{ paddingTop: 50 }}>
            <View style={{ margin: 16, marginBottom: 10 }}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text variant='subtitle1' color="gray">Available Balance</Text>
                <Text variant='h5'>20,000</Text>
              </View>
            </View>
            <Divider leadingInset={26} trailingInset={26} />

            <View style={{ margin: 16, marginBottom: 10 }}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                <Text variant='subtitle1' color="gray">Withdraw Amount</Text>
                <TextInput
                      variant="standard"
                      // onChangeText={handleChange('password')}
                      // onBlur={handleBlur('password')}
                      // value={values.password}
                    />
              </View>
            </View>

            <View style={{ margin: 30}}>
              <Button 
                title="Withdraw" 
                onPress={() => { 
                  // handleSubmit(); 
                  navigation.navigate('Home'); 
                }}
              />
            </View>
          </View>
        </View>
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
    height: 300,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 16,
    marginBottom: 6,
    marginLeft: 10,
    marginRight: 10,
  },
});
