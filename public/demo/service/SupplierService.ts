import type { Demo } from '@/types';

export const SupplierService = {
    getSuppliers() {
        return fetch('../demo/suppliers.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d as Demo.Supplier[]);
    },

    deleteSupplier(id: number) {
        // This is a placeholder for the delete operation
        // In a real application, you would send a DELETE request to the backend
        return Promise.resolve(true);
    }
};