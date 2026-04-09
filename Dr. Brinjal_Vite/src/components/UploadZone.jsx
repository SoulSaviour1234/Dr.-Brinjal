import { useState, useRef, useEffect } from "react";
import { Camera, X, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadZone({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const activeStreamRef = useRef(null);

  const stopScanner = () => {
    if (activeStreamRef.current) {
      activeStreamRef.current.getTracks().forEach(track => track.stop());
      activeStreamRef.current = null;
    }
    setStream(null);
    setIsCameraActive(false);
    setIsVideoPlaying(false);
  };

  const startScanner = async (forceBasic = false) => {
    setCameraError(false);
    setIsVideoPlaying(false);
    
    try {
      const constraints = forceBasic 
        ? { video: true } 
        : { 
            video: { 
                facingMode: { ideal: "environment" },
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }, 
            audio: false 
          };

      const s = await navigator.mediaDevices.getUserMedia(constraints);
      activeStreamRef.current = s;
      setStream(s);
      setIsCameraActive(true);
    } catch (err) {
      console.warn("Primary camera fail, forcing basic...", err);
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
        activeStreamRef.current = fallbackStream;
        setStream(fallbackStream);
        setIsCameraActive(true);
      } catch (fallbackErr) {
        alert("Camera access denied. Please verify browser permissions.");
        setIsCameraActive(false);
      }
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setTimeout(() => onUpload(reader.result, { source: 'upload' }), 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onUpload(reader.result, { source: 'upload' });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    return () => {
      if (activeStreamRef.current) {
        activeStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    
    const imageData = canvasRef.current.toDataURL('image/jpeg');
    setPreview(imageData);
    stopScanner();

    // Trigger analysis with geo-tagging
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onUpload(imageData, {
            source: 'capture',
            locationEnabled: true,
            lat: position.coords.latitude.toFixed(4),
            long: position.coords.longitude.toFixed(4)
          });
        },
        () => {
          onUpload(imageData, { source: 'capture', locationEnabled: false });
        }
      );
    } else {
      onUpload(imageData, { source: 'capture', locationEnabled: false });
    }
  };

  return (
    <div className="w-full max-w-xl px-4 mt-4 mx-auto">
      <canvas ref={canvasRef} className="hidden" />
      <AnimatePresence mode="wait">
        {isCameraActive ? (
          <motion.div
            key="camera-zone"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-[3rem] overflow-hidden min-h-[420px] glass-panel border-[4px] border-white/10 shadow-[0_60px_100px_-50px_rgba(0,0,0,0.8)] bg-black/40"
          >
            {/* Inner Border Glow */}
            <div className="absolute inset-0 rounded-[3rem] border border-white/5 pointer-events-none z-40 shadow-[inset_0_0_40px_rgba(255,255,255,0.05)]" />
            <video 
              ref={(el) => {
                  if (el && stream) {
                      el.srcObject = stream;
                      el.play().catch(e => console.error("Video play failed:", e));
                  }
                  videoRef.current = el;
              }}
              autoPlay 
              playsInline 
              muted
              onPlaying={() => setIsVideoPlaying(true)}
              className="w-full h-full object-cover min-h-[420px]"
            />
            
            {/* Connecting Spinner (Visible while hardware wakes up) */}
            {!isVideoPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-black z-30 px-6 text-center">
                    {!cameraError ? (
                        <>
                            <div className="w-16 h-16 rounded-full border-t-2 border-white/40 animate-spin" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 font-space animate-pulse">Initializing Hardware...</span>
                        </>
                    ) : (
                        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                            <div className="p-4 rounded-full bg-red-500/10 text-red-400 mx-auto w-fit">
                                <X size={32} />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-white font-black uppercase tracking-widest text-xs">Uplink Failed</h4>
                                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">Hardware is taking longer than expected to respond.</p>
                            </div>
                            <button 
                                onClick={() => startScanner(true)}
                                className="w-full py-4 bg-white/10 hover:bg-white hover:text-midnight rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-white/20 transition-all"
                            >
                                Hard Reset Connection
                            </button>
                        </div>
                    )}
                </div>
            )}
            
            {/* Robotic Scanner HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-emerald-500/80 shadow-[0_0_25px_rgba(16,185,129,0.7)] animate-[scan_3s_infinite]" />
                <div className="absolute inset-8 border-2 border-white/15 rounded-3xl" />
                
                <div className="absolute top-12 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b857] animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-emerald-400/80 font-space">Optical Sensor Active</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7] animate-pulse" />
                </div>
            </div>

            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-6 z-20">
                <button
                    onClick={stopScanner}
                    className="p-4 bg-white/5 backdrop-blur-2xl rounded-2xl text-white hover:bg-white/10 transition-all active:scale-90 border border-white/10"
                >
                    <X size={20} />
                </button>
                <button
                    onClick={capturePhoto}
                    className="px-8 py-3.5 bg-white/10 backdrop-blur-3xl text-white rounded-full text-lg font-black shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all hover:bg-white hover:text-midnight hover:-translate-y-0.5 active:scale-95 flex items-center gap-3 border border-white/30"
                >
                    <Activity className="h-5 w-5 animate-pulse" />
                    Capture
                </button>
            </div>
          </motion.div>
        ) : !preview ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`
              relative group
              min-h-[420px]
              rounded-[3.5rem] transition-all duration-1000
              flex flex-col items-center justify-center p-10
              overflow-hidden glass-panel border-white/5
              ${isDragging ? "bg-primary/20 border-primary/40 ring-4 ring-primary/10" : "hover:bg-primary/5 hover:border-white/20"}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange} 
            />
            
            {/* Holographic Background Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-30 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-full h-full flex flex-col items-center justify-between gap-8 relative z-10">
              {/* Camera Interaction Core */}
              <div 
                 onClick={startScanner}
                 className="relative group/icon cursor-pointer"
              >
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-24 h-24 rounded-full bg-midnight glass-panel flex items-center justify-center text-white relative z-10 border-white/10 group-hover:border-white transition-colors duration-500"
                >
                  <Camera className="w-10 h-10 text-white/80 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-[-10px] rounded-full border border-dashed border-white/20 animate-spin-slow" />
                </motion.div>
                <div className="absolute inset-x-0 -bottom-6 h-12 bg-white/10 rounded-full blur-[40px] opacity-20 group-hover:opacity-60 transition-opacity" />
              </div>

              {/* Branding & CTA Header */}
              <div className="space-y-4 text-center">
                <div className="flex flex-col items-center gap-3 text-center">
                    <h3 className="text-4xl sm:text-5xl font-black tracking-tighter text-gradient-dr-brinjal font-space uppercase leading-none px-4">
                        Scan Sample
                    </h3>
                    <div className="h-1 w-16 bg-emerald-500/20 rounded-full group-hover:w-24 transition-all duration-700" />
                </div>
                <p className="text-slate-400 font-black max-w-[280px] leading-relaxed mx-auto text-[8px] uppercase tracking-[0.4em] opacity-40 font-space text-center">
                    Direct Camera Uplink <span className="text-white/40">or</span> Gallery Import 
                </p>
              </div>

              {/* ACTION BUTTON GRID */}
              <div className="flex flex-col w-full gap-4 items-center">
                <button
                    onClick={startScanner}
                    className="w-64 bg-white/5 backdrop-blur-2xl text-white hover:bg-emerald-500 hover:text-white rounded-full py-3.5 px-6 text-base font-black shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all active:scale-95 group/btn overflow-hidden relative border border-white/20 flex items-center justify-center gap-3"
                >
                    <Activity className="h-5 w-5 animate-pulse text-emerald-400 group-hover:text-white" />
                    <span className="font-space text-base tracking-tight uppercase">Live Camera</span>
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]" />
                </button>
                <button
                    onClick={() => fileInputRef.current.click()}
                    className="w-64 bg-white/5 backdrop-blur-2xl text-white hover:bg-purple-500 hover:text-white rounded-full py-3.5 px-6 text-base font-black shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all active:scale-95 group/btn overflow-hidden relative border border-white/20 flex items-center justify-center gap-3"
                >
                    <Camera className="h-5 w-5 text-purple-400 group-hover:text-white" />
                    <span className="font-space text-base tracking-tight uppercase">Upload File</span>
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview-zone"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative rounded-[3.5rem] overflow-hidden min-h-[420px] glass-panel border-[12px] border-midnight shadow-[0_80px_100px_-50px_rgba(0,0,0,0.8)]"
          >
            <motion.img 
              layoutId="shared-photo"
              src={preview} 
              className="w-full h-full object-cover filter brightness-50 group-hover:brightness-75 transition-all duration-1000 grayscale-[0.3] group-hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/40" />
            
            <button
               onClick={() => setPreview(null)}
               className="absolute top-8 right-8 p-4 bg-midnight/60 backdrop-blur-2xl rounded-2xl text-white hover:bg-red-500/20 hover:text-red-400 transition-all active:scale-90 border border-white/10"
            >
                <X size={24} />
            </button>
            
            <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-6">
                <motion.div 
                   animate={{ scale: [1, 1.05, 1] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="px-8 py-4 bg-white/5 backdrop-blur-3xl rounded-[2rem] text-primary font-black text-[10px] shadow-glow flex items-center gap-4 border border-white/10"
                >
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping shadow-[0_0_15px_#10b857]" />
                    <span className="tracking-[0.3em] uppercase text-white/90">Engaging Neural Cores...</span>
                </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
