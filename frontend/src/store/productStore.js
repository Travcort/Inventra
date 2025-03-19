import { create } from 'zustand';
import { useAuthStore } from "./authStore";

export const useProductStore = create((set) => ({
    isLoading: true,
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        const { user } = useAuthStore.getState();
        if ( !newProduct.name || !newProduct.description || !newProduct.price || !newProduct.image ) {
            return { success: false, message: "Please Input all the fields!" };
        }

        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${user?.token}`
            },
            body: JSON.stringify(newProduct)
        });

        const data = await response.json();
        set((state) => ({ products: [...state.products, data.products] }));
        return  { success: true, message: "Product Created Successfully"};
    },
    fetchProducts: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch("/api/products");
            const data = await response.json();
            set({products: data.products});
        } catch (error) {
            console.error(error);
        }
        finally {
            set({ isLoading: false });
        }
    },
    deleteProduct: async (pid) => {
        const { user } = useAuthStore.getState();
        const response = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
            headers: {
                "Authorization": `${user?.token}`
            }
        });
        const data = await response.json();
        if (!data.success) return { success: false, message: data.message };

        set(state => ({products: state.products.filter(product => product._id !== pid)}) );
        return { success: true, message: data.message };
    },
    updateProduct: async (pid, updateProduct) => {
        const { user } = useAuthStore.getState();
        const response = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${user?.token}`
            },
            body: JSON.stringify(updateProduct)
        });
        const data = await response.json();
        if (!data.success) return { success: false, message: data.message };
        set(state => ({
            products: state.products.map(product => (product._id === pid ? data.products : product)),    
        }));
        return { success: true, message: data.message };
    },
    updateStock: async (pid, updateProduct) => {
        const { user } = useAuthStore.getState();
        const response = await fetch(`/api/products/${pid}/stock`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${user?.token}`
            },
            body: JSON.stringify(updateProduct)
        });
        const data = await response.json();
        if (!data.success) return { success: false, message: data.message };
        set(state => ({
            products: state.products.map(product => (product._id === pid ? data.products : product)),    
        }));
        return { success: true, message: data.message };
    }
}))