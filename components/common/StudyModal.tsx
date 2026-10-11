
import React, { useState, useEffect } from 'react';
import { CloseIcon, VideoIcon, BookOpenIcon, CheckCircleIcon } from '../icons';
import { PLAYBOOK_MOCK } from '../../constants';

interface StudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentTitle: string;
  videoUrl?: string;
  playbookId?: string;
}

export const StudyModal: React.FC<StudyModalProps> = ({ isOpen, onClose, contentTitle, videoUrl, playbookId }) => {
  const [timer, setTimer] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [playbookImage, setPlaybookImage] = useState<string | null>(null);

  // Fetch Playbook content if applicable
  useEffect(() => {
      if (playbookId) {
          // Logic to find a representative image from the playbook install
          // In a real app, this would fetch the specific play or install
          // Here we default to the first card of the first install for demo purposes, 
          // or try to match if IDs existed in the mock structure more deeply.
          const install = PLAYBOOK_MOCK.find(p => p.id === playbookId) || PLAYBOOK_MOCK[0];
          if (install && install.cards.length > 0) {
              setPlaybookImage(install.cards[0].imageUrl);
          }
      } else {
          setPlaybookImage(null);
      }
  }, [playbookId]);

  useEffect(() => {
    let interval: any;
    if (isOpen && !isCompleted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isCompleted]);

  useEffect(() => {
      if (!isOpen) {
          setTimer(0);
          setIsCompleted(false);
      }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleFinish = () => {
      setIsCompleted(true);
      // Simula um delay para ler a mensagem de sucesso antes de fechar
      setTimeout(() => {
          onClose();
      }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-[#121212] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-800 flex flex-col max-h-[90vh] animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-[#1a1a1a]">
            <div className="flex items-center space-x-3">
                <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                    {videoUrl ? <VideoIcon className="w-5 h-5" /> : <BookOpenIcon className="w-5 h-5" />}
                </div>
                <div>
                    <h2 className="text-white font-bold text-sm md:text-base">{contentTitle}</h2>
                    <p className="text-xs text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                        Estudando • {formatTime(timer)}
                    </p>
                </div>
            </div>
            <button onClick={() => onClose()} className="text-gray-400 hover:text-white transition">
                <CloseIcon className="w-6 h-6" />
            </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden bg-contain bg-center bg-no-repeat">
            {isCompleted ? (
                <div className="text-center animate-fade-in">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircleIcon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Estudo Concluído!</h3>
                    <p className="text-gray-400">Foco total no jogo.</p>
                </div>
            ) : (
                <>
                    {videoUrl ? (
                        <div className="w-full h-full aspect-video bg-black">
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src={videoUrl} 
                                title="Study Video" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4">
                            {playbookImage ? (
                                <img src={playbookImage} alt="Diagrama Tático" className="max-w-full max-h-full object-contain" />
                            ) : (
                                <div className="text-center">
                                    <BookOpenIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                                    <p className="text-gray-500 text-sm">Visualizador de Playbook</p>
                                    <p className="text-white font-bold mt-2 text-lg">Analise as jogadas no caderno tático.</p>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>

        {/* Footer Controls */}
        {!isCompleted && (
            <div className="p-4 border-t border-gray-800 bg-[#1a1a1a] flex justify-end">
                <button 
                    onClick={handleFinish}
                    className="bg-loco-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-xl transition shadow-lg flex items-center"
                >
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    Concluir Sessão
                </button>
            </div>
        )}

      </div>
    </div>
  );
};
