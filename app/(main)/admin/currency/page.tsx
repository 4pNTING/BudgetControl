'use client'
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { CurrencyService } from '@/public/demo/service/CurrencyService';
import { Demo } from '@/types/demo';
import { LayoutContext } from '@/layout/context/layoutcontext';
import '@/assets/styles/scss/badges.scss';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import CreateCurrencyDialog from '@/view/app/components/Currency/CurrencyDialog';
import { LuPlus } from "react-icons/lu";
import { Menu } from 'primereact/menu';

const CurrencyPage = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [currencies, setCurrencies] = useState<Demo.Currency[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [filters, setFilters] = useState({});
    const [displayDialog, setDisplayDialog] = useState(false);
    const [newCurrency, setNewCurrency] = useState<Demo.Currency>({} as Demo.Currency);
    const router = useRouter();
    const [totalRecords, setTotalRecords] = useState(0);
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(0);
    const toast = useRef<Toast>(null);
    const menu = useRef<Menu>(null);

    const overlayMenuItems = [
        {
            label: 'Save',
            icon: 'pi pi-save'
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            separator: true
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash'
        }
    ];

    const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        menu.current?.toggle(event);
    };

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const data = await CurrencyService.getCurrencies();
                setCurrencies(data);
                setTotalRecords(data.length);
            } catch (error) {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to fetch currencies' });
            }
        };

        fetchCurrencies();
        initFilters();
    }, []);

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            code: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            rate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
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
                <Button label="ເພິ່ມສະກຸນເງິນໃໝ່" icon={<LuPlus />} onClick={() => setDisplayDialog(true)} style={{ width: '150px', marginRight: '1rem' }} />
                <span className="">
                    
                    <InputText value={globalFilter || ''} onChange={onGlobalFilterChange} placeholder="ກະລຸນາປ້ອນຄຳຄົ້ນຫາ..." style={{ width: '300px' }} />
                    {globalFilter && (
                        <i className="pi pi-times" onClick={handleReset} style={{ cursor: 'pointer' }} />
                    )}
                </span>
            </div>
        );
    };

    const bodyTemplate = (data: Demo.Currency, props: ColumnBodyOptions) => {
        return <span>{String(data[props.field])}</span>;
    };

    const handleEdit = (id: number) => {
        router.push(`/admin/currency/edit/${id}`);
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
                    await CurrencyService.deleteCurrency(id.toString());
                    setCurrencies(prev => prev.filter(c => c.id !== id));
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
            const response = await fetch('/api/saveCurrency', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCurrency),
            });

            if (!response.ok) {
                throw new Error('Error saving data');
            }

            const result = await response.json();
            setCurrencies([...currencies, newCurrency]);
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
            <CreateCurrencyDialog 
                visible={displayDialog} 
                onHide={() => setDisplayDialog(false)} 
                onSave={handleSave} 
                currency={newCurrency} 
                setCurrency={setNewCurrency} 
            />
            <div className="col-12">
                <div className="card">
                    <h1 className="text-4xl font-bold my-4">ລາຍງານສະກຸນເງິນ</h1>
                    <DataTable 
                        value={currencies} 
                        rows={10} 
                        paginator 
                        responsiveLayout="scroll" 
                        className="p-datatable-sm shadow-lg rounded-xl overflow-hidden"
                        tableStyle={{ minWidth: '50rem' }}
                        stripedRows
                        showGridlines
                        rowHover
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
                            style={{ width: '3%' }} 
                        />
                        <Column 
                            field="code" 
                            body={bodyTemplate} 
                            header="ລະຫັດສະກຸນ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%' }} 
                        />
                        <Column 
                            field="name" 
                            body={bodyTemplate} 
                            header="ຊື່ສະກຸນເງິນ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '15%' }} 
                        />
                        <Column 
                            field="rate" 
                            body={bodyTemplate} 
                            header="ເລດເງິນ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%' }} 
                        />
                        <Column 
                            headerStyle={{ width: '1%' }} 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            header="ການຈັດການ" 
                            bodyClassName="text-center py-3"
                            body={(rowData) => (
                                <SplitButton label="ລາຍລະອຽດ" icon="pi pi-check" model={items} className="p-button-sm" style={{ width: '140px' }} />
                            )} 
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default CurrencyPage;