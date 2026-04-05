import TransactionTable from '@/components/TransactionTable';

const Transactions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage and review all your financial transactions</p>
      </div>
      <TransactionTable />
    </div>
  );
};

export default Transactions;
