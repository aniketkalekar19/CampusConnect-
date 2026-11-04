import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket, 
  QrCode, 
  CheckCircle2, 
  Compass, 
  Trash2
} from 'lucide-react';

export default function MyEventsView({ 
  bookedTickets, 
  onViewTicketModal, 
  onNavigate,
  onCancelTicket 
}) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'

  // Mock past event for realistic student portfolio
  const pastEvents = [
    {
      ticketId: 'TCK-CC-1029',
      eventId: 'evt-past-1',
      eventTitle: 'Freshers Orientation & Campus Carnival 2026',
      category: 'Cultural',
      date: 'Sept 04, 2026',
      time: '11:00 AM - 5:00 PM',
      location: 'Central Lawn & Auditorium',
      ticketType: 'Student Pass (Attended)',
      price: 0,
      seat: 'Zone C',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const currentList = activeTab === 'upcoming' ? bookedTickets : pastEvents;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <button onClick={() => onNavigate('dashboard')} className="hover:text-indigo-600 transition">
              Dashboard
            </button>
            <span>/</span>
            <span className="text-slate-800 font-semibold">My Events</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight my-0">
            My Registered Events
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your booked passes, access digital entry QR codes, and view event schedules.
          </p>
        </div>

        <button
          onClick={() => onNavigate('discovery')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition"
        >
          <Compass className="w-4 h-4" />
          <span>Browse More Events</span>
        </button>
      </div>

      {/* SCHEDULE TABS: "Upcoming" & "Past" */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'upcoming'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Upcoming Schedule</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            activeTab === 'upcoming' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
          }`}>
            {bookedTickets.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'past'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Past Attended</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            activeTab === 'past' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
          }`}>
            {pastEvents.length}
          </span>
        </button>
      </div>

      {/* LIST LAYOUT OF BOOKED EVENTS WITH SPECIFIC TICKET BADGES & VIEW TICKET BUTTON */}
      <div className="space-y-4">
        {currentList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
            <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No events in this tab</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              You haven't booked any passes for this period yet. Discover concerts, tech workshops, and sports matches.
            </p>
            <button
              onClick={() => onNavigate('discovery')}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition"
            >
              Explore Campus Events
            </button>
          </div>
        ) : (
          currentList.map((tck) => (
            <div
              key={tck.ticketId}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
            >
              {/* Left Column: Image, Info & Ticket Badges */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {/* Event Image */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={tck.image}
                    alt={tck.eventTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-md">
                    {tck.category}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  {/* Ticket Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      {tck.status}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {tck.ticketType}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      ID: {tck.ticketId}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tck.eventTitle}
                  </h3>

                  {/* Date, Time & Venue */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 pt-0.5">
                    <span className="flex items-center gap-1 font-medium text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      {tck.date}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {tck.time}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 truncate max-w-xs">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      {tck.location}
                    </span>
                  </div>

                  {/* Seat allocation note */}
                  <div className="text-xs text-slate-500 pt-1">
                    Allocated: <strong className="text-slate-800">{tck.seat || 'Open Access'}</strong>
                  </div>
                </div>
              </div>

              {/* Right Column: "View Ticket" button and actions */}
              <div className="flex items-center gap-2.5 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                {/* Prominent View Ticket Button */}
                <button
                  onClick={() => onViewTicketModal(tck)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-100 transition duration-200"
                >
                  <QrCode className="w-4 h-4" />
                  <span>View Ticket</span>
                </button>

                <button
                  onClick={() => {
                    const title = encodeURIComponent(tck.eventTitle);
                    const loc = encodeURIComponent(tck.location);
                    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&location=${loc}`, '_blank');
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition"
                  title="Add to Calendar"
                >
                  <Calendar className="w-4 h-4" />
                </button>

                {activeTab === 'upcoming' && onCancelTicket && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to cancel your pass for ${tck.eventTitle}?`)) {
                        onCancelTicket(tck.ticketId);
                      }
                    }}
                    className="p-2.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-500 hover:text-rose-700 transition"
                    title="Cancel Registration"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
