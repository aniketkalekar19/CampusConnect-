import React from 'react';
import { 
  CheckCircle2, 
  Ticket, 
  Sparkles,
  QrCode,
  Compass
} from 'lucide-react';

export default function PaymentSuccessView({ 
  transaction, 
  onViewMyTickets, 
  onGoToEvents,
  onOpenTicketModal 
}) {
  const txn = transaction || {
    transactionId: 'TXN-CC-2026-89421',
    eventTitle: 'Campus Band Night: Battle of the Bands',
    eventDate: 'Friday, Nov 15, 2026',
    eventTime: '6:00 PM - 10:00 PM',
    eventLocation: 'Main Campus Amphitheater, Central Quad',
    amount: 0,
    paymentMethod: 'FREE STUDENT REGISTRATION'
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6 animate-in zoom-in-95 duration-300">
      
      {/* Clean Centered Modal Card Layout */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-xl w-full p-6 sm:p-10 text-center relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none"></div>

        {/* Large Green Checkmark Success Icon */}
        <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mx-auto text-emerald-500 shadow-inner mb-5">
          <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.5]" />
        </div>

        {/* Success Headings */}
        <div className="relative z-10 space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Booking Confirmed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight my-0">
            Payment Successful!
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Your ticket has been booked successfully. A confirmation email and pass QR code have been dispatched.
          </p>
        </div>

        {/* ORDER SUMMARY DETAILS */}
        <div className="relative z-10 bg-slate-50/90 rounded-2xl p-5 border border-slate-200/80 text-left space-y-3.5 mb-6 text-xs sm:text-sm">
          
          {/* Event Name */}
          <div className="flex items-start justify-between pb-3 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium shrink-0">Event Name</span>
            <span className="font-bold text-slate-900 text-right truncate max-w-[280px]">
              {txn.eventTitle}
            </span>
          </div>

          {/* Date & Time */}
          <div className="flex items-start justify-between pb-3 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Date & Time</span>
            <div className="text-right">
              <p className="font-semibold text-slate-800">{txn.eventDate}</p>
              <p className="text-xs text-slate-500">{txn.eventTime}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start justify-between pb-3 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Location</span>
            <span className="font-semibold text-slate-800 text-right truncate max-w-[280px]">
              {txn.eventLocation}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Price Paid</span>
            <span className="font-bold text-indigo-600 text-base">
              {txn.amount === 0 ? 'Free Admission' : `$${txn.amount}.00`}
            </span>
          </div>

          {/* Mock Transaction ID */}
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Transaction ID</span>
            <span className="font-mono font-bold text-slate-700 bg-white px-2.5 py-1 rounded-md border border-slate-200 text-xs">
              {txn.transactionId}
            </span>
          </div>

        </div>

        {/* Action Buttons: "View My Tickets" and "Go to Events" */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onViewMyTickets}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition"
          >
            <Ticket className="w-4 h-4" />
            <span>View My Tickets</span>
          </button>

          <button
            onClick={onGoToEvents}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Go to Events</span>
          </button>
        </div>

        {/* Digital Pass Quick Preview Trigger */}
        <div className="mt-4 pt-3 text-center border-t border-slate-100">
          <button
            onClick={() => onOpenTicketModal && onOpenTicketModal()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Preview Entry QR Pass Modal</span>
          </button>
        </div>

      </div>

    </div>
  );
}
