
import React, { useState } from 'react';
import { SearchIcon, VideoIcon, BookOpenIcon } from '../components/icons';
import { VIDEO_LIBRARY_MOCK, PLAYBOOK_MOCK, SUGGESTED_ACCOUNTS_MOCK } from '../constants';

const Pesquisar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Tudo');
  const [followedAccounts, setFollowedAccounts] = useState(new Set(SUGGESTED_ACCOUNTS_MOCK.filter(a => a.isFollowing).map(a => a.id)));

  const tabs = ['Tudo', 'Vídeos', 'Jogadas', 'Atletas'];

  // Simple mock filter logic
  const filteredVideos = VIDEO_LIBRARY_MOCK.filter(v => v.title.toLowerCase().includes(searchTerm.toLowerCase()));
  
  const toggleFollow = (id: string) => {
    setFollowedAccounts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        return newSet;
    });
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Search Input */}
      <div className="relative">
        <input 
            type="text" 
            placeholder="Busque por jogos, atletas ou táticas..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-loco-gray border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-12 pr-4 text-black dark:text-white focus:ring-2 focus:ring-loco-red outline-none shadow-sm"
        />
        <SearchIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
      </div>

      {/* Discovery / Suggested Accounts Section - Shows when search is empty */}
      {!searchTerm && (
          <div className="animate-fade-in">
             <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold text-black dark:text-white">Sugestões para você</h2>
                <button className="text-sm text-loco-red font-semibold">Ver tudo</button>
             </div>
             <div className="overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
                <div className="flex space-x-4">
                    {SUGGESTED_ACCOUNTS_MOCK.map(account => (
                        <div key={account.id} className="min-w-[140px] bg-white dark:bg-loco-gray p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center relative">
                            <div className="w-16 h-16 rounded-full bg-gray-200 mb-3 overflow-hidden">
                                <img src={account.avatarUrl} alt={account.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-bold text-sm text-black dark:text-white truncate w-full">{account.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{account.category}</p>
                            
                            <button 
                                onClick={() => toggleFollow(account.id)}
                                className={`w-full py-1.5 rounded-full text-xs font-bold transition ${
                                    followedAccounts.has(account.id) 
                                    ? 'bg-transparent border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300' 
                                    : 'bg-loco-red text-white'
                                }`}
                            >
                                {followedAccounts.has(account.id) ? 'Seguindo' : 'Seguir'}
                            </button>
                        </div>
                    ))}
                </div>
             </div>
          </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
            <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${activeTab === tab ? 'bg-loco-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 dark:bg-loco-gray-light text-gray-600 dark:text-gray-400'}`}
            >
                {tab}
            </button>
        ))}
      </div>

      {/* Results Area */}
      <div className="space-y-4">
         {!searchTerm && (
             <div className="text-center py-10">
                 <SearchIcon className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                 <p className="text-gray-500 font-medium">Digite para buscar na biblioteca...</p>
             </div>
         )}

         {searchTerm && (
             <>
                {/* Videos Section */}
                {(activeTab === 'Tudo' || activeTab === 'Vídeos') && (
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase mb-2 ml-1">Vídeos</h3>
                        <div className="space-y-3">
                            {filteredVideos.length > 0 ? filteredVideos.map(video => (
                                <div key={video.id} className="flex items-center bg-white dark:bg-loco-gray p-3 rounded-xl shadow-sm">
                                    <div className="w-16 h-10 bg-gray-200 rounded overflow-hidden mr-3 flex-shrink-0 relative">
                                        <img src={video.thumbnail} className="w-full h-full object-cover" alt="" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                            <VideoIcon className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-black dark:text-white line-clamp-1">{video.title}</p>
                                        <p className="text-xs text-gray-500">{video.type}</p>
                                    </div>
                                </div>
                            )) : <p className="text-gray-500 text-sm italic pl-2">Nenhum vídeo encontrado.</p>}
                        </div>
                    </div>
                )}

                {/* Plays Section */}
                {(activeTab === 'Tudo' || activeTab === 'Jogadas') && (
                    <div className="mt-6">
                        <h3 className="text-sm font-bold text-gray-500 uppercase mb-2 ml-1">Playbook</h3>
                         <div className="space-y-3">
                            {/* Mock result since playbook mock is limited */}
                            <div className="flex items-center bg-white dark:bg-loco-gray p-3 rounded-xl shadow-sm">
                                <div className="w-10 h-10 bg-loco-red/10 rounded-lg flex items-center justify-center mr-3 text-loco-red">
                                    <BookOpenIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-black dark:text-white">4-2-5 Over vs Deuce</p>
                                    <p className="text-xs text-gray-500">Defesa • 1st Install</p>
                                </div>
                            </div>
                         </div>
                    </div>
                )}

                {/* Athletes Mock Section */}
                {(activeTab === 'Tudo' || activeTab === 'Atletas') && (
                    <div className="mt-6">
                        <h3 className="text-sm font-bold text-gray-500 uppercase mb-2 ml-1">Atletas</h3>
                         <div className="space-y-3">
                            <div className="flex items-center bg-white dark:bg-loco-gray p-3 rounded-xl shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center overflow-hidden">
                                    <img src="https://i.pravatar.cc/150?u=LB55" alt="Mike" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-black dark:text-white">Linebacker Mike</p>
                                    <p className="text-xs text-gray-500">LB #55</p>
                                </div>
                            </div>
                         </div>
                    </div>
                )}
             </>
         )}
      </div>
    </div>
  );
};

export default Pesquisar;
