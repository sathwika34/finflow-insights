import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Pencil, Trash2, Download, ChevronDown } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';
import TransactionModal from './TransactionModal';
import EmptyState from './EmptyState';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { toast } from 'sonner';

const TransactionTable = () => {
  const { transactions, role, deleteTransaction } = useFinance();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; title: string } | null>(null);

  const filtered = transactions
    .filter(t => {
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'all' || t.type === filter;
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'amount') return b.amount - a.amount;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const exportCSV = () => {
    const headers = 'Date,Title,Category,Amount,Type,Status\n';
    const rows = filtered.map(t => `${t.date},${t.title},${t.category},${t.amount},${t.type},${t.status}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report exported as CSV');
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      deleteTransaction(deleteConfirm.id);
      toast.success('Transaction deleted', {
        description: `"${deleteConfirm.title}" has been removed.`,
      });
      setDeleteConfirm(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-card rounded-xl border border-border"
    >
      <div className="p-4 md:p-5 border-b border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="text-foreground font-semibold">Transactions</h3>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-muted/50 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 w-40"
              />
            </div>
            <select value={filter} onChange={e => setFilter(e.target.value as any)} className="px-2.5 py-1.5 rounded-lg bg-muted/50 border border-border text-xs text-foreground focus:outline-none cursor-pointer">
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="px-2.5 py-1.5 rounded-lg bg-muted/50 border border-border text-xs text-foreground focus:outline-none cursor-pointer">
              <option value="date">Sort: Date</option>
              <option value="amount">Sort: Amount</option>
            </select>
            <button onClick={exportCSV} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors" title="Export CSV">
              <Download className="w-4 h-4" />
            </button>
            {role === 'admin' && (
              <button
                onClick={() => { setEditTx(null); setModalOpen(true); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            )}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-xs">
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-left px-5 py-3 font-medium">Title</th>
                <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Category</th>
                <th className="text-right px-5 py-3 font-medium">Amount</th>
                <th className="text-center px-5 py-3 font-medium hidden md:table-cell">Status</th>
                {role === 'admin' && <th className="text-center px-5 py-3 font-medium">Actions</th>}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map(tx => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-5 py-3 text-muted-foreground text-xs whitespace-nowrap">
                      {new Date(tx.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-3 text-foreground font-medium">{tx.title}</td>
                    <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">
                      <span className="px-2 py-0.5 rounded-full bg-muted/50 text-xs">{tx.category}</span>
                    </td>
                    <td className={`px-5 py-3 text-right font-semibold ${tx.type === 'income' ? 'text-success' : 'text-destructive'}`}>
                      {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-3 text-center hidden md:table-cell">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tx.status === 'completed' ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'}`}>
                        {tx.status}
                      </span>
                    </td>
                    {role === 'admin' && (
                      <td className="px-5 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => { setEditTx(tx.id); setModalOpen(true); }} className="p-1.5 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => setDeleteConfirm({ id: tx.id, title: tx.title })} className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <TransactionModal
            editId={editTx}
            onClose={() => { setModalOpen(false); setEditTx(null); }}
          />
        )}
      </AnimatePresence>

      <ConfirmDeleteModal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDeleteConfirm}
        title={deleteConfirm?.title}
      />
    </motion.div>
  );
};

export default TransactionTable;
