import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Sparkles, 
  ChevronDown,
  Layers,
  MapPin
} from 'lucide-react';

export default function Navbar({ 
  onToggleSidebar, 
  onNavigate, 
  searchQuery, 
  setSearchQuery,
  notifications,
  onMarkNotificationsRead,
  user,
  currentView
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showScreenSwitcher, setShowScreenSwitcher] = useState(false);

  const unreadCount = notifications ? notifications.filter(n => n.unread).length : 0;

  const screens = [
    { id: 'welcome', label: '1. Welcome / Login' },
    { id: 'dashboard', label: '2. Main Dashboard' },
    { id: 'discovery', label: '3. Events Discovery' },
    { id: 'event-details', label: '4. Event Details' },
    { id: 'checkout', label: '5. Checkout & Payment' },
    { id: 'payment-success', label: '6. Payment Success' },
    { id: 'my-events', label: '7. My Events' },
    { id: 'profile', label: '8. Profile Settings' },
    { id: 'create-event', label: '9. Create Event Admin' },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between transition-all">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search */}
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery || ''}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (currentView !== 'discovery') {
                onNavigate('discovery');
              }
            }}
            placeholder="Search campus concerts, workshops, sports, seminars..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-xl border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition outline-none"
          />
        </div>
      </div>

      {/* Right: Quick Screen Switcher, Campus Badge & Notifications */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        
        {/* Quick Screen Preview Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowScreenSwitcher(!showScreenSwitcher)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/70 transition shadow-xs"
            title="Fast switch between all 9 integrated views"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Jump to View</span>
            <ChevronDown className="w-3 h-3 opacity-70" />
          </button>

          {showScreenSwitcher && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                9 Integrated Screens
              </div>
              <div className="max-h-72 overflow-y-auto py-1">
                {screens.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onNavigate(s.id);
                      setShowScreenSwitcher(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium transition flex items-center justify-between ${
                      currentView === s.id
                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{s.label}</span>
                    {currentView === s.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Campus Location Chip */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100/90 rounded-full text-xs text-slate-600 border border-slate-200/60 font-medium">
          <MapPin className="w-3.5 h-3.5 text-indigo-600" />
          <span>Main Quad • Fall 2026</span>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-700 rounded-full">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={() => {
                      if (onMarkNotificationsRead) onMarkNotificationsRead();
                    }}
                    className="text-xs text-indigo-600 font-medium hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="py-3 flex gap-3 hover:bg-slate-50/70 p-2 rounded-xl transition cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-800">{n.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.desc}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Mini Avatar Header link */}
        <div 
          onClick={() => onNavigate('profile')} 
          className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-slate-100 transition"
        >
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
            alt="Profile Avatar"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
          />
        </div>

      </div>
    </header>
  );
}
