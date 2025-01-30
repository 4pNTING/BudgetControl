'use client';

import { DemoService } from '@/public/demo/DemoService';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { SplitButton } from 'primereact/splitbutton';
import React, { useEffect, useState } from 'react';

const POPage = () => {
    const [poList, setPoList] = useState(null);

    useEffect(() => {
        DemoService.getPo().then((data) => setPoList(data));

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
        const statusClass = `status-badge status-${data.poStatus.toLowerCase().replace(/\s+/g, '-')}`;

        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={statusClass}>{data.poStatus}</span>
            </>
        );
    };

    const actionMenus = [
        {
            label: 'ພິມໃບ PO',
            icon: 'pi pi-print'
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
    const [selectedStatus, setSelectedStatus] = useState(null);
    const statuses = [
        { name: 'ALL', code: 'ALL' },
        { name: 'PENDING-PM', code: 'PENDING-PM' },
        { name: 'COMPLETED', code: 'COMPLETED' }
    ];

    return (
        <div className="grid">
            <div className="col-12">
                <h3>ຂໍ້ມູນການສັ່ງຊື້ (PO)</h3>

                <div className="card mt-4">
                    <div className="flex gap-2">
                        <Calendar appendTo="self" value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="mm/yy" placeholder="ເລືອກເດືອນ" />
                        <Dropdown appendTo="self" value={selectedStatus} onChange={(e) => setSelectedStatus(e.value)} options={statuses} optionLabel="name" placeholder="ເລືອກສະຖານະ" className="w-full md:w-14rem" />
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={globalFilterValue1} onChange={onGlobalFilterChange} placeholder="ຄົ້ນຫາ" />
                        </span>
                    </div>

                    <hr />

                    <DataTable value={poList} dataKey="id" size={'small'} scrollable scrollHeight="60vh" paginator rows={25} rowsPerPageOptions={[10, 25, 50, 100]}>
                        <Column field="id" body={bodyTemplate} header="#" alignHeader="center" align="center"/>
                        <Column field="createdAt" body={bodyTemplate} header="ວັນທີສ້າງ PC" alignHeader="center" align="center"/>
                        <Column field="prNo" body={bodyTemplate} header="ໝາຍເລກ PO" alignHeader="center" align="center"/>
                        <Column field="title" body={bodyTemplate} header="ຫົວຂໍ້" />
                        <Column field="supplier" body={bodyTemplate} header="ຜູ້ສະໜອງ" />
                        <Column field="totalAmount" body={priceBodyTemplate} header="ຈຳນວນເງິນ (₭)" alignHeader="right" align="right"/>
                        <Column field="prStatus" body={statusBodyTemplate} header="ສະຖານະ" alignHeader="center" align="center" />
                        <Column header="ຕົວເລືອກ" alignHeader="center" align="center" body={() => <SplitButton severity="secondary" label="ລາຍລະອຽດ" model={actionMenus}></SplitButton>} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default POPage;
