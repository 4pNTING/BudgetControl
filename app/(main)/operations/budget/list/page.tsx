'use client';

import { DemoService } from '@/public/demo/DemoService';
import Link from 'next/link';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { SplitButton } from 'primereact/splitbutton';
import React, { useEffect, useState } from 'react';

const BudgetListPage = () => {
    const [budgetList, setBudgetList] = useState(null);

    useEffect(() => {
        DemoService.getBudgets().then((data) => setBudgetList(data));

        initFilters();

    }, []);

    const bodyTemplate = (data: any, props: ColumnBodyOptions) => {
        return <>{data[props.field]}</>;
    };

    const priceBodyTemplate = (data: any) => {
        return (
            <>
                <span className="p-column-title">Total Amount</span>
                {formatNumber(data.totalAmount)}
            </>
        );
    };

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('en-US').format(value);
    };

    const statusBodyTemplate = (data: any) => {
        const statusClass = `status-badge status-${data.status.toLowerCase().replace(/\s+/g, '-')}`;

        return (
            <>
                <span className={statusClass}>{data.status}</span>
            </>
        );
    };

    const actionMenus = [
        {
            label: 'ແກ້ໄຂ',
            icon: 'pi pi-pencil'
        },
        {
            label: 'ຍົກເລີກ',
            icon: 'pi pi-times'
        }
    ];

    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [filters1, setFilters] = useState<DataTableFilterMeta>({});

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            'country.name': {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
            },
            balance: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
            },
            status: {
                operator: FilterOperator.OR,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
            },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS }
        });
        setGlobalFilterValue1('');
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        (_filters1['global'] as any).value = value;

        setFilters(_filters1);
        setGlobalFilterValue1(value);
    };

    const [date, setDate] = useState(null);

    const headerTemplate = (data: any) => {
        return (
            <React.Fragment>
                <span className="font-bold text-xl">ໝວດໝູ່: {data.budgetGroup}</span>
            </React.Fragment>
        );
    };


    const [scrollHeight, setScrollHeight] = useState('450px');


    return (
        <div className="grid">
            <div className="col-12">
                <h3>ຂໍ້ມູນແຜນງົບປະມານ</h3>

                <div className="card mt-4">
                    <div className="flex justify-content-between">
                        <div>
                            <Calendar appendTo={'self'} value={date} onChange={(e) => setDate(e.value)} view="year" dateFormat="yy" placeholder="ເລືອກປີ" />

                            <span className="p-input-icon-left ml-2">
                                <i className="pi pi-search" />
                                <InputText value={globalFilterValue1} onChange={onGlobalFilterChange} placeholder="ຄົ້ນຫາ" />
                            </span>
                        </div>
                        <div className='flex gap-2'>
                            <Link href="">
                                <Button type="button" icon="pi pi-print" label="ພິມ" severity="secondary" />
                            </Link>
                            <Link href="">
                                <Button type="button" icon="pi pi-paperclip" label="ແນບເອກະສານອະນຸມັດ" severity="success" />
                            </Link>
                            <Link href="/operations/budget/form">
                                <Button type="button" icon="pi pi-plus" label="ສ້າງແຜນງົບ" />
                            </Link>
                        </div>
                    </div>

                    <hr />

                    <DataTable value={budgetList} dataKey="id" size={'small'} rowGroupMode="subheader" groupRowsBy="budgetGroup" rowGroupHeaderTemplate={headerTemplate} scrollable scrollHeight="60vh" paginator rows={25} rowsPerPageOptions={[10, 25, 50, 100]}>
                        <Column field="id" body={bodyTemplate} header="#" alignHeader="center" align="center" />
                        <Column field="docYear" body={bodyTemplate} header="ປີງົບປະມານ" alignHeader="center" align="center" />
                        <Column field="budgetCode" body={bodyTemplate} header="ລະຫັດງົບ" />
                        <Column field="totalAmount" body={priceBodyTemplate} header="ຈຳນວນເງິນ (₭)" alignHeader="right" align="right" />
                        <Column field="status" body={statusBodyTemplate} header="ສະຖານະ" alignHeader="center" align="center" />
                        <Column field="createdAt" body={bodyTemplate} header="ວັນທີສ້າງ" alignHeader="center" align="center" />
                        <Column header="ຕົວເລືອກ" alignHeader="center" align="center" body={() => <SplitButton severity="secondary" label="ລາຍລະອຽດ" model={actionMenus}></SplitButton>} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default BudgetListPage;
