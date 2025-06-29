import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  hydrate: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,

  login: async (user) => {
    await AsyncStorage.setItem("authUser", JSON.stringify(user));
    set({ user, isLoggedIn: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem("authUser");
    set({ user: null, isLoggedIn: false });
  },

  hydrate: async () => {
    const storedUser = await AsyncStorage.getItem("authUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      set({ user, isLoggedIn: true });
    }
  },
}));

export default useAuthStore;
