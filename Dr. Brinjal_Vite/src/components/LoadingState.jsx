import { motion } from "framer-motion";
import { Cpu, Database, ShieldCheck, Activity, Terminal } from "lucide-react";

const stats = [
  { label: "Neural Core", value: "A-15", icon: Cpu, color: "text-purple-400", bg: "bg-purple-500/10" },
  { label: "Sat-Relay", value: "L-X7", icon: Database, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Security", value: "Verified", icon: ShieldCheck, color: "text-purple-400", bg: "bg-purple-500/10" }
];

const TerminalLog = () => {
  const logs = [
    "Initializing Analysis Engine...",
    "Querying Pathogen Database...",
    "Calibrating Spectral Analysis...",
    "Synthesizing Molecular Health...",
    "Optimizing Diagnostic Payload...",
    "Authenticating Agri-Core Uplink..."
  ];
  
  return (
    <div className="flex flex-col items-center gap-1 opacity-20">
      <motion.div 
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
        className="flex items-center gap-2 text-[8px] font-mono text-emerald-500/80 uppercase tracking-[0.3em]"
      >
        <Terminal size={10} />
        System Live: 102.14.0.9
      </motion.div>
      <div className="h-4 overflow-hidden relative w-64 text-center">
        {logs.map((log, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: [20, 0, 0, -20]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              delay: i * 3,
              ease: "easeInOut"
            }}
            className="absolute inset-0 text-[7px] font-mono text-emerald-400/60 uppercase tracking-[0.4em]"
          >
            {log}
          </motion.p>
        ))}
      </div>
    </div>
  );
};

export default function LoadingState() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 gap-16 relative">
      {/* Background Tech Pulse */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05),transparent_70%)] opacity-50" />
      
      {/* 1. The Central Diagnostic Core */}
      <div className="relative group scale-110 sm:scale-125">
        {/* Triple Spinning Rings - HIGH VISIBILITY VERSION */}
        <div className="w-56 h-56 rounded-full border border-white/5 relative flex items-center justify-center">
          {/* Outer Ring: Slow, Segmented (Purple) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          />
          
          {/* Middle Ring: Faster, Reversed (Green) */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border-b-2 border-l-2 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
          />

          {/* Inner Ring: Fastest, Dashed */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-8 rounded-full border border-dashed border-white/40"
          />
        </div>

        {/* Inner Engine Heart */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-28 h-28 rounded-[2.5rem] bg-white/5 backdrop-blur-3xl glass-panel border-white/20 shadow-[0_0_80px_rgba(255,255,255,0.1)] flex items-center justify-center relative overflow-hidden group/heart"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-emerald-500/10" />
            <Activity className="w-12 h-12 text-white relative z-10 animate-pulse drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            
            {/* High-Intensity Scan Line (Green) */}
            <motion.div 
               animate={{ top: ["-10%", "110%"] }}
               transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
               className="absolute left-0 right-0 h-1 bg-emerald-500/80 shadow-[0_0_25px_rgba(16,185,129,0.6)] z-20"
            />
          </motion.div>
        </div>
      </div>

      {/* 2. Diagnostic Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl px-6 relative z-10">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-6 rounded-[2rem] glass-panel border-white/5 bg-white/[0.02] flex flex-col items-center gap-4 relative overflow-hidden group"
          >
             <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
             </div>
             <div className="text-center space-y-1">
                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30">{stat.label}</p>
                <motion.p 
                  animate={{ 
                    opacity: [1, 0.1, 1, 0.1, 1],
                    x: [0, -1, 1, -1, 0],
                    color: ["#fff", "#10b857", "#a855f7", "#fff"]
                  }}
                  transition={{ 
                    duration: 0.4, 
                    repeat: Infinity, 
                    repeatDelay: Math.random() * 4 + 1,
                    ease: "easeInOut"
                  }}
                  className="text-xs font-mono text-white/80"
                >
                  {stat.value}
                </motion.p>
             </div>
             
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.div>
        ))}
      </div>

      {/* 3. Footer System Integrity */}
      <div className="flex flex-col items-center -mt-4">
        <div className="flex items-center gap-8">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-emerald-500/40" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-400 animate-pulse font-space">
                Analyzing Molecular Integrity
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-emerald-500/40" />
        </div>
      </div>
    </div>
  );
}
