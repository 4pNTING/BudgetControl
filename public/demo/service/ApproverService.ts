import { Demo } from '@/types/demo';

export class ApproverService {
    static async getApprovers(): Promise<Demo.Approver[]> {
        const response = await fetch('../demo/Approvers.json', {
            headers: { 'Cache-Control': 'no-cache' }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch approvers');
        }
        return await response.json();
    }

    static async saveApprover(approver: Demo.Approver): Promise<Demo.Approver> {
        const response = await fetch('/api/approvers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(approver),
        });
        if (!response.ok) {
            throw new Error('Failed to save approver');
        }
        return await response.json();
    }

    static async deleteApprover(id: number): Promise<void> {
        const response = await fetch(`/api/approvers/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete approver');
        }
    }
}