import { StyleSheet, View } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Link href="counter" style={styles.link}>
        Go to Counter
      </Link>
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
  link: {
    textAlign: "center",
    marginBottom: 18,
    fontSize: 24,
  },
});
