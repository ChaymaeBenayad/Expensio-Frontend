import React, { useState } from "react";
import Pagination from "../Pagination/pagination";
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {
  const [currentPage, setCurrentPage] = useState(0);

  const expensesPerPage = 5;
  const firstExpenseIndex = currentPage * expensesPerPage;
  const lastExpenseIndex = firstExpenseIndex + expensesPerPage;

  const currentExpeses = props.expenses.slice(
    firstExpenseIndex,
    lastExpenseIndex
  );

  const expensesElements = currentExpeses.map((expenseItem) => {
    return (
      <ExpenseItem
        key={expenseItem._id}
        id={expenseItem._id}
        title={expenseItem.title}
        amount={expenseItem.amount}
        date={expenseItem.date}
      />
    );
  });
  if (props.expenses.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }
  return (
    <>
      <ul className="expenses-list">{expensesElements}</ul>
      <Pagination
        totalExpenses={props.expenses.length}
        expensesPerPage={expensesPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default ExpensesList;
