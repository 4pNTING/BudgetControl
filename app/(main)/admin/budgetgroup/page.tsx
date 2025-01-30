'use client';
import { BudgetGroupDialog } from '@/view/app/components/BudgetGroup/BudgetGroup';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { DemoService } from '@/public/demo/DemoService';
import { Demo } from '@/types/demo';

import { LayoutContext } from '@/layout/context/layoutcontext';
import '@/assets/styles/scss/badges.scss';
import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Toast } from 'primereact/toast';

const BudgetGroupPage = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [displayDialog, setDisplayDialog] = useState(false);
    const toast = useRef<Toast>(null);
    const [loading, setLoading] = useState(false);

    const handleSave = (budgetGroup: Demo.BudgetGroup & { type: string; group: string; code: string }) => {
        // try {
        //     DemoService.addBudgetGroup(budgetGroup).then(() => {
        //         setDisplayDialog(false);
        //         DemoService.getBudgetGroups().then((data) => setBudgetGroups(data));
        //         toast.current?.show({
        //             severity: 'success',
        //             summary: 'ສຳເລັດ',
        //             detail: 'ບັນທຶກຂໍ້ມູນສຳເລັດ',
        //             life: 3000
        //         });
        //     });
        // } catch (error) {
        //     console.error('Save error:', error);
        //     toast.current?.show({
        //         severity: 'error',
        //         summary: 'ຜິດພາດ',
        //         detail: 'ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ',
        //         life: 3000
        //     });
        // }
    };

    const orderWeek = [
        { name: 'This Week', code: '1' },
        { name: 'Last Week', code: '0' }
    ];

    const [selectedOrderWeek, setSelectedOrderWeek] = useState(orderWeek[0]);
    const [budgetGroups, setBudgetGroups] = useState<Demo.BudgetGroup[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [filters, setFilters] = useState({});

    useEffect(() => {
        DemoService.getBudgetGroups().then((data) => setBudgetGroups(data));
        initFilters();
    }, []);

    const recentSales = (event: DropdownChangeEvent) => {
        if (event.value.code === '0') {
            DemoService.getBudgetGroups().then((data) => {
                setBudgetGroups(
                    data.sort((a: any, b: any) => b.id - a.id)
                );
            });
        } else {
            DemoService.getBudgetGroups().then((data) => setBudgetGroups(data));
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
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await DemoService.getBudgetGroups();
                console.log('Fetched budget groups:', data);
                setBudgetGroups(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        initFilters();
    }, []);

    const renderHeader = () => {
        const handleReset = () => {
            setGlobalFilter('');
            initFilters();
        };

        return (
            <div className="flex justify-between items-center mb-4 gap-2">
            <div className="flex items-center gap-4">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText 
                        value={globalFilter || ''} 
                        onChange={onGlobalFilterChange} 
                        placeholder="ກະລຸນຫາປ້ອນຄຳຄົ້ນຫາ..." 
                        style={{ width: '400px' }} 
                    />
                </span>
                {globalFilter && (
                    <i 
                        className="pi pi-times cursor-pointer" 
                        onClick={handleReset} 
                    />
                )}
            </div>
            <div className='flex justify-end gap-4'>
                <Button 
                    label="ເພີ່ມໝວດງົບປະມານ" 
                    icon="pi pi-plus" 
                    onClick={() => setDisplayDialog(true)} 
                    className="p-button-info"
                    style={{ width: '180px' }}
                />
            </div>
        </div>
        );
    };

    const header = renderHeader();

    return (
        <div className="grid p-fluid">
            <BudgetGroupDialog 
                visible={displayDialog}
                onHide={() => setDisplayDialog(false)}
                onSave={handleSave}
            />
            <div className="col-12">
                <div className="card">
                    {header}
                    <DataTable 
                        value={budgetGroups}
                        paginator 
                        rows={10}
                        dataKey="id"
                        loading={loading}
                        emptyMessage="ບໍ່ພົບຂໍ້ມູນ"
                        className="p-datatable-gridlines"
                        responsiveLayout="scroll"
                        tableStyle={{ minWidth: '50rem' }}
                        stripedRows
                        showGridlines
                        rowHover
                        filters={filters}
                        globalFilterFields={['type', 'group', 'code', 'name', 'description', 'status']}
                    >
                        <Column 
                            header="ລຳດັບ" 
                            body={(data, options) => <span>{options.rowIndex + 1}</span>} 
                            headerClassName="bg-gray-300 text-gray-700 py-3 font-semibold"
                            bodyClassName="py-3"
                            style={{ width: '5%' }} 
                        />
                        <Column 
                            field="type" 
                            body={bodyTemplate} 
                            header="ປະເພດງົບປະມານ" 
                            headerClassName="bg-gray-300 text-gray-700 py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '15%' }} 
                        />
                        <Column 
                            field="group" 
                            body={bodyTemplate} 
                            header="ກຸ່ມງົບປະມານ" 
                            headerClassName="bg-gray-300 text-gray-700 py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '15%' }} 
                        />
                        <Column 
                            field="code" 
                            body={bodyTemplate} 
                            header="ລະຫັດງົບປະມານ" 
                            headerClassName="bg-gray-300 text-gray-700 py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%' }} 
                        />
                        <Column 
                            field="name" 
                            body={bodyTemplate} 
                            header="ຊື່ງົບປະມານ" 
                            headerClassName="bg-gray-300 text-gray-700 py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '20%' }} 
                        />
                        <Column 
                            field="description" 
                            body={bodyTemplate} 
                            header="ລາຍລະອຽດງົບປະມານ" 
                            headerClassName="bg-gray-300 text-gray-700 py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '25%' }} 
                        />
                        <Column 
                            field="status" 
                            body={statusBodyTemplate} 
                            header="ສະຖານະ" 
                            headerClassName="bg-gray-300 text-gray-700 py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%' }} 
                        />
                        <Column 
                            headerStyle={{ width: '10%', textAlign: 'center' }} 
                            headerClassName="bg-gray-300 text-gray-700 py-3 font-semibold"
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

export default BudgetGroupPage;