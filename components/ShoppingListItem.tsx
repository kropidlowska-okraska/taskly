import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Pressable,
  View,
} from "react-native";
import { theme } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

type Props = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
};

export function ShoppingListItem({
  name,
  isCompleted,
  onDelete,
  onToggleComplete,
}: Props) {
  const handleDelete = () => {
    Alert.alert("Delete", `Are you sure you want to delete ${name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: onDelete,
        style: "destructive",
      },
    ]);
  };

  return (
    <Pressable
      style={[styles.container, isCompleted && styles.completedContainer]}
      onPress={onToggleComplete}
    >
      <View style={styles.itemContainer}>
        <Feather
          name={isCompleted ? "check-square" : "square"}
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorCerulean}
        />
        <Text
          numberOfLines={2}
          style={[styles.itemText, isCompleted && styles.completedText]}
        >
          {name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleDelete}
        accessibilityRole="button"
        activeOpacity={0.8}
      >
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCerulean,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
  },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  itemText: { fontSize: 18, fontWeight: 200, flex: 1 },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
    color: theme.colorGrey,
  },
});
