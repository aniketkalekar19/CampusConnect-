import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-200 bg-white shadow-emerald-100',
    error: 'border-rose-200 bg-white shadow-rose-100',
    info: 'border-indigo-200 bg-white shadow-indigo-100'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all transform animate-in slide-in-from-bottom duration-300">
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-xl ${borders[toast.type || 'info']} min-w-[320px] max-w-md`}>
        {icons[toast.type || 'info']}
        <div className="flex-1 text-sm">
          <p className="font-semibold text-slate-800">{toast.title}</p>
          {toast.message && <p className="text-slate-500 text-xs mt-0.5">{toast.message}</p>}
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
