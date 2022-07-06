import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpensesItem from "./ExpensesItem";

const renderItem = ({ item }) => (
  <ExpensesItem
    id={item.id}
    description={item.description}
    amount={item.amount}
    date={item.date}
  />
);

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}
