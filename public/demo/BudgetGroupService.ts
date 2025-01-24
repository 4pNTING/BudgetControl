import type { Demo } from '@/types';

export const BudgetGroupService = {
    getBudgetGroups() {
        return fetch('../demo/budgetgroup.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as Demo.BudgetGroup[]);
    }
};