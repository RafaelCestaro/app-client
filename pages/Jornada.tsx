import React, { useState, useEffect } from 'react';
import { calculateGamification, calculateLeaderboard, GamificationState } from '../lib/gamification';
import { JourneyHeader } from '../components/jornada/JourneyHeader';
import { JourneyMap } from '../components/jornada/JourneyMap';
import { ChallengeList } from '../components/jornada/ChallengeList';
import { BadgeShelf } from '../components/jornada/BadgeShelf';
import { RewardCard } from '../components/jornada/RewardCard';
import { Leaderboard } from '../components/jornada/Leaderboard';
import { WellnessLog, TrainingSession, Page } from '../types';

interface JornadaProps {
  onNavigate?: (page: Page) => void;
}

const Jornada: React.FC<JornadaProps> = ({ onNavigate }) => {
  // State for raw logs, stored in localStorage
  const [checkins, setCheckins] = useState<WellnessLog[]>(() => {
    const saved = localStorage.getItem('hudl_checkins_list');
    return saved ? JSON.parse(saved) : [];
  });

  const [workouts, setWorkouts] = useState<TrainingSession[]>(() => {
    const saved = localStorage.getItem('hudl_workouts_list');
    return saved ? JSON.parse(saved) : [];
  });

  // Calculate current gamification state from raw logs
  const [gameState, setGameState] = useState<GamificationState>(() => calculateGamification([], []));
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);

  // Show Toast / Banner on Level Up
  const [showLevelUp, setShowLevelUp] = useState<string | null>(null);

  useEffect(() => {
    const computedState = calculateGamification(checkins, workouts);
    setGameState(computedState);
    setLeaderboardData(calculateLeaderboard(computedState.streak));

    // Persist lists
    localStorage.setItem('hudl_checkins_list', JSON.stringify(checkins));
    localStorage.setItem('hudl_workouts_list', JSON.stringify(workouts));
  }, [checkins, workouts]);

  // Listen for changes from other modals in App (e.g. checkin/checkout logged elsewhere)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCheckins = localStorage.getItem('hudl_checkins_list');
      const savedWorkouts = localStorage.getItem('hudl_workouts_list');
      if (savedCheckins) setCheckins(JSON.parse(savedCheckins));
      if (savedWorkouts) setWorkouts(JSON.parse(savedWorkouts));
    };

    window.addEventListener('storage', handleStorageChange);
    // Also poll occasionally since storage event doesn't trigger on same window
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Simulator actions
  const simulateCheckin = () => {
    const newLog: WellnessLog = {
      date: new Date().toISOString(),
      recoveryScore: 9,
      sleepQuality: 'Excelente',
      soreness: 'Nenhuma',
      stress: 'Baixo',
      actionTaken: 'Prontidão Registrada'
    };

    const nextCheckins = [...checkins, newLog];
    
    // Check if level goes up
    const oldLevel = gameState.level;
    const nextState = calculateGamification(nextCheckins, workouts);
    if (nextState.level > oldLevel) {
      setShowLevelUp(`Você alcançou o Nível ${nextState.level} (${nextState.levelName})!`);
    }

    setCheckins(nextCheckins);
  };

  const simulateCheckout = () => {
    const newSession: TrainingSession = {
      id: `session_${Date.now()}`,
      date: new Date().toISOString(),
      type: 'força',
      duration: 60,
      rpe: 8,
      intensity: 'alta',
      title: 'Workout Logged'
    };

    const nextWorkouts = [...workouts, newSession];

    // Check if level goes up
    const oldLevel = gameState.level;
    const nextState = calculateGamification(checkins, nextWorkouts);
    if (nextState.level > oldLevel) {
      setShowLevelUp(`Você alcançou o Nível ${nextState.level} (${nextState.levelName})!`);
    }

    setWorkouts(nextWorkouts);
  };

  const resetProgress = () => {
    if (window.confirm("Deseja realmente reiniciar todo o seu progresso da jornada?")) {
      setCheckins([]);
      setWorkouts([]);
    }
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Title / Back Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black dark:text-white uppercase tracking-tight">
            Jornada do Craque
          </h1>
          <p className="text-xs text-gray-500 mt-1">Sua trajetória rumo à alta performance gamificada</p>
        </div>
        <button 
          onClick={() => onNavigate && onNavigate(Page.Missoes)}
          className="px-4 py-2 bg-gray-900 border border-gray-800 hover:border-gray-700 text-white rounded-xl text-xs font-bold transition uppercase"
        >
          ✕ Sair
        </button>
      </div>

      {/* Main Journey Header (Level, Streak, Coins) */}
      <JourneyHeader
        level={gameState.level}
        xp={gameState.xp}
        nextLevelXp={gameState.nextLevelXp}
        levelName={gameState.levelName}
        streak={gameState.streak}
        coins={gameState.coins}
      />

      {/* Interactive Simulator Tools Widget */}
      <div className="bg-[#94E67C]/5 border border-[#94E67C]/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-white text-sm">Painel de Teste de Consistência</h4>
          <p className="text-xs text-gray-400 mt-0.5">Adicione registros rápidos para subir de nível e ver os badges desbloquearem.</p>
        </div>
        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <button
            onClick={simulateCheckin}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-[#94E67C] text-xs font-bold rounded-xl transition"
          >
            + Check-in (VFC)
          </button>
          <button
            onClick={simulateCheckout}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-teal-400 text-xs font-bold rounded-xl transition"
          >
            + Check-out (sRPE)
          </button>
          <button
            onClick={resetProgress}
            className="p-2.5 bg-red-950/20 border border-red-500/20 hover:border-red-500/50 text-red-400 rounded-xl text-xs transition"
            title="Resetar Progresso"
          >
            🗑
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: Journey Trail */}
        <div className="lg:col-span-7">
          <JourneyMap chapters={gameState.chapters} />
        </div>

        {/* Right column: Challenges & Rankings */}
        <div className="lg:col-span-5 space-y-6">
          <ChallengeList challenges={gameState.challenges} />
          <Leaderboard players={leaderboardData} />
        </div>
      </div>

      {/* Badges shelves */}
      <BadgeShelf earnedBadges={gameState.badges} />

      {/* Advanced Unlocks */}
      <RewardCard unlocks={gameState.unlocks} />

      {/* Level Up Popover Celebration Banner */}
      {showLevelUp && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex justify-center items-center p-4">
          <div className="bg-gradient-to-br from-gray-950 to-gray-900 border-2 border-[#94E67C] rounded-3xl p-8 max-w-sm w-full text-center shadow-[0_0_40px_rgba(148,230,124,0.15)] relative overflow-hidden animate-fade-in-up">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#94E67C] to-teal-400"></div>
            
            <span className="text-7xl block animate-bounce mb-4">🏆</span>
            
            <h2 className="text-3xl font-black text-[#94E67C] uppercase tracking-tighter leading-tight">
              LEVEL UP!
            </h2>
            
            <p className="text-white font-bold text-sm mt-4 bg-gray-900/60 p-4 border border-gray-800 rounded-2xl">
              {showLevelUp}
            </p>

            <p className="text-xs text-gray-500 mt-4">
              Você ganhou um bônus de moedas e novos materiais táticos de elite estão disponíveis na prateleira!
            </p>

            <button
              onClick={() => setShowLevelUp(null)}
              className="mt-6 w-full py-3.5 bg-gradient-to-r from-[#94E67C] to-teal-500 text-black font-black text-xs uppercase tracking-wider rounded-xl hover:scale-[1.02] transition shadow-lg shadow-[#94E67C]/10"
            >
              Sensacional!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jornada;
