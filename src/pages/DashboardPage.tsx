import { Dashboard } from '@/components/Dashboard';
import { TransactionList } from '@/components/TransactionList';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <Dashboard />
      <TransactionList />
    </div>
  );
};

export default DashboardPage;
