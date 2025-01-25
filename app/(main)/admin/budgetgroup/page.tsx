'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { BudgetGroupService } from '@/public/demo/service/BudgetGroupService';
import { Demo } from '@/types/demo';
import { LayoutContext } from '@/layout/context/layoutcontext';
import '@/assets/styles/scss/badges.scss';
import { ActionButtons } from '@/view/app/components/ActionButtons';
import { SplitButton } from 'primereact/splitbutton';

const BudgetGroupPage = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const orderWeek = [
        { name: 'This Week', code: '1' },
        { name: 'Last Week', code: '0' }
    ];

    const [selectedOrderWeek, setSelectedOrderWeek] = useState(orderWeek[0]);
    const [budgetGroups, setBudgetGroups] = useState<Demo.BudgetGroup[]>([]);

    useEffect(() => {
        BudgetGroupService.getBudgetGroups().then((data) => setBudgetGroups(data));
    }, []);

    const recentSales = (event: DropdownChangeEvent) => {
        if (event.value.code === '0') {
            BudgetGroupService.getBudgetGroups().then((data) => {
                setBudgetGroups(
                    data.sort((a: any, b: any) => b.id - a.id)
                );
            });
        } else {
            BudgetGroupService.getBudgetGroups().then((data) => setBudgetGroups(data));
        }
        setSelectedOrderWeek(event.value);
    };

    const bodyTemplate = (data: Demo.BudgetGroup, props: ColumnBodyOptions) => {
        return <span style={{ fontSize: '12px' }}>{String(data[props.field])}</span>;
    };

    const statusBodyTemplate = (data: Demo.BudgetGroup) => {
        console.log('Status:', data.status); // Debug log
        return (
            <div className="flex justify-center">
                <span className={`budgetgroup-badge status-${data.status}`} style={{ fontSize: '12px' }}>
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
            <div className="col-12">
                <div className="card">
                    <div className="flex justify-content-between align-items-center mb-4">
                        <h4 className="m-0" style={{ fontSize: '12px' }}>ໝວດໝູ່ງົບປະມານ</h4>
                        <Dropdown options={orderWeek} value={selectedOrderWeek} optionLabel="name" onChange={recentSales} style={{ width: '12rem', fontSize: '12px' }} />
                    </div>

                    <DataTable 
                        value={budgetGroups} 
                        rows={10} 
                        paginator 
                        responsiveLayout="scroll" 
                        className="p-datatable-gridlines"
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
                            body={(data, options) => <span style={{ fontSize: '12px' }}>{options.rowIndex + 1}</span>} 
                            headerClassName="bg-primary text-white py-3 font-semibold"
                            bodyClassName="py-3"
                            style={{ width: '10%', fontSize: '12px' }} 
                        />
                        <Column 
                            field="id" 
                            body={bodyTemplate} 
                            header="ລະຫັດງົບປະມານ" 
                            headerClassName="bg-primary text-white py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%', fontSize: '12px' }} 
                        />
                        <Column 
                            field="name" 
                            body={bodyTemplate} 
                            header="ຊື່ງົບປະມານ" 
                            headerClassName="bg-primary text-white py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '30%', fontSize: '12px' }} 
                        />
                        <Column 
                            field="date" 
                            body={bodyTemplate} 
                            header="ວັນ/ເດືອນ/ປີ" 
                            headerClassName="bg-primary text-white py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%', fontSize: '12px' }} 
                        />
                        <Column 
                            field="status" 
                            body={statusBodyTemplate} 
                            header="ສະຖານະ" 
                            headerClassName="bg-primary text-white py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%', fontSize: '12px' }} 
                        />
                        <Column 
                            headerStyle={{ width: '10%', textAlign: 'center', fontSize: '12px' }} 
                            headerClassName="bg-primary text-white py-3 font-semibold"
                            header="Action" 
                            bodyClassName="text-center py-3"
                            body={(rowData) => (
                                <SplitButton label="Save" icon="pi pi-check" model={items} color="primary" style={{ fontSize: '12px' }}></SplitButton>
                            )} 
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default BudgetGroupPage;