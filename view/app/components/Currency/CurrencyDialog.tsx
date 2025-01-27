'use client'
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { LuSave } from "react-icons/lu";

const CurrencyDialog = ({ visible, onHide, currency, setCurrency, onSave }) => {
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (visible) {
            setCurrency({ code: '', name: '', rate: '' });
            setSubmitted(false);
        }
    }, [visible, setCurrency]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrency((prevCurrency) => ({
            ...prevCurrency,
            [name]: value,
        }));
    };

    const handleSave = () => {
        setSubmitted(true);
        if (currency.code && currency.name && currency.rate) {
            onSave();
            onHide();
        }
    };

    return (
        <Dialog header="Create Currency" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="code">Currency Code</label>
                    <InputText 
                        id="code" 
                        name="code" 
                        value={currency.code || ''} 
                        onChange={handleInputChange} 
                        className={classNames({ 'p-invalid': submitted && !currency.code })}
                    />
                    {submitted && !currency.code && <small className="p-error">Please enter the currency code</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="name">Currency Name</label>
                    <InputText 
                        id="name" 
                        name="name" 
                        value={currency.name || ''} 
                        onChange={handleInputChange} 
                        className={classNames({ 'p-invalid': submitted && !currency.name })}
                    />
                    {submitted && !currency.name && <small className="p-error">Please enter the currency name</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="rate">Exchange Rate</label>
                    <InputText 
                        id="rate" 
                        name="rate" 
                        value={currency.rate || ''} 
                        onChange={handleInputChange} 
                        className={classNames({ 'p-invalid': submitted && !currency.rate })}
                    />
                    {submitted && !currency.rate && <small className="p-error">Please enter the exchange rate</small>}
                </div>
                <div className="p-field" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <Button label="Save" icon={<LuSave />} onClick={handleSave} className="p-button-sm" style={{ width: '100px' }} />
                    <Button label="Cancel" icon="pi pi-times" onClick={onHide} className="p-button-text p-button-secondary p-button-sm" style={{ width: '100px' }} />
                </div>
            </div>
        </Dialog>
    );
};

export default CurrencyDialog;