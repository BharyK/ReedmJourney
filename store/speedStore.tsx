import { create } from "zustand";

interface UserState {
  speed: number;
  reedemPoints: number;
  setSpeedStore: (speed: number) => void;
  setReedemPoints: (reedemPoints: number) => void;
}

export const speedStore = create<UserState>((set) => ({
  speed: 0,
  reedemPoints: 0,
  setSpeedStore: (speed: number) => set({ speed }),
  setReedemPoints: (reedemPoints: number) => set({ reedemPoints }),
}));
