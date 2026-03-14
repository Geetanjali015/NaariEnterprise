import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Package, 
  FileText, 
  Brain, 
  User,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  onLogout?: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/income-expense', icon: TrendingUp, label: 'Income & Expense' },
    { path: '/inventory', icon: Package, label: 'Inventory' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/ai-guidance', icon: Brain, label: 'AI Guidance' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];
  
  return (
    <div className="w-64 bg-[var(--color-navy)] min-h-screen flex flex-col">
      <div className="p-6 border-b border-[var(--color-navy-light)]">
        <h2 className="text-2xl text-white">NaariEnterprise</h2>
        <p className="text-[var(--color-gray-500)] text-sm mt-1">Business Intelligence</p>
      </div>
      
      <nav className="flex-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                isActive
                  ? 'bg-[var(--color-teal)] text-white'
                  : 'text-[var(--color-gray-300)] hover:bg-[var(--color-navy-light)] hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-[var(--color-navy-light)]">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-gray-300)] hover:bg-[var(--color-navy-light)] hover:text-white transition-all w-full"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
