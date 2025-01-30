import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { FaLayerGroup, FaCheckCircle, FaCode, FaList, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { DemoService } from '@/public/demo/DemoService';
import type { Demo } from '@/types';

export interface BudgetGroupDialogProps {
    visible: boolean;
    onHide: () => void;
    onSave: (budgetGroup: Demo.BudgetGroupCB) => void;
}

interface GroupBudgetOption {
    label: string;
    code: string;
    items: { label: string; value: string }[];
}

export const BudgetGroupDialog: React.FC<BudgetGroupDialogProps> = ({ visible, onHide, onSave }) => {
    const [submitted, setSubmitted] = useState(false);
    const [groupOptions, setGroupOptions] = useState<GroupBudgetOption[]>([]);
    const [codeOptions, setCodeOptions] = useState<{ label: string; value: string }[]>([]);
    const [budgetGroup, setBudgetGroup] = useState<Demo.BudgetGroup>({
        type: '',
        group: '',
        code: '',
        name: '',
        description: '',
        status: 'ACTIVE'
    });
    const toast = useRef<Toast>(null);

    const statuses = [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Inactive', value: 'INACTIVE' }
    ];

    const resetForm = () => {
        setBudgetGroup({
            type: '',
            group: '',
            code: '',
            name: '',
            description: '',
            status: 'ACTIVE'
        });
        setSubmitted(false);
    };

    useEffect(() => {
        if (!visible) {
            resetForm();
        }
    }, [visible]);

    const handleHide = () => {
        resetForm();
        onHide();
    };

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const data = await DemoService.getGroupData();
                const options = data.map(group => ({
                    label: `${group.label} - ${group.code}`,
                    code: group.code,
                    items: group.items
                }));
                setGroupOptions(options);
            } catch (error) {
                console.error('Error fetching groups:', error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'ຜິດພາດ',
                    detail: 'ບໍ່ສາມາດດຶງຂໍ້ມູນກຸ່ມງົບປະມານໄດ້',
                    life: 3000
                });
            }
        };
        fetchGroups();
    }, []);

    const handleGroupChange = (e: any) => {
        const selectedGroup = groupOptions.find(group => group.code === e.value);
        setBudgetGroup({ ...budgetGroup, group: e.value, code: '' });
        setCodeOptions(selectedGroup ? selectedGroup.items : []);
    };

    const dialogFooter = (
        <div className="p-d-flex p-jc-end">
            <Button label="ບັນທຶກ" icon="pi pi-download" onClick={() => { setSubmitted(true); onSave(budgetGroup); }} />
            <Button 
                label="ຍົກເລິກ" 
                icon={<FaTimes className="mr-2" />} 
                onClick={handleHide} 
                className="p-button-secondary" 
            />
        </div>
    );

    return (
        <>
            <Toast ref={toast} />
            <Dialog 
                header="ເພີ່ມໝວດໝູ່ງົບປະມານ" 
                visible={visible} 
                style={{ width: '600px' }} 
                modal 
                className="p-fluid shadow-lg"
                footer={dialogFooter} 
                onHide={onHide}
                headerStyle={{ background: 'linear-gradient(to right, #00c6ff, #0072ff)' }} // Change to blue gradient
            >
                <div className="grid p-fluid mt-4">
                    <div className="field col-12">
                        <label htmlFor="type">ປະເພດງົບປະມານ</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <FaList className="text-blue-500 hover:text-blue-600" />
                            </span>
                            <InputText 
                                id="type"
                                value={budgetGroup.type}
                                onChange={(e) => setBudgetGroup({...budgetGroup, type: e.target.value})}
                                className={classNames({ 'p-invalid': submitted && !budgetGroup.type })}
                                placeholder="ກະລຸນາປ້ອນປະເພດງົບປະມານ"
                            />
                        </div>
                        {submitted && !budgetGroup.type && <small className="p-error">ກະລຸນາປ້ອນປະເພດງົບປະມານ</small>}
                    </div>

                    <div className="field col-12">
                        <label htmlFor="group">ກຸ່ມງົບປະມານ</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <FaLayerGroup className="text-green-500 hover:text-green-600" />
                            </span>
                            <Dropdown
                                id="group"
                                value={budgetGroup.group}
                                options={groupOptions}
                                optionLabel="label"
                                optionValue="code"
                                onChange={handleGroupChange}
                                className={classNames({ 'p-invalid': submitted && !budgetGroup.group })}
                                placeholder="ກະລຸນາເລືອກກຸ່ມງົບປະມານ"
                                panelClassName="text-black bg-white" // Ensure the dropdown options text color is black and background is white
                            />
                        </div>
                    </div>

                    <div className="field col-12">
                        <label htmlFor="code">ລະຫັດງົບປະມານ</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <FaCode className="text-purple-500 hover:text-purple-600" />
                            </span>
                            <Dropdown 
                                id="code"
                                value={budgetGroup.code}
                                options={codeOptions}
                                optionLabel="label"
                                optionValue="value"
                                onChange={(e) => setBudgetGroup({...budgetGroup, code: e.value})}
                                className={classNames({ 'p-invalid': submitted && !budgetGroup.code })}
                                placeholder="ກະລຸນາເລືອກລະຫັດງົບປະມານ"
                                panelClassName="text-black bg-white" // Ensure the dropdown options text color is black and background is white
                            />
                        </div>
                    </div>

                    <div className="field col-12">
                        <label htmlFor="status">ສະຖານະ</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <FaCheckCircle className="text-orange-500 hover:text-orange-600" />
                            </span>
                            <Dropdown
                                id="status"
                                value={budgetGroup.status}
                                options={statuses}
                                onChange={(e) => setBudgetGroup({...budgetGroup, status: e.value})}
                                className={classNames({ 'p-invalid': submitted && !budgetGroup.status })}
                                placeholder="ກະລຸນາເລືອກສະຖານະ"
                            />
                        </div>
                    </div>

                    <div className="field col-12">
                        <label htmlFor="description">ລາຍລະອຽດງົບປະມານ</label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <FaInfoCircle className="text-cyan-500 hover:text-cyan-600" />
                            </span>
                            <InputTextarea 
                                id="description"
                                value={budgetGroup.description}
                                onChange={(e) => setBudgetGroup({...budgetGroup, description: e.target.value})}
                                rows={3}
                                className={classNames({ 'p-invalid': submitted && !budgetGroup.description })}
                                placeholder="ກະລຸນາປ້ອນລາຍລະອຽດງົບປະມານ"
                            />
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
};