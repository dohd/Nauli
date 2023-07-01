import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList, Modal } from "react-native";
import {
  Backdrop,
  BackdropSubheader,
  AppBar,
  IconButton,
  Divider,
  Button,
  Text,
  TextInput,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Formik } from "formik";
import {WithdrawModal} from "./modals/WithdrawModal";

export default function HomeScreen(props) {
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  props = {withdrawModalVisible, setWithdrawModalVisible, ...props};
  return (
    <>
      <Backdrop
        revealed={true}
        header={
          <AppBar
            title="Demo App"
            transparent
            leading={(props) => (
              <IconButton
                {...props}
                icon={(props) => (
                  <Icon name='home' {...props} />
                )}
              />
            )}
          />
        }
        backLayer={
          <>
            <AvailableBalance {...props} />
            <WithdrawModal {...props} />
          </>
        }
      >
        {/* Deposit subheader */}
        <BackdropSubheader
          title="Fare Deposits"
          trailing={() => (
            <Button
              title="See More"
              uppercase={false}
              variant="outlined"
              onPress={() => props.navigation.navigate("History")}
            />
          )}
        />

        {/* Deposit list */}
        <SafeAreaView>
          <FlatList
            data={
            [
              "Fuxi Isak",
              "Lola Azra",
              "Sujata Devyn",
              "Ida Roman",
              "Sherry Argider",
            ]
            .map((v, i) => ({id: i, value: v}))
          }
            renderItem={({item}) => <FareDeposit id={item.id} value={item.value} />}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
        
        
      </Backdrop>
      <BottomAppBar {...props} />
    </>
  );
}

function AvailableBalance(props) {
  return (
    <View style={{ height: 210 }}>
      <View style={styles.mainCardView}>
        <View style={{ flex: 1 }}>
          <Text variant="subtitle1" color="gray" style={{ marginBottom: 10 }}>
            Available Balance
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.subCardView}>
              <Icon name="wallet" size={70} />
            </View>
            <View style={{ marginLeft: 12 }}>
              <View style={{ marginTop: 2, borderWidth: 0 }}>
                <Text variant="h4">Ksh. 20,000.00</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Button
              title="See Details"
              uppercase={false}
              variant="outlined"
              style={{ width: "40%", marginLeft: 10}}
              onPress={() => props.navigation.navigate("History")}
            />
            <Button
              title="Withdraw"
              uppercase={false}
              style={{ width: "40%", marginRight: 20 }}
              onPress={() => {
                // navigation.navigate("Withdraw")
                props.setWithdrawModalVisible(true);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

function FareDeposit({id, value}) {
  return (
    <View key={id}>
      <View style={styles.listItemView} key={0}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.subCardView}>
            <Icon name="cash-multiple" size={30} />
          </View>
          <View style={{ marginLeft: 8 }}>
            <Text variant="subtitle2">{value}</Text>
            <View style={{ marginTop: 4, borderWidth: 0 }}>
              <Text variant="subtitle2" color="gray">
                07{Math.random().toString().slice(2, 10)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginLeft: 8 }}>
            <Text variant="subtitle2" style={{ fontWeight: 'bold' }}>Ksh. 100</Text>
            <View style={{ marginTop: 4, borderWidth: 0 }}>
              <Text variant="subtitle2" color="gray">
                07:0{id + 1} AM
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Divider leadingInset={26} trailingInset={26} />
    </View>
  );
}

function BottomAppBar({ navigation, route }) {
  return (
    <AppBar
      variant="bottom"
      leading={(props) => (
        <IconButton
          onPress={() => navigation.navigate("SettingsMenu")}
          icon={(props) => <Icon name="menu" {...props} />}
          {...props}
        />
      )}
      trailing={(props) => (
        <IconButton
          icon={(props) => <Icon name="magnify" {...props} />}
          {...props}
        />
      )}
    ></AppBar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainCardView: {
    height: 180,
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
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 2,
    marginRight: 2,
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
