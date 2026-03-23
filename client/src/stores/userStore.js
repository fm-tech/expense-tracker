import { create } from "zustand";
import Cookies from "js-cookie";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
    // Save to cookie
    if (user) {
      Cookies.set("user", JSON.stringify(user), { expires: 7 }); // 7 days expiry
    } else {
      Cookies.remove("user");
    }
  },
  clearUser: () => {
    set({ user: null });
    Cookies.remove("user");
  },
}));

// Initialize from cookie on startup
const storedUser = Cookies.get("user");
if (storedUser) {
  try {
    const user = JSON.parse(storedUser);
    // We could optionally set it in the store here, but Zustand's initial state is handled by the store itself
  } catch (e) {
    console.error("Failed to parse stored user", e);
    Cookies.remove("user");
  }
}
