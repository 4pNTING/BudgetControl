import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { FaUserPlus } from "react-icons/fa"; // Importing the icon for the header
import { LuSave } from "react-icons/lu"; // Importing the new save icon
import { FloatLabel } from 'primereact/floatlabel';

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
        <Dialog 
            header={<><FaUserPlus style={{ marginRight: '10px' }} />ເພີ່ມຜູ້ໃຊ້</>} 
            visible={visible} 
            style={{ width: '40vw', height: 'auto' }} 
            onHide={onHide}
        >
            <div className="p-fluid">
                <div className="p-field">
                    <FloatLabel>
                        <InputText 
                            id="name" 
                            name="name" 
                            value={supplier.name || ''} 
                            onChange={handleInputChange} 
                            className={classNames({ 'p-invalid': submitted && !supplier.name })}
                        />
                        <label htmlFor="name">ຊື່</label>
                    </FloatLabel>
                    {submitted && !supplier.name && <small className="p-error">ກະລຸນາປ້ອນຊື່</small>}
                </div>
                <div className="p-field">
                    <FloatLabel>
                        <InputText 
                            id="email" 
                            name="email" 
                            value={supplier.email || ''} 
                            onChange={handleInputChange} 
                            className={classNames({ 'p-invalid': submitted && !supplier.email })}
                        />
                        <label htmlFor="email">ອີເມວ</label>
                    </FloatLabel>
                    {submitted && !supplier.email && <small className="p-error">ກະລຸນາປ້ອນອີເມວ</small>}
                </div>
                <div className="p-field">
                    <FloatLabel>
                        <InputText 
                            id="phone" 
                            name="phone" 
                            value={supplier.phone || ''} 
                            onChange={handleInputChange} 
                            className={classNames({ 'p-invalid': submitted && !supplier.phone })}
                        />
                        <label htmlFor="phone">ເບີໂທ</label>
                    </FloatLabel>
                    {submitted && !supplier.phone && <small className="p-error">ກະລຸນາປ້ອນເບີໂທ</small>}
                </div>
                <div className="p-field">
                    <FloatLabel>
                        <InputText 
                            id="address" 
                            name="address" 
                            value={supplier.address || ''} 
                            onChange={handleInputChange} 
                            className={classNames({ 'p-invalid': submitted && !supplier.address })}
                        />
                        <label htmlFor="address">ທີ່ຢູ່</label>
                    </FloatLabel>
                    {submitted && !supplier.address && <small className="p-error">ກະລຸນາປ້ອນທີ່ຢູ່</small>}
                </div>
                <div className="p-field" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <Button 
                        label="ບັນທຶກ" 
                        icon={<LuSave />} 
                        onClick={handleSave}  
                        style={{ width: '100px' }} 
                    />
                    <Button 
                        label="ຍົກເລີກ" 
                        icon="pi pi-times" 
                        onClick={onHide}  
                        style={{ width: '100px', backgroundColor: 'red', borderColor: 'red' }} 
                        className="p-button-text p-button-sm"
                    />
                </div>
            </div>
        </Dialog>
    );
};

export default AddUserDialog;