'use client';

import { DemoService } from '@/public/demo/DemoService';
import { BudgetCode } from '@/types/core.types';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { InputNumber } from 'primereact/inputnumber';
import { Row } from 'primereact/row';
import { Tooltip } from 'primereact/tooltip';
import React, { useEffect, useState } from 'react';

const BudgetFormPage = () => {
    const [budgetList, setBudgetList] = useState<any[] | null>(null);
    const [budgetCodes, setBudgetCodes] = useState<BudgetCode[] | null>(null);
    const [selectedBudgetCode, setSelectedBudgetCode] = useState(null);
    const [unitPrice, setUnitPrice] = useState(null);

    useEffect(() => {
        DemoService.getBudgets().then((data) => setBudgetList(data));
        DemoService.getBudgetCode().then((data) => setBudgetCodes(data));
    }, []);

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const subTotal = () => {
        if (!budgetList) return 0;
        return budgetList.reduce((total, item) => total + item.totalAmount, 0);
    };

    const total = subTotal();

    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="ລວມເງິນທັງໝົດ:" colSpan={2} align="right" className="text-lg font-bold white-space-nowrap" />
                <Column footer={formatNumber(subTotal())} align="right" className="text-lg font-bold" />
                <Column footer={null} />
            </Row>
            <Row>
                <Column
                    footer={
                        <div className="text-center">
                            <Link href="/operations/budget/list">
                                <Button label="ຍົກເລີກ" icon="pi pi-times" outlined />
                            </Link>
                            <Button label="ບັນທຶກ" icon="pi pi-save" className="ml-2" />
                        </div>
                    }
                    colSpan={4}
                    align="center"
                />
            </Row>
        </ColumnGroup>
    );

    const bodyTemplate = (data: any, props: ColumnBodyOptions) => {
        return <>{data[props.field]}</>;
    };

    const priceBodyTemplate = (data: any, props: ColumnBodyOptions) => {
        const value = data[props.field];
        return <div className="text-right">{formatNumber(value)}</div>;
    };

    const budgetTemplate = (rowData: any) => {
        return (
            <>
                <Tooltip target=".budgetCode-tooltip" />
                <span className="budgetCode-tooltip" data-pr-tooltip={rowData.budgetCode} data-pr-position="bottom">
                    {rowData.budgetCode}
                </span>
            </>
        );
    };


    const budgetItemTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div className="text-xl font-semibold">{option.label}</div>
            </div>
        );
    };

    const headerTemplate = (data: any) => {
        return (
            <React.Fragment>
                <span className="font-bold text-xl">ໝວດໝູ່ງົບ: {data.budgetGroup}</span>
            </React.Fragment>
        );
    };

    return (
        <div className="grid">
            <div className="col-12">
                <h3>ສ້າງແຜນງົບປະມານ</h3>

                <div className="grid">
                    <div className="col-12">
                        <div className="card pb-0 mb-3">
                            <div className="p-fluid formgrid grid gap-2">
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="budgetCode">ລະຫັດງົບ</label>
                                    <Dropdown value={selectedBudgetCode} onChange={(e) => setSelectedBudgetCode(e.value)} options={budgetCodes} optionLabel="label"
                                        optionGroupLabel="label" optionGroupChildren="items" optionGroupTemplate={budgetItemTemplate} filter className="w-full" placeholder="ເລືອກ" />
                                </div>
                                <div className="field col-12 md:col-4">
                                    <label htmlFor="unit">ຕົວເລກແຜນງົບ</label>
                                    <InputNumber value={unitPrice} onValueChange={(e) => setUnitPrice(e.value)} />
                                </div>
                                <div className="field flex align-items-end">
                                    <Button label="ເພີ່ມລາຍການ" icon="pi pi-plus" severity="secondary" />
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <DataTable value={budgetList} dataKey="id" size="small" rowGroupMode="subheader" groupRowsBy="budgetGroup" rowGroupHeaderTemplate={headerTemplate} scrollable scrollHeight="60vh" rows={5} footerColumnGroup={footerGroup} emptyMessage="ບໍ່ພົບລາຍການຂໍ້ມູນ">
                                <Column field="id" body={bodyTemplate} header="#" alignHeader="center" align="center" />
                                <Column field="budgetCode" body={budgetTemplate} header="ລະຫັດງົບ" />
                                <Column field="totalAmount" body={priceBodyTemplate} header="ຕົວເລກແຜນງົບ (₭)" alignHeader="right" align="right" className="font-semibold" />
                                <Column
                                    className="white-space-nowrap"
                                    align="right"
                                    body={() => (
                                        <>
                                            <Button icon="pi pi-times" severity="danger" size="small" className="ml-2" />
                                        </>
                                    )}
                                />
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetFormPage;
