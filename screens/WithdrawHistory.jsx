import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, RefreshControl } from "react-native";
import { Text } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import accounting from "accounting-js";
import Api, {Auth} from "../api/config";

export default function WithdrawHistory({navigation, route}) {
  const [withdrawals, setWithdrawals] = useState([]);
  useEffect(() => {
    // fetch cashouts
    const aud = Auth.aud;
    Api.get(`/users/${aud}/cashouts`)
    .then(data => {
      setWithdrawals(data);
    })
    .catch(error => { 
      showMessage({message: error.message, type: 'danger'});
    });
  }, []); 

  // refresh control
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // fetch cashouts
    const aud = Auth.aud;
    Api.get(`/users/${aud}/cashouts`)
    .then(data => {
      setRefreshing(false);
      setWithdrawals(data);
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
            withdrawals.map(v => ({
              id: v.id,
              date: new Date(v.created_at).toLocaleDateString("es-CL"),
              time: new Date(v.created_at).toLocaleTimeString(),
              amount: accounting.formatNumber(v.trans_amount, {precision: 0}),
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
            <Text variant="subtitle2" style={{ fontWeight: 'bold' }}>
              {props.date}
            </Text>
            <Text variant="subtitle2" color="gray">
              {props.time}
            </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ marginLeft: 8 }}>
          <Text variant="subtitle2" style={{ fontWeight: 'bold' }}>Ksh. {props.amount}</Text>
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
