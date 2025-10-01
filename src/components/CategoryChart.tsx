import { useBudget } from '@/contexts/BudgetContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export const CategoryChart = () => {
  const { transactions } = useBudget();

  const expensesByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const chartData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Categories</CardTitle>
        <CardDescription>Breakdown of your spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No expense data available</p>
            <p className="text-sm mt-1">Add some expenses to see the breakdown</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
