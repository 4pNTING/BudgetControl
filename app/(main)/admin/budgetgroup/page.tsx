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
import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

const BudgetGroupPage = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const orderWeek = [
        { name: 'This Week', code: '1' },
        { name: 'Last Week', code: '0' }
    ];

    const [selectedOrderWeek, setSelectedOrderWeek] = useState(orderWeek[0]);
    const [budgetGroups, setBudgetGroups] = useState<Demo.BudgetGroup[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [filters, setFilters] = useState({});

    useEffect(() => {
        BudgetGroupService.getBudgetGroups().then((data) => setBudgetGroups(data));
        initFilters();
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

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            status: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
        });
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };
        (_filters['global'] as any).value = value;

        setFilters(_filters);
        setGlobalFilter(value);
    };

    const bodyTemplate = (data: Demo.BudgetGroup, props: ColumnBodyOptions) => {
        return <span>{String(data[props.field])}</span>;
    };

    const statusBodyTemplate = (data: Demo.BudgetGroup) => {
        return (
            <div className="flex justify-center">
                <span className={`budgetgroup-badge status-${data.status}`}>
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
            icon: 'pi pi-print'
        }, {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            separator: true
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash'
        },
    ];

    const renderHeader = () => {
        const handleReset = () => {
            setGlobalFilter('');
            initFilters();
        };

        return (
            <div className="flex justify-content-between align-items-center ">
                <h4 className="text-2xl font-bold text-center my-4">ໝວດໝູ່ງົບປະມານ</h4>
                <div className="flex justify-content-end items-center">
                    <Dropdown options={orderWeek} value={selectedOrderWeek} optionLabel="name" onChange={recentSales} style={{ width: '12rem' }} />
                    <span className="ml-2">
                        <InputText value={globalFilter || ''} onChange={onGlobalFilterChange} placeholder="ກະລຸນຫາປ້ອນຄຳຄົ້ນຫາ..." style={{ width: '300px' }} />
                        {globalFilter && (
                            <i className="pi pi-times" onClick={handleReset} style={{ cursor: 'pointer' }} />
                        )}
                    </span>
                </div>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card">
                    {header}
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
                        currentPageReportTemplate="ສະແດງ {first} ຫາ {last} of {totalRecords}"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]}
                        paginatorClassName="p-3 border-t bg-gray-50"
                        filters={filters}
                    >
                        <Column 
                            header="ລຳດັບ" 
                            body={(data, options) => <span>{options.rowIndex + 1}</span>} 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            style={{ width: '5%' }} 
                        />
                        <Column 
                            field="id" 
                            body={bodyTemplate} 
                            header="ລະຫັດງົບປະມານ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%' }} 
                        />
                        <Column 
                            field="name" 
                            body={bodyTemplate} 
                            header="ຊື່ງົບປະມານ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '30%' }} 
                        />
                        <Column 
                            field="date" 
                            body={bodyTemplate} 
                            header="ວັນ/ເດືອນ/ປີ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%' }} 
                        />
                        <Column 
                            field="status" 
                            body={statusBodyTemplate} 
                            header="ສະຖານະ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%' }} 
                        />
                        <Column 
                            headerStyle={{ width: '1%', textAlign: 'center' }} 
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

export default BudgetGroupPage;