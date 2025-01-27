import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Demo } from '@/types/demo';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { LuSave } from "react-icons/lu";
interface AddSupplierDialogProps {
    visible: boolean;
    onHide: () => void;
    onSave: () => void;
    supplier: Demo.Supplier;
    setSupplier: React.Dispatch<React.SetStateAction<Demo.Supplier>>;
}

const AddSupplierDialog: React.FC<AddSupplierDialogProps> = ({ visible, onHide, onSave, supplier, setSupplier }) => {
    const [newAccount, setNewAccount] = useState({ accountName: '', accountNumber: '', currency: '' });
    const [accounts, setAccounts] = useState([{ accountName: '', accountNumber: '', currency: '' }]);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast>(null);

    const currencies = [
        { label: 'LAK', value: 'LAK' },
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'THB', value: 'THB' },
    ];

    const handleSave = () => {
        setSubmitted(true);
        if (supplier.customerCode && supplier.name && supplier.phone && supplier.village && supplier.district && supplier.province) {
            onSave();
            toast.current?.show({ severity: 'success', summary: 'ສຳເລັດ', detail: 'ບັນທຶກຂໍ້ມູນສຳເລັດ', life: 3000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'ຜິດພາດ', detail: 'ກະລຸນາກວດຄືນຂໍ້ມູນທີ່ຕ້ອງການ.', life: 3000 });
        }
    };

    const dialogFooter = (
        <div>
          <Button icon={<LuSave />} label="ບັນທຶກ" className="mr-2 p-button-tex" onClick={handleSave} />


            <Button label="ຍົກເລິກ" icon="pi pi-times" onClick={onHide} className="p-button-text p-button-secondary" />
        </div>
    );

    const handleAddAccount = () => {
        setAccounts([...accounts, { accountName: '', accountNumber: '', currency: '' }]);
    };

    const handleInputChange = (index: number, field: string, value: string) => {
        const updatedAccounts = [...accounts];
        updatedAccounts[index][field] = value;
        setAccounts(updatedAccounts);
    };

    const handleDeleteAccount = (index: number) => {
        const updatedAccounts = accounts.filter((_, i) => i !== index);
        setAccounts(updatedAccounts);
    };

    useEffect(() => {
        if (visible) {
            setNewAccount({ accountName: '', accountNumber: '', currency: '' });
            setAccounts([{ accountName: '', accountNumber: '', currency: '' }]);
            setSubmitted(false);
        }
    }, [visible]);

    return (
        <>
            <Toast ref={toast} />
            <Dialog header="ເພີ່ມຜູ້ສະໜອງໃໝ່" visible={visible} style={{ width: '70vw' }} footer={dialogFooter} onHide={onHide}>
                <div className="p-fluid grid">
                    <div className="field col-12 md:col-6">
                        <label htmlFor="customerCode"></label>
                        <InputText id="customerCode" value={supplier.customerCode} onChange={(e) => setSupplier({ ...supplier, customerCode: e.target.value })} className={classNames({ 'p-invalid': submitted && !supplier.customerCode })} />
                        {submitted && !supplier.customerCode && <small className="p-error">ລະຫັດລູກຄ້າ ຈຳເປັນຕ້ອງໃສ່.</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="name">ຊື່</label>
                        <InputText id="name" value={supplier.name} onChange={(e) => setSupplier({ ...supplier, name: e.target.value })} className={classNames({ 'p-invalid': submitted && !supplier.name })} />
                        {submitted && !supplier.name && <small className="p-error">ຊື່ ຈຳເປັນຕ້ອງໃສ່.</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="phone">ເບີໂທ</label>
                        <InputText id="phone" value={supplier.phone} onChange={(e) => setSupplier({ ...supplier, phone: e.target.value })} className={classNames({ 'p-invalid': submitted && !supplier.phone })} />
                        {submitted && !supplier.phone && <small className="p-error">ເບີໂທ ຈຳເປັນຕ້ອງໃສ່.</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="village">ບ້ານ</label>
                        <InputText id="village" value={supplier.village} onChange={(e) => setSupplier({ ...supplier, village: e.target.value })} className={classNames({ 'p-invalid': submitted && !supplier.village })} />
                        {submitted && !supplier.village && <small className="p-error">ບ້ານ ຈຳເປັນຕ້ອງໃສ່.</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="district">ເມືອງ</label>
                        <InputText id="district" value={supplier.district} onChange={(e) => setSupplier({ ...supplier, district: e.target.value })} className={classNames({ 'p-invalid': submitted && !supplier.district })} />
                        {submitted && !supplier.district && <small className="p-error">ເມືອງ ຈຳເປັນຕ້ອງໃສ່.</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="province">ແຂວງ</label>
                        <InputText id="province" value={supplier.province} onChange={(e) => setSupplier({ ...supplier, province: e.target.value })} className={classNames({ 'p-invalid': submitted && !supplier.province })} />
                        {submitted && !supplier.province && <small className="p-error">ແຂວງ ຈຳເປັນຕ້ອງໃສ່.</small>}
                    </div>
                </div>
                <div className="p-fluid">
                    <h3>ບັນຊີ</h3>
                    <DataTable value={accounts} rows={5} className="p-datatable-sm">
                        <Column field="index" header="ລຳດັບ" body={(rowData, column) => column.rowIndex + 1} style={{ width: '5%', minWidth: '6rem' }} />
                        <Column field="accountName" header="ຊື່ບັນຊີ" body={(rowData, column) => (
                            <InputText
                                type="text"
                                value={rowData.accountName}
                                onChange={(e) => handleInputChange(column.rowIndex, 'accountName', e.target.value)}
                                placeholder="ກະລຸນາເພິ່ມຊື່ບັນຊີ"
                            />
                        )} style={{ width: '30%', minWidth: '10rem' }} />
                        <Column field="accountNumber" header="ເລກບັນຊີ" body={(rowData, column) => (
                            <InputText
                                type="text"
                                value={rowData.accountNumber}
                                onChange={(e) => handleInputChange(column.rowIndex, 'accountNumber', e.target.value)}
                                placeholder="ກະລຸນາເພິ່ມເລກບັນຊີ"
                            />
                        )} style={{ width: '30%', minWidth: '10rem' }} />
                        <Column field="currency" header="ສະກຸນເງິນ" body={(rowData, column) => (
                            <Dropdown
                                value={rowData.currency}
                                options={currencies}
                                onChange={(e) => handleInputChange(column.rowIndex, 'currency', e.value)}
                                placeholder="ເລືອກສະກຸນເງິນ"
                            />
                        )} style={{ width: '20%', minWidth: '10rem' }} />
                        <Column header="ການກະທຳ" body={(rowData, column) => (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button icon="pi pi-trash" className="p-button-danger" onClick={() => handleDeleteAccount(column.rowIndex)} />
                            </div>
                        )} style={{ width: '10%', minWidth: '6rem' }} />
                    </DataTable>
                    <div className="field col-2">
                        <Button label="ເພີ່ມບັນຊີ" icon="pi pi-plus" onClick={handleAddAccount} />
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default AddSupplierDialog;