import { useState } from 'react';
import { useBudget } from '@/contexts/BudgetContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const incomeCategories = ['Salary', 'Freelance', 'Business', 'Investment', 'Gift', 'Other'];
const expenseCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Healthcare', 'Entertainment', 'Other'];

export const TransactionForm = () => {
  const { addTransaction } = useBudget();
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    addTransaction({
      type,
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: formData.date,
      notes: formData.notes,
    });

    toast.success(`${type === 'income' ? 'Income' : 'Expense'} added successfully`);
    
    setFormData({
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  const categories = type === 'income' ? incomeCategories : expenseCategories;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
        <CardDescription>Record your income or expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={type} onValueChange={(v) => setType(v as 'income' | 'expense')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expense">Expense</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </div>

            <Button type="submit" className="w-full">
              Add {type === 'income' ? 'Income' : 'Expense'}
            </Button>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
};
