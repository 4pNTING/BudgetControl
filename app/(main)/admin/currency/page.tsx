'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { CurrencyService } from '@/public/demo/CurrencyService';
import { Demo } from '@/types/demo';
import { LayoutContext } from '@/layout/context/layoutcontext';
import '@/assets/styles/scss/badges.scss';
import { ActionButtons } from '@/view/app/components/ActionButtons';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const CurrencyPage = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [currencies, setCurrencies] = useState<Demo.Currency[]>([]);
const router = useRouter();
    const toast = useRef<Toast>(null);
    useEffect(() => {
        CurrencyService.getCurrencies().then((data) => setCurrencies(data));
    }, []);


    

    const bodyTemplate = (data: Demo.Currency, props: ColumnBodyOptions) => {
        return <>{String(data[props.field])}</>;
    };

    const statusBodyTemplate = (data: Demo.Currency) => {
        console.log('Status Data:', data.status); // Debug log
        return (
            <div className="flex justify-center">
                <span className={`currency-badge status-${data.status.toLowerCase()}`}>
                    {data.status}
                </span>
            </div>
        );
    };

    const handleEdit = (id: number) => {
        console.log('Edit:', id);
        // Add your edit logic here
    };

    const handleDelete = (id: number) => {
        console.log('Delete:', id);
        // Add your delete logic here
    };

    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card">
                    <div className="flex justify-content-between align-items-center mb-4">
                        <h4 className="m-0">ສະກຸນເງິນ</h4>
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
                            body={(data, options) => options.rowIndex + 1} 
                            headerClassName="bg-blue-600 text-white py-3 font-semibold"
                            bodyClassName="py-3"
                            style={{ width: '6%', minWidth: '6rem' }} 
                        />
                        <Column 
                            field="code" 
                            body={bodyTemplate} 
                            header="ລະຫັດ" 
                            headerClassName="bg-blue-600 text-white py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%', minWidth: '6rem' }} 
                        />
                        <Column 
                            field="name" 
                            body={bodyTemplate} 
                            header="ຊື່ສະກຸນເງິນ" 
                            headerClassName="bg-blue-600 text-white py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '25%', minWidth: '10rem' }} 
                        />
                        <Column 
                            field="rate" 
                            body={bodyTemplate} 
                            header="ອັດຕາແລກປ່ຽນ" 
                            headerClassName="bg-blue-600 text-white py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%', minWidth: '8rem' }} 
                        />
                        <Column 
                            field="status" 
                            body={statusBodyTemplate} 
                            header="ສະຖານະ" 
                            headerClassName="bg-blue-600 text-white py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%', minWidth: '8rem' }} 
                        />
                        <Column 
                            headerStyle={{ width: '7%', minWidth: '6rem' }} 
                            headerClassName="bg-blue-600 text-white py-3 font-semibold"
                            header="Action" 
                            bodyClassName="text-center py-3"
                            body={(rowData) => (
                                <ActionButtons 
                                    rowData={rowData}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            )} 
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default CurrencyPage;