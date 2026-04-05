import { motion } from 'framer-motion';
import { Clock, ArrowUpRight, ArrowDownRight, Target, Bell } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';

const getTimeAgo = (dateStr: string): string => {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = Math.abs(now.getTime() - date.getTime());
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    if (diffHours === 0) return 'Just now';
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  }
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

const RecentActivity = () => {
  const { transactions } = useFinance();

  // Get 5 most recent transactions as activity
  const recentItems = transactions
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map(tx => ({
      id: tx.id,
      title: tx.type === 'income' ? `${tx.title} credited` : `${tx.title} added`,
      time: getTimeAgo(tx.date),
      type: tx.type,
      amount: tx.amount,
      icon: tx.type === 'income' ? ArrowUpRight : ArrowDownRight,
      color: tx.type === 'income' ? 'text-success' : 'text-destructive',
      bg: tx.type === 'income' ? 'bg-success/15' : 'bg-destructive/15',
    }));

  // Add a static savings goal activity
  const activities = [
    ...recentItems.slice(0, 3),
    {
      id: 'savings-goal',
      title: 'Savings goal updated',
      time: '3 days ago',
      type: 'goal' as const,
      amount: 0,
      icon: Target,
      color: 'text-accent',
      bg: 'bg-accent/15',
    },
    ...recentItems.slice(3),
  ].slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-card rounded-xl p-5 border border-border"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground font-semibold flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          Recent Activity
        </h3>
        <div className="relative">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
        </div>
      </div>

      <div className="space-y-1">
        {activities.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.08 }}
            className="flex items-center gap-3 py-2.5 group"
          >
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>

            {item.amount > 0 && (
              <span className={`text-xs font-semibold ${item.color} flex-shrink-0`}>
                {item.type === 'income' ? '+' : '-'}₹{item.amount.toLocaleString('en-IN')}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentActivity;
