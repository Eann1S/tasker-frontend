import { JwtDto } from "@/lib/types";
import { create } from "zustand";

const useStore = create<Store>((set) => ({
  accessToken: undefined,
  refreshToken: undefined,
  setTokens: (jwtDto: JwtDto) =>
    set({ accessToken: jwtDto.accessToken, refreshToken: jwtDto.refreshToken }),
  logout: () => set({ accessToken: undefined, refreshToken: undefined }),
}));

export type Store = {
  accessToken?: string;
  refreshToken?: string;
  setTokens: (jwtDto: JwtDto) => void;
  logout: () => void;
};

export default useStore;
