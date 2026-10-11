import React, { useState } from 'react';
import { GamifiedChallenge } from '../../lib/gamification';

interface ChallengeListProps {
  challenges: GamifiedChallenge[];
}

export const ChallengeList: React.FC<ChallengeListProps> = ({ challenges }) => {
  const [activeTab, setActiveTab] = useState<'diario' | 'semanal' | 'marco'>('diario');

  const filteredChallenges = challenges.filter(c => c.type === activeTab);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-xl">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-white font-black text-lg uppercase tracking-tight">Desafios de Performance</h3>
        <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 rounded px-2 py-0.5 uppercase tracking-wider">
          On-the-fly
        </span>
      </div>

      {/* Tabs Switcher */}
      <div className="flex space-x-1.5 rounded-xl bg-black p-1 mb-5 border border-gray-800">
        {[
          { key: 'diario', label: 'Diários' },
          { key: 'semanal', label: 'Semanais' },
          { key: 'marco', label: 'Marcos' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`
              w-full py-2.5 rounded-lg text-xs font-bold uppercase transition-all duration-300
              ${activeTab === tab.key 
                ? 'bg-gray-900 text-[#94E67C] border border-gray-800 shadow-md' 
                : 'text-gray-500 hover:text-gray-300 hover:bg-gray-950/40'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Challenges list */}
      <div className="space-y-3">
        {filteredChallenges.map(challenge => {
          const percentage = Math.min((challenge.progress / challenge.target) * 100, 100);

          return (
            <div 
              key={challenge.id}
              className={`
                p-4 rounded-xl border transition duration-300 flex items-center justify-between gap-4
                ${challenge.completed 
                  ? 'bg-gradient-to-r from-green-950/20 to-black border-green-500/30' 
                  : 'bg-black/30 border-gray-800/80 hover:border-gray-700'
                }
              `}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className={`text-sm font-bold truncate ${challenge.completed ? 'text-gray-300 line-through' : 'text-white'}`}>
                    {challenge.title}
                  </h4>
                  {challenge.completed && (
                    <span className="text-[9px] font-black uppercase text-[#94E67C] bg-[#94E67C]/10 border border-[#94E67C]/20 px-1.5 py-0.5 rounded leading-none shrink-0">
                      Concluído
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold mb-1">
                    <span>Progresso</span>
                    <span className="font-mono">
                      {challenge.progress}/{challenge.target}
                    </span>
                  </div>
                  <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden border border-gray-900">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-700 ${challenge.completed ? 'bg-[#94E67C]' : 'bg-teal-500'}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* XP Badge reward */}
              <div className="flex flex-col items-center justify-center shrink-0 min-w-[70px] p-2 bg-gray-950 rounded-xl border border-gray-800 shadow-md text-center">
                <span className="text-sm">🏆</span>
                <span className="text-xs font-black text-teal-400 mt-1">+{challenge.xpReward}</span>
                <span className="text-[8px] uppercase font-bold text-gray-500 tracking-wider">XP</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
