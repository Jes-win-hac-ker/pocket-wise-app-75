import { TransactionList } from '@/components/TransactionList';

const TransactionsPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">All Transactions</h1>
        <p className="text-muted-foreground mt-1">
          View, search, and manage your transaction history
        </p>
      </div>
      <TransactionList />
    </div>
  );
};

export default TransactionsPage;
