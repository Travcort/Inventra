import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    setUser: (user) => set({ user }),

    login: (token, username, role) => {
        const userData = { token, username, role };
        localStorage.setItem('user', JSON.stringify(userData));
        set({ user: userData });
    },

    logout: () => {
        localStorage.removeItem('user');
        set({ user: null });
    }
}));