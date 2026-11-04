import React, { useState } from 'react';
import { 
  Camera, 
  Save, 
  Building2, 
  Lock
} from 'lucide-react';

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.59 1.59 0 1 0 0-3.18 1.59 1.59 0 0 0 0 3.18m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);


export default function ProfileSettingsView({ 
  user, 
  onUpdateUser, 
  showToast, 
  onNavigate,
  initialTab = 'personal'
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'personal' | 'account' | 'privacy'

  // Editable fields initialized from user prop
  const [name, setName] = useState(user?.name || 'Aniket Sharma');
  const [email, setEmail] = useState(user?.email || 'aniket.sharma@campus.edu');
  const [college, setCollege] = useState(user?.college || "St. Xavier's Institute of Technology");
  const [department, setDepartment] = useState(user?.department || 'Computer Science & Engineering');
  const [bio, setBio] = useState(user?.bio || 'CS Senior passionate about Full-stack development, modern UI/UX design systems, and campus hackathons. Lead organizer for GDSC Campus Chapter and amateur guitarist.');
  const [avatar, setAvatar] = useState(user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
  
  // Social Links
  const [linkedin, setLinkedin] = useState(user?.socials?.linkedin || 'linkedin.com/in/aniket-sharma');
  const [instagram, setInstagram] = useState(user?.socials?.instagram || '@aniket_campus');
  const [github, setGithub] = useState(user?.socials?.github || 'github.com/aniket-sharma');
  const [twitter, setTwitter] = useState(user?.socials?.twitter || '@aniket_dev');

  // Privacy toggles
  const [publicProfile, setPublicProfile] = useState(true);
  const [showSchedule, setShowSchedule] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);

  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  ];

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      name,
      email,
      college,
      department,
      bio,
      avatar,
      socials: {
        linkedin,
        instagram,
        github,
        twitter
      },
      preferences: {
        ...user?.preferences,
        publicProfile,
        showSchedule,
        emailNotif
      }
    };
    onUpdateUser(updated);
    if (showToast) {
      showToast('Profile Saved', 'Your campus profile details have been updated.', 'success');
    }
  };

  const handleCancel = () => {
    setName(user?.name || 'Aniket Sharma');
    setEmail(user?.email || 'aniket.sharma@campus.edu');
    setCollege(user?.college || "St. Xavier's Institute of Technology");
    setBio(user?.bio || '');
    setAvatar(user?.avatar || avatarPresets[0]);
    if (showToast) {
      showToast('Changes Cancelled', 'Reverted back to previous profile information.', 'info');
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl animate-in fade-in duration-300">
      
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <button onClick={() => onNavigate('dashboard')} className="hover:text-indigo-600 transition">
            Dashboard
          </button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">User Settings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight my-0">
          Profile & Account Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your student credentials, public campus presence, and security preferences.
        </p>
      </div>

      {/* TABBED INNER NAVIGATION: "Personal Info", "Account Settings", "Privacy" */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('personal')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition ${
            activeTab === 'personal'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Personal Info
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('account')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition ${
            activeTab === 'account'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Account Settings
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('privacy')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition ${
            activeTab === 'privacy'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Privacy & Visibility
        </button>
      </div>

      {/* MAIN CONTENT FORM */}
      <form onSubmit={handleSave} className="space-y-8">
        
        {activeTab === 'personal' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8">
            
            {/* TOP SECTION: Large avatar placeholder with "Change Photo" button & Editable fields layout */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-slate-100">
              
              {/* Avatar placeholder with Change Photo button */}
              <div className="relative group shrink-0">
                <img
                  src={avatar}
                  alt={name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-indigo-50 border-2 border-indigo-200 shadow-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    const nextAvatar = avatarPresets[(avatarPresets.indexOf(avatar) + 1) % avatarPresets.length];
                    setAvatar(nextAvatar);
                    if (showToast) showToast('Photo Updated', 'Switched to new student avatar photo.', 'info');
                  }}
                  className="absolute bottom-1 right-1 p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition transform group-hover:scale-105"
                  title="Change Photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Beside: Editable fields layout (Full Name, Email, College/University) */}
              <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Aniket Sharma"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Campus Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aniket.sharma@campus.edu"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    College / University *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="St. Xavier's Institute of Technology"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* BOTTOM SECTION: "About Me" text area & Input fields for "Social Links" (LinkedIn, Instagram, etc.) */}
            <div className="space-y-6">
              
              {/* "About Me" Text Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  About Me / Student Bio
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share a short bio, interests, clubs you belong to, or campus initiatives..."
                  className="w-full p-4 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition resize-none leading-relaxed"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Brief description displayed to event organizers and team members.
                </p>
              </div>

              {/* Social Links Input Fields (LinkedIn, Instagram, etc.) */}
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Social Links & Profiles
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* LinkedIn */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      LinkedIn Profile
                    </label>
                    <div className="relative">
                      <LinkedinIcon className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="linkedin.com/in/username"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                      />
                    </div>
                  </div>

                  {/* Instagram */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Instagram Handle
                    </label>
                    <div className="relative">
                      <InstagramIcon className="w-4 h-4 text-pink-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="@username"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                      />
                    </div>
                  </div>

                  {/* GitHub */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      GitHub Profile
                    </label>
                    <div className="relative">
                      <GithubIcon className="w-4 h-4 text-slate-800 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        placeholder="github.com/username"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                      />
                    </div>
                  </div>

                  {/* Twitter / X */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Twitter / X Handle
                    </label>
                    <div className="relative">
                      <TwitterIcon className="w-4 h-4 text-sky-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="@handle"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ACTION BUTTONS: "Cancel" and "Save Changes" */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-100 transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>

          </div>
        )}

        {/* ACCOUNT SETTINGS TAB */}
        {activeTab === 'account' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 tracking-tight my-0">
              Campus Account Credentials
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Student ID Number
                </label>
                <input
                  type="text"
                  disabled
                  value="STU-2026-7829"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 font-mono"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Verified via Registrar database</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Academic Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Security & Password</h3>
              <button
                type="button"
                onClick={() => {
                  if (showToast) showToast('Password Recovery', 'A password reset link was sent to your campus email.', 'info');
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-indigo-600" />
                <span>Change Password via SSO</span>
              </button>
            </div>
          </div>
        )}

        {/* PRIVACY TAB */}
        {activeTab === 'privacy' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 tracking-tight my-0">
              Privacy & Discovery Permissions
            </h2>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                <div>
                  <p className="font-bold text-slate-800 text-sm">Public Student Profile</p>
                  <p className="text-xs text-slate-500">Allow other students in your college to see your bio & clubs</p>
                </div>
                <input
                  type="checkbox"
                  checked={publicProfile}
                  onChange={(e) => setPublicProfile(e.target.checked)}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                <div>
                  <p className="font-bold text-slate-800 text-sm">Show Event Attendance on Profile</p>
                  <p className="text-xs text-slate-500">Display public events you are attending on your profile badge</p>
                </div>
                <input
                  type="checkbox"
                  checked={showSchedule}
                  onChange={(e) => setShowSchedule(e.target.checked)}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                <div>
                  <p className="font-bold text-slate-800 text-sm">Campus Event Notification Emails</p>
                  <p className="text-xs text-slate-500">Receive schedule updates, gate pass QR reminders, and alerts</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotif}
                  onChange={(e) => setEmailNotif(e.target.checked)}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
              </label>
            </div>
          </div>
        )}

      </form>

    </div>
  );
}
