import React from 'react';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

interface ActionButtonsProps {
    rowData: any;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ rowData, onEdit, onDelete }) => {
    const handleEdit = () => {
        onEdit(rowData.id);
    };

    const handleDelete = () => {
        confirmDialog({
            message: 'ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບຂໍ້ມູນນີ້?',
            header: 'ຢືນຢັນການລົບ',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'ຢືນຢັນ',
            rejectLabel: 'ຍົກເລີກ',
            accept: () => onDelete(rowData.id)
        });
    };

    return (
        <div className="flex justify-center items-center gap-2">
            <Button 
                icon="pi pi-pencil"
                severity="success"
                tooltip="ແກ້ໄຂ"
                tooltipOptions={{ position: 'top' }}
                className="p-button-rounded p-button-success hover:scale-110 transition-transform duration-200"
                onClick={handleEdit}
            />
            <Button 
                icon="pi pi-trash"
                severity="danger"
                tooltip="ລົບ"
                tooltipOptions={{ position: 'top' }}
                className="p-button-rounded p-button-danger hover:scale-110 transition-transform duration-200"
                onClick={handleDelete}
            />
        </div>
    );
};