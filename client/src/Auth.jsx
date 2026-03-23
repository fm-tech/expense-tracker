import { useState } from "react";
import { useLocation } from "wouter";
import { useUserStore } from "./stores/userStore";
import { getRuntimeConfig } from "./config";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, navigate] = useLocation();
  const setUser = useUserStore((state) => state.setUser);

  const { API_BASE } = getRuntimeConfig();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple mock auth – replace with real API call
    try {
      const res = await fetch(`${API_BASE}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      setUser({ token: data.token, user: data.user }); // Set user in store
      navigate("/expenses");
    } catch (err) {
      console.error(err);
      alert("Login failed – check console");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Auth;
