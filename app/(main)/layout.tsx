import { Metadata } from 'next';
import Layout from '../../layout/layout';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'BCS',
    description: '',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    icons: {
        icon: '/favicon.ico'
    }
};

export default function MainLayout({ children }: MainLayoutProps) {
    return <Layout>{children}</Layout>;
}
