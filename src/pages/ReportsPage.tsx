import { CategoryChart } from '@/components/CategoryChart';
import { Dashboard } from '@/components/Dashboard';

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground mt-1">
          Visualize your spending patterns and financial insights
        </p>
      </div>
      <Dashboard />
      <CategoryChart />
    </div>
  );
};

export default ReportsPage;
