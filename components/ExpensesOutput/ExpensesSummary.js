import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function ExpensesSummary({ expensesPeriod, expenses }) {
  const calcTotalExpenses = () => {
    return expenses.reduce((acc, x) => acc + x.amount, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{expensesPeriod}</Text>
      <Text style={styles.total}>${calcTotalExpenses()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: GlobalStyles.box.radius,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  period: {
    color: GlobalStyles.colors.primary400,
    fontSize: 16
  },
  total: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    fontSize: 16,
  },
});
