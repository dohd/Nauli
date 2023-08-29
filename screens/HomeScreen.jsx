import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList, RefreshControl } from "react-native";
import {
  Backdrop,
  BackdropSubheader,
  AppBar,
  IconButton,
  Divider,
  Button,
  Text,
  Spacer,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import accounting from "accounting-js";
import Api, { Auth } from "../api/config";
import { showMessage } from "react-native-flash-message";

import { WithdrawModal } from "./WithdrawModal";

export default function HomeScreen(props) {
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [accountBalance, setAccountBalance] = useState(0);
  const [deposits, setDeposits] = useState([]);
  const [user, setUser] = useState({});
  props = {withdrawModalVisible, setWithdrawModalVisible, user, accountBalance, ...props};

  useEffect(() => {
    const aud = Auth.aud;
    // fetch user 
    Api.get(`/users/${aud}`)
    .then(data => {
      setUser(data);
    })
    .catch(error => {
      showMessage({message: error.message, type: 'danger'});
    });
    // fetch account balance
    Api.get(`/users/${aud}/balance`)
    .then(data => {
      const balance = accounting.formatNumber(data.net_balance)
      setAccountBalance(balance);
    })
    .catch(error => { 
      showMessage({message: error.message, type: 'danger'});
    });
    // fetch deposits
    Api.get(`/users/${aud}/deposits`)
    .then(data => {
      setDeposits(data);
    })
    .catch(error => { 
      showMessage({message: error.message, type: 'danger'});
    });
  }, []);  

  // refresh control
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // fetch deposits
    const aud = Auth.aud;
    Api.get(`/users/${aud}/deposits`)
    .then(data => {
      setRefreshing(false);
      setDeposits(data);
    })
    .catch(error => { 
      setRefreshing(false);
      showMessage({message: error.message, type: 'danger'});
    });
  }, []);

  return (
    <>
      <Backdrop
        revealed={true}
        header={
          <AppBar
            title="Demo App"
            transparent
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
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={
              deposits.map(v => ({
                id: v.id,
                name: `${v.first_name} ${v.middle_name}`,
                phone: v.msisdn,
                amount: accounting.formatNumber(v.trans_amount, {precision: 0}),
                time: new Date(v.created_at).toLocaleTimeString(),
              }))
            }
            renderItem={({item}) => <FareDeposit {...item} />}
            keyExtractor={item => item.id}
          />  
          <Spacer />
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
                <Text variant="h4">Ksh. {props.accountBalance}</Text>
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
              disabled={Boolean(props.user.rel_id)}
              uppercase={false}
              style={{ width: "40%", marginRight: 20 }}
              onPress={() => props.setWithdrawModalVisible(true)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

function FareDeposit(props) {
  return (
    <View key={props.id}>
      <View style={styles.listItemView} key={0}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.subCardView}>
            <Icon name="cash-multiple" size={30} />
          </View>
          <View style={{ marginLeft: 8 }}>
            <Text variant="subtitle2">{props.name}</Text>
            <View style={{ marginTop: 4, borderWidth: 0 }}>
              <Text variant="subtitle2" color="gray">
                {props.phone}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginLeft: 8 }}>
            <Text variant="subtitle2" style={{ fontWeight: 'bold' }}>Ksh. {props.amount}</Text>
            <View style={{ marginTop: 4, borderWidth: 0 }}>
              <Text variant="subtitle2" color="gray">
                {props.time}
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
      style={{ position: 'absolute', start: 0, end: 0, bottom: 0 }}
      variant="bottom"
      leading={(props) => (
        <IconButton
          onPress={() => navigation.navigate("SettingsMenu")}
          icon={(props) => <Icon name="cog" {...props} />}
          {...props}
          style={{ marginLeft: 10 }}
        />
      )}
      trailing={(props) => (
        <IconButton
          icon={(props) => <Icon name="magnify" {...props} />}
          {...props}
          style={{ marginRight: 10 }}
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
