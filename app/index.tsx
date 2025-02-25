import { StyleSheet, TextInput, FlatList, View, Text } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimestamp?: number;
};

// If you want to test the performance of the FlatList component, you can use the following code:
// Now you can console log the item in the renderItem prop to see how many components are rendered.
//   const data = new Array(1000)
//   .fill(null)
//   .map((_item, index) => ({ id: String(index + 1), name: String(index + 1) }));

export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
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

  const handleToggleComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completedAtTimestamp: item.completedAtTimestamp
            ? undefined
            : Date.now(),
        };
      } else {
        return item;
      }
    });
    setShoppingList(newShoppingList);
  };

  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    setShoppingList(newShoppingList);
  };

  return (
    <FlatList
      data={shoppingList}
      renderItem={({ item }) => {
        return (
          <ShoppingListItem
            name={item.name}
            onDelete={() => handleDelete(item.id)}
            onToggleComplete={() => handleToggleComplete(item.id)}
            isCompleted={Boolean(item.completedAtTimestamp)}
          />
        );
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
      ListEmptyComponent={
        <View style={styles.emptyListComponent}>
          <Text style={styles.emptyListText}>Zaplanuj sobie zakupki</Text>
        </View>
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
  emptyListComponent: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 32,
  },
  emptyListText: {
    fontSize: 32,
  },
});
