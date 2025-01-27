import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { FaUserPlus, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"; // Importing icons
import { LuSave } from "react-icons/lu"; // Importing the new save icon

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
                    <label htmlFor="name" style={{ fontSize: '1.2em' }}>ຊື່</label>
                    <span className="p-input-icon-left">
                        <i className="pi pi-user" />
                        <InputText 
                            id="name" 
                            name="name" 
                            value={supplier.name || ''} 
                            onChange={handleInputChange} 
                            className={classNames({ 'p-invalid': submitted && !supplier.name })}
                        />
                    </span>
                    {submitted && !supplier.name && <small className="p-error">ກະລຸນາປ້ອນຊື່</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="email" style={{ fontSize: '1.2em' }}>ອີເມວ</label>
                    <span className="p-input-icon-left">
                        <i className="pi pi-envelope" />
                        <InputText 
                            id="email" 
                            name="email" 
                            value={supplier.email || ''} 
                            onChange={handleInputChange} 
                            className={classNames({ 'p-invalid': submitted && !supplier.email })}
                        />
                    </span>
                    {submitted && !supplier.email && <small className="p-error">ກະລຸນາປ້ອນອີເມວ</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="phone" style={{ fontSize: '1.2em' }}>ເບີໂທ</label>
                    <span className="p-input-icon-left">
                        <i className="pi pi-phone" />
                        <InputText 
                            id="phone" 
                            name="phone" 
                            value={supplier.phone || ''} 
                            onChange={handleInputChange} 
                            className={classNames({ 'p-invalid': submitted && !supplier.phone })}
                        />
                    </span>
                    {submitted && !supplier.phone && <small className="p-error">ກະລຸນາປ້ອນເບີໂທ</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="address" style={{ fontSize: '1.2em' }}>ທີ່ຢູ່</label>
                    <span className="p-input-icon-left">
                        <i className="pi pi-map-marker" />
                        <InputText 
                            id="address" 
                            name="address" 
                            value={supplier.address || ''} 
                            onChange={handleInputChange} 
                            className={classNames({ 'p-invalid': submitted && !supplier.address })}
                        />
                    </span>
                    {submitted && !supplier.address && <small className="p-error">ກະລຸນາປ້ອນທີ່ຢູ່</small>}
                </div>
                <div className="p-field" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <Button 
                        label="ບັນທຶກ" 
                        icon="pi pi-download" 
                        onClick={handleSave}  
                        style={{ width: '100px' }} 
                    />
                    <Button 
                        label="ຍົກເລີກ" 
                        icon="pi pi-times" 
                        onClick={onHide}  
                        style={{ width: '100px' }} 
                    />
                </div>
               
            </div>
        </Dialog>
    );
};

export default AddUserDialog;