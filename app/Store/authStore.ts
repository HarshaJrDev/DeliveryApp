import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  hydrate: () => Promise<void>;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,

  hydrate: async () => {
    const storedUser = await AsyncStorage.getItem('authUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      set({ user, isLoggedIn: true });
    }
  },

  login: async (user: User) => {
    await AsyncStorage.setItem('authUser', JSON.stringify(user));
    set({ user, isLoggedIn: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem('authUser');
    set({ user: null, isLoggedIn: false });
  },
}));

export default useAuthStore;
