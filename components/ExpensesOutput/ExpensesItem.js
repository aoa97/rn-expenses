import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { getFormatedDate } from "../../utils/date";

export default function ExpensesItem({ id, description, amount, date }) {
  const navigation = useNavigation();

  const handleItemPress = () => {
    navigation.navigate("ManageExpense", { expenseId: id });
  };

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={handleItemPress}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.date}>{getFormatedDate(date)}</Text>
        </View>

        <Text style={styles.amount}>${amount}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  textContainer: {},
  description: {
    color: GlobalStyles.colors.primary50,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    color: GlobalStyles.colors.primary50,
  },
  amount: {
    backgroundColor: GlobalStyles.colors.primary50,
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: GlobalStyles.box.radius,
    minWidth: 85,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
