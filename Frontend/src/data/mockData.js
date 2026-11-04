export const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    title: 'Campus Band Night: Battle of the Bands',
    category: 'Music',
    categoryColor: 'bg-rose-50 text-rose-700 border-rose-200',
    date: 'Friday, Nov 15, 2026',
    time: '6:00 PM - 10:00 PM',
    rawDate: '2026-11-15',
    location: 'Main Campus Amphitheater, Central Quad',
    locationType: 'on-campus',
    price: 0,
    priceType: 'Free',
    isPaid: false,
    capacity: 650,
    registeredCount: 480,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Campus Music Society & Student Council',
    organizerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    description: 'Get ready for the most electrifying night of the semester! 8 shortlisted student bands will go head-to-head on the grand amphitheater stage with live rock, indie pop, jazz, and fusion performances. Guest celebrity judges, light shows, and campus food trucks will be on site all evening.',
    features: [
      { icon: 'Utensils', text: '12+ Food & Beverage Stalls' },
      { icon: 'Users', text: 'Open for All Students & Faculty' },
      { icon: 'Award', text: 'Audience Voting for Best Band' },
      { icon: 'Sparkles', text: 'Laser Light Show & After-Party DJ' },
      { icon: 'ShieldCheck', text: 'Campus Security & Medical Desk' },
      { icon: 'Tag', text: 'Free Glow Wristbands for Early Arrivals' }
    ],
    schedule: [
      { time: '6:00 PM', title: 'Gates Open & Acoustic Warmups' },
      { time: '6:45 PM', title: 'Round 1: Indie & Fusion Bands' },
      { time: '8:15 PM', title: 'Intermission & Food Trucks' },
      { time: '8:45 PM', title: 'Round 2: Rock & Electric Sets' },
      { time: '9:45 PM', title: 'Awards Ceremony & DJ Set' }
    ]
  },
  {
    id: 'evt-2',
    title: 'UI/UX & Design Systems Masterclass',
    category: 'Tech',
    categoryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    date: 'Monday, Nov 18, 2026',
    time: '10:00 AM - 2:00 PM',
    rawDate: '2026-11-18',
    location: 'Design Lab 3B, New Engineering Block',
    locationType: 'on-campus',
    price: 15,
    priceType: 'Paid',
    isPaid: true,
    capacity: 80,
    registeredCount: 68,
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Google Developer Student Club (GDSC)',
    organizerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    description: 'A hands-on, high-impact workshop breaking down modern design systems in Figma, tokens, component architecture, accessibility standards, and prototyping animations. Learn directly from senior product designers and build a reusable component library from scratch.',
    features: [
      { icon: 'Laptop', text: 'Hands-on Figma Pro Workspace Included' },
      { icon: 'Award', text: 'Verified Certificate of Completion' },
      { icon: 'Coffee', text: 'Complimentary Coffee & Networking Lunch' },
      { icon: 'Users', text: '1-on-1 Portfolio Reviews with Mentors' },
      { icon: 'FileText', text: 'Free UI Kit & Design Tokens Cheat Sheet' }
    ],
    schedule: [
      { time: '10:00 AM', title: 'Modern UI Fundamentals & Design Tokens' },
      { time: '11:15 AM', title: 'Figma Auto-layout & Component Variants' },
      { time: '12:30 PM', title: 'Lunch Break & Peer Feedback' },
      { time: '1:15 PM', title: 'Micro-interactions & Prototype Handoff' }
    ]
  },
  {
    id: 'evt-3',
    title: 'Inter-College Cricket Tournament Trials',
    category: 'Sports',
    categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    date: 'Wednesday, Nov 20, 2026',
    time: '8:00 AM - 1:00 PM',
    rawDate: '2026-11-20',
    location: 'University Sports Complex, Pitch 2',
    locationType: 'on-campus',
    price: 0,
    priceType: 'Free',
    isPaid: false,
    capacity: 120,
    registeredCount: 94,
    image: 'https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Athletics & Physical Education Board',
    organizerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    description: 'Official selection trials for the Varsity Cricket Team for the upcoming State Inter-University Championship. Batting nets, bowling radar tracking, and fielding simulations will be monitored by certified state coaches.',
    features: [
      { icon: 'Zap', text: 'Official Kit & Match Balls Provided' },
      { icon: 'Users', text: 'Open for All Enrolled Undergrads & Postgrads' },
      { icon: 'Award', text: 'Final 16 Players Receive Varsity Colors' },
      { icon: 'ShieldCheck', text: 'On-site Physiotherapist & Energy Drinks' }
    ],
    schedule: [
      { time: '8:00 AM', title: 'Registration Verification & Warmups' },
      { time: '8:45 AM', title: 'Fast & Spin Bowling Speed Assessment' },
      { time: '10:30 AM', title: 'Net Batting & Strike Analysis' },
      { time: '12:00 PM', title: 'Fielding Drills & Simulated Match Situations' }
    ]
  },
  {
    id: 'evt-4',
    title: 'AI & Web3 Student Founders Summit',
    category: 'Seminar',
    categoryColor: 'bg-purple-50 text-purple-700 border-purple-200',
    date: 'Saturday, Nov 22, 2026',
    time: '2:00 PM - 6:30 PM',
    rawDate: '2026-11-22',
    location: 'Auditorium Hall A, Management Block',
    locationType: 'on-campus',
    price: 25,
    priceType: 'Paid',
    isPaid: true,
    capacity: 250,
    registeredCount: 210,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    organizer: 'E-Cell & Campus Venture Fund',
    organizerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    description: 'Join venture capitalists, alumni founders, and researchers exploring real-world applications of autonomous AI agents, decentralized tech, and funding early-stage student startups. Features a live elevator pitch competition with $5,000 in equity-free grants.',
    features: [
      { icon: 'Award', text: '$5,000 Student Micro-Grant Pitch' },
      { icon: 'Users', text: 'Investor Speed-Networking Session' },
      { icon: 'Coffee', text: 'High-Tea & Founder Mixer' },
      { icon: 'FileText', text: 'Exclusive Term Sheet & Pitch Deck Templates' }
    ],
    schedule: [
      { time: '2:00 PM', title: 'Keynote: Agentic Workflows in 2027' },
      { time: '3:15 PM', title: 'Panel: Raising Pre-Seed from College Dorms' },
      { time: '4:30 PM', title: 'Live Pitch Competition: Top 6 Teams' },
      { time: '5:45 PM', title: 'Grant Winner Announcement & Mixer' }
    ]
  },
  {
    id: 'evt-5',
    title: 'HackTheCampus 2026: 24h Hackathon',
    category: 'Tech',
    categoryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    date: 'Saturday, Nov 28, 2026',
    time: '9:00 AM - 9:00 AM Next Day',
    rawDate: '2026-11-28',
    location: 'Tech Park Block 4, Innovation Arena',
    locationType: 'on-campus',
    price: 0,
    priceType: 'Free',
    isPaid: false,
    capacity: 300,
    registeredCount: 290,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Association for Computing Machinery (ACM)',
    organizerAvatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80',
    description: 'The flagship annual 24-hour hackathon bringing together coders, designers, and innovators to solve smart campus problems, sustainability challenges, and education accessibility. Over $10k in prizes, sponsor API tracks, and non-stop pizza.',
    features: [
      { icon: 'Laptop', text: 'Gigabit Wi-Fi & Hardware Lab Access' },
      { icon: 'Utensils', text: '4 Meals, Midnight Pizza & RedBull' },
      { icon: 'Award', text: '$10,000 Cash Pool & Sponsor Swag' },
      { icon: 'Sparkles', text: 'Internship Fast-Tracks for Finalists' }
    ],
    schedule: [
      { time: '9:00 AM', title: 'Check-in & Team Matching' },
      { time: '11:00 AM', title: 'Hacking Kickoff' },
      { time: '12:00 AM', title: 'Midnight Mini-Game & Energy Boost' },
      { time: '9:00 AM', title: 'Code Freeze & Project Demos' }
    ]
  },
  {
    id: 'evt-6',
    title: 'Cultural Fest: Neon DJ Night & Food Carnival',
    category: 'Music',
    categoryColor: 'bg-rose-50 text-rose-700 border-rose-200',
    date: 'Wednesday, Dec 02, 2026',
    time: '7:00 PM - 11:30 PM',
    rawDate: '2026-12-02',
    location: 'Open Grounds North, Festival Lawn',
    locationType: 'on-campus',
    price: 10,
    priceType: 'Paid',
    isPaid: true,
    capacity: 1200,
    registeredCount: 980,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Campus Cultural Affairs Committee',
    organizerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    description: 'Experience a sensory explosion of neon colors, electronic bass, dynamic laser choreography, and 20+ gourmet food stalls from local cult favorites. Dress in white or neon to glow under the mega UV arrays.',
    features: [
      { icon: 'Sparkles', text: 'Neon Face Painting & Glow Accessories' },
      { icon: 'Utensils', text: 'Street Food, Mocktails & Desserts' },
      { icon: 'Music', text: 'Guest DJ Sunfire (EDM / Tropical)' },
      { icon: 'Camera', text: '360-Degree Video Booths' }
    ],
    schedule: [
      { time: '7:00 PM', title: 'Carnival Gates & Food Village Opens' },
      { time: '8:00 PM', title: 'Opening Student DJ Sets' },
      { time: '9:30 PM', title: 'Headline Act: DJ Sunfire' },
      { time: '11:15 PM', title: 'Confetti Drop & Wrap-up' }
    ]
  },
  {
    id: 'evt-7',
    title: 'Competitive Robotics & Drone Obstacle Race',
    category: 'Tech',
    categoryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    date: 'Saturday, Dec 05, 2026',
    time: '11:00 AM - 4:00 PM',
    rawDate: '2026-12-05',
    location: 'Robotics Arena Hall 2, Mech Dept',
    locationType: 'on-campus',
    price: 0,
    priceType: 'Free',
    isPaid: false,
    capacity: 180,
    registeredCount: 145,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Robotics & Automation Society (RAS)',
    organizerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    description: 'High-speed FPV drone racing through illuminated hoops and an intense RoboWars cage match between student-built combat bots. Open to all students wishing to spectate or pit-crew for registered teams.',
    features: [
      { icon: 'Zap', text: 'High-Octane RoboWars Cage Battles' },
      { icon: 'Camera', text: 'FPV Goggle Experience Booth for Audience' },
      { icon: 'Award', text: 'Best Engineering Design Awards' },
      { icon: 'Users', text: 'Open for All Departments' }
    ],
    schedule: [
      { time: '11:00 AM', title: 'Safety Inspection & Bot Weigh-in' },
      { time: '12:00 PM', title: 'Drone Obstacle Time Trials' },
      { time: '1:30 PM', title: 'RoboWars Featherweight Matches' },
      { time: '3:15 PM', title: 'Championship Final & Award Ceremony' }
    ]
  },
  {
    id: 'evt-8',
    title: 'Annual Campus Photography & Fine Arts Expo',
    category: 'Art',
    categoryColor: 'bg-amber-50 text-amber-700 border-amber-200',
    date: 'Tuesday, Dec 08, 2026',
    time: '10:00 AM - 5:00 PM',
    rawDate: '2026-12-08',
    location: 'Fine Arts Gallery, Humanities Wing',
    locationType: 'on-campus',
    price: 0,
    priceType: 'Free',
    isPaid: false,
    capacity: 400,
    registeredCount: 220,
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Campus Shutterbugs & Visual Arts Guild',
    organizerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    description: 'A curated gallery showcase featuring over 150 original student photographs, digital paintings, ceramic sculptures, and interactive multimedia installations exploring youth culture and urban life.',
    features: [
      { icon: 'Sparkles', text: 'Interactive Digital Art Wall' },
      { icon: 'Coffee', text: 'Curator Guided Walk & Artisan Coffee' },
      { icon: 'Users', text: 'Student Art Prints Available for Purchase' },
      { icon: 'Award', text: 'People’s Choice Award Voting' }
    ],
    schedule: [
      { time: '10:00 AM', title: 'Gallery Inauguration by Dean of Arts' },
      { time: '11:30 AM', title: 'Curator Tour with Exhibiting Artists' },
      { time: '2:30 PM', title: 'Panel: Film Photography in the Digital Age' },
      { time: '4:30 PM', title: 'Ballot Count & People’s Choice Honor' }
    ]
  },
  {
    id: 'evt-9',
    title: 'Standup Comedy Night: Campus Roast Edition',
    category: 'Entertainment',
    categoryColor: 'bg-pink-50 text-pink-700 border-pink-200',
    date: 'Saturday, Dec 12, 2026',
    time: '7:00 PM - 9:30 PM',
    rawDate: '2026-12-12',
    location: 'Student Center Auditorium, Level 2',
    locationType: 'on-campus',
    price: 12,
    priceType: 'Paid',
    isPaid: true,
    capacity: 350,
    registeredCount: 310,
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Campus Laughter Club',
    organizerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    description: 'Unwind before exam season with non-stop laughter! Featuring 4 student open-mic winners followed by a headline set by national standup sensation Rahul Verma roasting college hostel life, campus cafeteria food, and engineering survivals.',
    features: [
      { icon: 'Sparkles', text: 'Clean Campus Humor & Crowd Work' },
      { icon: 'Utensils', text: 'Popcorn & Soft Drinks Included with Ticket' },
      { icon: 'Users', text: 'Seating on First-Come, First-Served Basis' },
      { icon: 'Camera', text: 'Meet & Greet Photo Opportunity' }
    ],
    schedule: [
      { time: '7:00 PM', title: 'Auditorium Doors Open & Seating' },
      { time: '7:30 PM', title: 'Student Open-Mic Warmups' },
      { time: '8:15 PM', title: 'Headliner: Rahul Verma Live' },
      { time: '9:15 PM', title: 'Q&A & Photo Session' }
    ]
  },
  {
    id: 'evt-10',
    title: 'Career Fair: Tech, Finance & Consulting',
    category: 'Seminar',
    categoryColor: 'bg-purple-50 text-purple-700 border-purple-200',
    date: 'Tuesday, Dec 15, 2026',
    time: '9:30 AM - 4:30 PM',
    rawDate: '2026-12-15',
    location: 'Campus Convention Center, Grand Hall',
    locationType: 'on-campus',
    price: 0,
    priceType: 'Free',
    isPaid: false,
    capacity: 900,
    registeredCount: 750,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    organizer: 'University Career & Placement Cell',
    organizerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    description: 'Over 45 leading tech enterprises, fintech firms, and management consultancies recruiting for summer 2027 internships and full-time graduate roles. Bring 10 copies of your resume.',
    features: [
      { icon: 'FileText', text: 'On-Spot Resume Review Clinic' },
      { icon: 'Users', text: '45+ Verified Corporate Recruiters' },
      { icon: 'Award', text: 'Mock Interview Simulator Stations' },
      { icon: 'Laptop', text: 'LinkedIn Headshot Booth (Free for Students)' }
    ],
    schedule: [
      { time: '9:30 AM', title: 'Fair Entry & Company Directory Distribution' },
      { time: '11:00 AM', title: 'Keynote: Tech Hiring Trends for 2027' },
      { time: '1:00 PM', title: 'Recruiter Networking Lounge' },
      { time: '3:00 PM', title: 'Shortlist Announcement for Day 2 Interviews' }
    ]
  },
  {
    id: 'evt-11',
    title: 'Mindfulness & Sunrise Yoga Before Finals',
    category: 'Wellness',
    categoryColor: 'bg-teal-50 text-teal-700 border-teal-200',
    date: 'Friday, Dec 18, 2026',
    time: '7:00 AM - 8:30 AM',
    rawDate: '2026-12-18',
    location: 'Campus Lawn South, Botanical Garden',
    locationType: 'on-campus',
    price: 0,
    priceType: 'Free',
    isPaid: false,
    capacity: 100,
    registeredCount: 82,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Student Wellness & Mental Health Circle',
    organizerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    description: 'De-stress and recharge your brain before final exams with an invigorating outdoor sunrise yoga flow, sound-bowl meditation, and guided breathing exercises. Mats provided.',
    features: [
      { icon: 'Sparkles', text: 'Complimentary Eco Yoga Mat to Borrow' },
      { icon: 'Coffee', text: 'Fresh Herbal Teas & Healthy Breakfast Bar' },
      { icon: 'ShieldCheck', text: 'Guided by Certified Yoga Therapist' },
      { icon: 'Users', text: 'Beginner-Friendly Gentle Flow' }
    ],
    schedule: [
      { time: '7:00 AM', title: 'Gathering & Mat Setup' },
      { time: '7:15 AM', title: 'Pranayama & Gentle Vinyasa Flow' },
      { time: '8:00 AM', title: 'Tibetan Sound Bowl Deep Relaxation' },
      { time: '8:20 AM', title: 'Herbal Tea & Community Chat' }
    ]
  },
  {
    id: 'evt-12',
    title: 'Cybersecurity CTF & Ethical Hacking Sprint',
    category: 'Tech',
    categoryColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    date: 'Sunday, Dec 20, 2026',
    time: '1:00 PM - 7:00 PM',
    rawDate: '2026-12-20',
    location: 'Computer Science Lab 101, IT Complex',
    locationType: 'on-campus',
    price: 0,
    priceType: 'Free',
    isPaid: false,
    capacity: 150,
    registeredCount: 130,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    organizer: 'CyberSec Student Chapter',
    organizerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    description: 'Jeopardy-style Capture The Flag competition covering cryptography, reverse engineering, web exploitation, forensics, and binary exploitation. Compete solo or in teams of up to 3.',
    features: [
      { icon: 'Laptop', text: 'Sandboxed Virtual Lab Environments' },
      { icon: 'Award', text: 'DefCon Style Badges & Cash Prizes' },
      { icon: 'Zap', text: 'Live Leaderboard on Big Screen' },
      { icon: 'Utensils', text: 'Pizza & Energy Drinks at Halftime' }
    ],
    schedule: [
      { time: '1:00 PM', title: 'Rules Briefing & VPN Setup' },
      { time: '1:30 PM', title: 'CTF Challenge Servers Live' },
      { time: '4:30 PM', title: 'Pizza Break & Bonus Challenge Drop' },
      { time: '6:45 PM', title: 'Scoreboard Freeze & Solution Walkthrough' }
    ]
  }
];

export const INITIAL_USER = {
  name: 'Aniket Sharma',
  email: 'aniket.sharma@campus.edu',
  role: 'Undergraduate Senior',
  college: 'St. Xavier\'s Institute of Technology',
  department: 'Computer Science & Engineering',
  studentId: 'STU-2026-7829',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'CS Senior passionate about Full-stack development, modern UI/UX design systems, and campus hackathons. Lead organizer for GDSC Campus Chapter and amateur guitarist.',
  socials: {
    linkedin: 'linkedin.com/in/aniket-sharma',
    github: 'github.com/aniket-sharma',
    instagram: '@aniket_campus',
    twitter: '@aniket_dev'
  },
  preferences: {
    emailNotif: true,
    smsNotif: false,
    eventReminders: true,
    marketingUpdates: false,
    publicProfile: true,
    showSchedule: true
  }
};

export const INITIAL_BOOKED_TICKETS = [
  {
    ticketId: 'TCK-CC-8941',
    eventId: 'evt-2',
    eventTitle: 'UI/UX & Design Systems Masterclass',
    category: 'Tech',
    date: 'Monday, Nov 18, 2026',
    time: '10:00 AM - 2:00 PM',
    location: 'Design Lab 3B, New Engineering Block',
    ticketType: 'Student Pass (VIP)',
    price: 15,
    seat: 'Desk B-14',
    bookingDate: 'Oct 24, 2026',
    qrCodeMock: 'QR-CC-8941-VERIFIED',
    status: 'Confirmed',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80'
  },
  {
    ticketId: 'TCK-CC-4209',
    eventId: 'evt-1',
    eventTitle: 'Campus Band Night: Battle of the Bands',
    category: 'Music',
    date: 'Friday, Nov 15, 2026',
    time: '6:00 PM - 10:00 PM',
    location: 'Main Campus Amphitheater, Central Quad',
    ticketType: 'General Admission',
    price: 0,
    seat: 'Open Seating (Zone A)',
    bookingDate: 'Oct 26, 2026',
    qrCodeMock: 'QR-CC-4209-VERIFIED',
    status: 'Confirmed',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Categories' },
  { id: 'Music', name: 'Music' },
  { id: 'Tech', name: 'Tech & Coding' },
  { id: 'Sports', name: 'Sports' },
  { id: 'Seminar', name: 'Seminars & Talks' },
  { id: 'Art', name: 'Art & Culture' },
  { id: 'Entertainment', name: 'Entertainment' },
  { id: 'Wellness', name: 'Wellness' }
];

export const NOTIFICATIONS = [
  {
    id: 1,
    title: 'Ticket Confirmed!',
    desc: 'Your ticket for UI/UX & Design Systems Masterclass has been confirmed.',
    time: '10m ago',
    unread: true,
    type: 'success'
  },
  {
    id: 2,
    title: 'Band Night Reminder',
    desc: 'Battle of the Bands lineup schedule has been published.',
    time: '2h ago',
    unread: true,
    type: 'info'
  },
  {
    id: 3,
    title: 'Early Bird Ticket Alert',
    desc: 'AI & Web3 Founders Summit only has 40 seats left.',
    time: 'Yesterday',
    unread: false,
    type: 'warning'
  }
];
