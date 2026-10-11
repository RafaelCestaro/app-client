
import React, { useState } from 'react';
import { GYMRATS_GROUPS_MOCK } from '../constants';
import { Card } from '../components/common/Card';
import { ChevronDownIcon, TrophyIcon } from '../components/icons';

const GymRats: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState(GYMRATS_GROUPS_MOCK[0].id);
  
  // Get current group leaderboard
  const currentGroup = GYMRATS_GROUPS_MOCK.find(g => g.id === selectedGroupId);
  const currentLeaderboard = currentGroup?.entries || [];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black dark:text-white">GymRats 🐀</h1>
        <TrophyIcon className="w-8 h-8 text-yellow-500" />
      </div>
      
      <Card className="overflow-hidden min-h-[80vh]">
        <div className="flex justify-between items-center mb-6">
            <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Grupo Atual</p>
                <h3 className="font-bold text-xl text-black dark:text-white">{currentGroup?.name}</h3>
            </div>
            
            {/* Group Selector */}
            <div className="relative">
                <select 
                    value={selectedGroupId}
                    onChange={(e) => setSelectedGroupId(e.target.value)}
                    className="appearance-none bg-gray-100 dark:bg-loco-black text-black dark:text-white text-sm font-bold pl-4 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 outline-none focus:border-loco-red"
                >
                    {GYMRATS_GROUPS_MOCK.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>
                <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute right-3 top-3.5 pointer-events-none" />
            </div>
        </div>

        {/* Podium (Top 3 visual) */}
        <div className="flex justify-center items-end space-x-4 mb-8 border-b border-gray-100 dark:border-gray-700 pb-6">
            {currentLeaderboard.length >= 2 && (
                <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border-2 border-gray-300 overflow-hidden mb-2">
                        <img src={currentLeaderboard[1].avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-20 w-16 bg-gray-300 rounded-t-lg flex items-center justify-center text-2xl shadow">🥈</div>
                    <span className="text-xs font-bold mt-2 max-w-[64px] truncate">{currentLeaderboard[1].name}</span>
                </div>
            )}
            {currentLeaderboard.length >= 1 && (
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border-4 border-yellow-400 overflow-hidden mb-2 relative -top-2">
                        <img src={currentLeaderboard[0].avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-28 w-20 bg-yellow-400 rounded-t-lg flex items-center justify-center text-4xl shadow-lg">🥇</div>
                    <span className="text-sm font-bold mt-2 max-w-[80px] truncate text-loco-red">{currentLeaderboard[0].name}</span>
                </div>
            )}
            {currentLeaderboard.length >= 3 && (
                <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border-2 border-orange-300 overflow-hidden mb-2">
                        <img src={currentLeaderboard[2].avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-16 w-16 bg-orange-300 rounded-t-lg flex items-center justify-center text-2xl shadow">🥉</div>
                    <span className="text-xs font-bold mt-2 max-w-[64px] truncate">{currentLeaderboard[2].name}</span>
                </div>
            )}
        </div>
        
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-loco-black">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-l-lg">Rank</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Atleta</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Trend</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-r-lg">XP</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {currentLeaderboard.map((entry) => (
                        <tr key={entry.rank} className={`${entry.isUser ? 'bg-loco-red/5' : ''} hover:bg-gray-50 dark:hover:bg-loco-black/50 transition`}>
                            <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`font-bold ${entry.rank <= 3 ? 'text-loco-red text-lg' : 'text-gray-500'}`}>#{entry.rank}</span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-700" src={entry.avatar} alt="" />
                                    <div className="ml-3">
                                        <div className={`text-sm font-bold ${entry.isUser ? 'text-loco-red' : 'text-gray-900 dark:text-white'}`}>
                                            {entry.name} {entry.isUser && '(Você)'}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-center">
                                {entry.trend === 'up' && <span className="text-green-500 font-bold text-lg">▲</span>}
                                {entry.trend === 'down' && <span className="text-red-500 font-bold text-lg">▼</span>}
                                {entry.trend === 'stable' && <span className="text-gray-300 font-bold">-</span>}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-700 dark:text-gray-200">
                                {entry.points.toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

export default GymRats;
