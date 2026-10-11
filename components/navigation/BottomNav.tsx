
import React from 'react';
import { Page } from '../../types';
import { HomeIcon, UserIcon, ChartBarIcon, MenuIcon, CalendarIcon } from '../icons';

interface BottomNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onMenuClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate, onMenuClick }) => {
  // Order: Home, Stats, Calendar, Perfil (Center), Menu
  // Using Calendar in place of Social/Feed based on new priorities
  const navItems = [
    { page: Page.Missoes, icon: HomeIcon, label: 'Home' },
    { page: Page.Desempenho, icon: ChartBarIcon, label: 'Stats' },
    { page: Page.Perfil, icon: UserIcon, label: 'Perfil' }, // Center button
    { page: Page.Calendario, icon: CalendarIcon, label: 'Calendário' },
    { page: 'MENU', icon: MenuIcon, label: 'Menu' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-loco-black border-t border-gray-200 dark:border-gray-800 pb-safe z-40">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => {
          // Special logic for the center button (Profile)
          if (index === 2) {
            return (
              <div key={item.label} className="relative -top-5">
                <button
                  onClick={() => item.page !== 'MENU' && onNavigate(item.page as Page)}
                  className={`
                    w-14 h-14 rounded-full shadow-lg flex items-center justify-center border-4 border-gray-50 dark:border-black
                    ${activePage === item.page 
                      ? 'bg-loco-red text-white' 
                      : 'bg-gray-800 text-gray-400'
                    }
                  `}
                >
                  <item.icon className="w-6 h-6" />
                </button>
              </div>
            );
          }

          // Logic for Menu button
          if (item.page === 'MENU') {
             return (
                <button
                  key={item.label}
                  onClick={onMenuClick}
                  className="flex flex-col items-center justify-center w-full h-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <item.icon className="w-6 h-6 stroke-current" />
                </button>
             );
          }

          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.page as Page)}
              className={`flex flex-col items-center justify-center w-full h-full ${
                activePage === item.page 
                  ? 'text-loco-red' 
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <item.icon className={`w-6 h-6 ${activePage === item.page ? 'fill-current' : 'stroke-current'}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
