import { motion } from 'framer-motion';
import { Download, FileText, Calendar, TrendingUp, TrendingDown, PieChart, BarChart3 } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const Reports = () => {
  const { transactions, totalBalance, totalIncome, totalExpenses, savings } = useFinance();

  // Category breakdown for bar chart
  const categoryMap: Record<string, number> = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });
  const categoryData = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const barColors = ['#3B82F6', '#06B6D4', '#F59E0B', '#EF4444', '#22C55E', '#8B5CF6'];

  // Monthly summary
  const monthlyData = [
    { label: 'Total Income', value: totalIncome, icon: TrendingUp, color: 'text-success', bg: 'bg-success/15' },
    { label: 'Total Expenses', value: totalExpenses, icon: TrendingDown, color: 'text-destructive', bg: 'bg-destructive/15' },
    { label: 'Net Savings', value: savings, icon: PieChart, color: 'text-primary', bg: 'bg-primary/15' },
    { label: 'Balance', value: totalBalance, icon: BarChart3, color: 'text-accent', bg: 'bg-accent/15' },
  ];

  const exportCSV = () => {
    const headers = 'Date,Title,Category,Amount,Type,Status\n';
    const rows = transactions.map(t => `${t.date},${t.title},${t.category},${t.amount},${t.type},${t.status}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finsight-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finsight-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground text-sm mt-1">Generate and export financial reports</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={exportJSON}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 text-foreground text-sm font-medium border border-border hover:bg-muted transition-colors"
          >
            <FileText className="w-4 h-4" /> Export JSON
          </button>
        </div>
      </div>

      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {monthlyData.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * i }}
            className="bg-card rounded-xl p-5 border border-border hover:scale-[1.02] transition-transform duration-200"
          >
            <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center mb-3`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <p className="text-muted-foreground text-xs mb-1">{item.label}</p>
            <p className="text-xl font-bold text-foreground">₹{item.value.toLocaleString('en-IN')}</p>
          </motion.div>
        ))}
      </div>

      {/* Category Breakdown Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card rounded-xl p-5 border border-border"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground font-semibold">Expense by Category</h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            This Month
          </div>
        </div>
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 22%)" />
              <XAxis dataKey="name" stroke="hsl(215 20% 65%)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(215 20% 65%)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `₹${(v / 1000)}k`} />
              <Tooltip
                contentStyle={{ background: 'hsl(217 33% 17%)', border: '1px solid hsl(217 33% 22%)', borderRadius: '8px', color: 'hsl(210 40% 98%)' }}
                formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={barColors[i % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[200px] text-muted-foreground text-sm">
            No expense data available
          </div>
        )}
      </motion.div>

      {/* Transaction Summary Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-card rounded-xl border border-border"
      >
        <div className="p-5 border-b border-border">
          <h3 className="text-foreground font-semibold">Transaction Summary</h3>
          <p className="text-muted-foreground text-xs mt-1">Overview of all {transactions.length} transactions</p>
        </div>
        <div className="p-5 space-y-4">
          {/* Category breakdown list */}
          {categoryData.map((cat, i) => {
            const percent = totalExpenses > 0 ? Math.round((cat.value / totalExpenses) * 100) : 0;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex items-center gap-4"
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: barColors[i % barColors.length] }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground font-medium">{cat.name}</span>
                    <span className="text-xs text-muted-foreground">{percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.8, delay: 0.6 + i * 0.08 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: barColors[i % barColors.length] }}
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground flex-shrink-0">
                  ₹{cat.value.toLocaleString('en-IN')}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div className="bg-card rounded-xl p-5 border border-border">
          <p className="text-muted-foreground text-xs mb-2">Total Transactions</p>
          <p className="text-3xl font-bold text-foreground">{transactions.length}</p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border">
          <p className="text-muted-foreground text-xs mb-2">Avg Transaction</p>
          <p className="text-3xl font-bold text-foreground">
            ₹{transactions.length > 0 ? Math.round(transactions.reduce((s, t) => s + t.amount, 0) / transactions.length).toLocaleString('en-IN') : 0}
          </p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border">
          <p className="text-muted-foreground text-xs mb-2">Savings Rate</p>
          <p className="text-3xl font-bold text-foreground">
            {totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0}%
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;
