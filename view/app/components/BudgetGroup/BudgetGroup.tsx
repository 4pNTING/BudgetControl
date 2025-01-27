import React from 'react';
import { Demo } from '@/types/demo';

interface BudgetGroupProps {
    budgetGroup: Demo.BudgetGroup;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const BudgetGroup: React.FC<BudgetGroupProps> = ({ budgetGroup, onEdit, onDelete }) => {
    return (
        <div className="p-card p-component p-shadow-2 p-mb-3">
            <div className="p-card-header">
                <h5 className="p-card-title">{budgetGroup.name}</h5>
            </div>
            <div className="p-card-body">
                <p><strong>ID:</strong> {budgetGroup.id}</p>
                <p><strong>Date:</strong> {budgetGroup.date}</p>
                <p><strong>Status:</strong> {budgetGroup.status}</p>
            </div>
            <div className="p-card-footer">
                <button className="p-button p-component p-button-text p-mr-2" onClick={() => onEdit(budgetGroup.id)}>Edit</button>
                <button className="p-button p-component p-button-text p-button-danger" onClick={() => onDelete(budgetGroup.id)}>Delete</button>
            </div>
        </div>
    );
};

export default BudgetGroup;