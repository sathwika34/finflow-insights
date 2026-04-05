import { motion } from 'framer-motion';
import { Lightbulb, TrendingDown, Brain } from 'lucide-react';

const insights = [
  {
    icon: TrendingDown,
    title: 'Highest Spending: Food',
    desc: 'You spent ₹12,000 on food this month. Consider meal planning to reduce costs.',
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
    desc: 'If you reduce food spending by 10%, you can save ₹1,200 next month.',
    borderColor: 'border-l-accent',
    iconBg: 'bg-accent/15',
    iconColor: 'text-accent',
  },
];

const InsightCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {insights.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
          className={`bg-card rounded-xl p-5 border border-border border-l-4 ${item.borderColor} hover:scale-[1.02] transition-transform duration-200`}
        >
          <div className={`w-9 h-9 rounded-lg ${item.iconBg} flex items-center justify-center mb-3`}>
            <item.icon className={`w-4.5 h-4.5 ${item.iconColor}`} />
          </div>
          <h4 className="text-foreground font-semibold text-sm mb-1">{item.title}</h4>
          <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default InsightCards;
