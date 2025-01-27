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
import { FaPlus, FaTrash } from "react-icons/fa";
import { 
    FaUserTie, 
    FaBoxes, 
    FaHandshake, 
    FaMapMarkedAlt, 
    FaHome, 
    FaCity, 
    FaGlobeAsia, 
    FaMobileAlt, 
    FaClipboardList,
    FaTrashAlt,
    FaPlusCircle,
    FaSave,
    FaTimes,
    FaUniversity,
    FaCreditCard,
    FaMoneyBillWave
} from "react-icons/fa";
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

    const banks = [
        { label: 'BCEL', value: 'BCEL' },
        { label: 'JDB', value: 'JDB' },
        { label: 'LDB', value: 'LDB' },
    ];

    const handleSave = () => {
        setSubmitted(true);
        
        // Log data before validation
        console.log('=== Saving Supplier Data ===', new Date().toISOString());
        console.log('Supplier Details:', {
           
            name: supplier.name,
            type: supplier.type,
            providedTo: supplier.providedTo,
            address: supplier.address,
            village: supplier.village,
            district: supplier.district,
            province: supplier.province,
            phone: supplier.phone,
            note: supplier.note
        });
        console.log('Bank Accounts:', accounts);
    
        // Validate required fields
        const isValid = 
                       supplier.name && 
                       supplier.phone && 
                       supplier.village && 
                       supplier.district && 
                       supplier.province;
    
        if (isValid) {
            onSave();
            console.log('✅ Save successful');
            toast.current?.show({ 
                severity: 'success', 
                summary: 'ສຳເລັດ', 
                detail: 'ບັນທຶກຂໍ້ມູນສຳເລັດ', 
                life: 3000 
            });
        } else {
            console.log('❌ Save failed - Missing required fields');
            console.log('Missing fields:', {
                customerCode: !supplier.customerCode,
                name: !supplier.name,
                phone: !supplier.phone,
                village: !supplier.village,
                district: !supplier.district,
                province: !supplier.province
            });
            toast.current?.show({ 
                severity: 'error', 
                summary: 'ຜິດພາດ', 
                detail: 'ກະລຸນາກວດຄືນຂໍ້ມູນທີ່ຕ້ອງການ.', 
                life: 3000 
            });
        }
    };

    const dialogFooter = (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button icon="pi pi-download" label="ບັນທຶກ" className="p-button-primary p-25" onClick={handleSave} />
            <Button 
                label="ຍົກເລິກ" 
                icon={<FaTimes className="mr-2" />} 
                onClick={onHide} 
                className="p-button-secondary" 
            />
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
            <Dialog  header="ເພີ່ມຜູ້ສະໜອງໃໝ່" 
    visible={visible} 
    style={{ width: '70vw' }} 
    footer={dialogFooter} 
    onHide={onHide}
    headerClassName="bg-gray-200 p-4 border-bottom-1 border-gray-200"
    contentClassName="bg-white"
    className="shadow-lg border-round"
    modal
    draggable={false}>
                <div className="p-fluid grid mt-4">
                <div className="field col-6 md:col-4">
    <label htmlFor="name" style={{ fontSize: '1.2em' }}>ຊື່ຜູ້ສະໜອງ</label>
    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <FaUserTie className="text-gray-600" />
        </span>
        <InputText 
            id="name" 
            value={supplier.name} 
            onChange={(e) => setSupplier({ ...supplier, name: e.target.value })} 
            className={classNames({ 'p-invalid': submitted && !supplier.name })}
            placeholder="ກະລຸນາປ້ອນຊື່ຜູ້ສະໜອງ"
        />
    </div>
  
</div>
<div className="field col-12 md:col-4">
    <label htmlFor="type" style={{ fontSize: '1.2em' }}>ປະເພດເຄື່ອງຂາຍ</label>
    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <FaBoxes className="text-gray-600" />
        </span>
        <InputText 
            id="type" 
            value={supplier.type} 
            onChange={(e) => setSupplier({ ...supplier, type: e.target.value })} 
            className={classNames({ 'p-invalid': submitted && !supplier.type })}
            placeholder="ກະລຸນາປ້ອນປະເພດເຄື່ອງຂາຍ"
        />
    </div>
  
</div>
<div className="field col-12 md:col-4">
    <label htmlFor="providedTo" style={{ fontSize: '1.2em' }}>ສະໜອງໃຫ້</label>
    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <FaHandshake className="text-gray-600" />
        </span>
        <InputText 
            id="providedTo" 
            value={supplier.providedTo} 
            onChange={(e) => setSupplier({ ...supplier, providedTo: e.target.value })} 
            className={classNames({ 'p-invalid': submitted && !supplier.providedTo })}
            placeholder="ກະລຸນາປ້ອນຜູ້ທີ່ຈະສະໜອງໃຫ້"
        />
    </div>
  
</div>
<div className="field col-12 md:col-4">
    <label htmlFor="address" style={{ fontSize: '1.2em' }}>ທີ່ຢູ່</label>
    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <FaMapMarkedAlt className="text-gray-600" />
        </span>
        <InputText 
            id="address" 
            value={supplier.address} 
            onChange={(e) => setSupplier({ ...supplier, address: e.target.value })} 
            className={classNames({ 'p-invalid': submitted && !supplier.address })}
            placeholder="ກະລຸນາປ້ອນທີ່ຢູ່"
        />
    </div>
   
</div>
<div className="field col-12 md:col-4">
    <label htmlFor="village" style={{ fontSize: '1.2em' }}>ບ້ານ</label>
    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <FaHome className="text-gray-600" />
        </span>
        <InputText 
            id="village" 
            value={supplier.village} 
            onChange={(e) => setSupplier({ ...supplier, village: e.target.value })} 
            className={classNames({ 'p-invalid': submitted && !supplier.village })}
            placeholder="ກະລຸນາປ້ອນບ້ານ"
        />
    </div>
   
</div>
<div className="field col-12 md:col-4">
    <label htmlFor="district" style={{ fontSize: '1.2em' }}>ເມືອງ</label>
    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <FaCity className="text-gray-600" />
        </span>
        <InputText 
            id="district" 
            value={supplier.district} 
            onChange={(e) => setSupplier({ ...supplier, district: e.target.value })} 
            className={classNames({ 'p-invalid': submitted && !supplier.district })}
            placeholder="ກະລຸນາປ້ອນເມືອງ"
        />
    </div>
</div>
<div className="field col-12 md:col-3">
    <label htmlFor="province" style={{ fontSize: '1.2em' }}>ແຂວງ</label>
    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <FaGlobeAsia className="text-gray-600" />
        </span>
        <InputText 
            id="province" 
            value={supplier.province} 
            onChange={(e) => setSupplier({ ...supplier, province: e.target.value })} 
            className={classNames({ 'p-invalid': submitted && !supplier.province })}
            placeholder="ກະລຸນາປ້ອນແຂວງ"
        />
    </div>
</div>
<div className="field col-12 md:col-3">
    <label htmlFor="phone" style={{ fontSize: '1.2em' }}>ເບີໂທ</label>
    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <FaMobileAlt className="text-gray-600" />
        </span>
        <InputText 
            id="phone" 
            value={supplier.phone} 
            onChange={(e) => setSupplier({ ...supplier, phone: e.target.value })} 
            className={classNames({ 'p-invalid': submitted && !supplier.phone })}
            placeholder="ກະລຸນາປ້ອນເບີໂທ"
        />
    </div>
</div>
<div className="field col-12 md:col-6">
    <label htmlFor="note" style={{ fontSize: '1.2em' }}>ໝາຍເຫດ</label>
    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <FaClipboardList className="text-gray-600" />
        </span>
        <InputText 
            id="note" 
            value={supplier.note} 
            onChange={(e) => setSupplier({ ...supplier, note: e.target.value })} 
            className={classNames({ 'p-invalid': submitted && !supplier.note })}
            placeholder="ກະລຸນາປ້ອນໝາຍເຫດ"
        />
    </div>
   
</div>
                </div>
                <div className="p-fluid">
    <h3 className="flex align-items-center">
        <FaUniversity className="mr-2" />
        ລາຍລະອຽດບັນຊີ
    </h3>
    <DataTable  value={accounts} 
    rows={5} 
    className="p-datatable-sm bg-gray-300"
    showGridlines
 
    >
        <Column 
            field="index" 
            header="ລຳດັບ" 
            body={(rowData, column) => column.rowIndex + 1} 
            style={{ width: '3%', minWidth: '3rem' }} 
        />
        <Column 
            field="accountName" 
            header="ທະນາຄານ" 
            body={(rowData, column) => (
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <FaUniversity className="text-gray-600" />
                    </span>
                    <Dropdown
                        value={rowData.accountName}
                        options={banks}
                        onChange={(e) => handleInputChange(column.rowIndex, 'accountName', e.value)}
                        placeholder="ເລືອກທະນາຄານ"
                        className="w-full"
                    />
                </div>
            )} 
            style={{ width: '30%', minWidth: '10rem' }} 
        />
        <Column 
            field="accountNumber" 
            header="ເລກບັນຊີ" 
            body={(rowData, column) => (
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <FaCreditCard className="text-gray-600" />
                    </span>
                    <InputText
                        type="text"
                        value={rowData.accountNumber}
                        onChange={(e) => handleInputChange(column.rowIndex, 'accountNumber', e.target.value)}
                        placeholder="ກະລຸນາເພິ່ມເລກບັນຊີ"
                        className="w-full"
                    />
                </div>
            )} 
            style={{ width: '30%', minWidth: '10rem' }} 
        />
        <Column 
            field="currency" 
            header="ສະກຸນເງິນ" 
            body={(rowData, column) => (
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <FaMoneyBillWave className="text-gray-600" />
                    </span>
                    <Dropdown
                        value={rowData.currency}
                        options={currencies}
                        onChange={(e) => handleInputChange(column.rowIndex, 'currency', e.value)}
                        placeholder="ເລືອກສະກຸນເງິນ"
                        className="w-full"
                    />
                </div>
            )} 
            style={{ width: '20%', minWidth: '10rem' }} 
        />
        <Column 
            header="ການຈັດການ" 
            body={(rowData, column) => (
                <div className="flex justify-content-center">
                    <Button 
                       
icon={<FaTrash />}
                        className="p-button-danger " 
                        onClick={() => handleDeleteAccount(column.rowIndex)} 
                    />
                </div>
            )} 
            style={{ width: '10%', minWidth: '6rem' }} 
        />
    </DataTable>
    <div className="mt-3">
    <Button 
    label="ເພີ່ມບັນຊີ" 
    icon={<FaPlusCircle className="mr-2" />} 
    onClick={handleAddAccount} 
    className="p-button-info p-button-sm  hover:shadow-lg transition-colors"
    style={{ width: 'auto', padding: '0.5rem 1rem' }}
/>
    </div>
</div>
            </Dialog>
        </>
    );
};

export default AddSupplierDialog;
