import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput} from "@react-native-material/core";

export default function App() {
  return (
      <>
        <Login />
      </>
  );
}


function Login() {
  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 30, fontWeight: 'bold'}}>Login</Text>
        <TextInput
          label="Username / Phone"
          variant="outlined"
        />
        <TextInput
          label="Password"
          variant="outlined"
        />
        <Button title="Login" onPress={() => {}}/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
