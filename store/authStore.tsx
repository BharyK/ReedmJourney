import { create } from "zustand";

interface UserState {
  userName: string;
  email: string;
  isAuthenticated: boolean;
  setUser: (userName: string, email: string) => void;
  clearUser: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const authStore = create<UserState>((set) => ({
  userName: "",
  email: "",
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setUser: (userName, email) => set({ userName, email }),
  clearUser: () => set({ userName: "", email: "" }),
}));
