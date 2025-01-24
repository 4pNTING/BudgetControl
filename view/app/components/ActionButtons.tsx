import React from 'react';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { useRouter } from 'next/navigation';

interface ActionButtonsProps {
    rowData: any;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ rowData, onEdit, onDelete }) => {
    const router = useRouter();

    const handleEdit = () => {
        console.log('Edit button clicked for ID:', rowData.id); // Debug log
        router.push(`/admin/currency/edit/${rowData.id}`);
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
                className="p-button-rounded p-button-success hover:scale-110 transition-transform duration-200"
                tooltip="ແກ້ໄຂ"
                tooltipOptions={{ position: 'top' }}
                onClick={handleEdit}
            />
            <Button 
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger hover:scale-110 transition-transform duration-200"
                tooltip="ລົບ"
                tooltipOptions={{ position: 'top' }}
                onClick={handleDelete}
            />
        </div>
    );
};