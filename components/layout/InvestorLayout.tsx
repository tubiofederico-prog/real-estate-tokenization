'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/common/Navbar';
import { Sidebar } from '@/components/common/Sidebar';
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  Users,
  BarChart3,
  PieChart,
  Zap,
} from 'lucide-react';

interface InvestorLayoutProps {
  children: React.ReactNode;
}

export const InvestorLayout: React.FC<InvestorLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    {
      label: 'Dashboard',
      href: '/investor/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: 'Proyectos',
      href: '/investor/projects',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      label: 'Mi Cartera',
      href: '/investor/portfolio',
      icon: <PieChart className="w-5 h-5" />,
    },
    {
      label: 'Wallet',
      href: '/investor/wallet',
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      label: 'Fondos',
      href: '/investor/funds',
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: 'Reportes',
      href: '/investor/reports',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: 'Ecosistema',
      href: '/investor/ecosystem',
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        items={sidebarItems}
        title="Portal Inversor"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => {
          router.push('/');
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          title="RE Bank - Portal Inversor"
          userEmail="investor@example.com"
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
