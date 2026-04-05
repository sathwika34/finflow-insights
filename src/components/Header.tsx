import { Search, Bell, Menu, Moon, Sun } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Header = ({ onMenuToggle }: { onMenuToggle?: () => void }) => {
  const { role, setRole } = useFinance();
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleThemeToggle = () => {
    toggleTheme();
    const newTheme = theme === 'dark' ? 'Light' : 'Dark';
    toast.success(`Theme switched to ${newTheme} Mode`, {
      description: `The dashboard is now in ${newTheme.toLowerCase()} mode.`,
    });
  };

  const handleRoleChange = (newRole: 'viewer' | 'admin') => {
    setRole(newRole);
    toast.success(`Role changed to ${newRole === 'admin' ? 'Admin' : 'Viewer'}`, {
      description: newRole === 'admin' ? 'You now have full access.' : 'You are in read-only mode.',
    });
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className={`relative transition-all ${searchOpen ? 'w-64' : 'w-48'}`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <motion.button
          whileTap={{ scale: 0.9, rotate: 180 }}
          onClick={handleThemeToggle}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>

        <select
          value={role}
          onChange={e => handleRoleChange(e.target.value as 'viewer' | 'admin')}
          className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white shadow-md">
          S
        </div>
      </div>
    </header>
  );
};

export default Header;
