import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    setUser: (user) => set({ user }),

    login: (token, username, userId, role) => {
        const userData = { token, username, userId, role };
        localStorage.setItem('user', JSON.stringify(userData));
        set({ user: userData });
    },

    logout: () => {
        localStorage.removeItem('user');
        set({ user: null });
    }
}));