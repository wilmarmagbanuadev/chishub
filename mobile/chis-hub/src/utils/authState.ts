import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  hasHydrated: boolean;
  pushToken: string | null;
  userInfo: string | null; // Added missing type definition
  login: (token: string | null, user: string | null) => void;
  logout: () => void;
  setPushToken: (token: string | null) => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthState = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      hasHydrated: false,
      pushToken: null,
      userInfo: null,

      login: (token, user) => {
        set({
          isLoggedIn: true,
          pushToken: token,
          userInfo: user,
        });
      },

      logout: () => {
        set({
          isLoggedIn: false,
          pushToken: null,
          userInfo: null, // Reset user info on logout
        });
      },

      setPushToken: (token) => {
        set({ pushToken: token });
      },

      setHasHydrated: (value) => {
        set({ hasHydrated: value });
      },
    }),
    {
      name: "auth-storage",

      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        pushToken: state.pushToken,
        userInfo: state.userInfo, // Persists user info across app restarts
      }),

      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("Auth hydration failed:", error);
          }

          state?.setHasHydrated(true);
        };
      },
    }
  )
);