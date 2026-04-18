import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { motion } from 'framer-motion';
import { Check, X, Scissors } from 'lucide-react';

export default function ImageCropper({ image, onCropComplete, onCancel }) {
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const imgRef = useRef(null);

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1,
        width,
        height
      ),
      width,
      height
    );
    setCrop(initialCrop);
  }

  const getCroppedImg = async () => {
    if (!imgRef.current || !completedCrop) return;

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    const base64Image = canvas.toDataURL('image/jpeg');
    onCropComplete(base64Image);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8"
    >
      <div className="w-full max-w-2xl bg-midnight rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
              <Scissors size={20} />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter">Precision Crop</h2>
              <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Align leaf to center</p>
            </div>
          </div>
          <button 
            onClick={onCancel}
            className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cropping Area */}
        <div className="relative flex-1 bg-black/40 overflow-hidden flex items-center justify-center p-4 md:p-8">
          <div className="relative group max-w-full">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop={false}
              className="max-h-[50vh] md:max-h-[60vh]"
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={image}
                onLoad={onImageLoad}
                className="max-w-full h-auto object-contain"
              />
            </ReactCrop>

            {/* Leaf Overlay Guide */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
              <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] text-emerald-500/50">
                <path 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.5" 
                  strokeDasharray="2 2"
                  d="M50 10 C 65 10, 85 30, 85 55 C 85 85, 50 95, 50 95 C 50 95, 15 85, 15 55 C 15 30, 35 10, 50 10 Z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 md:p-8 border-t border-white/5 bg-white/[0.02] flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-4 rounded-full bg-white/5 border border-white/10 text-white font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={getCroppedImg}
            className="flex-[2] py-4 rounded-full bg-primary text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <Check size={20} />
            Confirm & Crop
          </button>
        </div>
      </div>
    </motion.div>
  );
}
