import React from "react";
import { StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import { Text } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function FareHistory({ navigation, route }) {
  return (
      <SafeAreaView style={{ marginTop: 5 }}>
        <FlatList
          data={
          [
            "Fuxi Isak",
            "Lola Azra",
            "Sujata Devyn",
            "Ida Roman",
            "Sherry Argider",
            "Fuxi Isak",
            "Lola Azra",
            "Sujata Devyn",
            "Ida Roman",
            "Sherry Argider",
            "Fuxi Isak",
            "Lola Azra",
            "Sujata Devyn",
            "Ida Roman",
            "Sherry Argider",
          ]
          .map((v, i) => ({id: i, value: v}))
        }
          renderItem={({item}) => <Transaction id={item.id} value={item.value} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
  );
}

function Transaction({id, value}) {
  return (
    <View style={styles.mainCardView} key={id}>
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
              07:{id < 10 ? `0${id + 1}` : id} AM
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
