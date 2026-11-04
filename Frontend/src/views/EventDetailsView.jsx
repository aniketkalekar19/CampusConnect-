import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowLeft, 
  Ticket, 
  CheckCircle2, 
  Users, 
  Share2, 
  Utensils, 
  Award, 
  Laptop, 
  Sparkles, 
  ShieldCheck, 
  Tag, 
  Coffee, 
  FileText, 
  Zap, 
  Camera, 
  Music,
  RefreshCw,
  X
} from 'lucide-react';
import { fetchEventAttendees } from '../services/api';

export default function EventDetailsView({ 
  event, 
  onBack, 
  onGetTicket, 
  onNavigate,
  isAlreadyBooked = false,
  user
}) {
  const [showAttendeesModal, setShowAttendeesModal] = useState(false);
  const [attendeesData, setAttendeesData] = useState(null);
  const [attendeesError, setAttendeesError] = useState(null);
  const [loadingAttendees, setLoadingAttendees] = useState(false);

  if (!event) return null;

  const currentUserId = user?.studentId || 'STU-2026-7829';

  const handleFetchAttendees = async () => {
    setLoadingAttendees(true);
    setAttendeesError(null);
    setShowAttendeesModal(true);

    const result = await fetchEventAttendees(event.id, currentUserId);
    setLoadingAttendees(false);

    if (result.status === 200) {
      setAttendeesData(result.data);
    } else {
      setAttendeesError({
        status: result.status,
        error: result.error,
        code: result.code,
        organizer: result.owningOrganizer || event.organizer
      });
    }
  };

  // Icon map for dynamic bullet features
  const getFeatureIcon = (iconName) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-5 h-5 text-indigo-600" />;
      case 'Users': return <Users className="w-5 h-5 text-indigo-600" />;
      case 'Award': return <Award className="w-5 h-5 text-indigo-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-indigo-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
      case 'Tag': return <Tag className="w-5 h-5 text-indigo-600" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-indigo-600" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-indigo-600" />;
      case 'FileText': return <FileText className="w-5 h-5 text-indigo-600" />;
      case 'Zap': return <Zap className="w-5 h-5 text-indigo-600" />;
      case 'Camera': return <Camera className="w-5 h-5 text-indigo-600" />;
      case 'Music': return <Music className="w-5 h-5 text-indigo-600" />;
      default: return <CheckCircle2 className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-200 shadow-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </button>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert("Event link copied to clipboard!");
            }}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs transition"
            title="Share Event"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TOP BANNER AREA: Large Event Hero Image, Title, Date, Time, and Ticket Price */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-lg min-h-[360px] flex flex-col justify-end">
        {/* Hero Background Image */}
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover object-center brightness-75"
        />
        {/* Gradient Overlay for high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>

        {/* Content over banner */}
        <div className="relative z-10 p-6 sm:p-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${event.categoryColor}`}>
              {event.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              event.isPaid 
                ? 'bg-indigo-600 text-white' 
                : 'bg-emerald-500 text-white'
            }`}>
              {event.isPaid ? `$${event.price} Ticket` : 'Free Admission'}
            </span>
            <span className="text-xs text-slate-300 font-medium bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
              {event.locationType === 'on-campus' ? 'On Campus' : 'External Venue'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white my-0 leading-tight">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-200 pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="font-semibold text-white">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* TWO COLUMN INTEGRATED LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Detailed "About the Event" text section with icon-bulleted features */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* About Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight my-0">
                About the Event
              </h2>
              <div className="w-12 h-1 bg-indigo-600 rounded-full mt-2"></div>
            </div>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {event.description}
            </p>

            {/* Icon-bulleted features */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                What's Included & Highlights
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {event.features?.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium text-slate-800"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-slate-200/60 flex items-center justify-center shrink-0">
                      {getFeatureIcon(feat.icon)}
                    </div>
                    <span>{feat.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Timeline */}
            {event.schedule && (
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                  Event Schedule & Rundown
                </h3>
                <div className="space-y-3">
                  {event.schedule.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-mono text-xs font-bold shrink-0">
                        {item.time}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Organizer Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={event.organizerAvatar}
                alt={event.organizer}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-100"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Host Club / Department</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{event.organizer}</h4>
                <p className="text-xs text-slate-500 mt-0.5">Verified Campus Organizer</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleFetchAttendees}
                className="px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100"
                title="View attendee registrations"
              >
                <Users className="w-3.5 h-3.5" />
                <span>View Attendees</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('messages')}
                className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-indigo-300 text-slate-700 text-xs font-semibold hover:bg-indigo-50 hover:text-indigo-700 transition"
              >
                Contact
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sticky "Event Details" card showing price, date & time, location, and prominent "Get Ticket" button */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xl space-y-6">
            
            {/* Price Header */}
            <div className="flex items-baseline justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-medium text-slate-500">Ticket Price</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {event.isPaid ? `$${event.price}` : 'Free'}
                  </span>
                  {event.isPaid && <span className="text-xs text-slate-400">/ student pass</span>}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                event.isPaid 
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {event.priceType}
              </span>
            </div>

            {/* Quick Summary Rows */}
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Date & Day</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{event.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Timing</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Venue Location</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5 leading-snug">{event.location}</p>
                </div>
              </div>
            </div>

            {/* Capacity meter */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600">Reserved Spots</span>
                <span className="text-indigo-600">{event.registeredCount} of {event.capacity}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
                  style={{ width: `${Math.min(100, (event.registeredCount / event.capacity) * 100)}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-400 text-right">
                {event.capacity - event.registeredCount} spots remaining
              </p>
            </div>

            {/* Prominent "Get Ticket" button */}
            <div className="pt-2">
              {isAlreadyBooked ? (
                <button
                  onClick={() => onNavigate('my-events')}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-200 flex items-center justify-center gap-2 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You Have a Pass (View in My Events)</span>
                </button>
              ) : (
                <button
                  onClick={() => onGetTicket(event)}
                  className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition transform active:scale-[0.99]"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Get Ticket</span>
                </button>
              )}
              <p className="text-center text-[11px] text-slate-400 mt-2">
                Instant digital e-pass generated upon confirmation
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Attendee list modal */}
      {showAttendeesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  attendeesError ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">
                  {attendeesError ? 'Could Not Load Attendees' : 'Event Registered Attendees'}
                    </h3>
                    <span className="font-mono text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">
                      Attendees
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {event.title}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAttendeesModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {loadingAttendees && (
                <div className="py-12 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
                  <p className="text-xs font-semibold text-slate-600">
                    Loading attendee list...
                  </p>
                </div>
              )}

              {/* Attendee request error */}
              {!loadingAttendees && attendeesError && (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-rose-200 text-rose-800">
                    REQUEST ERROR
                  </span>
                  <h4 className="font-bold text-slate-900 text-base">
                    Attendee list unavailable
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    {attendeesError.error}
                  </p>
                  <div className="pt-2 text-[11px] text-slate-500 bg-white/80 p-3 rounded-xl border border-rose-100 text-left space-y-1 font-mono">
                    <p><strong>Status:</strong> {attendeesError.status || 'Unavailable'}</p>
                    <p><strong>Current Requester:</strong> {currentUserId} ({user?.name || 'Student'})</p>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Please try again once the backend is available.
                  </p>
                </div>
              )}

              {/* 200 OK Organizer Attendee Table */}
              {!loadingAttendees && attendeesData && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-indigo-50/70 p-3.5 rounded-2xl border border-indigo-100 text-xs">
                    <div>
                      <span className="font-bold text-indigo-900">Organizer:</span>
                      <span className="text-indigo-700 ml-1">{attendeesData.organizer}</span>
                    </div>
                    <span className="font-bold px-2.5 py-1 bg-white text-indigo-700 rounded-lg shadow-xs">
                      {attendeesData.attendeeCount} Registered Students
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                        <tr>
                          <th className="py-2.5 px-3.5">Attendee</th>
                          <th className="py-2.5 px-3.5">Student ID</th>
                          <th className="py-2.5 px-3.5">Tier / Seat</th>
                          <th className="py-2.5 px-3.5">Registered</th>
                          <th className="py-2.5 px-3.5 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {attendeesData.attendees.map((att, i) => (
                          <tr key={att.ticketId || i} className="hover:bg-slate-50/80">
                            <td className="py-3 px-3.5">
                              <p className="font-bold text-slate-900">{att.attendeeName}</p>
                              <p className="text-[10px] text-slate-400">{att.attendeeEmail}</p>
                            </td>
                            <td className="py-3 px-3.5 font-mono text-slate-600">
                              {att.studentId}
                            </td>
                            <td className="py-3 px-3.5 text-slate-600">
                              <p className="font-semibold text-slate-800">{att.ticketType}</p>
                              <p className="text-[10px] text-indigo-600">{att.seat || 'General'}</p>
                            </td>
                            <td className="py-3 px-3.5 text-slate-500 text-[11px]">
                              {att.bookingDate}
                            </td>
                            <td className="py-3 px-3.5 text-right">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                {att.status || 'Confirmed'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
              <button
                type="button"
                onClick={() => setShowAttendeesModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
