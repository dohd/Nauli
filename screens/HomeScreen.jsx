import React, { useState } from "react";
import { View,StyleSheet, TouchableOpacity } from "react-native";
import {
  Backdrop,
  BackdropSubheader,
  AppBar,
  IconButton,
  Divider,
  Button,
  Text, 
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function App (props) {
  const [revealed, setRevealed] = useState(true);
  return (
    <Backdrop
      revealed={revealed}
      header={
        <AppBar
          title="Demo App"
          transparent
          leading={(props) => (
            <IconButton
              icon={(props) => (
                <Icon name={revealed ? "home" : "menu"} {...props} />
              )}
              onPress={() => setRevealed((prevState) => !prevState)}
              {...props}
            />
          )}
        />
      }
      backLayer={<AvailableBalance {...props} />}
    >
      <BackdropSubheader 
        title="Deposit" 
        style={{ fontWeight: 'bold' }}
        trailing={() => (
          <IconButton
            icon={() => <Icon name="bank-transfer" size={40} color="black" />}
            onPress={() => props.navigation.navigate('Withdraw')}
          />
        )}
      />
      <Deposits />
      <Button
        title="See more"
        uppercase={false}
        variant="outline"
        style={{ marginTop: 5, marginLeft: 'auto', marginRight: 'auto', width: '50%' }}
        onPress={() => props.navigation.navigate('History')}
      />
    </Backdrop>
  );
};


function AvailableBalance({navigation, route}) {
  return (
    <View style={{ height: 200 }}>
      <TouchableOpacity onPress={() => navigation.navigate('History')}>
        <View style={styles.mainCardView}>
            <View style={{ flex: 1}}>
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
    </View>
  );
}

function Deposits() {
  return (
    <View>
      {
        ['Fuxi Isak', 'Lola Azra', 'Sujata Devyn', 'Ida Roman', 'Sherry Argider']
        .map((v, i) => (
          <View key={i}>
            <View style={styles.listItemView} key={0}>
              <View style={{flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.subCardView}>
                  <Icon name="cash-multiple" size={30} />
                </View>
                <View style={{marginLeft: 8}}>
                    <Text variant='subtitle2'>{v}</Text>
                    <View style={{ marginTop: 4, borderWidth: 0 }}>
                      <Text variant='subtitle2' color="gray">07{Math.random().toString().slice(2,10)}</Text>
                    </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center' }}>
                <View style={{marginLeft: 8}}>
                    <Text variant='subtitle2'>100</Text>
                    <View style={{ marginTop: 4, borderWidth: 0 }}>
                      <Text variant='subtitle2' color="gray">07:0{i+1} AM</Text>
                    </View>
                </View>
              </View>
            </View>
            <Divider leadingInset={26} trailingInset={26} />
          </View>
        ))
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainCardView: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  subCardView: {
    alignItems: "center",
    justifyContent: "center",
  },
  listItemView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
  },
});
