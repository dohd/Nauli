import React from "react";
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { 
  AppBar, 
  Button, 
  Text,
  Stack, 
  Backdrop,
  Icon,
  IconButton,
  IconComponentProvider,
  Divider
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
          trailing={props => (
            <IconButton
              icon={props => <Icon name="logout-variant" {...props} />}
              {...props}
              onPress={() => {
                navigation.navigate('Login');
                navigation.reset({index: 0, routes: [{name: 'Login'}]});
              }}
            />
          )}
        />

        <Stack spacing={2} style={{ margin: 16, fontSize: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('History')}>
            <View style={styles.mainCardView}>
                <View style={{ flex: 1, flexDirection: 'col'}}>
                  <Text variant='subtitle1' color="gray" style={{ marginBottom: 10 }}>Available Balance</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.subCardView}>
                      <Icon name="wallet" size={60} />
                    </View>
                    <View style={{marginLeft: 12}}>
                      <View style={{ marginTop: 4, borderWidth: 0 }}>
                        <Text variant='h4'>20,000.00</Text>
                      </View>
                    </View>
                  </View>
                  <Text variant='subtitle2' color="gray" style={{ marginTop: 20 }}>See details</Text>
                </View>
            </View>
          </TouchableOpacity>

          <View style={{ marginRight: 10, marginLeft: 10 }}>
            <Backdrop
              revealed={false}
              header={
                <AppBar
                  title="Deposits"
                  transparent
                />
              }
              backLayer={<View style={{ height: 290}} />}
            >
              <Text variant='subtitle2' style={{ margin: 20, fontWeight: 'bold' }}>Today</Text>

              {
                [...Array(5)].map((v, i) => (
                  <View key={i}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }} key={0}>
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
                    <Divider leadingInset={26} trailingInset={26} />
                  </View>
                ))
              }

              <Button
                title="See more"
                variant="outline"
                color="primary"
                style={{ marginTop: 5, marginLeft: 80, marginRight: 80 }}
                onPress={() => navigation.navigate('History')}
              />
            </Backdrop>          
          </View>
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
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 4,
    marginBottom: 6,
    marginLeft: 10,
    marginRight: 10,
  },
  subCardView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
