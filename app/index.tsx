import { StyleSheet, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";

export default function App() {
  return (
    <View style={styles.container}>
      <ShoppingListItem name="Kawa" isCompleted />
      <ShoppingListItem name="Herbata" />
      <ShoppingListItem name="Cukier" />
      <ShoppingListItem name="Ziemniaczki" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
