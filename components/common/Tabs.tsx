
import React from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="border-b border-gray-200 dark:border-loco-gray-light">
      <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`
              ${activeTab === tab
                ? 'border-loco-red text-loco-red'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }
              whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition
            `}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};
