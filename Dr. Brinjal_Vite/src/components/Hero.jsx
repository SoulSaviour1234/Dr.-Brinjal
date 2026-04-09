import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.section 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full flex flex-col items-center justify-center text-center py-2"
    >
      <motion.div variants={item} className="relative mb-6 drop-shadow-2xl md:-ml-8 -mt-10 flex flex-col items-center">
        {/* Pulsing Background Glow (Green & Purple) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-emerald-500/10 via-purple-500/10 to-transparent blur-[100px] rounded-full animate-pulse -z-10" />
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-0 relative z-10 font-space font-bold">
          {/* High-Fidelity Transparent Asset */}
          <div className="relative group md:-mr-14 -mt-4">
            <motion.div 
              initial={{ rotate: 22 }}
              whileHover={{ scale: 1.05, rotate: 25 }}
              className="w-40 h-40 sm:w-48 sm:h-48 relative z-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
            >
              <img 
                src="/eggplant-logo-removebg-preview.png" 
                alt="Dr. Brinjal Core"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>

          {/* Brand + Engine Container (Centered Sub-unit) */}
          <div className="flex flex-col items-center text-center">
            <h1 className="flex flex-col md:flex-row items-center md:items-baseline tracking-tighter leading-none mb-0">
              <div className="flex items-baseline text-gradient-dr-brinjal">
                <span className="text-6xl sm:text-7xl md:text-[7.5rem]">D</span>
                <span className="text-3xl sm:text-4xl md:text-[3.8rem] lowercase ml-[-0.05em]">r</span>
                <span className="text-3xl sm:text-4xl md:text-[3.8rem] ml-[-0.05em]">.</span>
              </div>
              <div className="flex items-baseline text-gradient-dr-brinjal md:ml-6 mt-2 md:mt-0">
                <span className="text-6xl sm:text-7xl md:text-[7.5rem]">B</span>
                <span className="text-3xl sm:text-4xl md:text-[4.2rem] lowercase ml-[-0.05em]">rinjal</span>
              </div>
            </h1>

            {/* Futuristic Label - Anchored back under brand name */}
            <div className="relative group/engine mt-1.5 w-fit">
              {/* Radiating Gradient Glow */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <motion.div 
                   animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                   }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,oklch(0.6_0.25_300)_180deg,transparent_210deg,oklch(0.8_0.2_140)_240deg,transparent_270deg)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000"
                />
              </div>
              
              <div className="relative flex items-center gap-4 px-6 py-2 rounded-full glass-panel border-white/10 bg-white/[0.03] shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b857] animate-pulse" />
                <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/50 font-space leading-none">
                  AI BRINJAL HEALTH DIAGNOSTICS v4.0
                </p>
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_#a855f7] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="mt-8">
        <p className="max-w-xl text-xl sm:text-2xl text-slate-400 font-medium leading-snug px-6 tracking-tight font-space text-center">
          Identify diseases in seconds. <span className="text-gradient-dr-brinjal font-black underline decoration-emerald-500/30 underline-offset-8 uppercase">Protect your harvest</span> for a better tomorrow.
        </p>
      </motion.div>
    </motion.section>
  );
}
