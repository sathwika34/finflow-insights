import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, BarChart3, Shield, Zap, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: BarChart3, title: 'Smart Analytics', desc: 'Visual breakdowns of your spending habits', color: 'from-blue-500 to-cyan-400' },
  { icon: Shield, title: 'Role-Based Access', desc: 'Admin and viewer modes for secure management', color: 'from-emerald-500 to-green-400' },
  { icon: Zap, title: 'AI Insights', desc: 'Intelligent suggestions to save more money', color: 'from-amber-500 to-yellow-400' },
];

const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 4,
}));

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/landing-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0d1117]/80 via-[#0d1117]/60 to-[#0d1117]/90" />

      {/* Animated glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] left-[20%] w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[150px] pointer-events-none z-[2]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[150px] pointer-events-none z-[2]"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[60%] left-[50%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-[2]"
      />

      {/* Floating particles */}
      {floatingParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20 pointer-events-none z-[2]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 flex items-center justify-center shadow-2xl shadow-blue-500/40">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-2xl border-2 border-cyan-400/40"
            />
          </div>
          <div className="text-left">
            <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              FinSight
            </span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl sm:text-3xl font-semibold text-white/90 mb-4 leading-snug"
        >
          Track and understand your{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            finances
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-base text-white/50 mb-12 max-w-lg mx-auto leading-relaxed"
        >
          A modern personal finance dashboard to monitor your balance, expenses, and get AI-powered insights — all in one place.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
          whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(59,130,246,0.5)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/dashboard')}
          className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg text-white overflow-hidden transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4, #10b981)',
            boxShadow: '0 8px 32px rgba(59,130,246,0.35), 0 0 0 1px rgba(255,255,255,0.1) inset',
          }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
          />
          <Sparkles className="w-5 h-5 relative z-10" />
          <span className="relative z-10">Enter Dashboard</span>
          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Subtle stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex items-center justify-center gap-8 mt-10 text-white/30 text-xs tracking-wider uppercase"
        >
          <span>Real-time tracking</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>AI Powered</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>100% Secure</span>
        </motion.div>
      </motion.div>

      {/* Feature cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16 max-w-3xl w-full relative z-10"
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 + i * 0.15, duration: 0.5 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative rounded-2xl p-6 text-center cursor-default transition-all duration-300"
            style={{
              background: 'rgba(17, 24, 39, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at center, rgba(59,130,246,0.08) 0%, transparent 70%)',
              }}
            />
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
              <f.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold text-sm mb-1.5">{f.title}</h3>
            <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-[3] pointer-events-none" />
    </div>
  );
};

export default Landing;
