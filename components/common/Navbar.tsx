import Link from 'next/link';
import { Menu, LogOut, Home } from 'lucide-react';

interface NavbarProps {
  title?: string;
  userEmail?: string;
  onLogout?: () => void;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  title = 'RE Bank Digital',
  userEmail,
  onLogout,
  showMenu = true,
  onMenuClick,
}) => {
  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary-700 text-white p-2 rounded-lg font-bold">RE</div>
            <h1 className="text-xl font-bold text-primary-900 hidden sm:block">{title}</h1>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {userEmail && (
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-primary-900">{userEmail}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            )}
            {showMenu && (
              <button
                onClick={onMenuClick}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                title="Menú"
              >
                <Menu className="w-6 h-6 text-slate-700" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
