import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import IconButton from "../components/UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { ExpensesContext } from "../store/expenses-context";
import { deleteExpense, editExpense, storeExpense } from "../utils/http";
import { GlobalStyles } from "../constants/styles";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageExpense({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);
  const expenseId = route.params?.expenseId;
  const isUpdateExpense = !!expenseId;
  const defaultValues = expensesCtx.expenses.find((ex) => ex.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isUpdateExpense ? "Edit Expense" : "Add Expense",
    });
  }, [isUpdateExpense, navigation]);

  const handleSubmit = async (expenseData) => {
    setLoading(true);
    setError();
    try {
      if (isUpdateExpense) {
        await editExpense(expenseId, expenseData);
        expensesCtx.updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ id, ...expenseData });
      }
      navigation.goBack();
    } catch (e) {
      setError("Could not save data - Please try again later");
    }
    setLoading(false);
  };

  const handleDeleteItem = async () => {
    await deleteExpense(expenseId);
    expensesCtx.removeExpense(expenseId);
    navigation.goBack();
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error && !loading) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        expenseId={expenseId}
      />

      {isUpdateExpense && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            onPress={handleDeleteItem}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  deleteContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});
