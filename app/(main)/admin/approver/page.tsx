'use client'
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { ApproverService } from '@/public/demo/service/ApproverService';
import { Demo } from '@/types/demo';
import { LayoutContext } from '@/layout/context/layoutcontext';
import '@/assets/styles/scss/badges.scss';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import AddApproverDialog from '@/view/app/components/Approver/AddApproverDialog';
import { LuPlus } from "react-icons/lu";
import { Menu } from 'primereact/menu';
import { ContextMenu } from 'primereact/contextmenu';

const ApproverPage = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [approvers, setApprovers] = useState<Demo.Approver[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [filters, setFilters] = useState({});
    const [displayDialog, setDisplayDialog] = useState(false);
    const [newApprover, setNewApprover] = useState<Demo.Approver>({} as Demo.Approver);
    const router = useRouter();
    const [totalRecords, setTotalRecords] = useState(0);
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(0);
    const toast = useRef<Toast>(null);
    const menu = useRef<Menu>(null);
    const contextMenu = useRef<ContextMenu>(null);

    const overlayMenuItems = [
        {
            label: 'Save',
            icon: 'pi pi-save'
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash'
        },
        {
            separator: true
        },
        {
            label: 'Home',
            icon: 'pi pi-home'
        }
    ];
    const contextMenuItems = [
        {
            label: 'Save',
            icon: 'pi pi-save'
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash'
        },
        {
            separator: true
        },
        {
            label: 'Options',
            icon: 'pi pi-cog'
        }
    ];

    const onContextRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        contextMenu.current?.show(event);
    };

    useEffect(() => {
        const fetchApprovers = async () => {
            try {
                const data = await ApproverService.getApprovers();
                setApprovers(data);
                setTotalRecords(data.length);
            } catch (error) {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to fetch approvers' });
            }
        };

        fetchApprovers();
        initFilters();
    }, []);

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            phone: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            department: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            role: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
        });
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };
        (_filters['global'] as any).value = value;

        setFilters(_filters);
        setGlobalFilter(value);
    };

    const renderHeader = () => {
        const handleReset = () => {
            setGlobalFilter('');
            initFilters();
        };

        return (
            <div className="flex justify-content-end items-center">
                <Button label="ເພິ່ມຜູ້ອະນຸມັດ" icon={<LuPlus />} onClick={() => setDisplayDialog(true)} style={{ width: '200px', marginRight: '1rem' }} />
                <span className="">
                   
                    <InputText value={globalFilter || ''} onChange={onGlobalFilterChange} placeholder="ກະລຸນາປ້ອນຄຳຄົ້ນຫາ..." style={{ width: '300px' }} />
                    {globalFilter && (
                        <i className="pi pi-times" onClick={handleReset} style={{ cursor: 'pointer' }} />
                    )}
                </span>
            </div>
        );
    };

    const bodyTemplate = (data: Demo.Approver, props: ColumnBodyOptions) => {
        return <span>{String(data[props.field])}</span>;
    };

    const handleEdit = (id: number) => {
        router.push(`/admin/approver/edit/${id}`);
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
                    await ApproverService.deleteApprover(id);
                    setApprovers(prev => prev.filter(a => a.id !== id));
                    toast.current?.show({ 
                        severity: 'success', 
                        summary: 'Success', 
                        detail: 'Record deleted successfully' 
                    });
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

    const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        menu.current?.toggle(event);
    };

    const handleSave = async () => {
        try {
            const response = await fetch('/api/saveApprover', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newApprover),
            });

            if (!response.ok) {
                throw new Error('Error saving data');
            }

            const result = await response.json();
            setApprovers([...approvers, newApprover]);
            setDisplayDialog(false);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: result.message });
        } catch (error) {
            console.error('Error:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving the data.' });
        }
    };

    const header = renderHeader();

    return (
        <div className="grid p-fluid">
            <Toast ref={toast} />
            <ConfirmDialog />
            <AddApproverDialog 
                visible={displayDialog} 
                onHide={() => setDisplayDialog(false)} 
                onSave={handleSave} 
                approver={newApprover} 
                setApprover={setNewApprover} 
            />
            <div className="col-12">
                <div className="card">
                    <div className="flex justify-content-between align-items-center mb-4">
                        <h1 className="m-0 text-3xl">ຜູ້ອະນຸມັດ</h1>
                    </div>
                    <DataTable 
                     value={approvers} 
                     rows={10} 
                     paginator 
                     responsiveLayout="scroll" 
                     className="p-datatable-sm shadow-lg rounded-xl overflow-hidden"
                     tableStyle={{ minWidth: '50rem' }}
                     stripedRows
                     showGridlines
                     rowHover
                     filters={filters}
                     header={header}
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                     paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                     rowsPerPageOptions={[10, 25, 50]}
                     paginatorClassName="p-3 border-t bg-gray-50"
                    >
                        <Column 
                            header="ລຳດັບ" 
                            body={(data, options) => <span>{options.rowIndex + 1}</span>} 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            style={{ width: '6%', minWidth: '6rem' }} 
                        />
                        <Column 
                            field="name" 
                            body={bodyTemplate} 
                            header="ຊື່" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                          
                            style={{ width: '18%', minWidth: '10rem' }} 
                        />
                        <Column 
                            field="email" 
                            body={bodyTemplate} 
                            header="ອີເມວ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                          
                            style={{ width: '18%', minWidth: '10rem' }} 
                        />
                        <Column 
                            field="phone" 
                            body={bodyTemplate} 
                            header="ເບີໂທ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                         
                            style={{ width: '12%', minWidth: '8rem' }} 
                        />
                        <Column 
                            field="department" 
                            body={bodyTemplate} 
                            header="ພະແນກ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                           
                            style={{ width: '12%', minWidth: '8rem' }} 
                        />
                        <Column 
                            field="role" 
                            body={bodyTemplate} 
                            header="ບົດບາດ" 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            bodyClassName="py-3"
                            sortable 
                          
                            style={{ width: '12%', minWidth: '8rem' }} 
                        />
                        <Column 
                            headerStyle={{ width: '10%', minWidth: '6rem' }} 
                            headerClassName="bg-white text-black py-3 font-semibold"
                            header="ການກະທຳ" 
                            bodyClassName="text-center py-3"
                            body={(rowData) => (
                                <SplitButton label="ລາຍລະອຽດ" icon="pi pi-check" model={items} className="p-button-sm" style={{ width: '150px' }} />
                            )} 
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default ApproverPage;