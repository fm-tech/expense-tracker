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
  const setUser = useUserStore((state) => state.setUser);
  const [isInitialized, setIsInitialized] = useState(false);

  const { API_BASE } = getRuntimeConfig();

  useEffect(() => {
    // Handle dark mode
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Check for stored user on app initialization
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Restoring user from localStorage:", parsedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem("user");
      }
    }
    setIsInitialized(true);
  }, [setUser]);

  useEffect(() => {
    // Redirect to login if not authenticated and trying to access expenses
    if (isInitialized && !user && location !== "/login") {
      navigate("/login");
    }
  }, [isInitialized, user, location, navigate]);

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
