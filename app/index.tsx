import { StyleSheet, TextInput, FlatList, View, Text } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

const storageKey = "shopping-list";

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
};

// If you want to test the performance of the FlatList component, you can use the following code:
// Now you can console log the item in the renderItem prop to see how many components are rendered.
//   const data = new Array(1000)
//   .fill(null)
//   .map((_item, index) => ({ id: String(index + 1), name: String(index + 1) }));

export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
  const [value, setValue] = useState(" ");

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey);

      if (data) {
        setShoppingList(data);
      }
    };

    fetchInitial();
  }, []);

  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        ...shoppingList,
        {
          id: new Date().toTimeString(),
          name: value,
          lastUpdatedTimestamp: Date.now(),
        },
      ];

      setShoppingList(newShoppingList);
      saveToStorage(storageKey, newShoppingList);
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
          lastUpdatedTimestamp: Date.now(),
        };
      } else {
        return item;
      }
    });
    setShoppingList(newShoppingList);
    saveToStorage(storageKey, newShoppingList);
  };

  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    setShoppingList(newShoppingList);
    saveToStorage(storageKey, newShoppingList);
  };

  function orderShoppingList(shoppingList: ShoppingListItemType[]) {
    return shoppingList.sort((item1, item2) => {
      if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return item2.completedAtTimestamp - item1.completedAtTimestamp;
      }

      if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return 1;
      }

      if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return -1;
      }

      if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
      }

      return 0;
    });
  }

  return (
    <FlatList
      data={orderShoppingList(shoppingList)}
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
