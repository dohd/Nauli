import React from "react";
import { View, StyleSheet } from 'react-native';
import { 
  AppBar, 
  Button, 
  Text,
  TextInput,
  IconButton,
  Divider,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function WithdrawScreen({navigation, route}) {
  return (
    
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
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text variant='subtitle1' color="gray">Available Balance</Text>
                <Text variant='h5'>20,000</Text>
              </View>
            </View>
            <Divider leadingInset={26} trailingInset={26} />

            <View style={{ margin: 16, marginBottom: 10, paddingTop: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text variant='subtitle1' color="gray">Withdraw Amount</Text>
                <TextInput
                  variant="standard"
                  style={{ minWidth: 100, fontSize: 20 }}
                  // onChangeText={handleChange('password')}
                  // onBlur={handleBlur('password')}
                  // value={values.password}
                />
              </View>
            </View>

            
              <Button 
                title="Withdraw" 
                style={{ marginLeft: 'auto', marginRight: 'auto', width: '60%', marginTop: 20 }}
                onPress={() => { 
                  // handleSubmit(); 
                  navigation.navigate('Home'); 
                }}
              />
            
          </View>
        </View>
      </View>
  );
};


const styles = StyleSheet.create({
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
