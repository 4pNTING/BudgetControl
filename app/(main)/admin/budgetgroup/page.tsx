'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { BudgetGroupService } from '@/public/demo/BudgetGroupService';
import { Demo } from '@/types/demo';
import { LayoutContext } from '@/layout/context/layoutcontext';
import '@/assets/styles/scss/badges.scss';
import { ActionButtons } from '@/view/app/components/ActionButtons';

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
        return <>{String(data[props.field])}</>;
    };

    const statusBodyTemplate = (data: Demo.BudgetGroup) => {
      console.log('Status:', data.status); // Debug log
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

    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card">
                    <div className="flex justify-content-between align-items-center mb-4">
                        <h4 className="m-0">ໝວດໝູ່ງົບປະມານ</h4>
                        <Dropdown options={orderWeek} value={selectedOrderWeek} optionLabel="name" onChange={recentSales} style={{ width: '12rem' }} />
                    </div>

                    <p>Lorem Ipsum is simply dummy text</p>

                    <DataTable 
                        value={budgetGroups} 
                        rows={10} 
                        paginator 
                        responsiveLayout="scroll" 
                        className="p-datatable-gridlines "
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
                            style={{ width: '10%',  }} 
                        />
                        <Column 
                            field="id" 
                            body={bodyTemplate} 
                            header="ລະຫັດງົບປະມານ" 
                            headerClassName="bg-blue-600 text-white py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%',  }} 
                        />
                        <Column 
                            field="name" 
                            body={bodyTemplate} 
                            header="ຊື່ງົບປະມານ" 
                            headerClassName="bg-blue-600 text-white py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '30%'}} 
                        />
                        <Column 
                            field="date" 
                            body={bodyTemplate} 
                            header="ວັນ/ເດືອນ/ປີ" 
                            headerClassName="bg-blue-600 text-white py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%'}} 
                        />
                        <Column 
                            field="status" 
                            body={statusBodyTemplate} 
                            header="ສະຖານະ" 
                            headerClassName="bg-blue-600 text-white py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                            style={{ width: '10%'}} 
                        />
                        <Column 
                            headerStyle={{ width: '5%', textAlign: 'center' }} 
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

export default BudgetGroupPage;