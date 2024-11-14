import { create } from "zustand";

const useAuthStore = create<AuthStore>((set) => ({
  accessToken: undefined,
  setToken: (token: string) =>
    set({ accessToken: token }),
  logout: () => set({ accessToken: undefined }),
}));

export type AuthStore = {
  accessToken?: string;
  setToken: (token: string) => void;
  logout: () => void;
};

export default useAuthStore;
