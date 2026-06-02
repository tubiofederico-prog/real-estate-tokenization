'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, BarChart3, Wallet, Settings, X, LogOut } from 'lucide-react';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface SidebarProps {
  items: SidebarItem[];
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  title = 'Menu',
  isOpen = true,
  onClose,
  onLogout,
}) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed md:static w-64 h-screen bg-primary-50 border-r border-slate-200 flex flex-col transition-all duration-300 z-40',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-primary-900">{title}</h2>
          <button
            onClick={onClose}
            className="md:hidden p-1 hover:bg-slate-200 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                    isActive(item.href)
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-200'
                  )}
                >
                  <span className={cn(
                    'w-5 h-5 flex-shrink-0',
                    isActive(item.href) ? 'text-white' : 'text-slate-600 group-hover:text-slate-900'
                  )}>
                    {item.icon}
                  </span>
                  <span className="font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        {onLogout && (
          <div className="p-4 border-t border-slate-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
