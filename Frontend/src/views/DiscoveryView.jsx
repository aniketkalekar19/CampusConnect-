import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  X, 
  SlidersHorizontal, 
  ChevronRight 
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export default function DiscoveryView({ 
  events, 
  onSelectEvent, 
  searchQuery, 
  setSearchQuery, 
  onNavigate,
  categoryFilter: propCategoryFilter,
  setCategoryFilter: propSetCategoryFilter
}) {
  const [priceFilter, setPriceFilter] = useState('All'); // 'All' | 'Free' | 'Paid'
  const [localCategoryFilter, setLocalCategoryFilter] = useState('all');
  const categoryFilter = propCategoryFilter !== undefined ? propCategoryFilter : localCategoryFilter;
  const setCategoryFilter = propSetCategoryFilter || setLocalCategoryFilter;
  const [selectedDate, setSelectedDate] = useState('');

  // Counts for tabs
  const allCount = events.length;
  const freeCount = events.filter(e => !e.isPaid).length;
  const paidCount = events.filter(e => e.isPaid).length;

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      // Price filter tab
      if (priceFilter === 'Free' && evt.isPaid) return false;
      if (priceFilter === 'Paid' && !evt.isPaid) return false;

      // Category filter dropdown
      if (categoryFilter !== 'all' && evt.category !== categoryFilter) return false;

      // Date picker filter
      if (selectedDate && evt.rawDate !== selectedDate) return false;

      // Search query
      if (searchQuery && searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = evt.title.toLowerCase().includes(query);
        const matchesCat = evt.category.toLowerCase().includes(query);
        const matchesLoc = evt.location.toLowerCase().includes(query);
        const matchesOrg = evt.organizer.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCat && !matchesLoc && !matchesOrg) return false;
      }

      return true;
    });
  }, [events, priceFilter, categoryFilter, selectedDate, searchQuery]);

  const resetFilters = () => {
    setPriceFilter('All');
    setCategoryFilter('all');
    setSelectedDate('');
    if (setSearchQuery) setSearchQuery('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Page Title & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <button onClick={() => onNavigate('dashboard')} className="hover:text-indigo-600 transition">
            Dashboard
          </button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Events Discovery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight my-0">
          Campus Events Directory
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore all live concerts, technical workshops, sports tournaments, and student summits.
        </p>
      </div>

      {/* FILTER BAR SECTION */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
        
        {/* Top Filter Tabs: "All", "Free", "Paid" */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl">
            <button
              onClick={() => setPriceFilter('All')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                priceFilter === 'All'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>All Events</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                priceFilter === 'All' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600'
              }`}>
                {allCount}
              </span>
            </button>

            <button
              onClick={() => setPriceFilter('Free')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                priceFilter === 'Free'
                  ? 'bg-white text-emerald-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Free</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                priceFilter === 'Free' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
              }`}>
                {freeCount}
              </span>
            </button>

            <button
              onClick={() => setPriceFilter('Paid')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                priceFilter === 'Paid'
                  ? 'bg-white text-violet-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Paid</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                priceFilter === 'Paid' ? 'bg-violet-100 text-violet-800' : 'bg-slate-200 text-slate-600'
              }`}>
                {paidCount}
              </span>
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-800">{filteredEvents.length}</strong> of {events.length} events
          </div>
        </div>

        {/* Filter Controls: Search, Date Picker, and Category Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              placeholder="Search by title, club, venue..."
              className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery && setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-4 relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition appearance-none cursor-pointer"
            >
              <option value="all">All Categories (Music, Tech, Sports...)</option>
              {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Date Picker Filter */}
          <div className="md:col-span-3 relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition cursor-pointer"
              title="Filter by event date"
            />
          </div>

        </div>

        {/* Active filter badges if any */}
        {(priceFilter !== 'All' || categoryFilter !== 'all' || selectedDate || searchQuery) && (
          <div className="flex items-center gap-2 pt-2 text-xs">
            <span className="text-slate-400">Active filters:</span>
            {priceFilter !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                Type: {priceFilter}
                <button onClick={() => setPriceFilter('All')} className="hover:text-indigo-900"><X className="w-3 h-3" /></button>
              </span>
            )}
            {categoryFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                Category: {categoryFilter}
                <button onClick={() => setCategoryFilter('all')} className="hover:text-indigo-900"><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedDate && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                Date: {selectedDate}
                <button onClick={() => setSelectedDate('')} className="hover:text-indigo-900"><X className="w-3 h-3" /></button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                Query: "{searchQuery}"
                <button onClick={() => setSearchQuery && setSearchQuery('')} className="hover:text-indigo-900"><X className="w-3 h-3" /></button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-indigo-600 hover:underline font-semibold ml-auto"
            >
              Reset all
            </button>
          </div>
        )}

      </div>

      {/* CLEAN LIST LAYOUT OF ALL AVAILABLE CAMPUS EVENTS */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No events found matching your filters</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your category, price range, or date picker to discover more campus happenings.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              {/* Left: Thumbnail & Core Details */}
              <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                {/* Thumbnail */}
                <div className="relative w-20 h-20 sm:w-28 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border backdrop-blur-md ${evt.categoryColor}`}>
                    {evt.category}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                    {evt.title}
                  </h3>
                  
                  {/* Date & Time */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      {evt.date}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {evt.time}
                    </span>
                  </div>

                  {/* Location & Organizer */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1 truncate max-w-xs">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      {evt.location}
                    </span>
                    <span className="hidden md:inline text-slate-300">•</span>
                    <span className="hidden md:inline truncate text-slate-400">
                      {evt.organizer}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Price & View Details Action */}
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="text-left sm:text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    evt.isPaid 
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {evt.isPaid ? `$${evt.price} Pass` : 'Free Pass'}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {evt.capacity - evt.registeredCount} spots left
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEvent(evt);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 group-hover:bg-indigo-600 text-white font-semibold text-xs sm:text-sm transition duration-200 shadow-xs shrink-0"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
