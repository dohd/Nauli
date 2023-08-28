import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, RefreshControl } from "react-native";
import { Text } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import accounting from "accounting-js";
import Api, { fetchAud } from "../api/config";

export default function FareHistory({navigation, route}) {
  const [deposits, setDeposits] = useState([]);
  useEffect(() => {
    const aud = fetchAud();
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
    const aud = fetchAud();
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
      <SafeAreaView style={{ marginTop: 5 }}>
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
          renderItem={({item}) => <Transaction {...item} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
  );
}

function Transaction(props) {
  return (
    <View style={styles.mainCardView} key={props.id}>
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
  );
}

const styles = StyleSheet.create({
  mainCardView: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
  },
  subCardView: {
    alignItems: "center",
    justifyContent: "center",
  },
});
