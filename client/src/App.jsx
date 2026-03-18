import { useEffect, useState } from "react";
import ExpensePage from "./pages/Expense";
import { getRuntimeConfig } from "./config";

function App() {
  // const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const { API_BASE } = getRuntimeConfig();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

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

      <ExpensePage />
    </div>
  );
}

export default App;
