'use client';

import { DemoService } from '@/public/demo/DemoService';
import { BudgetCode } from '@/types/core.types';
import { PrItem, UnitItem } from '@/types/operation.types';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Row } from 'primereact/row';
import { Tooltip } from 'primereact/tooltip';
import React, { useEffect, useState } from 'react';

const PettyCashFormPage = () => {
    const [prItems, setPrItems] = useState<PrItem[] | null>(null);
    const [budgetCodes, setBudgetCodes] = useState<BudgetCode[] | null>(null);
    const [unitItems, setUnitItems] = useState<UnitItem[] | null>(null);

    const [includeVAT, setIncludeVAT] = useState(false);
    const [value, setValue] = useState(1);
    const [unitPrice, setUnitPrice] = useState(null);
    const [ingredient, setIngredient] = useState('');
    const [selectedBudgetCode, setSelectedBudgetCode] = useState(null);
    const [selectedItemUnit, setSelectedItemUnit] = useState(null);

    useEffect(() => {
        DemoService.getPrItems().then((data) => setPrItems(data));
        DemoService.getBudgetCode().then((data) => setBudgetCodes(data));
        DemoService.getUnitItem().then((data) => setUnitItems(data));
    }, []);

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const subTotal = () => {
        if (!prItems) return 0;
        return prItems.reduce((total, item) => total + item.subtotal, 0);
    };

    const vat = includeVAT ? subTotal() * 0.1 : 0;
    const total = subTotal() + vat;

    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="ລວມເງິນ:" colSpan={6} align="right" className="text-lg font-bold white-space-nowrap" />
                <Column footer={formatNumber(subTotal())} align="right" className="text-lg font-bold" />
                <Column footer={null} />
                <Column footer={null} />
            </Row>
            <Row>
                <Column className="bg-white py-0 border-0"
                    footer={
                        <div className="text-center mt-5 py-0">
                            <Link href="/operations/pr/list">
                                <Button label="ຍົກເລີກ" icon="pi pi-times" outlined />
                            </Link>
                            <Button label="ບັນທຶກ" icon="pi pi-save" className="ml-2" />
                        </div>
                    }
                    colSpan={8}
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

    const budgetTemplate = (rowData: PrItem) => {
        return (
            <>
                <Tooltip target=".budgetCode-tooltip" />
                <span className="budgetCode-tooltip" data-pr-tooltip={rowData.budgetCode} data-pr-position="bottom">
                    {rowData.budgetCode}
                </span>
            </>
        );
    };

    const itemTemplate = (rowData: PrItem) => {
        return (
            <>
                <Tooltip target=".item-tooltip" />
                <span className="item-tooltip" data-pr-tooltip={rowData.item} data-pr-position="bottom">
                    {rowData.item}
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

    return (
        <div className="grid">
            <div className="col-12">
                <h3>ບັນທຶກທຸລະກຳເງິນສົດ</h3>

                <div className="card mb-3 pb-0">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-6">
                            <label htmlFor="title">ຫົວຂໍ້</label>
                            <InputText id="title" type="text" />
                        </div>
                        <div className="field col-6">
                            <label htmlFor="description">ລາຍລະອຽດ</label>
                            <InputText id="description" type="text" />
                        </div>
                    </div>
                </div>

                <div className="grid">
                    <div className="col-12 md:col-4">
                        <Fieldset legend="ປ້ອນຂໍ້ມູນການຊຳລະເງິນສົດ" className="h-full" toggleable>
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12">
                                    <label htmlFor="budgetCode">ລະຫັດງົບ</label>
                                    <Dropdown value={selectedBudgetCode} onChange={(e) => setSelectedBudgetCode(e.value)} options={budgetCodes} optionLabel="label"
                                        optionGroupLabel="label" optionGroupChildren="items" optionGroupTemplate={budgetItemTemplate} filter className="w-full" placeholder="ເລືອກ" />
                                </div>
                                <div className="field col-12">
                                    <label htmlFor="item">ລາຍການສິນຄ້າ</label>
                                    <InputText id="item" type="text" />
                                </div>

                                <div className="field col-12 md:col-5">
                                    <label htmlFor="quantity">ຈຳນວນ</label>
                                    <InputNumber
                                        id="quantity"
                                        value={value}
                                        onValueChange={(e: InputNumberValueChangeEvent) => setValue(e.value)}
                                        mode="decimal"
                                        showButtons
                                        min={1}
                                        max={100}
                                        decrementButtonClassName="p-button-secondary"
                                        incrementButtonClassName="p-button-secondary"
                                    />
                                </div>
                                <div className="field col-12 md:col-7">
                                    <label htmlFor="unit">ລາຄາຕໍ່ໜ່ວຍ</label>
                                    <InputNumber value={unitPrice} onValueChange={(e) => setUnitPrice(e.value)} />
                                </div>
                                <div className="field col-12">
                                    <label htmlFor="unit">ຫົວໜ່ວຍ</label>
                                    <Dropdown value={selectedItemUnit} onChange={(e) => setSelectedItemUnit(e.value)} options={unitItems} optionLabel="name"
                                        placeholder="ເລືອກ" className="w-full" filter />
                                </div>
                                <div className="field col-12 mt-5 md:mt-3">
                                    <Button label="ເພີ່ມລາຍການ" icon="pi pi-plus" severity="secondary" />
                                </div>
                            </div>
                        </Fieldset>
                    </div>

                    <div className="col-12 md:col-8">
                        <Fieldset legend="ລາຍການຊຳລະເງິນສົດ" className="h-full" toggleable>
                            <DataTable value={prItems} dataKey="id" size="small" scrollable scrollHeight="60vh" rows={5} footerColumnGroup={footerGroup} emptyMessage="ບໍ່ພົບລາຍການຂໍ້ມູນ">
                                <Column field="id" body={bodyTemplate} header="#" alignHeader="center" align="center" />
                                <Column field="budgetCode" body={budgetTemplate} header="ລະຫັດງົບ" style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
                                <Column field="item" body={itemTemplate} header="ລາຍການສິນຄ້າ" style={{ maxWidth: '190px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
                                <Column field="quantity" body={bodyTemplate} header="ຈຳນວນ" alignHeader="center" align="center" headerClassName="white-space-nowrap" />
                                <Column field="unit" body={bodyTemplate} header="ຫົວໜ່ວຍ" alignHeader="center" align="center" headerClassName="white-space-nowrap" />
                                <Column field="unitPrice" body={priceBodyTemplate} header="ລາຄາຕໍ່ໜ່ວຍ (₭)" alignHeader="right" align="right" headerClassName="white-space-nowrap" />
                                <Column field="subtotal" body={priceBodyTemplate} header="ລວມເງິນ (₭)" alignHeader="right" align="right" headerClassName="white-space-nowrap" className="font-semibold" />
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
                        </Fieldset>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PettyCashFormPage;
