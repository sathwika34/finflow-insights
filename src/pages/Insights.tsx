import { motion } from 'framer-motion';
import { Lightbulb, TrendingDown, Brain, Calendar, PiggyBank, AlertTriangle, Sparkles, Target } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const Insights = () => {
  const { transactions, totalExpenses, totalIncome, savings } = useFinance();

  const savingsRate = totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0;

  // Category breakdown
  const categoryMap: Record<string, number> = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });
  const categoryData = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value, percent: totalExpenses > 0 ? Math.round((value / totalExpenses) * 100) : 0 }))
    .sort((a, b) => b.value - a.value);

  const topCategory = categoryData[0]?.name || 'N/A';
  const topCategoryAmount = categoryData[0]?.value || 0;

  // Weekend vs weekday spending
  const weekendSpend = transactions
    .filter(t => t.type === 'expense')
    .filter(t => { const d = new Date(t.date).getDay(); return d === 0 || d === 6; })
    .reduce((s, t) => s + t.amount, 0);
  const weekdaySpend = totalExpenses - weekendSpend;
  const weekendPercent = totalExpenses > 0 ? Math.round((weekendSpend / totalExpenses) * 100) : 0;

  const barColors = ['#3B82F6', '#06B6D4', '#F59E0B', '#EF4444', '#22C55E', '#8B5CF6'];

  const insights = [
    {
      icon: TrendingDown,
      title: `Highest Spending: ${topCategory}`,
      desc: `You spent ₹${topCategoryAmount.toLocaleString('en-IN')} on ${topCategory.toLowerCase()} this month. Consider budgeting to reduce costs.`,
      borderColor: 'border-l-primary',
      iconBg: 'bg-primary/15',
      iconColor: 'text-primary',
    },
    {
      icon: Lightbulb,
      title: 'Monthly Comparison',
      desc: 'Expenses are 8% lower than last month. Great progress — keep it up!',
      borderColor: 'border-l-success',
      iconBg: 'bg-success/15',
      iconColor: 'text-success',
    },
    {
      icon: Brain,
      title: 'AI Insight',
      desc: `If you reduce ${topCategory.toLowerCase()} spending by 10%, you can save ₹${Math.round(topCategoryAmount * 0.1).toLocaleString('en-IN')} next month.`,
      borderColor: 'border-l-accent',
      iconBg: 'bg-accent/15',
      iconColor: 'text-accent',
    },
    {
      icon: Calendar,
      title: 'Weekend Spending Pattern',
      desc: `You spend ${weekendPercent}% of your expenses on weekends (₹${weekendSpend.toLocaleString('en-IN')}). Consider setting a weekend budget.`,
      borderColor: 'border-l-warning',
      iconBg: 'bg-warning/15',
      iconColor: 'text-warning',
    },
    {
      icon: PiggyBank,
      title: 'Savings Rate',
      desc: `Your savings rate is ${savingsRate}%. ${savingsRate >= 20 ? 'Excellent! You\'re above the recommended 20%.' : 'Try to reach at least 20% for financial health.'}`,
      borderColor: 'border-l-success',
      iconBg: 'bg-success/15',
      iconColor: 'text-success',
    },
    {
      icon: AlertTriangle,
      title: 'Expense Alert',
      desc: `Total expenses: ₹${totalExpenses.toLocaleString('en-IN')}. ${totalExpenses > totalIncome * 0.7 ? 'Warning: You\'re spending over 70% of your income.' : 'You\'re within a healthy range.'}`,
      borderColor: 'border-l-destructive',
      iconBg: 'bg-destructive/15',
      iconColor: 'text-destructive',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Insights</h1>
        <p className="text-muted-foreground text-sm mt-1">AI-powered analysis of your spending habits</p>
      </div>

      {/* Summary bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-6"
      >
        <div>
          <p className="text-muted-foreground text-xs">Monthly Income</p>
          <p className="text-foreground text-lg font-bold">₹{totalIncome.toLocaleString('en-IN')}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Monthly Expenses</p>
          <p className="text-foreground text-lg font-bold">₹{totalExpenses.toLocaleString('en-IN')}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Savings Rate</p>
          <p className="text-foreground text-lg font-bold">{savingsRate}%</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Net Savings</p>
          <p className="text-foreground text-lg font-bold text-success">₹{savings.toLocaleString('en-IN')}</p>
        </div>
      </motion.div>

      {/* Category breakdown + weekend/weekday */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Category spending bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-3 bg-card rounded-xl p-5 border border-border"
        >
          <h3 className="text-foreground font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            Spending by Category
          </h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={categoryData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 22%)" />
                <XAxis dataKey="name" stroke="hsl(215 20% 65%)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(215 20% 65%)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `₹${(v / 1000)}k`} />
                <Tooltip
                  contentStyle={{ background: 'hsl(217 33% 17%)', border: '1px solid hsl(217 33% 22%)', borderRadius: '8px', color: 'hsl(210 40% 98%)' }}
                  formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={1200}>
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

        {/* Weekend vs Weekday + Savings Goal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* Weekend vs Weekday */}
          <div className="bg-card rounded-xl p-5 border border-border">
            <h3 className="text-foreground font-semibold text-sm mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-warning" />
              Weekend vs Weekday
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground">Weekday</span>
                  <span className="text-xs font-medium text-foreground">₹{weekdaySpend.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full h-3 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${100 - weekendPercent}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground">Weekend</span>
                  <span className="text-xs font-medium text-foreground">₹{weekendSpend.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full h-3 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${weekendPercent}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-warning to-amber-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Category progress bars */}
          <div className="bg-card rounded-xl p-5 border border-border">
            <h3 className="text-foreground font-semibold text-sm mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Category Distribution
            </h3>
            <div className="space-y-3">
              {categoryData.slice(0, 4).map((cat, i) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: barColors[i] }} />
                      <span className="text-xs text-foreground font-medium">{cat.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{cat.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percent}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: barColors[i] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Insight cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className={`bg-card rounded-xl p-5 border border-border border-l-4 ${item.borderColor} cursor-default transition-shadow duration-200 hover:shadow-lg`}
          >
            <div className={`w-9 h-9 rounded-lg ${item.iconBg} flex items-center justify-center mb-3`}>
              <item.icon className={`w-4.5 h-4.5 ${item.iconColor}`} />
            </div>
            <h4 className="text-foreground font-semibold text-sm mb-1">{item.title}</h4>
            <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
