import React, { useState } from "react";
import "./ExpenseForm.css";
import { toast } from "react-toastify";
import axios from "axios";

const ExpenseForm = (props) => {
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    date: "",
  });

  const inputChangeHandler = (event) => {
    const { value, name } = event.target;
    setExpenseData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (Object.values(expenseData).includes("")) {
      toast.error("All fields are required !");
      return;
    }
    try {
      const expenses = {
        ...expenseData,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      };
      //post form data
      const postExpensesUrl = process.env.REACT_APP_BASE_URL;
      const response = await axios.post(
        `${postExpensesUrl}/api/expenses`,
        expenses
      );
      if (response.status === 201) {
        props.onSaveExpenseData(expenses);
        toast.success(`${expenses.title} added successfully !`);
        //clear form inputs
        setExpenseData({
          title: "",
          amount: "",
          date: "",
        });
      } else {
        toast.error("An error occurred. Please try again!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={expenseData.title}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            name="amount"
            value={expenseData.amount}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2022-01-01"
            max="2023-12-31"
            name="date"
            value={expenseData.date}
            onChange={inputChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button className="btn" onClick={props.onClickCancel}>
          Cancel
        </button>
        <button className="btn" type="submit">
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
