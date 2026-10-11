
import React, { useState, useEffect } from 'react';
import { CloseIcon, TargetIcon, TrophyIcon, LockIcon, GiftIcon, CheckCircleSolidIcon, ChartBarIcon } from '../icons';
import { MISSIONS_MOCK, ATHLETE_MOCK } from '../../constants';
import { Mission } from '../../types';
import { WorkoutLoggerModal } from './WorkoutLoggerModal';
import { WellnessCheckinModal } from './WellnessCheckinModal';
import { StudyModal } from './StudyModal';

interface FloatingActionMenuProps {
    isOpen: boolean;
    onToggle: (isOpen: boolean) => void;
}

export const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({ isOpen, onToggle }) => {
  const [activeTab, setActiveTab] = useState<'DIARIA' | 'EXPLORACAO' | 'PREMIUM'>('DIARIA');
  const [isWorkoutLoggerOpen, setIsWorkoutLoggerOpen] = useState(false);
  const [isWellnessModalOpen, setIsWellnessModalOpen] = useState(false);
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const athlete = ATHLETE_MOCK;

  // Filtra missões por aba
  const missions = MISSIONS_MOCK.filter(m => {
      if (activeTab === 'DIARIA') return m.category === 'DIARIA';
      if (activeTab === 'EXPLORACAO') return m.category === 'EXPLORACAO';
      if (activeTab === 'PREMIUM') return m.category === 'PREMIUM';
      return false;
  });

  const handleMissionAction = (mission: Mission) => {
    setSelectedMission(mission);
    
    // Check for specific content types first
    if (mission.videoUrl || mission.playbookId) {
        setIsStudyModalOpen(true);
        if (!completedMissions.includes(mission.id)) {
             setCompletedMissions(prev => [...prev, mission.id]);
        }
        return;
    }

    if (mission.type === 'TREINO') {
        setIsWorkoutLoggerOpen(true);
        if (!completedMissions.includes(mission.id)) {
             setCompletedMissions(prev => [...prev, mission.id]);
        }
    } else if (mission.type === 'SAUDE' && mission.title.includes('Check-in')) {
        setIsWellnessModalOpen(true);
        // Mark as completed happens inside modal callback
    } else {
        // Generic completion
        if (!completedMissions.includes(mission.id)) {
            setCompletedMissions(prev => [...prev, mission.id]);
        }
    }
  };

  const handleWellnessClose = (success?: boolean) => {
      setIsWellnessModalOpen(false);
      if (success && selectedMission && !completedMissions.includes(selectedMission.id)) {
          setCompletedMissions(prev => [...prev, selectedMission.id]);
      }
  };

  return (
    <>
      {/* Main FAB Button (Only visible when modal is closed) */}
      {!isOpen && (
          <button 
            onClick={() => onToggle(true)}
            className="fixed bottom-20 md:bottom-6 right-4 z-40 p-4 rounded-full shadow-2xl bg-loco-red text-white flex items-center justify-center ring-4 ring-loco-red/30 hover:scale-110 transition-transform duration-200 animate-fade-in"
          >
            <TargetIcon className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
          </button>
      )}

      {/* Full Screen Mission Hub */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300"
                onClick={() => onToggle(false)}
            />

            {/* Modal Content */}
            <div className="relative w-full md:w-[480px] h-[95vh] md:h-[85vh] bg-[#121212] rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up border border-gray-800">
                
                {/* Header with Gamification Stats */}
                <div className="relative bg-gradient-to-b from-gray-900 to-[#121212] p-6 pb-2 shrink-0">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-2 opacity-80">
                            <TargetIcon className="w-5 h-5 text-loco-red" />
                            <span className="text-xs font-bold tracking-widest text-loco-red uppercase">Gamificação HUDLMODE</span>
                        </div>
                        <button onClick={() => onToggle(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
                            <CloseIcon className="w-6 h-6 text-white" />
                        </button>
                    </div>

                    <div className="flex justify-between items-end">
                        <h2 className="text-2xl font-bold text-white leading-none mb-1">Central de Missões</h2>
                        {/* STREAK Display */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center space-x-1">
                                <span className="text-2xl">🔥</span>
                                <span className="text-xl font-bold text-orange-500">{athlete.streak}</span>
                            </div>
                            <span className="text-[9px] font-bold text-orange-400 uppercase tracking-wider">Dias Seguidos</span>
                        </div>
                    </div>
                    
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700 flex items-center">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3 text-2xl">
                                💰
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Moedas</p>
                                <p className="text-xl font-bold text-white">{athlete.coins.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700 flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                                <TrophyIcon className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Nível {athlete.level}</p>
                                <p className="text-sm font-bold text-white">{athlete.xp} XP</p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                        <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
                            <span className="text-loco-red">NÍVEL {athlete.level}</span>
                            <span>{athlete.xp} / {athlete.nextLevelXp} XP</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-loco-red to-orange-600 w-[85%] rounded-full shadow-[0_0_10px_rgba(192,0,0,0.5)]"></div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex px-6 space-x-4 border-b border-gray-800 bg-[#121212]">
                    {['DIARIA', 'EXPLORACAO', 'PREMIUM'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                                activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                            }`}
                        >
                            {tab === 'DIARIA' ? 'Tarefas Diárias' : tab === 'EXPLORACAO' ? 'Exploração' : 'Desafios Pro'}
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-loco-red rounded-t-full"></span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Missions List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[#121212] no-scrollbar pb-24">
                    {missions.map((mission, index) => {
                        const isCompleted = mission.status === 'CONCLUIDA' || completedMissions.includes(mission.id);
                        return (
                            <div 
                                key={mission.id}
                                className={`
                                    group relative bg-gray-800/40 border border-gray-700 rounded-2xl p-3 flex items-center transition-all duration-300
                                    ${mission.locked ? 'opacity-50' : 'hover:bg-gray-800 hover:border-gray-600'}
                                    animate-fade-in
                                `}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Image / Icon */}
                                <div className="w-14 h-14 rounded-xl bg-gray-700 flex-shrink-0 overflow-hidden relative mr-4">
                                    {mission.image ? (
                                        <img src={mission.image} className="w-full h-full object-cover transition duration-500" alt="" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                            <TargetIcon className="w-6 h-6 text-gray-600" />
                                        </div>
                                    )}
                                    {isCompleted && (
                                        <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center backdrop-blur-[1px]">
                                            <CheckCircleSolidIcon className="w-6 h-6 text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={`font-bold text-sm truncate ${isCompleted ? 'text-green-400' : 'text-white'}`}>
                                            {mission.title}
                                        </h3>
                                        <div className="flex items-center space-x-2 text-[10px] font-bold bg-black/30 px-2 py-0.5 rounded text-yellow-500">
                                            <span>+{mission.xp} XP</span>
                                            {mission.coins > 0 && <span>• ¢ {mission.coins}</span>}
                                        </div>
                                    </div>
                                    
                                    <p className="text-xs text-gray-400 truncate mb-2">{mission.subtitle}</p>
                                    
                                    {/* Action Bar */}
                                    <div className="flex items-center justify-between">
                                        {/* Progress Bar (Visual only for now) */}
                                        <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full ${isCompleted ? 'bg-green-500' : 'bg-loco-red'}`} 
                                                style={{ width: isCompleted ? '100%' : `${(mission.progress / mission.target) * 100}%` }}
                                            ></div>
                                        </div>

                                        {mission.locked ? (
                                            <LockIcon className="w-4 h-4 text-gray-500" />
                                        ) : (
                                            <button 
                                                onClick={() => handleMissionAction(mission)}
                                                className={`
                                                    text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors
                                                    ${isCompleted 
                                                        ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' 
                                                        : 'bg-white text-black hover:bg-gray-200'}
                                                `}
                                            >
                                                {isCompleted ? 'Registrar +' : mission.actionLabel}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    
                    {/* Empty State */}
                    {missions.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            <p>Nenhuma missão nesta categoria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}

      {/* Logic Modals */}
      <WorkoutLoggerModal 
        isOpen={isWorkoutLoggerOpen} 
        onClose={() => setIsWorkoutLoggerOpen(false)} 
      />
      
      <WellnessCheckinModal
        isOpen={isWellnessModalOpen}
        onClose={handleWellnessClose}
      />

      <StudyModal
        isOpen={isStudyModalOpen}
        onClose={() => setIsStudyModalOpen(false)}
        contentTitle={selectedMission?.title || 'Estudo'}
        videoUrl={selectedMission?.videoUrl}
        playbookId={selectedMission?.playbookId}
      />
    </>
  );
};
