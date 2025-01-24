import { MenuModal } from '@/types/layout';
import AppSubMenu from './AppSubMenu';

const AppMenu = () => {
    const model: MenuModal[] = [
        {
            label: 'ເມນູຫຼັກ',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'ໜ້າຫຼັກ',
                    icon: 'pi pi-fw pi-home',
                    to: '/'
                },
                {
                    label: 'ການຂໍຊື້ (PR)',
                    icon: 'pi pi-fw pi-file-edit',
                    to: '/dashboard-banking'
                },
                {
                    label: 'ການສົມທຽບລາຄາ (PC)',
                    icon: 'pi pi-fw pi-arrow-right-arrow-left',
                    to: '/dashboard-banking'
                },
                {
                    label: 'ໃບສັ່ງຊື້ (PO)',
                    icon: 'pi pi-fw pi-file-export',
                    to: '/dashboard-banking'
                },
                {
                    label: 'ການຊຳລະເງິນ (PM)',
                    icon: 'pi pi-fw pi-credit-card',
                    to: '/dashboard-banking'
                },
                {
                    label: 'ທະລຸກຳເງິນສົດ (Petty Cash)',
                    icon: 'pi pi-fw pi-briefcase',
                    to: '/dashboard-banking'
                },
                {
                    label: 'ຂຶ້ນແຜນງົບປະມານ',
                    icon: 'pi pi-fw pi-calendar-minus',
                    to: '/dashboard-banking'
                },
            ]
        },
        { separator: true },
        {
            label: 'ຂໍ້ມູນລະບົບ',
            icon: 'pi pi-th-large',
            items: [
                {
                    label: 'ໝວດໝູ່ງົບປະມານ',
                    icon: 'pi pi-fw pi-th-large',
                    to: '/admin/budgetgroup'
                },
                {
                    label: 'ສະກຸນເງິນ',
                    icon: 'pi pi-fw pi-dollar',
                    to: '/admin/currency'
                },
                {
                    label: 'ຜູ້ອະນຸມັດການຈັດຊື້',
                    icon: 'pi pi-fw pi-check',
                    to: '/admin/approver'
                },
                {
                    label: 'ຜູ້ສະໜອງສິນຄ້າ (Supplier)',
                    icon: 'pi pi-fw pi-box',
                    to: '/admin/supplier'
                },
                {
                    label: 'ຜູ້ໃຊ້ງານລະບົບ',
                    icon: 'pi pi-fw pi-users',
                    to: '/admin/user'
                },
            ]
        },
        { separator: true },
        {
            label: 'ສະຫຼຸບ-ລາຍງານ',
            icon: 'pi pi-fw pi-pi-chevron-right',
            items: [
                {
                    label: 'ລາຍງານ 1',
                    icon: 'pi pi-fw pi-chevron-right',
                    to: '/uikit/formlayout'
                },
                {
                    label: 'ລາຍງານ 2',
                    icon: 'pi pi-fw pi-chevron-right',
                    to: '/uikit/input'
                }
            ]
        }
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
