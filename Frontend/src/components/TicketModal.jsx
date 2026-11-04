import React from 'react';
import { X, Calendar, Clock, MapPin, Download, Share2, CheckCircle2, Ticket as TicketIcon } from 'lucide-react';

export default function TicketModal({ ticket, onClose, onDownload }) {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 transform transition-all animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <TicketIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Verified Student E-Pass</h3>
              <p className="text-xs text-slate-500">Campus Connect Digital Pass</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ticket Body */}
        <div className="p-6">
          <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-indigo-200 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50 p-5 shadow-sm">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {ticket.status || 'Verified Entry'}
              </span>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-100/70 px-2.5 py-1 rounded-md">
                {ticket.ticketId}
              </span>
            </div>

            {/* Event Title */}
            <h4 className="text-lg font-bold text-slate-900 leading-snug mb-3">
              {ticket.eventTitle}
            </h4>

            {/* Details Grid */}
            <div className="space-y-2.5 text-xs text-slate-600 mb-5 bg-white/80 p-3.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="font-medium text-slate-800">{ticket.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{ticket.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="truncate">{ticket.location}</span>
              </div>
            </div>

            {/* Pass Holder & Seat */}
            <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-200/80 pt-3.5 mb-5">
              <div>
                <p className="text-slate-400 font-medium">Attendee</p>
                <p className="font-bold text-slate-800 text-sm">Aniket Sharma</p>
                <p className="text-[11px] text-slate-500 font-mono">ID: STU-2026-7829</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 font-medium">Seat / Tier</p>
                <p className="font-bold text-indigo-600 text-sm">{ticket.seat || 'General Access'}</p>
                <p className="text-[11px] text-slate-500">{ticket.ticketType || 'Student Entry'}</p>
              </div>
            </div>

            {/* Mock QR & Barcode Section */}
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-slate-200 shadow-inner">
              {/* QR representation */}
              <div className="w-32 h-32 p-2 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
                <div className="w-full h-full bg-white p-1 rounded grid grid-cols-6 gap-1">
                  {/* Decorative pseudo-QR blocks */}
                  <div className="col-span-2 row-span-2 bg-slate-900 rounded-sm"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-slate-300"></div>
                  <div className="col-span-2 row-span-2 bg-slate-900 rounded-sm"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-slate-400"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-slate-200"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-slate-900"></div>
                  <div className="col-span-2 row-span-2 bg-slate-900 rounded-sm"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-slate-300"></div>
                  <div className="col-span-2 row-span-2 bg-slate-900 rounded-sm"></div>
                </div>
              </div>
              <p className="text-[11px] font-mono text-slate-400 mt-2 tracking-wider">
                SCAN AT ENTRY GATES
              </p>
            </div>

            {/* Cut line visual */}
            <div className="absolute -left-3 top-1/2 -mt-3 w-6 h-6 rounded-full bg-white border-r border-slate-200"></div>
            <div className="absolute -right-3 top-1/2 -mt-3 w-6 h-6 rounded-full bg-white border-l border-slate-200"></div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={() => {
                if (onDownload) onDownload(ticket);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-200 transition"
            >
              <Download className="w-4 h-4" />
              Download Pass (PDF)
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert("Pass link copied to clipboard!");
              }}
              className="flex items-center justify-center p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
              title="Share Ticket"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
