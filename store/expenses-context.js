import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  removeExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload.reverse();
    case "ADD":
      return [{ ...action.payload }, ...state];
    case "REMOVE":
      const newExpenses = state.filter((exp) => exp.id !== action.payload);
      return newExpenses;
    case "UPDATE":
      const updateableIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateableItem = state[updateableIndex];
      const updatedItem = { ...updateableItem, ...action.payload.expenseData };
      const updatedExpenses = [...state];
      updatedExpenses[updateableIndex] = updatedItem;
      return updatedExpenses;
    default:
      return state;
  }
};

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const removeExpense = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id, expenseData } });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    removeExpense,
    updateExpense,
    setExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
