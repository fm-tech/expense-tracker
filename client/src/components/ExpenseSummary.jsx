import React from "react";

const ExpenseSummary = ({ expenses }) => {
  // Calculate total expenses
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6">
      <h2 className="text-lg font-semibold">Expense Summary</h2>
      <p className="font-medium">
        Total: <span className="font-bold">${totalExpenses.toFixed(2)}</span>
      </p>
    </div>
  );
};

export default ExpenseSummary;
