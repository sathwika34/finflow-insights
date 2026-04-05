import HeroBanner from '@/components/HeroBanner';
import SummaryCards from '@/components/SummaryCards';
import BalanceChart from '@/components/BalanceChart';
import ExpensePieChart from '@/components/ExpensePieChart';
import InsightCards from '@/components/InsightCards';
import TransactionTable from '@/components/TransactionTable';
import RecentActivity from '@/components/RecentActivity';

const DashboardHome = () => {
  return (
    <>
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
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <TransactionTable />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
          <div className="mt-4">
            <InsightCards />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
