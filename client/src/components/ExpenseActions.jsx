import { useState } from "react";
import { getRuntimeConfig } from "../config";

export default function ExpenseActions({ expense, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);

  const { API_BASE } = getRuntimeConfig();

  const saveEdit = async () => {
    const res = await fetch(`${API_BASE}/expenses/${expense.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, amount: parseFloat(amount) }),
    });

    const updated = await res.json();
    onEdit(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    await fetch(`${API_BASE}/expenses/${expense.id}`, { method: "DELETE" });
    onDelete(expense.id);
  };

  // Card wrapper + flex layout:
  const wrapperClasses =
    "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm " +
    "sm:flex sm:justify-between sm:items-center";

  if (editing) {
    return (
      <div className={wrapperClasses + " space-y-3 sm:space-y-0"}>
        {/* Inputs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 w-full">
          <input
            className="flex-grow px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-24 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1 bg-blue-600 dark:bg-blue-500 text-white rounded-lg shadow"
            onClick={saveEdit}
          >
            Save
          </button>
          <button
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      {/* Display */}
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          {expense.title}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          ${expense.amount.toFixed(2)}
        </span>
      </div>
      {/* Edit/Delete buttons */}
      <div className="flex gap-2 mt-3 sm:mt-0">
        <button
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 bg-red-500 dark:bg-red-600 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
