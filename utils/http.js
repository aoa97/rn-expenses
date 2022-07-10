import axios from "axios";

const BACKEND_URL = "https://rn-playground-78251-default-rtdb.firebaseio.com/";

export const storeExpense = async (expenseData) => {
  const res = await axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
  return res.data.name; // id
};

export const fetchExpenses = async () => {
  const res = await axios.get(`${BACKEND_URL}/expenses.json`);
  const expenses = [];

  for (const key in res.data) {
    const expenseObj = {
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

export const editExpense = async (id, expenseData) => {
  await axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
};

export const deleteExpense = async (id) => {
  await axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
};
