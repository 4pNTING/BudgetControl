import type { Demo } from '@/types';

export const DemoService = {


    getProducts() {
        return fetch('/demo/products.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },

    getPr() {
        return fetch('/demo/pr.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as any[]);
    },

    getPrItems() {
        return fetch('/demo/pr-items.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as any[]);
    },

    getPc() {
        return fetch('/demo/pc.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as any[]);
    },

    getPo() {
        return fetch('/demo/po.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as any[]);
    },

    getPayments() {
        return fetch('/demo/pm.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as any[]);
    },

    getPettyCash() {
        return fetch('/demo/ptc.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as any[]);
    },

    getBudgets() {
        return fetch('/demo/budgets.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as any[]);
    },

    getBudgetCode() {
        return fetch('/demo/budget-code.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as any[]);
    },

    getUnitItem() {
        return fetch('/demo/unit-item.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as any[]);
    },
    // Budget Group
    getBudgetGroups() {
        console.log('Fetching budget groups...');
        return fetch('/demo/budgetgroup.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
        .then((res) => {
            console.log('Response status:', res.status);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((d) => {
            console.log('Fetched data:', d);
            return d.data as Demo.BudgetGroup[];
        })
        .catch((error) => {
            console.error('Error fetching budget groups:', error);
            return [];
        });
    },

    getGroupData() {
        console.log('Fetching group data...');
        return fetch('/demo/budget-code.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
        .then((res) => {
            console.log('Response status:', res.status);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((d) => {
            console.log('Fetched group data:', d);
            if (!Array.isArray(d.data)) {
                throw new Error('Expected an array in the response data');
            }
            return d.data;
        })
        .catch((error) => {
            console.error('Error fetching group data:', error);
            return [];
        });
    },
  //getSuppliers
     getSuppliers() {
        return fetch('../demo/suppliers.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d as Demo.Supplier[]);
    },

   
};
