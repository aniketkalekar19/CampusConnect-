import React from 'react';
import { 
  Home, 
  CalendarDays, 
  Ticket, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut, 
  PlusCircle, 
  GraduationCap,
  X
} from 'lucide-react';

export default function Sidebar({ 
  currentView, 
  onNavigate, 
  bookedCount = 2, 
  user,
  onLogout,
  isOpen = true,
  onCloseMobile
}) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'discovery', label: 'Events', icon: CalendarDays },
    { id: 'my-events', label: 'My Events', icon: Ticket, badge: bookedCount > 0 ? bookedCount : null },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onCloseMobile} 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Persistent Sidebar */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Logo & Brand */}
        <div>
          <div className="p-5 flex items-center justify-between border-b border-slate-100">
            <div 
              onClick={() => onNavigate('dashboard')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 tracking-tight text-lg">Campus</span>
                  <span className="font-extrabold text-indigo-600 tracking-tight text-lg">Connect</span>
                </div>
                <p className="text-[11px] font-medium text-slate-400">Student Event Portal</p>
              </div>
            </div>

            {/* Mobile close button */}
            <button 
              onClick={onCloseMobile} 
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Create Event CTA Quick Action */}
          <div className="px-4 pt-5 pb-2">
            <button
              onClick={() => onNavigate('create-event')}
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition shadow-sm ${
                currentView === 'create-event'
                  ? 'bg-slate-900 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Event</span>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="px-3 py-3 space-y-1">
            <p className="px-3 pb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Main Menu
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id || 
                (item.id === 'discovery' && currentView === 'event-details') ||
                (item.id === 'discovery' && currentView === 'checkout');

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-indigo-50/90 text-indigo-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-slate-200/80 text-slate-700 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Student Profile Card & Log Out */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div 
              onClick={() => onNavigate('profile')} 
              className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
            >
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"} 
                alt={user?.name || "User Avatar"} 
                className="w-9 h-9 rounded-full object-cover border-2 border-indigo-200 shrink-0"
              />
              <div className="truncate">
                <p className="text-xs font-bold text-slate-800 truncate">{user?.name || 'Aniket Sharma'}</p>
                <p className="text-[11px] text-slate-500 truncate">STU-2026-7829</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Log Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
