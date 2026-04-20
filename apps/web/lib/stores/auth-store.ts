import { create } from "zustand";
import type { User } from "@njnc/types";
import { api } from "../api-client";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  setUser: (user: User | null) => void;
  initialize: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  country?: string;
  institution?: string;
  specialty?: string;
  designation?: string;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const result = await api.post<{ user: User; accessToken: string }>(
      "/api/auth/login",
      { email, password },
    );
    set({
      user: result.user,
      accessToken: result.accessToken,
      isAuthenticated: true,
    });
  },

  register: async (data: RegisterData) => {
    const result = await api.post<{ user: User; accessToken: string }>(
      "/api/auth/register",
      data,
    );
    set({
      user: result.user,
      accessToken: result.accessToken,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    try {
      const token = get().accessToken;
      if (token) {
        await api.post("/api/auth/logout", {}, token);
      }
    } catch {
      // Ignore errors on logout
    }
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },

  refreshToken: async () => {
    try {
      const result = await api.post<{ user: User; accessToken: string }>(
        "/api/auth/refresh",
        {},
      );
      set({
        user: result.user,
        accessToken: result.accessToken,
        isAuthenticated: true,
      });
    } catch {
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },

  initialize: async () => {
    set({ isLoading: true });
    try {
      // Try to refresh the token (uses httpOnly cookie)
      await get().refreshToken();
    } catch {
      // Not authenticated
    } finally {
      set({ isLoading: false });
    }
  },
}));
