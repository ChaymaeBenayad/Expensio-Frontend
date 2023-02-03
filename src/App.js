import { useEffect, useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import axios from "axios";

const App = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const getExpensesUrl = process.env.REACT_APP_BASE_URL;
        const res = await axios.get(`${getExpensesUrl}/api/expenses`);
        const expensesData = res.data.map((expense) => ({
          ...expense,
          date: new Date(expense.date),
        }));
        setExpenses(expensesData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getExpenses();
  }, []);

  const addNewExpense = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div>
      <NewExpense onAddExpense={addNewExpense} />
      <Expenses expenses={expenses} />
    </div>
  );
};

export default App;
