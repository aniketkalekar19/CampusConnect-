import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Wallet, 
  Building2, 
  ShieldCheck, 
  Lock, 
  Ticket as TicketIcon,
  AlertTriangle 
} from 'lucide-react';
import { createRegistration } from '../services/api';

export default function CheckoutView({ 
  event, 
  user, 
  onBack, 
  onPaymentSuccess, 
  showToast 
}) {
  const [fullName, setFullName] = useState(user?.name || 'Aniket Sharma');
  const [email, setEmail] = useState(user?.email || 'aniket.sharma@campus.edu');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [studentId, setStudentId] = useState(user?.studentId || 'STU-2026-7829');

  // Payment method selection: 'upi' | 'card' | 'netbanking' | 'wallet'
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('aniket.sharma@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('•••');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conflictError, setConflictError] = useState(null);

  if (!event) return null;

  // Price computations
  const ticketBasePrice = event.price || 0;
  const platformFee = 0; // Free for university students
  const studentDiscount = event.isPaid ? 2 : 0; // $2 campus discount
  const totalAmount = Math.max(0, ticketBasePrice - studentDiscount + platformFee);

  const handlePayNow = async (e) => {
    e.preventDefault();
    setConflictError(null);

    if (!fullName || !email) {
      if (showToast) showToast('Missing Information', 'Please complete the billing details.', 'error');
      return;
    }

    setIsProcessing(true);
    if (showToast) {
      showToast('Processing Registration', 'Submitting your registration...', 'info');
    }

    try {
      // Submit the registration and handle success or conflict.
      const res = await createRegistration({
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
        eventImage: event.image,
        userId: studentId || user?.studentId || 'STU-2026-7829',
        studentId: studentId || 'STU-2026-7829',
        attendeeName: fullName,
        attendeeEmail: email,
        phone,
        ticketType: event.isPaid ? 'Verified Student Pass' : 'General Admission',
        price: totalAmount,
        seat: 'Gate Section A'
      });

      setIsProcessing(false);

      if (res.status === 201) {
        const txn = {
          transactionId: res.data.ticketId.replace('TCK', 'TXN'),
          ticketId: res.data.ticketId,
          date: res.data.bookingDate,
          amount: totalAmount,
          paymentMethod: event.isPaid ? paymentMethod.toUpperCase() : 'FREE STUDENT REGISTRATION',
          eventTitle: event.title,
          eventDate: event.date,
          eventTime: event.time,
          eventLocation: event.location,
          eventImage: event.image,
          eventId: event.id
        };
        onPaymentSuccess(txn);
      } else if (res.status === 409) {
        setConflictError(res.error || 'Conflict 409: User is already registered for this event.');
        if (showToast) {
          showToast('Registration Conflict (409)', res.error || 'You are already registered for this event.', 'error');
        }
      } else {
        if (showToast) showToast('Registration Error', res.error || 'Failed to complete registration.', 'error');
      }
    } catch (err) {
      setIsProcessing(false);
      if (showToast) showToast('Network Error', err.message, 'error');
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-200 shadow-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Event Details</span>
        </button>
      </div>

      <div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
          Step 2 of 2: Checkout
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight my-1">
          Checkout & Ticket Booking
        </h1>
        <p className="text-sm text-slate-500">
          Review your event reservation and enter attendee details to generate your digital entry pass.
        </p>
      </div>

      {/* SPLIT LAYOUT */}
      <form onSubmit={handlePayNow} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Event Summary Card & Billing Details Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Event Summary Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2 my-0">
              <TicketIcon className="w-4 h-4 text-indigo-600" />
              <span>Event Summary</span>
            </h2>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <img
                src={event.image}
                alt={event.title}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0"
              />
              <div className="space-y-1.5 flex-1 min-w-0">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${event.categoryColor}`}>
                  {event.category}
                </span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug truncate">
                  {event.title}
                </h3>
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 px-1">
              <span className="text-slate-500">Selected Ticket Tier</span>
              <span className="font-bold text-slate-800">
                {event.isPaid ? 'General Student Pass' : 'Complimentary Campus Entry'}
              </span>
            </div>
          </div>

          {/* Billing Details Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight my-0">
                Attendee & Billing Details
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                The digital student QR code pass will be registered under this name and email.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Campus Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@campus.edu"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Student Roll / ID
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="STU-2026-7829"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Campus ID verified for automatic student discount eligibility.</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Payment Method Selection & Checkout Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Payment Method Selection Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight my-0">
                Payment Method
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select your preferred student payment gateway
              </p>
            </div>

            {/* Radio Options: UPI, Card, Net Banking, Wallet */}
            <div className="space-y-3">
              
              {/* Option 1: UPI */}
              <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                paymentMethod === 'upi'
                  ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                  : 'border-slate-200 hover:border-slate-300'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="mt-1 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">UPI (Google Pay, PhonePe, Paytm)</span>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">Fastest</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Instant zero-fee student UPI transfer</p>
                  
                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-2 border-t border-indigo-100">
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        UPI ID / VPA
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        placeholder="yourname@upi"
                      />
                    </div>
                  )}
                </div>
              </label>

              {/* Option 2: Card */}
              <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                paymentMethod === 'card'
                  ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                  : 'border-slate-200 hover:border-slate-300'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-1 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">Credit / Debit Card</span>
                    <CreditCard className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Visa, Mastercard, RuPay & Amex</p>

                  {paymentMethod === 'card' && (
                    <div className="mt-3 pt-2 border-t border-indigo-100 space-y-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Expiry</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">CVV</label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Option 3: Net Banking */}
              <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                paymentMethod === 'netbanking'
                  ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                  : 'border-slate-200 hover:border-slate-300'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={paymentMethod === 'netbanking'}
                  onChange={() => setPaymentMethod('netbanking')}
                  className="mt-1 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">Net Banking</span>
                    <Building2 className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">All major partner banks supported</p>

                  {paymentMethod === 'netbanking' && (
                    <div className="mt-3 pt-2 border-t border-indigo-100">
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="State Bank of India">State Bank of India</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Chase / Bank of America">Chase / Bank of America</option>
                      </select>
                    </div>
                  )}
                </div>
              </label>

              {/* Option 4: Campus Wallet */}
              <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                paymentMethod === 'wallet'
                  ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                  : 'border-slate-200 hover:border-slate-300'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="wallet"
                  checked={paymentMethod === 'wallet'}
                  onChange={() => setPaymentMethod('wallet')}
                  className="mt-1 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">Campus Meal & Event Wallet</span>
                    <Wallet className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Available balance: <strong className="text-emerald-600">$45.00</strong></p>
                </div>
              </label>

            </div>
          </div>

          {/* Final Checkout Breakdown & Prominent "Pay Now" Button */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100">
              Payment Breakdown
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Event Ticket Price</span>
                <span className="font-semibold text-slate-800">${ticketBasePrice}.00</span>
              </div>

              {event.isPaid && (
                <div className="flex justify-between text-emerald-600">
                  <span>Student ID Privilege Discount</span>
                  <span className="font-semibold">-${studentDiscount}.00</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Campus Tech & Booking Fee</span>
                <span className="font-semibold text-emerald-600">FREE ($0.00)</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-slate-900">Total Amount</span>
                  <p className="text-[11px] text-slate-400">All student taxes included</p>
                </div>
                <span className="text-2xl font-extrabold text-indigo-600">
                  ${totalAmount}.00
                </span>
              </div>
            </div>

            {/* 409 Conflict Alert (if already registered) */}
            {conflictError && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>HTTP 409 Conflict Detected</span>
                </div>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  {conflictError}
                </p>
                <button
                  type="button"
                  onClick={() => onBack()}
                  className="mt-1 text-xs font-semibold text-indigo-600 hover:underline inline-block"
                >
                  ← Return to event details
                </button>
              </div>
            )}

            {/* Prominent "Pay Now" Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-sm shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition transform active:scale-[0.99] cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Confirming Ticket...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>{event.isPaid ? `Pay Now ($${totalAmount}.00)` : 'Confirm Free Registration'}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-bit SSL encrypted campus payment portal</span>
              </div>
            </div>

          </div>

        </div>

      </form>

    </div>
  );
}
