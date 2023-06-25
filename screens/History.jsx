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


export default function HistoryScreen({navigation, route}) {
  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <View>
        <AppBar
          title="History"
          leading={props => (
            <IconButton
                onPress={() => navigation.navigate('Home')}
                icon={props => <Icon name="keyboard-backspace" {...props} />}
                {...props}
            />
          )}
        />
        {
          [...Array(10)].map((v, i) => (
            <View style={styles.mainCardView} key={i}>
              <View style={{flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.subCardView}>
                  <Icon name="cash-multiple" size={30} />
                </View>
                <View style={{marginLeft: 8}}>
                    <Text variant='subtitle2'>Dwayne Carter</Text>
                    <View style={{ marginTop: 4, borderWidth: 0 }}>
                      <Text variant='subtitle2' color="gray">0700100200</Text>
                    </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center' }}>
                <View style={{marginLeft: 8}}>
                    <Text variant='subtitle2'>100</Text>
                    <View style={{ marginTop: 4, borderWidth: 0 }}>
                      <Text variant='subtitle2' color="gray">07:00 AM</Text>
                    </View>
                </View>
              </View>
            </View>
          ))
        }

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
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
  },
  subCardView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});