
import React from 'react';
import { Page } from '../../types';
import { ChartBarIcon, CalendarIcon, CloseIcon, UserIcon, HomeIcon, CogIcon, ActivityIcon, UsersIcon } from '../icons';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
  onSettingsClick: () => void;
}

const navItems = [
  { page: Page.Missoes, icon: HomeIcon, label: 'Home' },
  { page: Page.Desempenho, icon: ChartBarIcon, label: 'Estatísticas' }, 
  { page: Page.Calendario, icon: CalendarIcon, label: 'Calendário' },
  { page: Page.Time, icon: UsersIcon, label: 'Time & Estratégia' }, // New Strategy Hub
  { page: Page.Perfil, icon: UserIcon, label: 'Meu Perfil' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, isOpen, onClose, onSettingsClick }) => {
  const handleNavClick = (page: Page) => {
    onNavigate(page);
    onClose();
  };

  const handleSettingsClick = () => {
      onSettingsClick();
      onClose();
  };

  return (
    <>
      {/* Overlay for Mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-loco-black text-white border-r border-gray-800 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:flex md:flex-col md:h-screen
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <h1 className="text-xl font-bold tracking-wider text-white">HUDL<span className="text-loco-red">MODE</span></h1>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Reports Access */}
        <div className="p-4 border-b border-gray-800">
            <button 
                onClick={() => handleNavClick(Page.Desempenho)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg text-sm flex items-center justify-center transition-colors shadow-sm border border-gray-700 hover:border-loco-red"
            >
                <ActivityIcon className="w-4 h-4 mr-2 text-loco-red" />
                Relatórios de Performance
            </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto no-scrollbar">
          <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Menu Principal</p>
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`
                w-full group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors duration-200
                ${activePage === item.page 
                  ? 'bg-loco-red text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }
              `}
            >
              <item.icon className={`mr-3 flex-shrink-0 h-5 w-5 ${activePage === item.page ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer / Settings & User Info */}
        <div className="border-t border-gray-800 p-4 bg-loco-black">
          <button 
            onClick={handleSettingsClick}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors mb-4"
          >
            <CogIcon className="mr-3 h-5 w-5" />
            Configurações
          </button>

          <div className="flex items-center pt-2 border-t border-gray-800/50">
            <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold overflow-hidden border border-gray-600">
              <img src="https://i.pravatar.cc/300?u=raphaelRB26" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Raphael</p>
              <p className="text-xs text-gray-500">Locomotiva RB</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
