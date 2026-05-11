import React, { createContext, useState, useEffect } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState('INR');
    const [rates, setRates] = useState({ USD: 0.012, EUR: 0.011, INR: 1 });

    // In real-world, you'd fetch this from an API like exchange-rate-api.com
    // For now, these are stable conversion rates
    const symbols = { INR: '₹', USD: '$', EUR: '€' };

    const formatPrice = (amount) => {
        const converted = (amount * rates[currency]).toFixed(0);
        return `${symbols[currency]}${Number(converted).toLocaleString('en-IN')}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, symbols }}>
            {children}
        </CurrencyContext.Provider>
    );
};