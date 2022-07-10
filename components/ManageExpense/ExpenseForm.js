import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../UI/Button";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";

export default function ExpenseForm({ onSubmit, defaultValues }) {
  const navigation = useNavigation();
  const [expenseData, setExpenseData] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const handleInputChange = (field, enteredValue) => {
    setExpenseData((currentData) => ({
      ...currentData,
      [field]: { value: enteredValue, isValid: true },
    }));
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = () => {
    const expense = {
      amount: +expenseData.amount.value,
      date: new Date(expenseData.date.value),
      description: expenseData.description.value.trim(),
    };
    const amountIsValid = !isNaN(expense.amount) && expense.amount >= 0;
    const dateIsValid = expense.date.toString() !== "Invalid Date";
    const descriptionIsValid = expense.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setExpenseData((curData) => ({
        amount: {
          value: curData.amount.value,
          isValid: amountIsValid,
        },
        date: {
          value: curData.date.value,
          isValid: dateIsValid,
        },
        description: {
          value: curData.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    onSubmit(expense);
  };

  const formIsInvalid =
    !expenseData.amount.isValid ||
    !expenseData.date.isValid ||
    !expenseData.description.isValid;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>

      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          invalid={!expenseData.amount.isValid}
          label="Amount"
          textInputConfig={{
            keyboardType: "number-pad",
            value: expenseData.amount.value,
            onChangeText: handleInputChange.bind(this, "amount"),
          }}
        />
        <Input
          style={styles.rowInput}
          invalid={!expenseData.date.isValid}
          label="Date"
          textInputConfig={{
            keyboardType: "number-pad",
            placeholder: "YYYY-MM-DD",
            value: expenseData.date.value,
            onChangeText: handleInputChange.bind(this, "date"),
          }}
        />
      </View>

      <Input
        label="Description"
        invalid={!expenseData.description.isValid}
        textInputConfig={{
          multiLine: true,
          value: expenseData.description.value,
          onChangeText: handleInputChange.bind(this, "description"),
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - Please check your entered data!
        </Text>
      )}

      <View style={styles.buttonsRow}>
        <Button mode="flat" style={styles.rowButton} onPress={handleCancel}>
          Cancel
        </Button>
        <Button style={styles.rowButton} onPress={handleConfirm}>
          {defaultValues ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary50,
    textAlign: "center",
    marginBottom: 16,
  },
  inputsRow: {
    flexDirection: "row",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    margin: 8,
  },
  buttonsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  rowButton: {
    flex: 1,
  },
});
