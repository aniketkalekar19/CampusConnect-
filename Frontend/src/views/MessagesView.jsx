import React, { useState } from 'react';
import { 
  Send, 
  Search, 
  MoreVertical,
  Smile,
  Paperclip,
  CheckCheck
} from 'lucide-react';

const INITIAL_CONVERSATIONS = [
  {
    id: 1,
    title: 'Campus Band Night Attendees',
    type: 'group',
    lastMessage: 'Sound checks start at 4:30 PM today! Gates open at 6:00 PM sharp.',
    time: '12:45 PM',
    unread: 2,
    avatar: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80',
    badge: 'Music Council',
    members: '480 members',
    online: true
  },
  {
    id: 2,
    title: 'GDSC UI/UX Workshop Mentors',
    type: 'group',
    lastMessage: 'Figma templates and tokens starter repo have been shared in the channel.',
    time: '10:15 AM',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=200&q=80',
    badge: 'Workshop Q&A',
    members: '68 members',
    online: true
  },
  {
    id: 3,
    title: 'Cricket Trials Coordinator',
    type: 'direct',
    lastMessage: 'Remember to bring white kit and spikes for Pitch 2 trials tomorrow.',
    time: 'Yesterday',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    badge: 'Athletics Board',
    members: 'Coach Vikram (Direct)',
    online: false
  }
];

export default function MessagesView({ user }) {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState(1);
  const [convSearch, setConvSearch] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  const [messagesByConv, setMessagesByConv] = useState({
    1: [
      {
        id: 1,
        sender: 'Organizer (Rohan)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        text: 'Hey everyone! Welcome to the official discussion channel for Campus Band Night 🎸',
        time: '11:30 AM',
        isMe: false
      },
      {
        id: 2,
        sender: 'Priya K.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        text: 'Are outside college students allowed with student ID passes?',
        time: '11:42 AM',
        isMe: false
      },
      {
        id: 3,
        sender: 'Organizer (Rohan)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        text: 'Yes! Any college ID with an active Campus Connect registration pass will be granted entry at Gate 3.',
        time: '12:05 PM',
        isMe: false
      },
      {
        id: 4,
        sender: 'Aniket Sharma',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        text: 'Awesome, just confirmed my student ticket. See you all at the amphitheater!',
        time: '12:20 PM',
        isMe: true
      },
      {
        id: 5,
        sender: 'Organizer (Rohan)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        text: 'Sound checks start at 4:30 PM today! Gates open at 6:00 PM sharp.',
        time: '12:45 PM',
        isMe: false
      }
    ],
    2: [
      {
        id: 1,
        sender: 'GDSC Lead (Aarav)',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        text: 'Welcome designers! In this workshop we will build a full design token system.',
        time: '09:30 AM',
        isMe: false
      },
      {
        id: 2,
        sender: 'Aniket Sharma',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        text: 'Should we have Figma Desktop app pre-installed?',
        time: '09:45 AM',
        isMe: true
      },
      {
        id: 3,
        sender: 'GDSC Lead (Aarav)',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        text: 'Figma templates and tokens starter repo have been shared in the channel. Browser or desktop both work!',
        time: '10:15 AM',
        isMe: false
      }
    ],
    3: [
      {
        id: 1,
        sender: 'Coach Vikram',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        text: 'Trials report: Pitch 2 is reserved tomorrow morning 8 AM for cricket selection trials.',
        time: 'Yesterday',
        isMe: false
      },
      {
        id: 2,
        sender: 'Coach Vikram',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        text: 'Remember to bring white kit and spikes for Pitch 2 trials tomorrow.',
        time: 'Yesterday',
        isMe: false
      }
    ]
  });

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];
  const currentMessages = messagesByConv[activeConvId] || [];

  const filteredConversations = conversations.filter(c => {
    if (!convSearch.trim()) return true;
    const query = convSearch.toLowerCase();
    return (
      c.title.toLowerCase().includes(query) ||
      c.badge.toLowerCase().includes(query) ||
      c.lastMessage.toLowerCase().includes(query)
    );
  });

  const handleSelectConv = (id) => {
    setActiveConvId(id);
    // Mark as read
    setConversations(conversations.map(c => c.id === id ? { ...c, unread: 0 } : c));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const text = inputMessage.trim();
    const newMsg = {
      id: Date.now(),
      sender: user?.name || 'Aniket Sharma',
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      text,
      time: 'Just now',
      isMe: true
    };

    setMessagesByConv(prev => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMsg]
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === activeConvId) {
        return {
          ...c,
          lastMessage: text,
          time: 'Just now'
        };
      }
      return c;
    }));

    setInputMessage('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight my-0">
          Campus Messages & Community
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Chat with event attendees, organizers, and campus clubs in real time.
        </p>
      </div>

      {/* Main Messenger Box */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        
        {/* Left: Conversations List */}
        <div className="md:col-span-4 border-r border-slate-100 flex flex-col justify-between">
          <div className="p-4 border-b border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">Discussions</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                {conversations.length} Active
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={convSearch}
                onChange={(e) => setConvSearch(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-50 flex-1 overflow-y-auto">
            {filteredConversations.map((c) => (
              <div
                key={c.id}
                onClick={() => handleSelectConv(c.id)}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition ${
                  activeConvId === c.id ? 'bg-indigo-50/70 border-l-4 border-indigo-600' : 'hover:bg-slate-50'
                }`}
              >
                <div className="relative shrink-0">
                  <img src={c.avatar} alt={c.title} className="w-10 h-10 rounded-xl object-cover" />
                  {c.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 truncate">{c.title}</p>
                    <span className="text-[10px] text-slate-400">{c.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[10px] font-semibold text-indigo-600">{c.badge}</span>
                    {c.unread > 0 && (
                      <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
                        {c.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{c.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400">Campus End-to-End Chat</span>
          </div>
        </div>

        {/* Right: Active Chat Area */}
        <div className="md:col-span-8 flex flex-col justify-between h-[580px]">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <img src={activeConv.avatar} alt={activeConv.title} className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-tight">{activeConv.title}</h3>
                <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {activeConv.badge} • {activeConv.members}
                </p>
              </div>
            </div>
            <button 
              type="button"
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              title="Options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-slate-50/20">
            {currentMessages.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.isMe ? 'justify-end' : 'justify-start'}`}>
                {!m.isMe && (
                  <img src={m.avatar} alt={m.sender} className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5" />
                )}
                <div className={`max-w-[75%] space-y-1 ${m.isMe ? 'items-end' : 'items-start'}`}>
                  {!m.isMe && (
                    <span className="text-[11px] font-bold text-slate-500 ml-1">{m.sender}</span>
                  )}
                  <div className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.isMe 
                      ? 'bg-indigo-600 text-white rounded-tr-xs shadow-xs' 
                      : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/80 shadow-xs'
                  }`}>
                    {m.text}
                  </div>
                  <div className={`flex items-center gap-1 px-1 text-[10px] text-slate-400 ${m.isMe ? 'justify-end' : 'justify-start'}`}>
                    <span>{m.time}</span>
                    {m.isMe && <CheckCheck className="w-3 h-3 text-indigo-400" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-slate-100 bg-white flex items-center gap-2">
            <button
              type="button"
              onClick={() => setInputMessage(prev => prev + ' 👍 ')}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
              title="Add thumbs up emoji"
            >
              <Smile className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setInputMessage(prev => prev + ' 📎 [File attached: notes.pdf]')}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
              title="Attach document"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Message in ${activeConv.title}...`}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}