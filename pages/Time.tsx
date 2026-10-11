
import React, { useState } from 'react';
import { BookOpenIcon, VideoIcon, UsersIcon } from '../components/icons';
import Playbook from './Playbook';
import Biblioteca from './Biblioteca';
import { GYMRATS_GROUPS_MOCK } from '../constants';

// Sub-component for Roster/Depth Chart (simplified for now)
const RosterView = () => {
    const offenseGroup = GYMRATS_GROUPS_MOCK.find(g => g.id === 'unit') || GYMRATS_GROUPS_MOCK[0];
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h3 className="text-white font-bold text-lg mb-4">Unidade Ofensiva (Titulares)</h3>
                <div className="space-y-3">
                    {offenseGroup.entries.map((player, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-gray-800">
                            <div className="flex items-center">
                                <img src={player.avatar} className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-600" alt="" />
                                <div>
                                    <p className="text-white font-bold text-sm">{player.name}</p>
                                    <p className="text-gray-500 text-xs">Starter</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">Ativo</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const Time: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PLAYBOOK' | 'SCOUT' | 'ELENCO'>('PLAYBOOK');

  return (
    <div className="space-y-6 pb-24">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
              <h1 className="text-3xl font-bold text-black dark:text-white uppercase tracking-tight">Sala de Guerra</h1>
              <p className="text-gray-500 text-sm">Locomotiva vs Steamrollers • Semana 4</p>
          </div>
          
          {/* Sub-Navigation Tabs */}
          <div className="flex bg-gray-200 dark:bg-gray-800 p-1 rounded-xl overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab('PLAYBOOK')}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap ${activeTab === 'PLAYBOOK' ? 'bg-white dark:bg-black text-loco-red shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
              >
                  <BookOpenIcon className="w-4 h-4 mr-2" />
                  Playbook
              </button>
              <button 
                onClick={() => setActiveTab('SCOUT')}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap ${activeTab === 'SCOUT' ? 'bg-white dark:bg-black text-loco-red shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
              >
                  <VideoIcon className="w-4 h-4 mr-2" />
                  Scout & Vídeo
              </button>
              <button 
                onClick={() => setActiveTab('ELENCO')}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap ${activeTab === 'ELENCO' ? 'bg-white dark:bg-black text-loco-red shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
              >
                  <UsersIcon className="w-4 h-4 mr-2" />
                  Elenco
              </button>
          </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
          {activeTab === 'PLAYBOOK' && <Playbook />}
          {activeTab === 'SCOUT' && <Biblioteca />}
          {activeTab === 'ELENCO' && <RosterView />}
      </div>
    </div>
  );
};

export default Time;
