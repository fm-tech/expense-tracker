import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpensePage from "./pages/Expense";
import { getRuntimeConfig } from "./config";

function App() {
  // const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const { API_BASE } = getRuntimeConfig();

  // const fetchExpenses = async () => {
  //   // // PAYLOAD EXAMPLE
  //   // {
  //   //     "success": true,
  //   //     "payload": [
  //   //         {
  //   //             "amount": 111,
  //   //             "collectionId": "pbc_1034379284",
  //   //             "collectionName": "transaction",
  //   //             "created": "2026-03-17 18:10:08.485Z",
  //   //             "credit": false,
  //   //             "description": "test",
  //   //             "id": "kxpcs5brj3n3ux0",
  //   //             "updated": "2026-03-18 07:12:23.444Z"
  //   //         }
  //   //     ]
  //   // }
  //   const res = await fetch(`${API_BASE}/transactions`);
  //   const response = await res.json();
  //   if (response.success) {
  //     setExpenses(response.payload);
  //   }
  // };

  // useEffect(() => {
  //   fetchExpenses();
  // }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // const handleNewExpense = (exp) => {
  //   setExpenses((prev) => [exp, ...prev]);
  // };

  // const handleDelete = (id) => {
  //   setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  // };

  // const handleEdit = (updated) => {
  //   setExpenses((prev) =>
  //     prev.map((exp) => (exp.id === updated.id ? updated : exp)),
  //   );
  // };

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
      {/* <ExpenseForm onSubmit={handleNewExpense} />
      {expenses && (
        <>
          <ExpenseSummary expenses={expenses} />
          <ExpenseList
            expenses={expenses}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </>
      )} */}
    </div>
  );
}

export default App;
