import axios from "../utils/axios";
import { create } from "zustand";

interface User {
  id: string;
  email: string;
}

interface ValidationError {
  fields?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
}

interface UseUserStore {
  user: User | null;
  loading: boolean;
  checkingAuth: boolean;
  signup: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<null | ValidationError>;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<null | ValidationError>;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<UseUserStore>((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/signup", {
        email,
        password,
      });

      console.log(res);

      if (res.data.success === true) {
        set({
          user: res.data.user,
        });
        return null;
      } else {
        return {
          message: res.data.message ?? "Registration failed",
        };
      }
    } catch (err: any) {
      const errorData = err.response?.data;

      return {
        fields: errorData?.error?.fields,
        message: errorData?.message ?? "An unexpected error occured",
      };
    } finally {
      set({ loading: false });
    }
  },
  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", { email, password });

      if (res.data.success) {
        set({ user: res.data.user });
        return null;
      } else {
        return { message: res.data.message ?? "Login failed" };
      }
    } catch (err: any) {
      const errorData = err.response?.data;
      return {
        fields: errorData?.error?.fields,
        message: errorData?.message ?? "An unexpected error occured",
      };
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });

    try {
      const res = await axios.get("/auth/me");
      if (res.data.success && res.data.user) {
        set({ user: res.data.user });
      } else {
        set({ user: null });
      }
    } catch (err: any) {
      set({ user: null });
    } finally {
      set({ checkingAuth: false });
    }
  },
}));

export default useAuthStore;
