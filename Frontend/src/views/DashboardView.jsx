import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Ticket, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Gift, 
  PlusCircle, 
  Users, 
  Compass 
} from 'lucide-react';

export default function DashboardView({ 
  events, 
  bookedTickets, 
  onSelectEvent, 
  onNavigate,
  onFilterCategory 
}) {
  const [selectedCat, setSelectedCat] = useState('All');

  // Exact metrics as requested
  const totalEventsCount = events.length;
  const freeEventsCount = events.filter(e => !e.isPaid).length;
  const paidEventsCount = events.filter(e => e.isPaid).length;
  const yourTicketsCount = bookedTickets.length;

  const categories = ['All', 'Music', 'Tech', 'Sports', 'Seminar'];

  const filteredEvents = selectedCat === 'All' 
    ? events 
    : events.filter(e => e.category === selectedCat);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Campus Season 2026 Live</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white my-0">
            Good Morning, Aniket 👋
          </h1>
          <p className="text-indigo-100 text-sm mt-2 leading-relaxed">
            Here's what is happening across your campus this week. You have <strong className="text-white font-bold">{yourTicketsCount} booked passes</strong> ready for entry.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('discovery')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-xs sm:text-sm hover:bg-indigo-50 shadow-md transition transform active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>Explore All Events</span>
          </button>
          <button
            onClick={() => onNavigate('create-event')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-900/50 hover:bg-indigo-900/70 border border-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-xs transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Host Event</span>
          </button>
        </div>
      </div>

      {/* TOP ROW: Four Metric Summary Cards Tracking Exact Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 1: Total Events (12) */}
        <div 
          onClick={() => onNavigate('discovery')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Events
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalEventsCount}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Live campus schedule</p>
        </div>

        {/* Card 2: Free Events (8) */}
        <div 
          onClick={() => {
            onNavigate('discovery');
          }}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Free Events
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Gift className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {freeEventsCount}
            </span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Free entry
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Open for all students</p>
        </div>

        {/* Card 3: Paid Events (4) */}
        <div 
          onClick={() => {
            onNavigate('discovery');
          }}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-violet-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Paid Events
            </span>
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {paidEventsCount}
            </span>
            <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
              Special passes
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Concerts & summits</p>
        </div>

        {/* Card 4: Your Tickets (2) */}
        <div 
          onClick={() => onNavigate('my-events')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Your Tickets
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {yourTicketsCount}
            </span>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Confirmed
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Passes in your schedule</p>
        </div>

      </div>

      {/* MAIN SECTION: "Upcoming Events" Grid */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight my-0">
              Upcoming Events
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Handpicked happenings, workshops, sports trials, and student gatherings
            </p>
          </div>

          {/* Quick Category filter buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCat === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div 
              key={evt.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Event Image & Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img 
                  src={evt.image} 
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none"></div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${evt.categoryColor}`}>
                    {evt.category}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${
                    evt.isPaid 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-emerald-500 text-white'
                  }`}>
                    {evt.isPaid ? `$${evt.price}` : 'Free'}
                  </span>
                </div>

                {/* Registered attendee preview pill */}
                <div className="absolute bottom-3 left-3 text-white text-[11px] font-medium flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                  <Users className="w-3 h-3 text-indigo-300" />
                  <span>{evt.registeredCount} / {evt.capacity} registered</span>
                </div>
              </div>

              {/* Event Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {evt.title}
                  </h3>
                  
                  {/* Date & Time */}
                  <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span className="font-medium text-slate-700">{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action: View Details Button */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium truncate max-w-[140px]">
                    {evt.organizer.split('&')[0]}
                  </span>
                  <button
                    onClick={() => onSelectEvent(evt)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-xs transition duration-200 shadow-xs"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All in Category Link */}
        <div className="text-center pt-2">
          <button
            onClick={() => onFilterCategory ? onFilterCategory(selectedCat) : onNavigate('discovery')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-semibold text-xs sm:text-sm transition shadow-xs"
          >
            <span>View all {selectedCat === 'All' ? 'campus' : selectedCat} events in directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
