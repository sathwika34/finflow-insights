import { motion } from 'framer-motion';
import { Wallet, PlusCircle, TrendingUp, CreditCard, Receipt } from 'lucide-react';

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col items-center justify-center py-16 px-4"
  >
    {/* Animated finance illustration */}
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="relative mb-8"
    >
      {/* Main centered wallet circle */}
      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/10 via-accent/10 to-success/10 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 via-accent/15 to-success/15 flex items-center justify-center">
          <Wallet className="w-10 h-10 text-primary" />
        </div>
      </div>

      {/* Orbiting icons */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
        style={{ width: '160px', height: '160px', left: '-16px', top: '-16px' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-success" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
          <CreditCard className="w-4 h-4 text-accent" />
        </div>
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
          <Receipt className="w-4 h-4 text-warning" />
        </div>
      </motion.div>

      {/* Floating glow dots */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        className="absolute -top-2 -right-3 w-3 h-3 rounded-full bg-accent/40"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        className="absolute top-2 -left-3 w-2 h-2 rounded-full bg-primary/40"
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-2 right-3 w-2.5 h-2.5 rounded-full bg-success/40"
      />
    </motion.div>

    <motion.h4
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-foreground font-semibold text-lg mb-2"
    >
      No transactions yet
    </motion.h4>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-muted-foreground text-sm text-center max-w-xs mb-5 leading-relaxed"
    >
      Start by adding your first transaction to track your income and expenses effortlessly.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium"
    >
      <PlusCircle className="w-4 h-4" />
      <span>Click "+ Add" to create a transaction</span>
    </motion.div>
  </motion.div>
);

export default EmptyState;
