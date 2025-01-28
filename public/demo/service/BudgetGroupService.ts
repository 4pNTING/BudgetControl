import type { Demo } from '@/types';

export const BudgetGroupService = {
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
    }
};