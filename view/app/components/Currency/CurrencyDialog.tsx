'use client'
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { LuSave } from "react-icons/lu";
import { FaMoneyBillWave } from "react-icons/fa"; // Importing the icon for the header

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
        <Dialog header={<><FaMoneyBillWave style={{ marginRight: '10px' }} />ສ້າງສະກຸນເງິນ</>} visible={visible} style={{ width: '40vw', height: 'auto' }} onHide={onHide}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="code">ລະຫັດສະກຸນເງິນ</label>
                    <InputText 
                        id="code" 
                        name="code" 
                        value={currency.code || ''} 
                        onChange={handleInputChange} 
                        className={classNames({ 'p-invalid': submitted && !currency.code })}
                    />
                    {submitted && !currency.code && <small className="p-error">ກະລຸນາປ້ອນລະຫັດສະກຸນເງິນ</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="name">ຊື່ສະກຸນເງິນ</label>
                    <InputText 
                        id="name" 
                        name="name" 
                        value={currency.name || ''} 
                        onChange={handleInputChange} 
                        className={classNames({ 'p-invalid': submitted && !currency.name })}
                    />
                    {submitted && !currency.name && <small className="p-error">ກະລຸນາປ້ອນຊື່ສະກຸນເງິນ</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="rate">ອັດຕາແລກປ່ຽນ</label>
                    <InputText 
                        id="rate" 
                        name="rate" 
                        value={currency.rate || ''} 
                        onChange={handleInputChange} 
                        className={classNames({ 'p-invalid': submitted && !currency.rate })}
                    />
                    {submitted && !currency.rate && <small className="p-error">ກະລຸນາປ້ອນອັດຕາແລກປ່ຽນ</small>}
                </div>
                <div className="p-field" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <Button label="ບັນທຶກ" icon={<LuSave />} onClick={handleSave} className="p-button-sm" style={{ width: '100px' }} />
                    <Button label="ຍົກເລີກ" icon="pi pi-times" onClick={onHide} className="p-button-text p-button-secondary p-button-sm" style={{ width: '100px' }} />
                </div>
            </div>
        </Dialog>
    );
};

export default CurrencyDialog;