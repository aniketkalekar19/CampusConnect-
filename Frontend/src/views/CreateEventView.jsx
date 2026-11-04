import React, { useState } from 'react';
import { 
  PlusCircle, 
  MapPin, 
  DollarSign, 
  Gift, 
  ArrowLeft, 
  Users,
  Building2,
  Image as ImageIcon
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export default function CreateEventView({ 
  onCreateEvent, 
  onBack, 
  showToast,
  user 
}) {
  // Left column inputs
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [description, setDescription] = useState('');

  // Right column inputs
  const [date, setDate] = useState('2026-11-25');
  const [startTime, setStartTime] = useState('14:00');
  const [endTime, setEndTime] = useState('18:00');
  
  // Location configuration: 'on-campus' | 'other'
  const [locationType, setLocationType] = useState('on-campus');
  const [campusVenue, setCampusVenue] = useState('Central Amphitheater, Quad');
  const [offCampusAddress, setOffCampusAddress] = useState('');

  // Ticket settings: 'free' | 'paid'
  const [ticketSetting, setTicketSetting] = useState('free');
  const [price, setPrice] = useState(15);
  const [capacity, setCapacity] = useState(200);

  // Cover image preset or custom
  const [selectedCover, setSelectedCover] = useState('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80');
  const [customCoverUrl, setCustomCoverUrl] = useState('');

  const coverPresets = [
    { label: 'Conference / Tech', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Concert / Music', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Sports / Outdoor', url: 'https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Workshop / Lab', url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      if (showToast) showToast('Missing Information', 'Please provide a title and description.', 'error');
      return;
    }

    // Format display date
    const d = new Date(date + 'T00:00:00');
    const formattedDate = d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    // Format time display
    const formattedTime = `${startTime} - ${endTime}`;

    const locationString = locationType === 'on-campus'
      ? (campusVenue || 'Campus Main Auditorium')
      : (offCampusAddress || 'Off-Campus Venue');

    const newEvent = {
      id: `evt-${Date.now()}`,
      title: title.trim(),
      category,
      categoryColor: category === 'Music' 
        ? 'bg-rose-50 text-rose-700 border-rose-200'
        : category === 'Sports' 
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : category === 'Seminar'
            ? 'bg-purple-50 text-purple-700 border-purple-200'
            : category === 'Art'
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : category === 'Entertainment'
                ? 'bg-pink-50 text-pink-700 border-pink-200'
                : category === 'Wellness'
                  ? 'bg-teal-50 text-teal-700 border-teal-200'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200',
      date: formattedDate,
      time: formattedTime,
      rawDate: date,
      location: locationString,
      locationType,
      price: ticketSetting === 'paid' ? Number(price) : 0,
      priceType: ticketSetting === 'paid' ? 'Paid' : 'Free',
      isPaid: ticketSetting === 'paid',
      capacity: Number(capacity) || 150,
      registeredCount: 1, // Current organizer registered
      image: customCoverUrl.trim() || selectedCover,
      organizer: `${user?.name || 'Student Council'} (${user?.college?.split(' ')[0] || 'Campus'} Chapter)`,
      organizerAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      description: description.trim(),
      features: [
        { icon: 'ShieldCheck', text: 'Verified Student Organized Event' },
        { icon: 'Users', text: 'Open for Enrolled Campus Students' },
        { icon: 'Sparkles', text: 'Digital QR Code Entry Pass' },
        { icon: 'Award', text: 'Certificate of Attendance Available' }
      ],
      schedule: [
        { time: startTime, title: 'Check-in & Welcome Session' },
        { time: 'Mid-event', title: 'Main Program & Keynote Activities' },
        { time: endTime, title: 'Wrap-up & Networking' }
      ]
    };

    onCreateEvent(newEvent);
    if (showToast) {
      showToast('Event Created!', `"${title}" has been published to the campus directory.`, 'success');
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* Back button & Breadcrumbs */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-200 shadow-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Header */}
      <div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
          Organizer Admin Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight my-1">
          Create New Campus Event
        </h1>
        <p className="text-sm text-slate-500">
          Publish an official club gathering, workshop, sports match, or cultural performance for students.
        </p>
      </div>

      {/* CREATE EVENT ADMIN FORM LAYOUT */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Input fields for Event Title, Category dropdown, and detailed Description text area */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900 tracking-tight my-0">
              Basic Event Information
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Specify clear event details so campus attendees can easily discover it.
            </p>
          </div>

          {/* Event Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Annual Campus Robotics Hackfest 2026"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition cursor-pointer"
            >
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Detailed Description Text Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Detailed Description *
            </label>
            <textarea
              rows={6}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide complete event details: what attendees will experience, prerequisites, guest speakers, dress code, food stalls, rules..."
              className="w-full p-4 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition resize-none leading-relaxed"
            />
          </div>

          {/* Banner Preset Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Event Cover Banner
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {coverPresets.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedCover(preset.url);
                    setCustomCoverUrl('');
                  }}
                  className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition ${
                    selectedCover === preset.url && !customCoverUrl
                      ? 'border-indigo-600 ring-2 ring-indigo-200'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-16 object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] font-medium p-1 text-center truncate">
                    {preset.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Custom URL Input */}
            <div className="mt-3">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Or enter custom image URL
              </label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={customCoverUrl}
                  onChange={(e) => setCustomCoverUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Pickers for Date & Time, Location configuration, Ticket settings, and "Create Event" submit button */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 tracking-tight my-0">
                Logistics & Tickets
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Set time, venue location, and student pricing.
              </p>
            </div>

            {/* Pickers for Date & Time */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    End Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                  />
                </div>
              </div>
            </div>

            {/* Location Configuration: On-Campus vs Other Location with address inputs */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Location Configuration *
              </label>

              {/* Toggle Buttons: On-Campus vs Other */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setLocationType('on-campus')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition ${
                    locationType === 'on-campus'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  On-Campus Venue
                </button>
                <button
                  type="button"
                  onClick={() => setLocationType('other')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition ${
                    locationType === 'other'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Other / Off-Campus
                </button>
              </div>

              {/* On-campus venue input */}
              {locationType === 'on-campus' ? (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Campus Hall / Quad Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={campusVenue}
                      onChange={(e) => setCampusVenue(e.target.value)}
                      placeholder="e.g. Main Amphitheater, Central Quad"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Complete Address or Online Stream Link
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={offCampusAddress}
                      onChange={(e) => setOffCampusAddress(e.target.value)}
                      placeholder="e.g. City Convention Center Hall B, 5th Avenue"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Ticket Settings: Free vs Paid with price input */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Ticket Settings *
              </label>

              {/* Free vs Paid Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setTicketSetting('free')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    ticketSetting === 'free'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Free Ticket</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTicketSetting('paid')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    ticketSetting === 'paid'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Paid Ticket</span>
                </button>
              </div>

              {/* Price input if paid */}
              {ticketSetting === 'paid' && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Ticket Price ($ USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-2 text-sm rounded-xl border border-slate-200 font-bold text-slate-800"
                    />
                  </div>
                </div>
              )}

              {/* Capacity Limit */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Total Capacity Limit
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="10"
                    max="5000"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* "Create Event" Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition transform active:scale-[0.99] cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Campus Event</span>
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-2">
                Your event will be instantly visible in All Events Discovery
              </p>
            </div>

          </div>

        </div>

      </form>

    </div>
  );
}
