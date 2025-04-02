import { create } from 'zustand';
import { useAuthStore } from "./authStore";

export const useProductStore = create((set) => ({
    isLoading: true,
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        const user = useAuthStore.getState().user;
        if ( !newProduct.name || !newProduct.description || !newProduct.price || !newProduct.image ) {
            return { success: false, message: "Please input all the fields!" };
        }

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${user?.token}`
                },
                body: JSON.stringify(newProduct)
            });
    
            if(!response.ok) {
                const errorData = await response.json();
                return { success: errorData.success, message: errorData.message }
            };
    
            const data = await response.json();
            set((state) => ({ products: [...state.products, data.products] }));
            return  { success: true, message: "Product Created Successfully"};
        } 
        catch (error) {
            return { success: false, message: "Internal Server Error! Please try again later"}
        }
    },
    fetchProducts: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch("/api/products");

            if(!response.ok) {
                const errorData = await response.json();
                return { success: errorData.success, message: errorData.message }
            };

            const data = await response.json();
            set({products: data.products});
        } 
        catch (error) {
            return { success: false, message: "Internal Server Error! Please try again later"}
        }
        finally {
            set({ isLoading: false });
        }
    },
    deleteProduct: async (pid) => {
        const { user } = useAuthStore.getState();
        try {
            const response = await fetch(`/api/products/${pid}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `${user?.token}`
                }
            });
    
            if(!response.ok) {
                const errorData = await response.json();
                return { success: errorData.success, message: errorData.message }
            };
    
            const data = await response.json();
            set(state => ({products: state.products.filter(product => product._id !== pid)}) );
            return { success: true, message: data.message };
        } 
        catch (error) {
            return { success: false, message: "Internal Server Error! Please try again later"}
        }
    },
    updateProduct: async (pid, updateProduct) => {
        const { user } = useAuthStore.getState();
        try {
            const response = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${user?.token}`
                },
                body: JSON.stringify(updateProduct)
            });
    
            if(!response.ok) {
                const errorData = await response.json();
                return { success: errorData.success, message: errorData.message }
            };
    
            const data = await response.json();
            set(state => ({
                products: state.products.map(product => (product._id === pid ? data.products : product)),    
            }));
            return { success: true, message: data.message };
        } 
        catch (error) {
            return { success: false, message: "Internal Server Error! Please try again later"}
        }
    },
    updateStock: async (pid, updateProduct) => {
        const { user } = useAuthStore.getState();
        try {
            const response = await fetch(`/api/products/${pid}/stock`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${user?.token}`
                },
                body: JSON.stringify(updateProduct)
            });
    
            if(!response.ok) {
                const errorData = await response.json();
                return { success: errorData.success, message: errorData.message }
            };
    
            const data = await response.json();
            set(state => ({
                products: state.products.map(product => (product._id === pid ? data.products : product)),    
            }));
            return { success: true, message: data.message };
        } 
        catch (error) {
            return { success: false, message: "Internal Server Error! Please try again later"}
        }
    }
}))