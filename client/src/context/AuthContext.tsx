import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// Types for clarity – adjust if your backend returns different fields.
type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // On mount, try to hydrate from localStorage (or cookie if you prefer)
  useEffect(() => {
    const stored = localStorage.getItem("auth_token");
    if (stored) {
      setToken(stored);
      fetchUser(stored);
    }
  }, []);

  const fetchUser = async (jwt: string) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (!res.ok) throw new Error("Unauthenticated");
      const data = await res.json();
      setUser(data.user);
    } catch {
      // Token invalid – clear
      localStorage.removeItem("auth_token");
      setToken(null);
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    localStorage.setItem("auth_token", data.token);
    setToken(data.token);
    setUser(data.user);
    navigate(0); // refresh route to trigger protected routes
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
