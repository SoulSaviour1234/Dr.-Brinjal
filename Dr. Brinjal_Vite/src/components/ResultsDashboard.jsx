import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Leaf, 
  MapPin, 
  Droplets, 
  ThermometerSun, 
  RefreshCcw, 
  ShieldCheck,
  Zap,
  Microscope,
  Stethoscope,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "./ui/button";

export default function ResultsDashboard({ data, onReset }) {
  const [showTechnicalReport, setShowTechnicalReport] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);
  const [reportData, setReportData] = useState(null);

  const fetchTechnicalReport = async () => {
    if (reportData || loadingReport) return;
    
    setLoadingReport(true);
    try {
      const formData = new FormData();
      formData.append('disease_name', data.disease);
      
      if (typeof data.rawFile === 'string' && data.rawFile.startsWith('data:image')) {
        const response = await fetch(data.rawFile);
        const blob = await response.blob();
        formData.append('file', blob, 'capture.jpg');
      } else {
        formData.append('file', data.rawFile);
      }

      const response = await fetch('https://raajpakhi123-dr-brinjal-backend.hf.space/get_technical_report', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to fetch technical report');
      const result = await response.json();
      setReportData(result);
    } catch (error) {
      console.error("Deep Audit Error:", error);
    } finally {
      setLoadingReport(false);
    }
  };

  const handleToggleReport = () => {
    const nextState = !showTechnicalReport;
    setShowTechnicalReport(nextState);
    if (nextState) fetchTechnicalReport();
  };

  const container = { show: { transition: { staggerChildren: 0.1 } } };
  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  };

  if (!data) return null;

  const activeParams = reportData?.params || data.params;
  const activeHydration = reportData?.hydration || data.hydration;
  const activePhotoperiod = reportData?.photoperiod || data.photoperiod;

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-3xl mx-auto px-6 grid grid-cols-12 gap-6 relative pb-10"
    >
      {/* 3D Immersive Photo Card - ENHANCED BORDER */}
      <motion.div 
        variants={item}
        className="col-span-12 relative rounded-[3rem] overflow-hidden aspect-[16/10] glass-panel shadow-[0_60px_100px_-30px_rgba(0,0,0,0.8)] group/card"
      >
        {/* Interactive Plasma Border Layer */}
        <div className="absolute inset-0 z-20 pointer-events-none">
            <motion.div 
               animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
               }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,oklch(0.8_0.2_140)_180deg,transparent_210deg)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000"
            />
            <div className="absolute inset-0 rounded-[3rem] border-[4px] border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]" />
        </div>

        <motion.img 
          layoutId="shared-photo"
          src={data.image} 
          className="w-full h-full object-cover grayscale-[0.2] group-hover/card:grayscale-0 transition-all duration-1000 group-hover/card:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/60 opacity-80 z-10" />
        
        <div className="absolute bottom-8 left-8 flex flex-col gap-3 z-30">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[1rem] bg-emerald-500/20 backdrop-blur-2xl border border-emerald-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,184,87,0.4)]">
                    <MapPin className="text-emerald-400 w-5 h-5" />
                </div>
                <div className="flex flex-col">
                    <span className="text-emerald-400/60 font-black uppercase tracking-[0.4em] text-[7px]">Geo-Tagged Origin</span>
                    <span className="text-white font-bold text-base tracking-tight">
                        {data.geo?.source === 'upload' && (
                            <span className="text-amber-400/80 animate-pulse">[!] METADATA STRIPPED (FILE UPLOAD)</span>
                        )}
                        {data.geo?.source === 'capture' && data.geo?.locationEnabled && (
                            <span>Lat: {data.geo.lat}, Long: {data.geo.long} (VERIFIED)</span>
                        )}
                        {data.geo?.source === 'capture' && !data.geo?.locationEnabled && (
                            <span className="text-rose-400/80">[X] GEO-TELEMETRY OFFLINE (NO GPS)</span>
                        )}
                    </span>
                </div>
            </div>
        </div>

        <div className="absolute top-8 right-8 z-30">
             <div className="px-5 py-2 rounded-full bg-secondary/20 backdrop-blur-xl border border-secondary/30 flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                 <span className="text-secondary font-black text-[8px] uppercase tracking-widest">Temporal Analysis Meta</span>
             </div>
        </div>
      </motion.div>

      {/* Diagnosis Bento - Dark Mode Refined */}
      <motion.div variants={item} className="col-span-12 lg:col-span-8 p-8 glass-panel rounded-[3rem] relative overflow-hidden group border-white/5 bg-white/[0.01]">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px] group-hover:bg-primary/10 transition-all duration-1000" />
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Microscope className="text-primary w-5 h-5" />
            </div>
            <span className="text-white/30 text-[9px] font-black tracking-[0.6em] uppercase">Diagnostic Signature</span>
          </div>
          
          <div className="space-y-8">
            <div className="flex flex-col gap-[6px]">
              <span className="text-emerald-400 text-[10px] font-black tracking-[0.2em] uppercase leading-none">Disease Predicted</span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-[0.2em] leading-none text-gradient-dr-brinjal">
                {data.disease}
              </h2>
            </div>
            <div className="flex flex-col gap-[6px]">
              <span className="text-secondary/60 text-[9px] font-black tracking-[0.4em] uppercase leading-none">Symptoms Identified</span>
              <div className="flex flex-wrap gap-2.5">
                  {data.symptoms?.map((s, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 rounded-xl text-slate-400 text-[9px] font-black uppercase tracking-widest border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all duration-300 cursor-default">
                      {s}
                  </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Confidence Module */}
      <motion.div 
        variants={item} 
        className="col-span-12 lg:col-span-4 glass-panel rounded-[3.5rem] relative overflow-hidden flex flex-col items-center justify-center p-8 group cursor-pointer border border-white/10 bg-white/[0.03] backdrop-blur-2xl min-h-[400px]"
      >
        {/* Water Fill Effect - Seamless Geometry */}
        <motion.div 
          initial={{ height: "0%" }}
          animate={{ height: `${(data.confidence > 1 ? data.confidence : data.confidence * 100)}%` }}
          transition={{ duration: 2.5, ease: "circOut" }}
          className="absolute inset-x-0 bottom-0 pointer-events-none"
        >
          {/* SVG Definitions for Liquid Depth Gradients - DARK FRONT, LIGHT BACK */}
          <svg className="absolute w-0 h-0">
            <defs>
              <linearGradient id="purple-water-back" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d8b4fe" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#9333ea" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="purple-water-mid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#6b21a8" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="purple-water-front" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7e22ce" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#3b0764" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
          </svg>

          {/* Base Water Fill - Dark atmospheric depth */}
          <div className="absolute inset-0 bg-[#3b0764]/10 backdrop-blur-[1px] shadow-[inset_0_20px_40px_rgba(0,0,0,0.05)] pointer-events-none" />

          {/* Layer 3 (Back/Slowest) - Calibrated Sub-Shimmer (Fixed AR) */}
          <div className="absolute top-0 left-0 w-[2800px] max-w-none h-[2000px] pointer-events-none" style={{ transform: 'translateY(-10%)' }}>
            <div className="flex w-full h-full animate-wave-h" style={{ animationDuration: '25s', animationDirection: 'normal' }}>
               {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-1/4 h-full -ml-[2px]" viewBox="0 0 100 100" preserveAspectRatio="none">
                     <path d="M0 10 C 10 8.5, 40 8.5, 50 10 S 90 11.5, 100 10 V 101 H 0 Z" fill="url(#purple-water-back)" />
                  </svg>
               ))}
            </div>
          </div>

          {/* Layer 2 (Middle/Medium) - Calibrated Sub-Shimmer (Fixed AR) */}
          <div className="absolute top-0 left-0 w-[2800px] max-w-none h-[2000px] pointer-events-none" style={{ transform: 'translateY(-10%)' }}>
            <div className="flex w-full h-full animate-wave-h" style={{ animationDuration: '18s', animationDirection: 'reverse' }}>
               {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-1/4 h-full -ml-[2px]" viewBox="0 0 100 100" preserveAspectRatio="none">
                     <path d="M0 10 C 15 9.0, 35 9.0, 50 10 S 85 11.0, 100 10 V 101 H 0 Z" fill="url(#purple-water-mid)" />
                  </svg>
               ))}
            </div>
          </div>

          {/* Layer 1 (Front/Fastest) - Calibrated Sub-Shimmer (Fixed AR) */}
          <div className="absolute top-0 left-0 w-[2800px] max-w-none h-[2000px] pointer-events-none" style={{ transform: 'translateY(-10%)' }}>
            <div className="flex w-full h-full animate-wave-h" style={{ animationDuration: '12s', animationDirection: 'normal' }}>
               {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-1/4 h-full -ml-[2px]" viewBox="0 0 100 100" preserveAspectRatio="none">
                     <path d="M0 10 C 20 9.4, 30 9.4, 50 10 S 80 10.6, 100 10 V 101 H 0 Z" fill="url(#purple-water-front)" />
                  </svg>
               ))}
            </div>
          </div>

          {/* Bubble Container */}
          <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute bottom-[-20px] rounded-full animate-bubble opacity-0 border-[1.5px] border-white/40 bg-white/20 backdrop-blur-md shadow-[inset_0_0_8px_rgba(255,255,255,0.5)]"
                style={{
                  left: `${2 + (i * 5)}%`,
                  width: `${10 + (i % 12)}px`,
                  height: `${10 + (i % 12)}px`,
                  animationDelay: `${i * 0.25}s`,
                  animationDuration: `${3 + (i % 3) * 1.5}s`
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Content Layer stays on top */}
        <div className="relative z-10 text-center flex flex-col items-center">
          <span className="text-emerald-300/70 text-[10px] font-black tracking-[0.4em] uppercase mb-2 block">Confidence Level</span>
          
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-7xl sm:text-8xl font-black text-emerald-300 tabular-nums tracking-tighter drop-shadow-[0_0_25px_rgba(110,231,183,0.3)]">
              {Math.round(data.confidence > 1 ? data.confidence : data.confidence * 100)}
            </span>
            <span className="text-3xl font-black text-emerald-300/80 drop-shadow-xl font-mono">%</span>
          </div>
        </div>
      </motion.div>

      {/* Protocol Dashboard */}
      <motion.div variants={item} className="col-span-12 p-10 glass-panel rounded-[3.5rem] relative overflow-hidden border-white/5 bg-white/[0.02]">
        <div className="flex-1 space-y-8">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-secondary/20 flex items-center justify-center">
                  <Stethoscope className="text-secondary w-5 h-5" />
              </div>
              <span className="text-secondary/50 text-[10px] font-black tracking-[0.5em] uppercase text-gradient-purple">Treatment Protocol v4.2</span>
           </div>
           
            <div className="flex flex-col gap-12">
              <div className="space-y-4">
                 <h4 className="text-white/90 font-black text-xl tracking-tight">Clinical Action Plan</h4>
                 <div className="space-y-3">
                    {(data.clinical_action_plan || data.recommendations)?.map((rec, i) => (
                      <div key={i} className="flex items-start gap-4">
                         <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0 animate-pulse" />
                         <p className="text-slate-400 leading-relaxed font-bold text-sm">
                           {rec}
                         </p>
                      </div>
                    ))}
                 </div>
                 <div className="pt-4 space-y-4">
                     <button 
                       onClick={handleToggleReport}
                       className="flex items-center gap-2 text-secondary font-black text-[10px] uppercase tracking-widest hover:gap-4 transition-all active:scale-95 translate-y-0 hover:-translate-y-0.5"
                     >
                         {showTechnicalReport ? "Close Analysis" : "Full Technical Report"} <ChevronRight className={`transition-transform duration-300 ${showTechnicalReport ? 'rotate-90' : ''}`} size={14} />
                     </button>

                     {showTechnicalReport && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                               <span className="text-white/40 text-[10px] uppercase font-black tracking-widest">Parameter Analysis</span>
                               <span className="text-secondary text-[10px] font-black">
                                 {loadingReport ? (
                                   <div className="flex items-center gap-2">
                                     <RefreshCcw size={10} className="animate-spin" /> ANALYZING...
                                   </div>
                                 ) : "STABLE"}
                               </span>
                            </div>
                            
                            {loadingReport ? (
                              <div className="py-10 flex flex-col items-center justify-center gap-4">
                                 <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                                 <p className="text-[10px] text-slate-500 font-bold uppercase animate-pulse">Consulting Multimodal AI Engine...</p>
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-1">
                                   <span className="text-[10px] text-slate-500 uppercase font-black">pH Target</span>
                                   <p className="text-white font-black text-sm">{activeParams?.ph_target || "Detecting..."}</p>
                                </div>
                                <div className="space-y-1">
                                   <span className="text-[10px] text-slate-500 uppercase font-black">Nitrogen</span>
                                   <p className="text-white font-black text-sm">{activeParams?.nitrogen || "Detecting..."}</p>
                                </div>
                                <div className="space-y-1">
                                   <span className="text-[10px] text-slate-500 uppercase font-black">Humidity</span>
                                   <p className="text-white font-black text-sm">{activeParams?.humidity || "Detecting..."}</p>
                                </div>
                                <div className="space-y-1">
                                   <span className="text-[10px] text-slate-500 uppercase font-black">Lux</span>
                                   <p className="text-white font-black text-sm">{activeParams?.lux || "Detecting..."}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                 </div>
              </div>
              
              <div className="bg-white/[0.03] rounded-[2rem] p-6 border border-white/10 flex flex-col gap-5 hover:bg-white/[0.05] transition-colors group">
                 <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                      <Droplets className="text-primary w-5 h-5" />
                    </div>
                    <span className="text-white/90 font-black text-sm">Hydration Level</span>
                  </div>
                  <span className="flex-1 ml-4 text-right px-4 py-2 rounded-xl bg-primary/20 text-primary text-[11px] font-black uppercase tracking-wider ring-1 ring-primary/20 leading-relaxed min-w-0 break-words backdrop-blur-md shadow-xl translate-y-0 hover:-translate-y-0.5 transition-transform duration-300">
                     {loadingReport ? "..." : (activeHydration || "Standard 45%")}
                  </span>
                </div>

                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(167,139,250,0.1)]">
                      <ShieldCheck className="text-secondary w-5 h-5" />
                    </div>
                    <span className="text-white/90 font-black text-sm">Photoperiod Control</span>
                  </div>
                  <span className="flex-1 ml-4 text-right px-4 py-2 rounded-xl bg-secondary/20 text-secondary text-[11px] font-black uppercase tracking-wider ring-1 ring-secondary/20 leading-relaxed min-w-0 break-words backdrop-blur-md shadow-xl translate-y-0 hover:-translate-y-0.5 transition-transform duration-300">
                     {loadingReport ? "..." : (activePhotoperiod || "Standard 12h")}
                  </span>
                </div>
              </div>
            </div>
         </div>
       </motion.div>

      {/* Action Block */}
      <motion.div variants={item} className="col-span-12 flex flex-col items-center gap-8 pt-10">
        <div className="flex items-center gap-4 text-white/20">
            <div className="h-px w-16 bg-current" />
            <Sparkles size={16} />
            <div className="h-px w-16 bg-current" />
        </div>
        <Button 
          onClick={onReset}
          className="rounded-full px-8 py-6 bg-white text-slate-900 hover:bg-white/90 font-black text-lg gap-3 shadow-xl transition-all active:scale-95"
        >
          <RefreshCcw size={20} />
          Predict Again
        </Button>
      </motion.div>
    </motion.div>
  );
}
