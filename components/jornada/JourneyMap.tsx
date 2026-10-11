import React, { useState } from 'react';
import { GamifiedChapter } from '../../lib/gamification';

interface JourneyMapProps {
  chapters: GamifiedChapter[];
}

export const JourneyMap: React.FC<JourneyMapProps> = ({ chapters }) => {
  const [selectedChapter, setSelectedChapter] = useState<GamifiedChapter | null>(null);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-[#94E67C] opacity-50"></div>
      
      <div className="mb-6">
        <h3 className="text-white font-black text-lg tracking-tight uppercase">Minha Trilha de Evolução</h3>
        <p className="text-xs text-gray-400 mt-1">
          Complete os marcos diários de consistência para desbloquear os capítulos da sua carreira esportiva.
        </p>
      </div>

      <div className="relative flex flex-col items-center py-6 min-h-[450px]">
        {/* Connecting Line background */}
        <div className="absolute top-0 bottom-0 w-1.5 bg-gray-800 rounded-full left-1/2 -translate-x-1/2 z-0"></div>
        {/* Glowing Progress Line */}
        <div 
          className="absolute top-0 w-1.5 bg-gradient-to-b from-[#94E67C] to-teal-500 rounded-full left-1/2 -translate-x-1/2 z-0 transition-all duration-1000"
          style={{ 
            height: `${
              chapters.filter(c => c.status === 'completed').length * 16.66 + 
              (chapters.find(c => c.status === 'active')?.progress || 0) * 0.1666
            }%` 
          }}
        ></div>

        {/* Trail of Chapter Nodes */}
        <div className="w-full space-y-12 relative z-10">
          {chapters.map((chapter, index) => {
            const isCompleted = chapter.status === 'completed';
            const isActive = chapter.status === 'active';
            const isLocked = chapter.status === 'locked';

            // Alternating left/right positioning
            const isLeft = index % 2 === 0;

            return (
              <div 
                key={chapter.id} 
                className={`flex w-full items-center justify-center relative`}
              >
                {/* Node Button */}
                <button
                  onClick={() => setSelectedChapter(chapter)}
                  className={`
                    relative w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-xl transition-all duration-300 transform active:scale-95 border-4 z-20 cursor-pointer
                    ${isCompleted 
                      ? 'bg-gradient-to-br from-[#94E67C] to-green-600 border-[#94E67C] text-black ring-4 ring-[#94E67C]/20 scale-105' 
                      : isActive
                        ? 'bg-gray-900 border-teal-400 text-teal-400 ring-4 ring-teal-500/30 animate-pulse scale-110'
                        : 'bg-gray-950 border-gray-800 text-gray-600 opacity-60'
                    }
                  `}
                >
                  {isLocked ? (
                    <span className="text-lg">🔒</span>
                  ) : (
                    <span className="filter drop-shadow">{chapter.icon}</span>
                  )}
                  
                  {/* Floating Chapter Number badge */}
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-black rounded-full w-5 h-5 flex items-center justify-center border border-gray-700">
                    {chapter.number}
                  </span>
                </button>

                {/* Alternating Sidebar Card Info */}
                <div 
                  onClick={() => setSelectedChapter(chapter)}
                  className={`
                    absolute top-1/2 -translate-y-1/2 hidden md:block w-5/12 cursor-pointer p-4 bg-gray-950 border border-gray-800 rounded-xl hover:border-teal-400 transition
                    ${isLeft ? 'right-[58%] text-right' : 'left-[58%] text-left'}
                    ${isLocked ? 'opacity-40' : ''}
                  `}
                >
                  <p className="text-[10px] font-bold text-teal-400 tracking-wider">CAPÍTULO {chapter.number}</p>
                  <h4 className="font-bold text-white text-sm mt-0.5">{chapter.title}</h4>
                  <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{chapter.subtitle}</p>
                  
                  {!isLocked && (
                    <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden mt-2">
                      <div 
                        className="bg-[#94E67C] h-1 rounded-full" 
                        style={{ width: `${chapter.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>

                {/* Tiny indicator label for mobile */}
                <span className="absolute bottom-[-18px] text-[9px] font-bold text-gray-500 uppercase md:hidden">
                  {chapter.title.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chapter Information Popover Modal */}
      {selectedChapter && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-gray-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative animate-fade-in-up">
            <button 
              onClick={() => setSelectedChapter(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 hover:bg-gray-900 rounded-full"
            >
              ✕
            </button>
            
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-4xl bg-gray-900 border border-gray-800 p-2 rounded-xl">
                {selectedChapter.icon}
              </span>
              <div>
                <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Capítulo {selectedChapter.number}</p>
                <h3 className="text-xl font-black text-white">{selectedChapter.title}</h3>
              </div>
            </div>

            <p className="text-xs text-gray-300 mb-6 bg-gray-900 p-3 rounded-xl border border-gray-800 leading-relaxed">
              {selectedChapter.subtitle}
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-1.5 uppercase">
                  <span>Progresso do Capítulo</span>
                  <span>{selectedChapter.progress}%</span>
                </div>
                <div className="w-full bg-gray-900 h-2.5 rounded-full overflow-hidden border border-gray-800">
                  <div 
                    className="bg-gradient-to-r from-teal-400 to-[#94E67C] h-2.5 rounded-full transition-all duration-1000" 
                    style={{ width: `${selectedChapter.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-[#94E67C]/5 border border-[#94E67C]/20 rounded-xl p-4">
                <span className="text-[10px] font-black text-[#94E67C] uppercase tracking-wider block">Recompensa ao Completar</span>
                <span className="text-sm font-bold text-white mt-1 block">🏆 {selectedChapter.reward}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedChapter(null)}
              className="mt-6 w-full py-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-white text-xs font-bold rounded-xl transition"
            >
              Fechar Detalhes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
