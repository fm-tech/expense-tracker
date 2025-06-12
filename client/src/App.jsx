import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import { getRuntimeConfig } from "./config";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const { API_BASE } = getRuntimeConfig();

  const fetchExpenses = async () => {
    const res = await fetch(`${API_BASE}/expenses`);
    const data = await res.json();
    setExpenses(data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleNewExpense = (exp) => {
    setExpenses((prev) => [exp, ...prev]);
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleEdit = (updated) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === updated.id ? updated : exp))
    );
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100 dark:bg-black text-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Expense Tracker</h1>
        <button
          className="text-sm px-3 py-1 border border-gray-400 rounded"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>

      <ExpenseForm onSubmit={handleNewExpense} />
      <ExpenseSummary expenses={expenses} />
      <ExpenseList
        expenses={expenses}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
