'use client'
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { LuSave } from "react-icons/lu";

const AddApproverDialog = ({ visible, onHide, approver, setApprover, onSave }) => {
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (visible) {
            setApprover({ name: '', email: '', phone: '', department: '', role: '' });
            setSubmitted(false);
        }
    }, [visible, setApprover]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setApprover((prevApprover) => ({
            ...prevApprover,
            [name]: value,
        }));
    };

    const handleSave = () => {
        setSubmitted(true);
        if (approver.name && approver.email && approver.phone && approver.department && approver.role) {
            onSave();
            onHide();
        }
    };

    return (
        <Dialog header="ເພີ່ມຜູ້ອະນຸມັດ" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="name">ຊື່</label>
                    <InputText 
                        id="name" 
                        name="name" 
                        value={approver.name || ''} 
                        onChange={handleInputChange} 
                        className={classNames({ 'p-invalid': submitted && !approver.name })}
                    />
                    {submitted && !approver.name && <small className="p-error">ກະລຸນາປ້ອນຊື່</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="email">ອີເມວ</label>
                    <InputText 
                        id="email" 
                        name="email" 
                        value={approver.email || ''} 
                        onChange={handleInputChange} 
                        className={classNames({ 'p-invalid': submitted && !approver.email })}
                    />
                    {submitted && !approver.email && <small className="p-error">ກະລຸນາປ້ອນອີເມວ</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="phone">ເບີໂທ</label>
                    <InputText 
                        id="phone" 
                        name="phone" 
                        value={approver.phone || ''} 
                        onChange={handleInputChange} 
                        className={classNames({ 'p-invalid': submitted && !approver.phone })}
                    />
                    {submitted && !approver.phone && <small className="p-error">ກະລຸນາປ້ອນເບີໂທ</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="department">ພະແນກ</label>
                    <InputText 
                        id="department" 
                        name="department" 
                        value={approver.department || ''} 
                        onChange={handleInputChange} 
                        className={classNames({ 'p-invalid': submitted && !approver.department })}
                    />
                    {submitted && !approver.department && <small className="p-error">ກະລຸນາປ້ອນພະແນກ</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="role">ບົດບາດ</label>
                    <InputText 
                        id="role" 
                        name="role" 
                        value={approver.role || ''} 
                        onChange={handleInputChange} 
                        className={classNames({ 'p-invalid': submitted && !approver.role })}
                    />
                    {submitted && !approver.role && <small className="p-error">ກະລຸນາປ້ອນບົດບາດ</small>}
                </div>
                <div className="p-field" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <Button label="ບັນທຶກ" icon={<LuSave />} onClick={handleSave} className="p-button-sm" style={{ width: '100px' }} />
                    <Button label="ຍົກເລິກ" icon="pi pi-times" onClick={onHide} className="p-button-text p-button-secondary p-button-sm" style={{ width: '100px' }} />
                </div>
            </div>
        </Dialog>
    );
};

export default AddApproverDialog;