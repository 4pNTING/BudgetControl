import type { Demo } from '@/types';

export const CurrencyService = {
    getCurrencies() {
        return fetch('../demo/currencies.json', { 
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Currency[])
            .catch((error) => {
                console.error('Error fetching currencies:', error);
                return [];
            });
    },

    getCurrencyById(id: string) {
        return fetch(`../demo/currency-${id}.json`, {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Currency)
            .catch((error) => {
                console.error('Error fetching currency:', error);
                return null;
            });
    },

    updateCurrency(currency: Demo.Currency) {
        return fetch(`../data/currency-${currency.id}.json`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(currency)
        })
            .then((res) => res.json())
            .catch((error) => {
                console.error('Error updating currency:', error);
                return null;
            });
    },

    deleteCurrency(id: string) {
        return fetch(`../data/currency-${id}.json`, {
            method: 'DELETE',
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.ok)
            .catch((error) => {
                console.error('Error deleting currency:', error);
                return false;
            });
    }
};