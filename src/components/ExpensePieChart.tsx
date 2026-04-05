import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { expenseBreakdownData } from '@/data/transactions';
import { useTheme } from '@/context/ThemeContext';

const ExpensePieChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const tooltipBg = isDark ? 'hsl(217 33% 17%)' : 'hsl(0 0% 100%)';
  const tooltipBorder = isDark ? 'hsl(217 33% 22%)' : 'hsl(220 13% 91%)';
  const tooltipText = isDark ? 'hsl(210 40% 98%)' : 'hsl(222 47% 11%)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-card rounded-xl p-5 border border-border h-full"
    >
      <h3 className="text-foreground font-semibold mb-4">Where Your Money Goes</h3>
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={expenseBreakdownData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
              animationDuration={1200}
            >
              {expenseBreakdownData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px', color: tooltipText, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
              formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {expenseBreakdownData.map(item => (
            <div key={item.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExpensePieChart;
