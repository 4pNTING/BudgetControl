import type { Demo } from '@/types';

export const ProductService = {
    getProducts() {
        return fetch('/demo/products.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    },

    getCurrency() {
        return fetch('/demo/data/currency.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d as Demo.Currency[]);
    }
};

export const getCustomersLarge = {
    getCustomersL() {
        return fetch('/demo/customers-large.json', {
            headers: { 'Cache-Control': 'no-cache' }
        })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Product[]);
    }
};