import { StyleSheet, TextInput, FlatList } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
};

const initalList: ShoppingListItemType[] = [
  { id: "1", name: "Kawa" },
  { id: "2", name: "Herbata" },
  { id: "3", name: "Cukier" },
  { id: "4", name: "Ziemniaczki" },
];

// If you want to test the performance of the FlatList component, you can use the following code:
// Now you can console log the item in the renderItem prop to see how many components are rendered.
//   const data = new Array(1000)
//   .fill(null)
//   .map((_item, index) => ({ id: String(index + 1), name: String(index + 1) }));

export default function App() {
  const [shoppingList, setShoppingList] = useState(initalList);
  const [value, setValue] = useState(" ");

  const handleSubmit = () => {
    if (value) {
      setShoppingList([
        ...shoppingList,
        {
          id: new Date().toTimeString(),
          name: value,
        },
      ]);
      setValue("");
    }
  };

  return (
    <FlatList
      data={shoppingList}
      renderItem={({ item }) => {
        return <ShoppingListItem name={item.name} />;
      }}
      ListHeaderComponent={
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Np. Chleb"
          style={styles.textInput}
          keyboardType="default"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      }
      stickyHeaderIndices={[0]}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite,
  },
});
