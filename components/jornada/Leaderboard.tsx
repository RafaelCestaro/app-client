import React from 'react';
import { LeaderboardPlayer } from '../../lib/gamification';

interface LeaderboardProps {
  players: LeaderboardPlayer[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ players }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-xl">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-white font-black text-lg uppercase tracking-tight">Roster de Consistência</h3>
        <span className="text-[9px] font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded uppercase">
          Últimos 30 Dias
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-5">
        Ranking por taxa de aderência aos registros diários recomendados. Dados de saúde e clínicos permanecem 100% privados.
      </p>

      {/* Ranks list */}
      <div className="space-y-2.5">
        {players.map(player => {
          return (
            <div 
              key={player.name}
              className={`
                p-3.5 rounded-xl border flex items-center justify-between transition-all duration-300
                ${player.isUser 
                  ? 'bg-[#94E67C]/10 border-[#94E67C]/40 ring-1 ring-[#94E67C]/25 shadow-lg shadow-[#94E67C]/5' 
                  : 'bg-black/30 border-gray-800/60 hover:border-gray-800'
                }
              `}
            >
              <div className="flex items-center space-x-3.5">
                {/* Placement Rank Badge */}
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center font-black text-xs border
                  ${player.rank === 1 
                    ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
                    : player.rank === 2
                      ? 'bg-gray-400/10 text-gray-400 border-gray-400/20'
                      : player.rank === 3
                        ? 'bg-amber-600/10 text-amber-600 border-amber-600/20'
                        : 'bg-gray-900 text-gray-400 border-gray-800'
                  }
                `}>
                  {player.rank}
                </div>

                {/* Avatar */}
                <div className="relative w-9 h-9 rounded-full border border-gray-800 overflow-hidden">
                  <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                </div>

                {/* Name */}
                <div>
                  <h4 className={`text-xs font-bold ${player.isUser ? 'text-[#94E67C]' : 'text-white'}`}>
                    {player.name}
                  </h4>
                  <div className="flex items-center mt-0.5 space-x-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Aderência:</span>
                    <span className="text-[10px] text-gray-400 font-mono font-bold">{player.adherence}%</span>
                  </div>
                </div>
              </div>

              {/* Flame streak */}
              <div className="flex items-center bg-orange-500/10 border border-orange-500/20 rounded px-2 py-0.5 text-orange-500">
                <span className="text-xs mr-1 leading-none">🔥</span>
                <span className="font-mono text-xs font-bold leading-none">{player.streak}d</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
