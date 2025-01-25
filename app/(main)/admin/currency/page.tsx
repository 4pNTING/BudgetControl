'use client'
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { CurrencyService } from '@/public/demo/service/CurrencyService';
import { Demo } from '@/types/demo';
import { LayoutContext } from '@/layout/context/layoutcontext';
import '@/assets/styles/scss/badges.scss';
import { ActionButtons } from '@/view/app/components/ActionButtons';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { SplitButton } from 'primereact/splitbutton';

const CurrencyPage = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [currencies, setCurrencies] = useState<Demo.Currency[]>([]);
    const router = useRouter();
    const toast = useRef<Toast>(null);

    useEffect(() => {
        CurrencyService.getCurrencies().then((data) => setCurrencies(data));
    }, []);

    const bodyTemplate = (data: Demo.Currency, props: ColumnBodyOptions) => {
        return <span className="text-lg">{String(data[props.field])}</span>;
    };

    const statusBodyTemplate = (data: Demo.Currency) => {
        return (
            <div className="flex justify-center">
                <span className={`currency-badge status-${data.status.toLowerCase()} text-lg`}>
                    {data.status}
                </span>
            </div>
        );
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
                    const deleted = await CurrencyService.deleteCurrency(String(id));
                    if (deleted) {
                        setCurrencies(prev => prev.filter(c => c.id !== id));
                        toast.current?.show({ 
                            severity: 'success', 
                            summary: 'Success', 
                            detail: 'Record deleted successfully' 
                        });
                    }
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

    return (
        <div className="grid p-fluid">
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="col-12">
                <div className="card">
                    <div className="flex justify-content-between align-items-center mb-4">
                        <h1 className="m-0 text-3xl">ໝວດໝູ່ສະກຸນເງິນ</h1>
                    </div>

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
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]}
                        paginatorClassName="p-3 border-t bg-gray-50"
                    >
                        <Column 
                            header="ລຳດັບ" 
                            body={(data, options) => <span className="text-lg">{options.rowIndex + 1}</span>} 
                            headerClassName="bg-primary text-white py-3 font-semibold text-lg"
                            bodyClassName="py-3"
                            style={{ width: '6%', minWidth: '6rem' }} 
                        />
                        <Column 
                            field="code" 
                            body={bodyTemplate} 
                            header="ລະຫັດສະກຸນ" 
                            headerClassName="bg-primary text-white py-3 font-semibold text-lg"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%', minWidth: '6rem' }} 
                        />
                        <Column 
                            field="name" 
                            body={bodyTemplate} 
                            header="ຊື່ສະກຸນເງິນ" 
                            headerClassName="bg-primary text-white py-3 font-semibold text-lg"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '25%', minWidth: '10rem' }} 
                        />
                        <Column 
                            field="rate" 
                            body={bodyTemplate} 
                            header="ເລດເງິນ" 
                            headerClassName="bg-primary text-white py-3 font-semibold text-lg"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%', minWidth: '8rem' }} 
                        />
                        <Column 
                            field="status" 
                            body={statusBodyTemplate} 
                            header="ສະຖານະ" 
                            headerClassName="bg-primary text-white py-3 font-semibold text-lg"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%', minWidth: '8rem' }} 
                        />
                        <Column 
                            headerStyle={{ width: '7%', minWidth: '6rem' }} 
                            headerClassName="bg-primary text-white py-3 font-semibold text-lg"
                            header="ການກະທຳ" 
                            bodyClassName="text-center py-3"
                            body={(rowData) => (
                                <SplitButton label="Save" icon="pi pi-check" model={items} color="primary"></SplitButton>
                            )} 
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default CurrencyPage;