import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

const AddUserDialog = ({ visible, onHide, supplier, setSupplier }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSupplier((prevSupplier) => ({
            ...prevSupplier,
            [name]: value,
        }));
    };

    const handleSave = () => {
        setSubmitted(true);
        if (supplier.name && supplier.email && supplier.phone && supplier.address) {
            // Add save logic here
            onHide();
        }
    };

    return (
        <Dialog header="ເພີ່ມຜູ້ໃຊ້" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="name">ຊື່</label>
                    <InputText 
                        id="name" 
                        name="name" 
                        value={supplier.name || ''} 
                        onChange={handleInputChange} 
                        className={classNames({ 'p-invalid': submitted && !supplier.name })}
                    />
                    {submitted && !supplier.name && <small className="p-error">ກະລຸນາປ້ອນຊື່</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="email">ອີເມວ</label>
                    <InputText 
                        id="email" 
                        name="email" 
                        value={supplier.email || ''} 
                        onChange={handleInputChange} 
                        className={classNames({ 'p-invalid': submitted && !supplier.email })}
                    />
                    {submitted && !supplier.email && <small className="p-error">ກະລຸນາປ້ອນອີເມວ</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="phone">ເບີໂທ</label>
                    <InputText 
                        id="phone" 
                        name="phone" 
                        value={supplier.phone || ''} 
                        onChange={handleInputChange} 
                        className={classNames({ 'p-invalid': submitted && !supplier.phone })}
                    />
                    {submitted && !supplier.phone && <small className="p-error">ກະລຸນາປ້ອນເບີໂທ</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="address">ທີ່ຢູ່</label>
                    <InputText 
                        id="address" 
                        name="address" 
                        value={supplier.address || ''} 
                        onChange={handleInputChange} 
                        className={classNames({ 'p-invalid': submitted && !supplier.address })}
                    />
                    {submitted && !supplier.address && <small className="p-error">ກະລຸນາປ້ອນທີ່ຢູ່</small>}
                </div>
                <div className="p-field" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <Button label="ບັນທຶກ" icon="pi pi-check" onClick={handleSave} style={{ width: '100px' }} />
                    <Button label="ຍົກເລິກ" icon="pi pi-times" onClick={onHide} className="p-button-text p-button-secondary ml-2" style={{ width: '100px' }} />
                </div>
            </div>
        </Dialog>
    );
};

export default AddUserDialog;