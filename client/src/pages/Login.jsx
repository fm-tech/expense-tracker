import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = AuthContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // redirect to intended page or home
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <form onSubmit={handleSubmit} className="p-6 rounded shadow-md bg-white dark:bg-gray-800 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Login</h2>
        {error && (
          <div className="mb-4 text-red-600" role="alert">
            {error}
          </div>
        )}
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 mb-4 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 mb-4 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Sign In
        </button>
      </form>
    </div>
  );
};
