import { motion } from 'framer-motion';
import { Sun, Moon, Shield, Trash2, User, Palette, Monitor } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'sonner';

const Settings = () => {
  const { role, setRole } = useFinance();
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    toast.success(`Theme switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, {
      description: `The dashboard is now in ${newTheme} mode.`,
    });
  };

  const handleRoleChange = (newRole: 'admin' | 'viewer') => {
    setRole(newRole);
    toast.success(`Role changed to ${newRole === 'admin' ? 'Admin' : 'Viewer'}`, {
      description: newRole === 'admin' ? 'You now have full access to manage transactions.' : 'You are in read-only mode.',
    });
  };

  const handleClearData = () => {
    localStorage.removeItem('finsight-transactions');
    localStorage.removeItem('finsight-role');
    toast.success('Data cleared', {
      description: 'All data has been reset. Reload to see defaults.',
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Customize your dashboard experience</p>
      </div>

      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-5"
      >
        <h3 className="text-foreground font-semibold text-sm flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-primary" /> Profile
        </h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent to-success flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-primary/20">
            S
          </div>
          <div>
            <p className="text-foreground font-semibold text-lg">Sathwika</p>
            <p className="text-muted-foreground text-sm">Role: <span className="capitalize font-medium text-foreground">{role}</span></p>
          </div>
        </div>
      </motion.div>

      {/* Theme */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl border border-border p-5 space-y-4"
      >
        <h3 className="text-foreground font-semibold text-sm flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" /> Appearance
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleThemeChange('dark')}
            className={`flex flex-col items-center gap-3 p-4 rounded-xl text-sm font-medium transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-primary/15 text-primary border-2 border-primary/40 shadow-[0_0_20px_-5px_hsl(217_91%_60%/0.3)]'
                : 'bg-muted/50 text-muted-foreground border-2 border-transparent hover:text-foreground hover:border-border'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-primary/20' : 'bg-muted'}`}>
              <Moon className="w-6 h-6" />
            </div>
            <span>Dark Mode</span>
          </button>
          <button
            onClick={() => handleThemeChange('light')}
            className={`flex flex-col items-center gap-3 p-4 rounded-xl text-sm font-medium transition-all duration-300 ${
              theme === 'light'
                ? 'bg-primary/15 text-primary border-2 border-primary/40 shadow-[0_0_20px_-5px_hsl(217_91%_60%/0.3)]'
                : 'bg-muted/50 text-muted-foreground border-2 border-transparent hover:text-foreground hover:border-border'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${theme === 'light' ? 'bg-primary/20' : 'bg-muted'}`}>
              <Sun className="w-6 h-6" />
            </div>
            <span>Light Mode</span>
          </button>
        </div>
        <p className="text-muted-foreground text-xs flex items-center gap-1.5">
          <Monitor className="w-3.5 h-3.5" />
          Currently using <span className="font-medium text-foreground capitalize">{theme}</span> theme. Changes apply instantly.
        </p>
      </motion.div>

      {/* Role */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-5 space-y-4"
      >
        <h3 className="text-foreground font-semibold text-sm flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" /> Role Management
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleRoleChange('admin')}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl text-sm font-medium transition-all duration-300 ${
              role === 'admin'
                ? 'bg-primary/15 text-primary border-2 border-primary/40 shadow-[0_0_20px_-5px_hsl(217_91%_60%/0.3)]'
                : 'bg-muted/50 text-muted-foreground border-2 border-transparent hover:text-foreground hover:border-border'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-all ${role === 'admin' ? 'bg-primary/20' : 'bg-muted'}`}>
              👑
            </div>
            <span>Admin</span>
            <span className="text-[10px] text-muted-foreground">Full Access</span>
          </button>
          <button
            onClick={() => handleRoleChange('viewer')}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl text-sm font-medium transition-all duration-300 ${
              role === 'viewer'
                ? 'bg-primary/15 text-primary border-2 border-primary/40 shadow-[0_0_20px_-5px_hsl(217_91%_60%/0.3)]'
                : 'bg-muted/50 text-muted-foreground border-2 border-transparent hover:text-foreground hover:border-border'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-all ${role === 'viewer' ? 'bg-primary/20' : 'bg-muted'}`}>
              👁️
            </div>
            <span>Viewer</span>
            <span className="text-[10px] text-muted-foreground">Read Only</span>
          </button>
        </div>
        <p className="text-muted-foreground text-xs">
          {role === 'admin' ? '✅ You can add, edit, and delete transactions.' : '🔒 You can only view transactions.'}
        </p>
      </motion.div>

      {/* Danger zone */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border border-destructive/30 p-5 space-y-4"
      >
        <h3 className="text-foreground font-semibold text-sm flex items-center gap-2">
          <span className="text-destructive">⚠️</span> Danger Zone
        </h3>
        <p className="text-muted-foreground text-xs">
          This will permanently delete all your transactions and reset settings to defaults.
        </p>
        <button
          onClick={handleClearData}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-destructive/15 text-destructive text-sm font-medium hover:bg-destructive/25 transition-colors border border-destructive/30"
        >
          <Trash2 className="w-4 h-4" /> Clear All Data
        </button>
      </motion.div>
    </div>
  );
};

export default Settings;
