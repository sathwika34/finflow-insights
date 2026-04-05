import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';
import AnimatedCounter from './AnimatedCounter';
import Sparkline from './Sparkline';

const sparkData: Record<string, { data: number[]; color: string }> = {
  balance: { data: [40, 52, 48, 70, 85, 125], color: 'hsl(217, 91%, 60%)' },
  income:  { data: [30, 45, 42, 60, 55, 75],  color: 'hsl(142, 71%, 45%)' },
  expenses:{ data: [20, 25, 30, 22, 28, 17],   color: 'hsl(0, 84%, 60%)' },
  savings: { data: [10, 20, 12, 38, 27, 58],   color: 'hsl(38, 92%, 50%)' },
};

const cards = [
  { key: 'balance', label: 'Total Balance', icon: Wallet, glow: 'card-glow-blue', iconBg: 'bg-primary/15', iconColor: 'text-primary', change: '+5.2%', up: true },
  { key: 'income', label: 'Total Income', icon: TrendingUp, glow: 'card-glow-green', iconBg: 'bg-success/15', iconColor: 'text-success', change: '+12%', up: true },
  { key: 'expenses', label: 'Total Expenses', icon: TrendingDown, glow: 'card-glow-red', iconBg: 'bg-destructive/15', iconColor: 'text-destructive', change: '-8%', up: false },
  { key: 'savings', label: 'Savings', icon: PiggyBank, glow: 'card-glow-yellow', iconBg: 'bg-warning/15', iconColor: 'text-warning', change: '+18%', up: true },
];

const SummaryCards = () => {
  const { totalBalance, totalIncome, totalExpenses, savings } = useFinance();
  const values: Record<string, number> = { balance: totalBalance, income: totalIncome, expenses: totalExpenses, savings };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * i }}
          className={`bg-card rounded-xl p-5 border border-border ${card.glow} hover:scale-[1.02] transition-transform duration-200`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center`}>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <span className={`flex items-center gap-1 text-xs font-medium ${card.up ? 'text-success' : 'text-destructive'}`}>
              {card.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {card.change}
            </span>
          </div>
          <p className="text-muted-foreground text-xs mb-1">{card.label}</p>
          <div className="flex items-end justify-between">
            <p className="text-xl font-bold text-foreground">
              ₹<AnimatedCounter value={values[card.key]} />
            </p>
            <Sparkline
              data={sparkData[card.key].data}
              color={sparkData[card.key].color}
              width={72}
              height={28}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryCards;
