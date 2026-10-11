import React, { useState } from 'react';
import { Badge } from '../../types';

interface BadgeShelfProps {
  earnedBadges: Badge[];
}

export const BadgeShelf: React.FC<BadgeShelfProps> = ({ earnedBadges }) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // All possible badges in this version
  const ALL_JOURNEY_BADGES: Badge[] = [
    { id: 'badge_1', name: "Primeiro Passo", icon: "🌱", description: "Fez seu primeiro registro oficial no app (check-in ou treino)", rarity: 'comum' },
    { id: 'badge_2', name: "7 Dias de Fogo", icon: "🔥", description: "Manteve consistência por 7 dias seguidos", rarity: 'rara' },
    { id: 'badge_3', name: "Mestre do Sono", icon: "💤", description: "Qualidade de recuperação excelente com sono perfeito", rarity: 'comum' },
    { id: 'badge_4', name: "Carga Equilibrada", icon: "⚖", description: "Manteve ACWR na zona de segurança por semanas", rarity: 'lendaria' },
    { id: 'badge_5', name: "Mês Completo", icon: "🏆", description: "Consistência extraordinária por mais de 30 dias", rarity: 'lendaria' }
  ];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-xl">
      <div className="mb-4">
        <h3 className="text-white font-black text-lg uppercase tracking-tight">Minha Prateleira de Badges</h3>
        <p className="text-xs text-gray-400 mt-1">Conquiste emblemas raros demonstrando consistência tática e fisiológica.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {ALL_JOURNEY_BADGES.map(badge => {
          const isEarned = earnedBadges.some(b => b.id === badge.id);

          return (
            <button
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`
                flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group
                ${isEarned 
                  ? 'bg-black/60 border-teal-500/40 hover:border-teal-400 cursor-pointer shadow-lg' 
                  : 'bg-black/20 border-gray-800 opacity-40 cursor-pointer hover:opacity-60'
                }
              `}
            >
              <div className={`
                text-3xl filter drop-shadow transition-transform group-hover:scale-110
                ${isEarned ? 'grayscale-0' : 'grayscale brightness-50'}
              `}>
                {badge.icon}
              </div>

              <span className="text-[11px] font-bold text-gray-300 mt-2 text-center truncate w-full">
                {badge.name}
              </span>

              <span className={`
                text-[8px] uppercase font-black px-1.5 py-0.5 rounded leading-none mt-1
                ${badge.rarity === 'lendaria' 
                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                  : badge.rarity === 'rara'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                }
              `}>
                {badge.rarity}
              </span>

              {/* Status Lock icon overlay for locked badges */}
              {!isEarned && (
                <span className="absolute top-1.5 right-1.5 text-[9px] text-gray-600">🔒</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-gray-800 w-full max-w-xs rounded-2xl p-5 text-center shadow-2xl relative animate-fade-in-up">
            <button 
              onClick={() => setSelectedBadge(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            
            <span className="text-5xl filter drop-shadow mt-4 block">
              {selectedBadge.icon}
            </span>

            <h3 className="text-lg font-black text-white mt-3 uppercase tracking-tight">
              {selectedBadge.name}
            </h3>

            <span className={`
              inline-block text-[9px] uppercase font-black px-2 py-0.5 rounded leading-none mt-1.5
              ${selectedBadge.rarity === 'lendaria' 
                ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30' 
                : selectedBadge.rarity === 'rara'
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                  : 'bg-gray-500/15 text-gray-400 border border-gray-500/30'
              }
            `}>
              {selectedBadge.rarity}
            </span>

            <p className="text-xs text-gray-400 mt-4 leading-relaxed bg-black/40 border border-gray-800 p-3 rounded-xl">
              {selectedBadge.description}
            </p>

            <button
              onClick={() => setSelectedBadge(null)}
              className="mt-5 w-full py-2.5 bg-gray-900 border border-gray-800 text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition"
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
