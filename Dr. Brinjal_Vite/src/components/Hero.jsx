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
      <motion.div variants={item} className="relative mb-10 md:mb-16 flex flex-col items-center w-full px-2">
        {/* Pulsing Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-emerald-500/10 via-purple-500/10 to-transparent blur-[100px] rounded-full animate-pulse -z-10" />
        
        <div className="flex flex-row items-center justify-center relative z-10 font-space font-bold w-full max-w-full">
          {/* Logo Container - PRECISE ALIGNMENT */}
          <div className="relative group shrink-0 -mt-2 md:-mt-10 -mr-4 md:-mr-14 z-20">
            <motion.div 
              initial={{ rotate: 18 }}
              whileHover={{ scale: 1.1, rotate: 32 }}
              className="w-20 h-20 sm:w-32 sm:h-32 md:w-64 md:h-64 relative z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] md:drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)] cursor-pointer"
            >
              <img 
                src="/eggplant-logo-removebg-preview.png" 
                alt="Dr. Brinjal Core"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>

          {/* Title Block - NO STACKING, MATCHED SPACING */}
          <div className="flex flex-col items-start text-left">
            <h1 className="flex flex-row items-baseline tracking-tighter leading-none mb-0 md:mb-1 relative -mt-2 md:-mt-10">
              <div className="flex items-baseline text-gradient-dr-brinjal">
                <span className="text-5xl sm:text-7xl md:text-[9.5rem]">D</span>
                <span className="text-2xl sm:text-4xl md:text-[4.8rem] lowercase ml-[-0.05em]">r</span>
                <span className="text-2xl sm:text-4xl md:text-[4.8rem] ml-[-0.05em]">.</span>
              </div>
              <div className="flex items-baseline text-gradient-dr-brinjal ml-2 sm:ml-6">
                <span className="text-5xl sm:text-7xl md:text-[9.5rem]">B</span>
                <span className="text-2xl sm:text-4xl md:text-[5.5rem] lowercase ml-[-0.05em]">rinjal</span>
              </div>
            </h1>

            {/* AI Engine Label - Adjusted Position */}
            <div className="relative w-fit ml-[-0.5rem] md:ml-[-1.5rem] mt-0 md:mt-1">
              <div className="relative flex items-center gap-1.5 md:gap-4 px-3 md:px-7 py-1.5 md:py-2.5 rounded-full glass-panel border-white/10 bg-white/[0.04] shadow-2xl">
                <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b857] animate-pulse" />
                <p className="text-[5px] sm:text-[8px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.6em] text-white/60 font-space leading-none whitespace-nowrap">
                  AI BRINJAL HEALTH DIAGNOSTICS v4.0
                </p>
                <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-purple-400 shadow-[0_0_12px_#a855f7] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="mt-8 md:mt-12 px-6">
        <p className="max-w-xl text-base sm:text-xl md:text-2xl text-slate-400 font-medium leading-tight tracking-tight font-space text-center mx-auto">
          Identify plant diseases in seconds. <br className="hidden md:block" />
          <span className="text-gradient-dr-brinjal font-black underline decoration-emerald-500/30 underline-offset-8 uppercase">Protect your harvest</span>
        </p>
      </motion.div>
    </motion.section>
  );
}
