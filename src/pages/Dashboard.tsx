import AppSidebar from '@/components/AppSidebar';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import SummaryCards from '@/components/SummaryCards';
import BalanceChart from '@/components/BalanceChart';
import ExpensePieChart from '@/components/ExpensePieChart';
import InsightCards from '@/components/InsightCards';
import TransactionTable from '@/components/TransactionTable';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
          <HeroBanner />
          <SummaryCards />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3">
              <BalanceChart />
            </div>
            <div className="lg:col-span-2">
              <ExpensePieChart />
            </div>
          </div>
          <InsightCards />
          <TransactionTable />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
