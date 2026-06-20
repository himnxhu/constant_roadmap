import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function ResetConfirmModal({ isOpen, onClose, onConfirm }) {
  const [confirmText, setConfirmText] = useState('');
  
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (confirmText === 'RESET') {
      onConfirm();
      setConfirmText('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-all" 
      />

      {/* Modal Card */}
      <div className="relative z-10 max-w-md w-full bg-zinc-950 border border-red-900/40 rounded-2xl p-6 shadow-2xl space-y-6 overflow-hidden animate-scale-in">
        
        {/* Glow Element */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-16 w-32 h-32 bg-red-900/20 rounded-full blur-2xl pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-950/40 border border-red-900/40 rounded-xl text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <AlertTriangle className="w-6 h-6 animate-pulse-short" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold font-display text-white uppercase tracking-wider">
              Aetheric Factory Reset
            </h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              This will wipe all completed tasks, custom syllabus reviews, and DSA problem logs. Offline cache and online Supabase databases will be permanently cleared.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-all ml-auto cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Validation */}
        <div className="space-y-3 pt-2">
          <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">
            Type <strong className="text-red-400">RESET</strong> to authorize wipe:
          </label>
          <input 
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="RESET"
            className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-red-500 text-white rounded-lg px-3 py-2 text-sm focus:outline-none transition-all font-mono uppercase tracking-widest text-center"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
          >
            Abort Protocol
          </button>
          <button
            onClick={handleConfirm}
            disabled={confirmText !== 'RESET'}
            className="flex-1 py-2 bg-red-650 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)] text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Wipe Tracker
          </button>
        </div>
      </div>
    </div>
  );
}
