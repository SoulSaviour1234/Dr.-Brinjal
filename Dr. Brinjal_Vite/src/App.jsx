import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History as HistoryIcon, 
  User as AboutIcon, 
  LayoutDashboard,
  ShieldCheck,
  Microscope,
  Trash2,
  ChevronRight,
  Info,
  Cpu
} from 'lucide-react';

// Custom Branded Icons
const WhatsApp = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c1.351 0 2.191-.896 2.191-2.016-.025-1.145-.84-2.016-2.166-2.016s-2.191.871-2.191 2.016c0 1.12.84 2.016 2.14 2.016h.026zm9.182 8.212V9.359c0-2.167-1.157-3.176-2.696-3.176-1.242 0-1.799.682-2.109 1.162v-1.17h-2.4c.032.678 0 7.225 0 7.225h2.4v-4.03c0-.216.015-.432.079-.586.173-.432.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.86h2.4z"/>
  </svg>
);

import Hero from './components/Hero';
import UploadZone from './components/UploadZone';
import LoadingState from './components/LoadingState';
import ResultsDashboard from './components/ResultsDashboard';

// Strategy: Move static UI config outside to prevent re-renders and scope issues
const NAV_ITEMS = [
  { id: 'home', icon: LayoutDashboard, label: 'Home' },
  { id: 'history', icon: HistoryIcon, label: 'History' },
  { id: 'about', icon: AboutIcon, label: 'About' }
];

const STATUS_COLORS = { 
  critical: 'text-rose-400 bg-rose-500/10 border-rose-500/20', 
  moderate: 'text-amber-400 bg-amber-500/10 border-amber-500/20', 
  healthy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
};

// Model Selector Sub-component
const ModelSelector = ({ selected, onSelect }) => (
  <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 w-full max-w-sm overflow-x-auto">
    <button 
      onClick={() => onSelect('ResNet50')}
      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all font-black text-[9px] uppercase tracking-widest ${selected === 'ResNet50' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
    >
      <Cpu size={14} /> ResNet50
    </button>
    <button 
      onClick={() => onSelect('DenseNet Pro')}
      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all font-black text-[9px] uppercase tracking-widest ${selected === 'DenseNet Pro' ? 'bg-secondary text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
    >
      <Microscope size={14} /> DenseNet Pro
    </button>
    <button 
      onClick={() => onSelect('MobileNetV2')}
      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all font-black text-[9px] uppercase tracking-widest ${selected === 'MobileNetV2' ? 'bg-[#a855f7] text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
    >
      <Cpu size={14} /> MobileNetV2
    </button>
  </div>
);

// Team Data
const TEAM_MEMBERS = [
  {
    name: "Asmita Mishra",
    role: "Developer",
    whatsapp: "8250802238",
    linkedin: "https://www.linkedin.com/in/asmita-mishra-0427b5368?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/mishra.asmi_17/"
  },
  {
    name: "Anisha Dan",
    role: "Developer",
    whatsapp: "7384759517",
    linkedin: "https://www.linkedin.com/in/anisha-dan-293745383?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/anishadan22?igsh=ancwdnR2a2M3aTh2"
  },
  {
    name: "Soyuz Paul",
    role: "Developer",
    whatsapp: "8159037910",
    linkedin: "https://www.linkedin.com/in/soyuz-paul-858611334/",
    instagram: "https://www.instagram.com/soyuz__tma16/"
  },
  {
    name: "Srijit Paul",
    role: "Developer",
    whatsapp: "9674004392",
    linkedin: "https://www.linkedin.com/in/srijit-paul-65593630b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/_raajpakhi_13/"
  }
];

export default function App() {
  const [appState, setAppState] = useState('idle'); // idle, loading, results
  const [activeTab, setActiveTab] = useState('home');
  const [diagnosisData, setDiagnosisData] = useState(null);
  const [selectedModel, setSelectedModel] = useState('DenseNet Pro');
  
  // Defensive initialization for history
  const [history, setHistory] = useState(() => {
    try { 
      const stored = localStorage.getItem('brinjal_history');
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) { 
      console.error("Critical: Brinjal History Parse Failed", err);
      return []; 
    }
  });

  const [stats, setStats] = useState({ diseaseCount: 18, aiEngine: 'Hybrid' });

  useEffect(() => {
    fetch('https://raajpakhi123-dr-brinjal-backend.hf.space/get_stats')
      .then(res => res.json())
      .then(data => setStats({ 
        diseaseCount: data.disease_count || 18, 
        aiEngine: data.ai_engine || 'Dual-Tier Hybrid' 
      }))
      .catch(err => {
        console.error("Stats Fetch Error:", err);
        setStats({ diseaseCount: 18, aiEngine: 'Dual-Tier Hybrid' });
      });
  }, []);

  const avgAccuracy = useMemo(() => {
    if (!history || history.length === 0) return 94;
    const sum = history.reduce((acc, entry) => acc + (entry.confidence || 0), 0);
    return Math.round(sum / history.length);
  }, [history]);

  const saveToHistory = (data) => {
    if (!data) return;
    const entry = {
      ...data, // Store full diagnostic metadata
      id: Date.now(),
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    };
    
    setHistory(prev => {
      const current = Array.isArray(prev) ? prev : [];
      const updated = [entry, ...current].slice(0, 20);
      try {
        localStorage.setItem('brinjal_history', JSON.stringify(updated));
      } catch (e) {
        console.warn("Storage Full", e);
      }
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('brinjal_history');
  };

  const handleStartAnalysis = async (file, geoData) => {
    setAppState('loading');
    try {
      // Create FormData to send image and model choice
      const formData = new FormData();
      
      // If file is a base64 string (from camera), convert to Blob
      if (typeof file === 'string' && file.startsWith('data:image')) {
        const response = await fetch(file);
        const blob = await response.blob();
        formData.append('file', blob, 'capture.jpg');
      } else {
        formData.append('file', file);
      }
      
      // Send the model selected from the UI
      formData.append('model_type', selectedModel);

      // Trigger POST request to the local FastAPI backend
      const response = await fetch('https://raajpakhi123-dr-brinjal-backend.hf.space/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend Error:", errorData);
        throw new Error(errorData.msg || errorData.detail || 'Prediction failed');
      }

      // Handle the returned JSON data from Task 2
      const result = await response.json();
      
      // Check for backend errors (e.g., model load failure)
      if (result.error) {
        throw new Error(result.error);
      }

      const topPrediction = result.predictions[0];
      
      // Map API results to UI state (Surface Tier)
      const isHealthy = topPrediction.label.toLowerCase().includes('healthy');
      const finalData = {
        disease: topPrediction.label,
        confidence: Math.round(topPrediction.confidence),
        status: isHealthy ? "healthy" : (topPrediction.confidence > 80 ? "critical" : "moderate"),
        image: typeof file === 'string' ? file : URL.createObjectURL(file), // Local preview
        rawFile: file, // Keep raw file for Tier 2 on-demand
        geo: geoData,
        modelUsed: result.selected_model,
        // Mapping dynamic data from Gemini AI
        symptoms: result.symptoms.length > 0 ? result.symptoms : ["Diagnostic signature detected"],
        clinical_action_plan: result.clinical_action_plan.length > 0 ? result.clinical_action_plan : ["Maintain proper hydration and nutrients."],
        hydration: result.hydration || "Standard 45%",
        photoperiod: result.photoperiod || "Standard 12h",
        predictions: result.predictions // Store all top 3 for dashboard
      };

      setDiagnosisData(finalData);
      saveToHistory(finalData);
      setAppState('results');
    } catch (error) {
      console.error("Critical Backend Error:", error);
      alert(`❌ Diagnostic Engine Error: ${error.message}\n\nPlease ensure the Backend Space is running on Hugging Face.`);
      setAppState('idle');
    }
  };

  // Pre-calculate status color to avoid crashes in render loop
  const getStatusColor = (status) => STATUS_COLORS[status] || STATUS_COLORS.moderate;

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-primary/30 font-sans tracking-tight antialiased">
      {/* 1. Dynamic Status Island (Header) */}
      <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <motion.div 
          layout
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-panel px-6 py-2.5 flex items-center justify-center gap-4 border-primary/30 shadow-2xl backdrop-blur-3xl animate-pill-radiation"
        >
          <div className="flex items-center gap-4 px-2 select-none">
            <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)] animate-blink ${
              appState === 'loading' ? 'bg-secondary' : 
              appState === 'results' ? 'bg-emerald-400' : 'bg-[#a855f7]'
            }`} />
            <span className="text-[9px] font-space font-bold uppercase tracking-[0.6em] text-primary whitespace-nowrap">
              {appState === 'idle' && activeTab === 'history' && "SCAN HISTORY"}
              {appState === 'idle' && activeTab === 'about' && "ABOUT DR. BRINJAL"}
              {(appState === 'idle' && activeTab === 'home') && "DR. BRINJAL CORE"}
              {appState === 'loading' && "ANALYZING BRINJAL HEALTH..."}
              {appState === 'results' && "DIAGNOSTIC COMPLETE"}
            </span>
          </div>
        </motion.div>
      </header>

      {/* 2. Background Engine */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-orbit" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] animate-orbit-slow" />
      </div>

      {/* 3. Main Viewport */}
      <main className="relative pt-40 pb-24 min-h-screen w-full max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">

          {/* HOME TAB VIEWPORT SWITCHER */}
          {activeTab === 'home' && (
            <motion.div key="home-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
               <AnimatePresence mode="wait">
                  {appState === 'idle' && (
                    <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col items-center gap-10">
                      <Hero />
                      <div className="flex flex-col items-center gap-4 w-full">
                        <span className="text-white/20 text-[9px] font-black tracking-[0.4em] uppercase">Select AI Engine</span>
                        <ModelSelector selected={selectedModel} onSelect={setSelectedModel} />
                      </div>
                      <UploadZone onUpload={handleStartAnalysis} />
                    </motion.div>
                  )}

                  {appState === 'loading' && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <LoadingState />
                    </motion.div>
                  )}

                  {appState === 'results' && (
                    <motion.div key="results" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center w-full">
                      <ResultsDashboard data={diagnosisData} onReset={() => { setAppState('idle'); }} />
                    </motion.div>
                  )}
               </AnimatePresence>
            </motion.div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <motion.div key="history-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto w-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <HistoryIcon className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Scan History</h2>
                    <p className="text-xs text-slate-500">{(history || []).length} records stored locally</p>
                  </div>
                </div>
                {history && history.length > 0 && (
                  <button onClick={clearHistory} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold hover:bg-rose-500/20 transition-all">
                    <Trash2 size={14} /> Clear All
                  </button>
                )}
              </div>

              {!history || history.length === 0 ? (
                <div className="glass-panel rounded-3xl p-16 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center">
                    <Microscope className="text-slate-600 w-8 h-8" />
                  </div>
                  <p className="text-slate-500 font-bold">No scans yet</p>
                  <p className="text-slate-600 text-sm">Your brinjal diagnoses will appear here after your first scan.</p>
                  <button onClick={() => setActiveTab('home')} className="mt-2 px-6 py-2.5 rounded-xl bg-primary/20 border border-primary/30 text-primary text-sm font-bold hover:bg-primary/30 transition-all flex items-center gap-2">
                    Start Scanning <ChevronRight size={16}/>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((entry) => {
                    if (!entry?.id) return null;
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setDiagnosisData(entry);
                          setActiveTab('home');
                          setAppState('results');
                        }}
                        className="glass-panel rounded-2xl p-5 flex items-center justify-between group hover:border-primary/40 transition-all shadow-lg cursor-pointer scroll-mt-20"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 overflow-hidden group-hover:bg-primary/20 transition-colors">
                            <img src="/eggplant-logo-removebg-preview.png" alt="Logo" className="w-7 h-7 object-contain drop-shadow-[0_0_5px_rgba(139,92,246,0.3)]" />
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm group-hover:text-primary transition-colors">{entry.disease || "Unknown"}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{entry.timestamp}</p>
                            <div className="flex gap-1 mt-2 flex-wrap">
                              {entry.symptoms && Array.isArray(entry.symptoms) && entry.symptoms.slice(0, 2).map((s, idx) => (
                                <span key={`${entry.id}-s-${idx}`} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5">{s}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${getStatusColor(entry.status)} shadow-[0_4px_10px_rgba(0,0,0,0.2)]`}>
                            {entry.status || "moderate"}
                          </span>
                          <span className="text-xs font-mono text-slate-400">{entry.confidence || 0}% conf.</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <motion.div key="about-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto w-full space-y-6">
              <div className="glass-panel rounded-3xl p-10 text-center flex flex-col items-center gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] to-purple-500/[0.03] -z-10" />
                <div className="flex flex-col items-center gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} className="relative z-10 w-28 h-28 flex items-center justify-center">
                    <img src="/eggplant-logo-removebg-preview.png" alt="Dr. Brinjal Logo" className="w-full h-full object-contain rotate-[22deg] drop-shadow-[0_25px_30px_rgba(0,0,0,0.8)]" />
                  </motion.div>
                  <div>
                    <h1 className="text-3xl font-black tracking-tighter text-gradient-purple-green font-space">Dr. Brinjal</h1>
                    <p className="text-[9px] text-primary font-black uppercase tracking-[0.5em] mt-2">AI-Powered Agri Diagnostic System</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                  Dr. Brinjal uses advanced computer vision and machine learning to detect diseases in brinjal crops. Snap a photo, get an instant diagnosis.
                </p>
                <div className="flex gap-3 mt-2">
                  <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">v1.1.2</span>
                  <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">Gemini 2.5</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Microscope, label: "Diseases Predicted", value: "50+" },
                  { icon: ShieldCheck, label: "Accuracy", value: `${avgAccuracy}%` },
                  { icon: Cpu, label: "AI Engine", value: stats.aiEngine || 'Dual-Tier Hybrid' }
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="glass-panel rounded-2xl p-5 flex flex-col items-center text-center gap-2">
                    <Icon className="text-primary w-6 h-6" />
                    <p className="text-xl font-black text-white">{value}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
                  </div>
                ))}
              </div>

              <div className="glass-panel rounded-2xl p-6 space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-white/5 pb-3">Operational Flow</p>
                {[
                  "📸 Capture/Upload leaf photo",
                  "🧠 Neural processing session",
                  "📊 Signature extraction",
                  "📍 Real-time recommendation"
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-400 font-medium">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <div className="glass-panel p-8 space-y-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex flex-col items-center gap-2 relative">
                  <h3 className="text-[10px] font-black text-secondary uppercase tracking-[0.4em]">Core Engineering</h3>
                  <h2 className="text-xl font-black text-white tracking-tighter">Dr. Brinjal Tech Labs</h2>
                  <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent mt-2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                  {TEAM_MEMBERS.map((member, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-3xl flex items-center justify-between hover:border-primary/30 hover:bg-white/[0.07] transition-all duration-300 group/card">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-midnight/60 border border-white/10 flex items-center justify-center text-[10px] font-black text-primary group-hover/card:scale-110 transition-transform">
                          0{i + 1}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-white">{member.name}</p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                         <a href={member.whatsapp !== '#' ? `https://wa.me/91${member.whatsapp}` : "#"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-emerald-400/60 hover:text-emerald-400 transition-all"><WhatsApp size={14} /></a>
                         <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-rose-400/60 hover:text-rose-400 transition-all"><InstagramIcon size={14} /></a>
                         <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-blue-500/20 text-blue-400/60 hover:text-blue-400 transition-all"><LinkedinIcon size={14} /></a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 4. Fixed Bottom Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
        <div className="glass-panel px-6 py-4 flex items-center justify-between border-white/10 bg-midnight/40 backdrop-blur-3xl shadow-2xl">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id !== 'home') setAppState('idle');
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative flex flex-col items-center gap-1.5"
              >
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-slate-500'}`} />
                <span className={`text-[10px] uppercase font-bold tracking-widest ${isActive ? 'text-white' : 'text-slate-500'}`}>
                  {item.label}
                </span>
                {/* Active indicator dot removed per user request */}
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* 5. Copyright Attribution Footer */}
      <footer className="fixed bottom-4 right-8 z-[100] hidden lg:block">
        <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.4em] select-none transition-all duration-500 hover:text-white hover:scale-105 cursor-default hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] group">
          © 2026 Dr. Brinjal Tech Labs. <span className="text-primary/60 group-hover:text-primary ml-2 italic transition-colors duration-500">All Rights Reserved.</span>
        </p>
      </footer>
    </div>
  );
}
