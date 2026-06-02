'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/common/Navbar';
import { Sidebar } from '@/components/common/Sidebar';
import {
  LayoutDashboard,
  Building2,
  Zap,
  Users,
  FileText,
  CreditCard,
  Settings,
  Globe,
  TrendingUp,
  Lock,
  Landmark,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: 'Proyectos',
      href: '/admin/projects',
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      label: 'Tokenización',
      href: '/admin/tokenization',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      label: 'Smart Contracts',
      href: '/admin/smart-contracts',
      icon: <Lock className="w-5 h-5" />,
    },
    {
      label: 'Inversores',
      href: '/admin/investors',
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: 'KYC/Compliance',
      href: '/admin/kyc',
      icon: <Landmark className="w-5 h-5" />,
    },
    {
      label: 'Documentos',
      href: '/admin/documents',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: 'Transacciones',
      href: '/admin/transactions',
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      label: 'Distribuciones',
      href: '/admin/distributions',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      label: 'Fondos',
      href: '/admin/funds',
      icon: <Landmark className="w-5 h-5" />,
    },
    {
      label: 'Países',
      href: '/admin/countries',
      icon: <Globe className="w-5 h-5" />,
    },
    {
      label: 'Métricas',
      href: '/admin/metrics',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      label: 'Configuración',
      href: '/admin/settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        items={sidebarItems}
        title="Panel Admin"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => {
          router.push('/');
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          title="RE Bank - Panel Administrativo"
          userEmail="admin@rebank.com"
          onLogout={() => router.push('/')}
          showMenu
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
};
