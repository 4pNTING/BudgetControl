'use client'
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { SupplierService } from '@/public/demo/service/SupplierService';
import { Demo } from '@/types/demo';
import { LayoutContext } from '@/layout/context/layoutcontext';
import '@/assets/styles/scss/badges.scss';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import AddSupplierDialog from '@/view/app/components/Supplier/AddSupplierDialog';
import { LuSave } from "react-icons/lu";

const SupplierPage = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [suppliers, setSuppliers] = useState<Demo.Supplier[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string | null>(null);
    const [filters, setFilters] = useState({});
    const [displayDialog, setDisplayDialog] = useState(false);
    const [newSupplier, setNewSupplier] = useState<Demo.Supplier>({} as Demo.Supplier);
    const router = useRouter();
    const toast = useRef<Toast>(null);

    useEffect(() => {
        SupplierService.getSuppliers().then((data) => setSuppliers(data));
        initFilters();
    }, []);

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            customerCode: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            phone: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            village: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            district: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            province: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
        });
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };
        (_filters['global'] as any).value = value;

        setFilters(_filters);
        setGlobalFilter(value);
    };

    const renderHeader = () => {
        const handleReset = () => {
            setGlobalFilter('');
            initFilters();
        };

        return (
            <div className="flex justify-content-end items-center">
                <Button label="ເພິ່ມຜູ້ສະໜອງໃໝ່" icon="pi pi-plus" onClick={() => setDisplayDialog(true)} style={{ width: '180px', marginRight: '1rem' }} />
                <span className="">
                    
                    <InputText value={globalFilter || ''} onChange={onGlobalFilterChange} placeholder="ປ້ອນຄຳຄົ້ນຫາ..." style={{ width: '300px' }} />
                    {globalFilter && (
                        <i className="pi pi-times" onClick={handleReset} style={{ cursor: 'pointer' }} />
                    )}
                </span>
            </div>
        );
    };

    const bodyTemplate = (data: Demo.Supplier, props: ColumnBodyOptions) => {
        return <span>{String(data[props.field])}</span>;
    };

    const handleEdit = (id: number) => {
        router.push(`/admin/supplier/edit/${id}`);
    };

    const handleDelete = (id: number) => {
        confirmDialog({
            message: 'Are you sure you want to delete this record?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Yes',
            rejectLabel: 'No',
            accept: async () => {
                try {
                    await SupplierService.deleteSupplier(id);
                    setSuppliers(prev => prev.filter(s => s.id !== id));
                    toast.current?.show({ 
                        severity: 'success', 
                        summary: 'Success', 
                        detail: 'Record deleted successfully' 
                    });
                } catch (error) {
                    console.error('Delete error:', error);
                    toast.current?.show({ 
                        severity: 'error', 
                        summary: 'Error', 
                        detail: 'An error occurred while deleting the record' 
                    });
                }
            }
        });
    };

    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        },
        {
            label: 'Home',
            icon: 'pi pi-home'
        }
    ];

    const handleSave = async () => {
        try {
            const response = await fetch('/api/saveSupplier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSupplier),
            });

            if (!response.ok) {
                throw new Error('Error saving data');
            }

            const result = await response.json();
            setSuppliers([...suppliers, newSupplier]);
            setDisplayDialog(false);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: result.message });
        } catch (error) {
            console.error('Error:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving the data.' });
        }
    };

    const header = renderHeader();

    return (
        <div className="grid p-fluid">
            <Toast ref={toast} />
            <ConfirmDialog />
            <AddSupplierDialog 
                visible={displayDialog} 
                onHide={() => setDisplayDialog(false)} 
                onSave={handleSave} 
                supplier={newSupplier} 
                setSupplier={setNewSupplier} 
            />
            <div className="col-12">
                <div className="card">
                    <div className="flex justify-content-between align-items-center mb-4">
                        <h1 className="m-0 text-3xl">ຜູ້ສະໜອງ</h1>
                    </div>

                    <DataTable 
                        value={suppliers} 
                        rows={10} 
                        paginator 
                        responsiveLayout="scroll" 
                        className="p-datatable-sm shadow-lg rounded-xl overflow-hidden"
                        tableStyle={{ minWidth: '50rem' }}
                        stripedRows
                        showGridlines
                        rowHover
                        globalFilter={globalFilter}
                        filters={filters}
                        header={header}
                        currentPageReportTemplate="ສະແດງ {first} ຫາ {last} of {totalRecords}"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]}
                        paginatorClassName="p-3 border-t bg-gray-50"
                    >
                        <Column 
                            header="ລຳດັບ" 
                            body={(data, options) => <span>{options.rowIndex + 1}</span>} 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            style={{ width: '5%', minWidth: '3rem' }} 
                        />
                        <Column 
                            field="name" 
                            body={bodyTemplate} 
                            header="ຊື່ຜູ້ສະໜອງ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            
                            style={{ width: '14%', minWidth: '8rem' }} 
                        />
                        <Column 
                            field="type" 
                            body={bodyTemplate} 
                            header="ປະເພດເຄື່ອງຂາຍ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            
                            style={{ width: '10%', minWidth: '10rem' }} 
                        />
                        <Column 
                            field="providedTo" 
                            body={bodyTemplate} 
                            header="ສະໜອງໃຫ້" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            
                            style={{ width: '8%', minWidth: '10rem' }} 
                        />
                        <Column 
                            field="address" 
                            body={bodyTemplate} 
                            header="ທີ່ຢູ່" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            
                            style={{ width: '8%', minWidth: '8rem' }} 
                        />
                        <Column 
                            field="village" 
                            body={bodyTemplate} 
                            header="ບ້ານ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            
                            style={{ width: '9%', minWidth: '8rem' }} 
                        />
                        <Column 
                            field="district" 
                            body={bodyTemplate} 
                            header="ເມືອງ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            
                            style={{ width: '10%', minWidth: '8rem' }} 
                        />
                        <Column 
                            field="province" 
                            body={bodyTemplate} 
                            header="ແຂວງ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            
                            style={{ width: '8%', minWidth: '8rem' }} 
                        />
                        <Column 
                            field="phone" 
                            body={bodyTemplate} 
                            header="ເບີໂທ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            
                            style={{ width: '9%', minWidth: '8rem' }} 
                        />
                        <Column 
                            field="note" 
                            body={bodyTemplate} 
                            header="ໝາຍເຫດ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            
                            style={{ width: '10%', minWidth: '10rem' }} 
                        />
                        <Column 
                            headerStyle={{ width: '15%', minWidth: '6rem' }} 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            header="ການຈັດການ" 
                            bodyClassName="text-center py-3"
                            body={(rowData) => (
                                <SplitButton 
                                    label="ລາຍລະອຽດ" 
                                    icon="pi pi-check" 
                                    model={items} 
                                    className="p-button-sm" 
                                    style={{ width: '140px' }} 
                                />
                            )} 
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default SupplierPage;