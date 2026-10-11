
import React, { useState } from 'react';
import { PLAYBOOK_MOCK } from '../constants';
import { PlaybookInstall, PlaybookCard } from '../types';
import { CloseIcon, BookOpenIcon } from '../components/icons';

const Playbook: React.FC = () => {
  const [selectedInstall, setSelectedInstall] = useState<PlaybookInstall | null>(null);
  const [selectedCard, setSelectedCard] = useState<PlaybookCard | null>(null);

  const handleInstallClick = (install: PlaybookInstall) => {
    setSelectedInstall(install);
    if (install.cards.length > 0) {
      setSelectedCard(install.cards[0]);
    } else {
      setSelectedCard(null);
    }
  };

  const handleBack = () => {
    setSelectedInstall(null);
    setSelectedCard(null);
  };

  if (selectedInstall) {
      return (
          <div className="h-full flex flex-col">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <button onClick={handleBack} className="text-gray-500 hover:text-white dark:text-gray-400 mr-3 text-sm font-bold">← Installs</button>
                    <h2 className="text-xl font-bold text-black dark:text-white truncate">{selectedInstall.title}</h2>
                </div>
                <span className="text-sm text-gray-500">{selectedCard ? '1 de ' + selectedInstall.cardCount : '0 de 0'}</span>
             </div>

             <div className="bg-white dark:bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 flex-1 flex flex-col">
                {selectedCard ? (
                    <>
                        {/* Diagram Area */}
                        <div className="flex-1 bg-white p-4 flex items-center justify-center border-b border-gray-200 relative overflow-auto">
                            <div className="text-center absolute top-2 w-full">
                                <h3 className="font-bold text-lg text-black">{selectedCard.title}</h3>
                            </div>
                            {/* Placeholder for diagram image */}
                            <img src={selectedCard.imageUrl} alt="Diagrama" className="max-h-full max-w-full object-contain" />
                        </div>

                        {/* Assignments Area */}
                        <div className="bg-white p-4 max-h-64 overflow-y-auto">
                             <h4 className="font-bold text-gray-800 mb-3">Atribuições</h4>
                             <div className="space-y-4">
                                {selectedCard.assignments.map((assign, idx) => (
                                    <div key={idx} className="flex border-b border-gray-100 pb-3 last:border-0">
                                        <div className="w-8 font-bold text-xl text-gray-900">{assign.position}</div>
                                        <div className="flex-1 pl-4">
                                            <div className="mb-1"><span className="text-xs font-bold text-gray-500 uppercase">Alinhamento:</span> <span className="text-gray-800 text-sm">{assign.alignment}</span></div>
                                            <div className="mb-1"><span className="text-xs font-bold text-gray-500 uppercase">Resp. Corrida:</span> <span className="text-gray-800 text-sm">{assign.runResp}</span></div>
                                            <div><span className="text-xs font-bold text-gray-500 uppercase">Resp. Passe:</span> <span className="text-gray-800 text-sm">{assign.passResp}</span></div>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <p>Nenhum card neste install.</p>
                    </div>
                )}
             </div>
          </div>
      )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-black dark:text-white">Installs Atuais</h1>
      <div className="grid grid-cols-1 gap-4">
        {PLAYBOOK_MOCK.map(install => (
          <div 
            key={install.id} 
            onClick={() => handleInstallClick(install)}
            className="bg-white dark:bg-loco-gray p-5 rounded-xl shadow-md cursor-pointer hover:bg-gray-50 dark:hover:bg-loco-gray-light border border-gray-200 dark:border-gray-700 flex items-center justify-between group transition"
          >
            <div className="flex items-center">
                <div className="bg-gray-100 dark:bg-black p-3 rounded-lg mr-4">
                    <BookOpenIcon className="w-6 h-6 text-loco-red" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-black dark:text-white group-hover:text-loco-red transition">{install.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{install.category}</p>
                </div>
            </div>
            <div className="text-right">
                 <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{install.cardCount} Cards</span>
                 <p className="text-xs text-gray-400">(0 novo)</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playbook;
