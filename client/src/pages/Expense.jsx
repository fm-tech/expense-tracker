import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";
import { getRuntimeConfig } from "../config";

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { API_BASE } = getRuntimeConfig();

  const fetchExpenses = async () => {
    try {
      const res = await fetch(`${API_BASE}/transactions`);
      const response = await res.json();
      if (response.success) {
        setExpenses(response.payload);
      } else {
        setExpenses([]);
      }
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleNewExpense = (exp) => setExpenses((prev) => [exp, ...prev]);

  const handleDelete = (id) =>
    setExpenses((prev) => prev.filter((e) => e.id !== id));

  const handleEdit = (updated) =>
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));

  if (loading) {
    return <div>Loading expenses...</div>;
  }

  return (
    <>
      <ExpenseForm onSubmit={handleNewExpense} />
      {expenses && expenses.length > 0 && (
        <>
          <ExpenseSummary expenses={expenses} />
          <ExpenseList
            expenses={expenses}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </>
      )}
    </>
  );
}
