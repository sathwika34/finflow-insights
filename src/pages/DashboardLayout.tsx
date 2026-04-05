import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from '@/components/AppSidebar';
import Header from '@/components/Header';
import { FinanceProvider } from '@/context/FinanceContext';

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <FinanceProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar mobileOpen={mobileMenuOpen} onMobileClose={() => setMobileMenuOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0">
          <Header onMenuToggle={() => setMobileMenuOpen(prev => !prev)} />
          <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </FinanceProvider>
  );
};

export default DashboardLayout;
