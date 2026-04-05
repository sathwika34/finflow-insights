import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { balanceTrendData } from '@/data/transactions';
import { useTheme } from '@/context/ThemeContext';

const BalanceChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gridColor = isDark ? 'hsl(217 33% 22%)' : 'hsl(220 13% 91%)';
  const textColor = isDark ? 'hsl(215 20% 65%)' : 'hsl(215 16% 47%)';
  const tooltipBg = isDark ? 'hsl(217 33% 17%)' : 'hsl(0 0% 100%)';
  const tooltipBorder = isDark ? 'hsl(217 33% 22%)' : 'hsl(220 13% 91%)';
  const tooltipText = isDark ? 'hsl(210 40% 98%)' : 'hsl(222 47% 11%)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card rounded-xl p-5 border border-border h-full"
    >
      <h3 className="text-foreground font-semibold mb-4">Balance Trend Over Time</h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={balanceTrendData}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity={isDark ? 0.4 : 0.3} />
              <stop offset="100%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="month" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `₹${(v / 1000)}k`} />
          <Tooltip
            contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px', color: tooltipText, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
            formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Balance']}
          />
          <Area type="monotone" dataKey="balance" stroke="hsl(217 91% 60%)" strokeWidth={2.5} fill="url(#balanceGrad)" animationDuration={1500} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default BalanceChart;
