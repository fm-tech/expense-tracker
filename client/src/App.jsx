import { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import Auth from "./Auth";
import ExpensePage from "./pages/Expense";
import { getRuntimeConfig } from "./config";
import { useUserStore } from "./stores/userStore";

function App() {
  // const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [location, navigate] = useLocation();
  const user = useUserStore((state) => state.user);

  const { API_BASE } = getRuntimeConfig();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Redirect to login if not authenticated and trying to access expenses
  useEffect(() => {
    if (!user && location !== "/login") {
      navigate("/login");
    }
  }, [user, location, navigate]);

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

      <Switch>
        <Route path="/login">
          <Auth />
        </Route>
        <Route path="/expenses" default>
          <ExpensePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
