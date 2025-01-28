'use client'
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { LuSave } from "react-icons/lu";
import { FaMoneyBillWave, FaTimes, FaCode, FaDollarSign, FaExchangeAlt } from "react-icons/fa"; // Importing the icons

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
        <Dialog 
        header={<><FaMoneyBillWave style={{ marginRight: '10px', color: 'green' }} />ສ້າງສະກຸນເງິນ</>} 
        visible={visible} 
        style={{ width: '40vw', height: 'auto' }} 
        onHide={onHide}
        headerClassName="bg-gray-200 p-4 border-bottom-1 border-gray-200"
    >
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="code">ລະຫັດສະກຸນເງິນ</label>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <FaCode className="text-blue-500" />
                        </span>
                        <InputText 
                            id="code" 
                            name="code" 
                            value={currency.code || ''} 
                            onChange={handleInputChange} 
                            className={classNames({ 'p-invalid': submitted && !currency.code })}
                        />
                    </div>
                    {submitted && !currency.code && <small className="p-error">ກະລຸນາປ້ອນລະຫັດສະກຸນເງິນ</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="name">ຊື່ສະກຸນເງິນ</label>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <FaDollarSign className="text-green-500" />
                        </span>
                        <InputText 
                            id="name" 
                            name="name" 
                            value={currency.name || ''} 
                            onChange={handleInputChange} 
                            className={classNames({ 'p-invalid': submitted && !currency.name })}
                        />
                    </div>
                    {submitted && !currency.name && <small className="p-error">ກະລຸນາປ້ອນຊື່ສະກຸນເງິນ</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="rate">ອັດຕາແລກປ່ຽນ</label>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <FaExchangeAlt className="text-red-500" />
                        </span>
                        <InputText 
                            id="rate" 
                            name="rate" 
                            value={currency.rate || ''} 
                            onChange={handleInputChange} 
                            className={classNames({ 'p-invalid': submitted && !currency.rate })}
                        />
                    </div>
                    {submitted && !currency.rate && <small className="p-error">ກະລຸນາປ້ອນອັດຕາແລກປ່ຽນ</small>}
                </div>
                <div className="p-field" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <Button label="ບັນທຶກ" icon="pi pi-download" onClick={handleSave} className="" style={{ width: '100px' }} />
                    <Button 
                        label="ຍົກເລິກ" 
                        icon={<FaTimes className="mr-2 " />} 
                        onClick={onHide} 
                        className="p-button-secondary" 
                        style={{ width: 'auto', padding: '0.5rem 1rem' }} 
                    />
                </div>
            </div>
        </Dialog>
    );
};

export default CurrencyDialog;