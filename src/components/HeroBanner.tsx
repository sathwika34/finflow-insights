import { motion } from 'framer-motion';
import { useFinance } from '@/context/FinanceContext';

const HeroBanner = () => {
  const { savings } = useFinance();
  const goal = 50000;
  const percent = Math.min(Math.round((savings / goal) * 100), 100);
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percent / 100) * circumference;

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-xl p-6 md:p-8 bg-gradient-to-r from-primary/20 via-accent/10 to-success/10"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-foreground"
          >
            {greeting}, Sathwika 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-muted-foreground text-sm md:text-base max-w-md"
          >
            Your finances are looking healthier this month.
            You saved <span className="text-success font-semibold">18% more</span> compared to last month.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
          className="flex items-center gap-4"
        >
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="hsl(var(--border))" strokeWidth="6" fill="none" />
              <motion.circle
                cx="50" cy="50" r="40"
                stroke="url(#gradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(217 91% 60%)" />
                  <stop offset="50%" stopColor="hsl(187 92% 41%)" />
                  <stop offset="100%" stopColor="hsl(142 71% 45%)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-foreground">{percent}%</span>
            </div>
          </div>
          <div className="text-sm">
            <p className="text-muted-foreground">Savings Goal</p>
            <p className="text-foreground font-semibold">₹{goal.toLocaleString('en-IN')}</p>
            <p className="text-xs text-muted-foreground mt-0.5">₹{savings.toLocaleString('en-IN')} saved</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroBanner;
