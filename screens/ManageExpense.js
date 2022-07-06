import { useLayoutEffect } from "react";
import { Text } from "react-native";

export default function ManageExpense({ route, navigation }) {
  const expenseId = route.params?.expenseId;

  useLayoutEffect(() => {
    if (expenseId) {
      navigation.setOptions({
        title: expenseId ? "Update Expense" : "Add Expense",
      });
    }
  }, []);

  return <Text>ManageExpense</Text>;
}
