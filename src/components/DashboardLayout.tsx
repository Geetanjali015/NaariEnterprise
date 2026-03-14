import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/login');
  };
  
  return (
    <div className="flex min-h-screen bg-[var(--color-neutral)]">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 flex flex-col">
        <TopBar title={title} />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
