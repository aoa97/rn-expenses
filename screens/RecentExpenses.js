import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";

export default function RecentExpenses() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setLoading(true);
      try {
        const expensesData = await fetchExpenses();
        expensesCtx.setExpenses(expensesData);
      } catch (e) {
        setError("Could not fetch expenses");
      }
      setLoading(false);
    }
    getExpenses();
  }, [error, loading, expensesCtx]);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error && !loading) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}
