import { useState } from 'react';
import { useBudget, Transaction } from '@/contexts/BudgetContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

export const TransactionList = () => {
  const { transactions, deleteTransaction } = useBudget();
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredTransactions = transactions
    .filter((t) => {
      if (filter !== 'all' && t.type !== filter) return false;
      if (searchTerm && !t.category.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !t.notes?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.amount - a.amount;
    });

  const handleDelete = () => {
    if (deleteId) {
      deleteTransaction(deleteId);
      toast.success('Transaction deleted successfully');
      setDeleteId(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>View and manage all your transactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="sm:flex-1"
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="sm:w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expenses</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'date' | 'amount')}>
              <SelectTrigger className="sm:w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="amount">Sort by Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No transactions found</p>
              <p className="text-sm mt-1">Add your first transaction to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {transaction.type === 'income' ? (
                      <ArrowUpCircle className="h-8 w-8 text-success flex-shrink-0" />
                    ) : (
                      <ArrowDownCircle className="h-8 w-8 text-destructive flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium">{transaction.category}</p>
                        <Badge variant={transaction.type === 'income' ? 'default' : 'destructive'}>
                          {transaction.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {formatDate(transaction.date)}
                        {transaction.notes && ` • ${transaction.notes}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <p className={`font-semibold text-lg ${transaction.type === 'income' ? 'text-success' : 'text-destructive'}`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(transaction.id)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this transaction? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
