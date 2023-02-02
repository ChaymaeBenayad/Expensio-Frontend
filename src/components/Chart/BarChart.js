import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Expenses Statistics",
      },
    },
  };
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const expenses = props.expensesData.map((expense) => {
    return {
      ...expense,
      date: expense.date.getMonth(),
    };
  });

  const sumPerMonth = expenses.reduce((accumulator, currentAmount) => {
    accumulator[currentAmount.date] =
      accumulator[currentAmount.date] + currentAmount.amount ||
      currentAmount.amount; // increment amount or initialize to currentAmount.
    return accumulator;
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses Total",
        data: sumPerMonth,
        backgroundColor: "#F2DF3A",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
