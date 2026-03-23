import { create } from "zustand";

//

export const useUserStore = create((set) => ({
  // Example user state structure {token: "", user: {}}
  user: null,
  setUser: (user) => set({ user }),
}));
