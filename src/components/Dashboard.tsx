import { useBudget } from '@/contexts/BudgetContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export const Dashboard = () => {
  const { totalIncome, totalExpenses, balance } = useBudget();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your financial status
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Current account balance
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {formatCurrency(totalIncome)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All time earnings
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(totalExpenses)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All time spending
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
