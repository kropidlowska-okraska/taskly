import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { countddownStorageKey, PersistedCountdownState } from ".";
import { getFromStorage } from "../../utils/storage";
import { format } from "date-fns";
import { theme } from "../../theme";

const fullDateFormat = "LLL d yyyy, h:mm aaa";

const HistoryScreen = () => {
  const [conuntdownState, setCountdownState] =
    useState<PersistedCountdownState>();

  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(countddownStorageKey);
      setCountdownState(value);
    };

    init();
  }, []);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      data={conuntdownState?.completedAtTimestamps}
      ListEmptyComponent={() => (
        <View style={styles.listEmptyContainer}>
          <Text style={styles.listEmptyText}>No history yet</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>
            {format(item, fullDateFormat)}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    marginTop: 8,
    flex: 1,
  },
  listItem: {
    backgroundColor: theme.colorLightGrey,
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 12,
    borderRadius: 6,
  },
  listItemText: {
    fontSize: 16,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  listEmptyText: {
    fontSize: 24,
  },
});

export default HistoryScreen;
