import { Bell, Search } from 'lucide-react';

interface TopBarProps {
  title: string;
  userName?: string;
}

export default function TopBar({ title, userName = 'Priya Sharma' }: TopBarProps) {
  return (
    <div className="bg-white border-b border-[var(--color-gray-200)] px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl">{title}</h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-gray-500)]" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] w-64"
          />
        </div>
        
        <button className="relative p-2 hover:bg-[var(--color-gray-100)] rounded-lg transition-colors">
          <Bell size={20} className="text-[var(--color-gray-600)]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-error)] rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-[var(--color-gray-900)]">{userName}</p>
            <p className="text-xs text-[var(--color-gray-600)]">Business Owner</p>
          </div>
          <div className="w-10 h-10 bg-[var(--color-teal)] rounded-full flex items-center justify-center text-white font-medium">
            {userName.charAt(0)}
          </div>
        </div>
      </div>
    </div>
  );
}
