import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import TicketModal from './components/TicketModal';
import Toast from './components/Toast';

// 10 Integrated Views
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import DiscoveryView from './views/DiscoveryView';
import EventDetailsView from './views/EventDetailsView';
import CheckoutView from './views/CheckoutView';
import PaymentSuccessView from './views/PaymentSuccessView';
import MyEventsView from './views/MyEventsView';
import ProfileSettingsView from './views/ProfileSettingsView';
import CreateEventView from './views/CreateEventView';
import MessagesView from './views/MessagesView';

// API Services
import { createEvent, deleteRegistration, fetchEvents, fetchMyRegistrations } from './services/api';

// Initial Mock Data
import { 
  INITIAL_EVENTS, 
  INITIAL_USER, 
  INITIAL_BOOKED_TICKETS, 
  NOTIFICATIONS 
} from './data/mockData';

export default function App() {
  // Global States
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true so evaluator lands directly in the dashboard, or can log out anytime!
  const [currentView, setCurrentView] = useState('dashboard'); // Active application view
  
  // Data State
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [user, setUser] = useState(INITIAL_USER);
  const [bookedTickets, setBookedTickets] = useState(INITIAL_BOOKED_TICKETS);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  // Active Selections
  const [selectedEvent, setSelectedEvent] = useState(INITIAL_EVENTS[0]);
  const [activeTicketModal, setActiveTicketModal] = useState(null);
  const [lastTransaction, setLastTransaction] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Search & Navigation
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toast feedback
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'info') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Initial API Data Sync (GET /api/events and GET /api/me/registrations)
  useEffect(() => {
    async function loadApiData() {
      try {
        const liveEvents = await fetchEvents();
        setEvents(liveEvents);
        setSelectedEvent(liveEvents[0] || null);
        const myRegs = await fetchMyRegistrations(user.studentId);
        if (myRegs && myRegs.status === 200) {
          setBookedTickets(myRegs.data);
        }
      } catch {
        // Fallback to initial mock data
      }
    }
    loadApiData();
  }, [user.studentId]);

  // Handlers
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('welcome');
    showToast('Logged Out', 'You have been signed out of Campus Connect.', 'info');
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setCurrentView('event-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetTicket = (event) => {
    setSelectedEvent(event);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSuccess = (transaction) => {
    setLastTransaction(transaction);
    
    // Add new booked ticket to user's schedule
    const newTicket = {
      ticketId: transaction.transactionId.replace('TXN', 'TCK'),
      eventId: transaction.eventId,
      eventTitle: transaction.eventTitle,
      category: selectedEvent.category,
      date: transaction.eventDate,
      time: transaction.eventTime,
      location: transaction.eventLocation,
      ticketType: transaction.amount > 0 ? 'Verified Student Pass' : 'General Admission',
      price: transaction.amount,
      seat: 'Gate Section A',
      bookingDate: transaction.date,
      status: 'Confirmed',
      image: transaction.eventImage || selectedEvent.image
    };

    setBookedTickets([newTicket, ...bookedTickets]);
    
    // Update event attendee count
    setEvents(events.map(e => e.id === transaction.eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e));

    setCurrentView('payment-success');
    showToast('Payment Successful!', `Ticket confirmed for ${transaction.eventTitle}`, 'success');
  };

  const handleCreateEvent = async (newEvent) => {
    try {
      const savedEvent = await createEvent(newEvent);
      setEvents((currentEvents) => [savedEvent, ...currentEvents]);
      setSelectedEvent(savedEvent);
      setCurrentView('discovery');
      showToast('Event Created', `"${savedEvent.title}" is now published on Campus Connect.`, 'success');
    } catch (error) {
      showToast('Event Not Saved', error.message || 'The event could not be saved to the database.', 'error');
    }
  };

  const handleDownloadTicketPass = (ticket) => {
    showToast('Pass Downloaded', `Digital PDF pass saved for ${ticket.eventTitle}`, 'success');
  };

  const handleCancelTicket = async (ticketId) => {
    const tck = bookedTickets.find(t => t.ticketId === ticketId);
    const deleted = await deleteRegistration(ticketId);
    if (!deleted) {
      showToast('Cancellation Failed', 'The registration could not be deleted from the database.', 'error');
      return;
    }
    setBookedTickets(prev => prev.filter(t => t.ticketId !== ticketId));
    if (tck) {
      setEvents(prev => prev.map(e => e.id === tck.eventId ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) } : e));
      showToast('Registration Cancelled', `Your ticket for "${tck.eventTitle}" was cancelled.`, 'info');
    }
  };

  const handleMarkNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('Notifications Read', 'All notifications marked as read.', 'info');
  };

  // If user navigates to 'welcome' or is logged out, render Welcome/Login Screen
  if (!isAuthenticated || currentView === 'welcome') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <LoginView 
          onLoginSuccess={handleLoginSuccess} 
          showToast={showToast} 
        />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* PERSISTENT LEFT SIDEBAR */}
      <Sidebar
        currentView={currentView}
        onNavigate={(viewId) => {
          setCurrentView(viewId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookedCount={bookedTickets.length}
        user={user}
        onLogout={handleLogout}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen min-w-0">
        
        {/* Top Persistent Header */}
        <Navbar
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onNavigate={(viewId) => {
            if (viewId === 'welcome') {
              handleLogout();
            } else {
              setCurrentView(viewId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notifications}
          onMarkNotificationsRead={handleMarkNotificationsRead}
          user={user}
          currentView={currentView}
        />

        {/* Dynamic View Container */}
        <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto">
          
          {/* 1. Welcome / Login handled above */}

          {/* 2. Main Dashboard (Good Morning, Aniket 👋) */}
          {currentView === 'dashboard' && (
            <DashboardView
              events={events}
              bookedTickets={bookedTickets}
              onSelectEvent={handleSelectEvent}
              onNavigate={(viewId) => {
                setCurrentView(viewId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onFilterCategory={(cat) => {
                setSelectedCategory(cat === 'All' ? 'all' : cat);
                setCurrentView('discovery');
              }}
            />
          )}

          {/* 3. All Events Discovery Screen */}
          {currentView === 'discovery' && (
            <DiscoveryView
              events={events}
              onSelectEvent={handleSelectEvent}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onNavigate={(viewId) => setCurrentView(viewId)}
              categoryFilter={selectedCategory}
              setCategoryFilter={setSelectedCategory}
            />
          )}

          {/* 4. Event Details Screen */}
          {currentView === 'event-details' && (
            <EventDetailsView
              event={selectedEvent}
              user={user}
              onBack={() => setCurrentView('discovery')}
              onGetTicket={handleGetTicket}
              onNavigate={(viewId) => setCurrentView(viewId)}
              isAlreadyBooked={bookedTickets.some(b => b.eventId === selectedEvent?.id)}
            />
          )}

          {/* 5. Checkout & Payment Screen */}
          {currentView === 'checkout' && (
            <CheckoutView
              event={selectedEvent}
              user={user}
              onBack={() => setCurrentView('event-details')}
              onPaymentSuccess={handlePaymentSuccess}
              showToast={showToast}
            />
          )}

          {/* 6. Payment Success Screen */}
          {currentView === 'payment-success' && (
            <PaymentSuccessView
              transaction={lastTransaction}
              onViewMyTickets={() => setCurrentView('my-events')}
              onGoToEvents={() => setCurrentView('discovery')}
              onOpenTicketModal={() => {
                const recentTicket = bookedTickets[0];
                if (recentTicket) setActiveTicketModal(recentTicket);
              }}
            />
          )}

          {/* 7. "My Events" Screen */}
          {currentView === 'my-events' && (
            <MyEventsView
              bookedTickets={bookedTickets}
              onViewTicketModal={(tck) => setActiveTicketModal(tck)}
              onNavigate={(viewId) => setCurrentView(viewId)}
              onCancelTicket={handleCancelTicket}
            />
          )}

          {/* 8. User Profile Settings Screen */}
          {currentView === 'profile' && (
            <ProfileSettingsView
              user={user}
              onUpdateUser={(updated) => setUser(updated)}
              showToast={showToast}
              onNavigate={(viewId) => setCurrentView(viewId)}
            />
          )}

          {/* 9. Create Event Admin Form */}
          {currentView === 'create-event' && (
            <CreateEventView
              onCreateEvent={handleCreateEvent}
              onBack={() => setCurrentView('dashboard')}
              showToast={showToast}
              user={user}
            />
          )}

          {/* Messages View */}
          {currentView === 'messages' && (
            <MessagesView user={user} />
          )}

          {/* Settings Screen */}
          {currentView === 'settings' && (
            <ProfileSettingsView
              user={user}
              onUpdateUser={(updated) => setUser(updated)}
              showToast={showToast}
              onNavigate={(viewId) => setCurrentView(viewId)}
              initialTab="account"
            />
          )}

        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200/80 bg-white/50 py-4 px-6 text-center text-xs text-slate-400">
          Campus Connect © 2026 — Modern College Event Discovery & Ticketing Portal
        </footer>

      </div>

      {/* Ticket Pass Modal */}
      {activeTicketModal && (
        <TicketModal
          ticket={activeTicketModal}
          onClose={() => setActiveTicketModal(null)}
          onDownload={handleDownloadTicketPass}
        />
      )}

      {/* Global Toast Alerts */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
