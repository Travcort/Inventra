import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    setUser: (user) => set({ user }),

    allUsers: [],

    fetchUsers: async () => {
        try {
            const response = await fetch('/api/users', {
                headers: {
                    "Authorization": `${ get().user?.token }`
                }
            });

            if(!response.ok) {
                const errorData = await response.json();
                return { success: errorData.success, message: errorData.message }
            }

            const data = await response.json();
            set({ allUsers: data.users });
            return { success: data.success, message: data.message }
        } 
        catch (error) {
            return { success: false, message: 'Server Error! Please try again later' }
        }
    },

    changeUserRole: async (userId, userRole) => {
        try {
            const response = await fetch(`/api/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    "Authorization": `${get().user?.token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ role: userRole })
            });

            if(!response.ok) {
                const errorData = await response.json();
                return { success: errorData.success, message: errorData.message }
            }
            const data = await response.json();
            const newUsers = get().allUsers.map(user => user.userId === data.users?.userId ? data.users : user)
            set({ allUsers: newUsers });
            return  { success: true, message: data.message };
        } 
        catch (error) {
            return { success: false, message: 'Server Error! Please try again later' }
        }
    },

    deleteUser: async (userId) => {
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `${get().user?.token}`
                }
            })

            if(!response.ok) {
                const errorData = await response.json();
                return { success: errorData.success, message: errorData.message }
            }

            const data = await response.json();
            const newUsers = get().allUsers.filter(user => user.userId !== userId);
            set({ allUsers: newUsers });
            return  { success: true, message: data.message };
        } 
        catch (error) {
            return { success: false, message: 'Server Error! Please try again later' }
        }
    },

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