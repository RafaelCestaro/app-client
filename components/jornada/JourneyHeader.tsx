import React from 'react';
import { CoinIcon } from '../icons';

interface JourneyHeaderProps {
  level: number;
  xp: number;
  nextLevelXp: number;
  levelName: string;
  streak: number;
  coins: number;
}

export const JourneyHeader: React.FC<JourneyHeaderProps> = ({
  level,
  xp,
  nextLevelXp,
  levelName,
  streak,
  coins,
}) => {
  const percentage = Math.min((xp / nextLevelXp) * 100, 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-950 border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#94E67C]/10 rounded-full blur-3xl -mr-8 -mt-8"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -ml-8 -mb-8"></div>

      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 relative z-10">
        {/* Profile / Level Progress Ring */}
        <div className="flex items-center space-x-5">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="absolute transform -rotate-90 w-24 h-24">
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-gray-800"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="#94E67C"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="flex flex-col items-center justify-center bg-gray-900 border border-gray-800 rounded-full w-20 h-20 text-center shadow-lg">
              <span className="text-3xl font-black text-[#94E67C] tracking-tighter leading-none">{level}</span>
              <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Nível</span>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Patente Atleta</p>
            <h2 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">
              {levelName}
            </h2>
            <div className="flex items-center justify-center sm:justify-start space-x-2 mt-1">
              <div className="w-32 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#94E67C] h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-400">
                {xp}/{nextLevelXp} XP
              </span>
            </div>
          </div>
        </div>

        {/* Counters Box */}
        <div className="flex items-center justify-center space-x-4 w-full sm:w-auto">
          {/* Flame Streak */}
          <div className="flex-1 sm:flex-initial flex flex-col items-center bg-orange-500/10 border border-orange-500/20 rounded-2xl p-3 px-5 text-center min-w-[100px] shadow-lg animate-pulse">
            <span className="text-3xl filter drop-shadow-[0_4px_10px_rgba(249,115,22,0.4)]">🔥</span>
            <span className="text-2xl font-black text-orange-500 tracking-tighter leading-none mt-1">
              {streak}
            </span>
            <span className="text-[9px] uppercase font-bold text-orange-400 tracking-wider mt-0.5">
              Dias de Fogo
            </span>
          </div>

          {/* Coins Counter */}
          <div className="flex-1 sm:flex-initial flex flex-col items-center bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-3 px-5 text-center min-w-[100px] shadow-lg">
            <span className="text-3xl">🪙</span>
            <span className="text-2xl font-black text-yellow-500 tracking-tighter leading-none mt-1">
              {coins}
            </span>
            <span className="text-[9px] uppercase font-bold text-yellow-400 tracking-wider mt-0.5">
              Craque Coins
            </span>
          </div>
        </div>
      </div>

      {/* Warning Alert if streak in danger (streak > 0) */}
      <div className="mt-4 p-2 px-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center text-red-400 text-[10px] font-semibold flex items-center justify-center space-x-1.5">
        <span className="animate-ping rounded-full h-1.5 w-1.5 bg-red-500"></span>
        <span>Atenção: Complete o check-in de hoje antes da meia-noite para não perder sua sequência!</span>
      </div>
    </div>
  );
};
