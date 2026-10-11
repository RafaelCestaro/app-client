
import React, { useState } from 'react';
import { Badge } from '../../types';
import { CloseIcon, CheckCircleSolidIcon, TrophyIcon } from '../icons';

interface BadgeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  allBadges: Badge[];
  selectedBadges: Badge[];
  onSave: (badges: Badge[]) => void;
}

export const BadgeSelectorModal: React.FC<BadgeSelectorModalProps> = ({ isOpen, onClose, allBadges, selectedBadges, onSave }) => {
  const [currentSelection, setCurrentSelection] = useState<Badge[]>(selectedBadges);

  if (!isOpen) return null;

  const toggleBadge = (badge: Badge) => {
    const isSelected = currentSelection.find(b => b.id === badge.id);
    if (isSelected) {
      setCurrentSelection(currentSelection.filter(b => b.id !== badge.id));
    } else {
      if (currentSelection.length < 3) {
        setCurrentSelection([...currentSelection, badge]);
      } else {
        // Opcional: Alerta de maximo atingido
        alert("Você só pode exibir 3 insígnias.");
      }
    }
  };

  const rarityColors = {
    comum: 'bg-gray-200 text-gray-600 border-gray-300',
    rara: 'bg-blue-100 text-blue-700 border-blue-300',
    lendaria: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-loco-gray w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-yellow-500/20 p-2 rounded-full mr-3">
                <TrophyIcon className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
                <h2 className="font-bold text-lg text-black dark:text-white">Sala de Troféus</h2>
                <p className="text-xs text-gray-500">Selecione até 3 conquistas</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Badge Grid */}
        <div className="p-4 overflow-y-auto grid grid-cols-2 gap-3">
           {allBadges.map(badge => {
             const isSelected = !!currentSelection.find(b => b.id === badge.id);
             return (
               <div 
                 key={badge.id} 
                 onClick={() => toggleBadge(badge)}
                 className={`
                    relative p-3 rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${isSelected ? 'border-loco-red bg-loco-red/10' : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'}
                 `}
               >
                 <div className="flex items-start justify-between mb-2">
                    <div className="text-3xl">{badge.icon}</div>
                    {isSelected && <CheckCircleSolidIcon className="w-5 h-5 text-loco-red" />}
                 </div>
                 <h3 className="font-bold text-sm text-black dark:text-white">{badge.name}</h3>
                 <p className="text-xs text-gray-500 line-clamp-2 leading-tight mb-2">{badge.description}</p>
                 <div className={`inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${rarityColors[badge.rarity]}`}>
                    {badge.rarity}
                 </div>
               </div>
             );
           })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20">
            <button 
                onClick={() => onSave(currentSelection)}
                className="w-full bg-loco-red text-white font-bold py-3 rounded-xl hover:bg-red-700 transition shadow-lg"
            >
                Salvar Exibição ({currentSelection.length}/3)
            </button>
        </div>

      </div>
    </div>
  );
};
