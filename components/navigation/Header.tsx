
import React, { useState } from 'react';
import { ATHLETE_MOCK, NOTIFICATIONS_MOCK } from '../../constants';
import { MenuIcon, BellIcon, ChevronDownIcon, SparklesIcon, MailIcon, CoinIcon, SearchIcon, TrophyIcon, CheckCircleIcon, CloseIcon } from '../icons';
import { Page, Notification } from '../../types';

interface HeaderProps {
  activePage: Page;
  onSettingsClick: () => void; // Used for Sidebar trigger in Profile
  onMenuClick: () => void; // Same as above
  onAiClick: () => void; // Trigger for AI Assistant
  onMessagesClick: () => void; // Trigger to go to messages
  onSearchClick: () => void; // Trigger to go to search page
  onGymRatsClick: () => void; // Trigger to go to gymrats
}

export const Header: React.FC<HeaderProps> = ({ activePage, onMenuClick, onAiClick, onMessagesClick, onSearchClick, onGymRatsClick }) => {
  const athlete = ATHLETE_MOCK;

  // Profile Dropdown Mock State
  const [currentProfile, setCurrentProfile] = useState('Atleta');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  // Notifications State
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS_MOCK);

  const profiles = ['Atleta', 'Coach', 'Gestor'];
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const renderHeaderContent = () => {
    switch (activePage) {
      case Page.Missoes: // Home
        return (
          <div className="relative flex items-center justify-center w-full h-full">
             {/* Left: AI Assistant */}
             <div className="absolute left-0 flex items-center">
                <button 
                    onClick={onAiClick}
                    className="text-gray-500 dark:text-gray-400 hover:text-loco-red transition"
                >
                    <SparklesIcon className="h-6 w-6" />
                </button>
             </div>

             {/* Center: App Name */}
             <div className="text-lg font-bold text-black dark:text-white tracking-wide">
                HUDL<span className="text-loco-red">MODE</span>
             </div>

             {/* Right: Notifications */}
             <div className="absolute right-0 flex items-center space-x-3">
                <button 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative text-gray-500 dark:text-gray-400 hover:text-loco-red transition"
                >
                  <BellIcon className="h-6 w-6" />
                  {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 w-2 h-2 bg-loco-red rounded-full border border-white dark:border-loco-black"></span>
                  )}
                </button>
             </div>
          </div>
        );
      
      case Page.Social:
        return (
            <div className="relative flex items-center justify-center w-full h-full">
                 <div className="absolute left-0 flex items-center">
                    <button 
                        onClick={onAiClick}
                        className="text-gray-500 dark:text-gray-400 hover:text-loco-red transition"
                    >
                        <SparklesIcon className="h-6 w-6" />
                    </button>
                 </div>

                 <div className="flex items-center space-x-3">
                     <div className="text-xl font-black text-black dark:text-white tracking-widest uppercase italic">
                        HUDDLE
                     </div>
                 </div>

                 {/* Right: Search + Messages */}
                 <div className="absolute right-0 flex items-center space-x-3">
                    <button onClick={onSearchClick} className="text-gray-500 dark:text-gray-400 hover:text-loco-red transition">
                        <SearchIcon className="h-6 w-6" />
                    </button>
                    <button onClick={onMessagesClick} className="relative text-gray-500 dark:text-gray-400 hover:text-loco-red transition">
                        <MailIcon className="h-6 w-6" />
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold px-1 rounded-full">3</span>
                    </button>
                 </div>
            </div>
        );

      case Page.Perfil:
        return (
           <div className="flex items-center justify-between w-full">
              {/* Left: Profile Switcher */}
              <div className="relative">
                  <button 
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 text-black dark:text-white font-bold"
                  >
                    <span className="text-lg">{athlete.name.split(' ')[0]} ({currentProfile})</span>
                    <ChevronDownIcon className={`w-4 h-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileMenuOpen && (
                     <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsProfileMenuOpen(false)}></div>
                        <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-loco-gray rounded-xl shadow-xl py-2 z-20 border border-gray-100 dark:border-gray-700 animate-fade-in-up">
                            {profiles.map(p => (
                                <button 
                                    key={p}
                                    onClick={() => { setCurrentProfile(p); setIsProfileMenuOpen(false); }}
                                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium ${currentProfile === p ? 'text-loco-red' : 'text-gray-700 dark:text-gray-200'}`}
                                >
                                    {athlete.name.split(' ')[0]} ({p})
                                </button>
                            ))}
                        </div>
                     </>
                  )}
              </div>

              {/* Right: Mentions & Menu */}
              <div className="flex items-center space-x-4">
                 <button className="relative text-gray-500 dark:text-gray-400 hover:text-loco-red transition">
                    <span className="text-lg font-bold">@</span>
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-loco-red rounded-full"></span>
                 </button>
                 
                 <button onClick={onMenuClick} className="text-gray-500 dark:text-gray-200 hover:text-loco-red">
                    <MenuIcon className="h-7 w-7" />
                 </button>
              </div>
           </div>
        );

      default:
        return (
            <div className="flex items-center justify-center w-full">
                <span className="text-lg font-bold text-black dark:text-white">{activePage}</span>
            </div>
        );
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-loco-black/90 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
            {renderHeaderContent()}
            
            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)}></div>
                    <div className="absolute top-14 right-0 w-80 bg-white dark:bg-loco-gray rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden animate-fade-in-up">
                        <div className="p-3 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center bg-gray-50 dark:bg-loco-black/50">
                            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-200">Notificações</h3>
                            {unreadCount > 0 && (
                                <button onClick={markAllAsRead} className="text-xs text-loco-red font-bold hover:underline">
                                    Marcar todas como lidas
                                </button>
                            )}
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-6 text-center text-gray-500 text-sm">Nenhuma notificação.</div>
                            ) : (
                                notifications.map(notif => (
                                    <div 
                                        key={notif.id} 
                                        onClick={() => markAsRead(notif.id)}
                                        className={`p-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition relative ${notif.read ? 'opacity-70' : 'bg-blue-50/10'}`}
                                    >
                                        {!notif.read && <div className="absolute left-2 top-4 w-1.5 h-1.5 bg-loco-red rounded-full"></div>}
                                        <div className="pl-3">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className={`text-sm font-bold ${notif.type === 'alert' ? 'text-red-500' : 'text-black dark:text-white'}`}>
                                                    {notif.title}
                                                </h4>
                                                <span className="text--[10px] text-gray-500">{notif.timestamp}</span>
                                            </div>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug">{notif.message}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
      </div>
    </header>
  );
};
