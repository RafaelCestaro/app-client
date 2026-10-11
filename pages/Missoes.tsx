
import React, { useState } from 'react';
import { ATHLETE_MOCK, MARKETPLACE_MOCK } from '../constants';
import { CoinIcon, ChevronRightIcon, TrophyIcon, ChartBarIcon, ClipboardCheckIcon, VideoIcon } from '../components/icons';
import { Page, Product } from '../types';
import { ProductDetailsModal } from '../components/common/ProductDetailsModal';

interface MissoesProps {
  onNavigate?: (page: Page) => void;
}

const Missoes: React.FC<MissoesProps> = ({ onNavigate }) => {
  const athlete = ATHLETE_MOCK;
  const weeklyLoadPercentage = (athlete.weeklyLoad.accumulated / athlete.weeklyLoad.goal) * 100;
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Simulated Game Week State (This would come from calendar/backend)
  const isGameWeek = true;

  return (
    <div className="space-y-6 pb-24">
      {/* Header / Summary */}
      <div className="flex items-center justify-between">
         <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full border-2 border-loco-red overflow-hidden">
                 <img src={athlete.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
               <h1 className="font-bold text-black dark:text-white text-lg leading-tight">Bom dia, {athlete.name.split(' ')[0]}!</h1>
               <p className="text-xs text-gray-500 dark:text-gray-400 italic">"O treino difícil, o jogo fácil." - Coach</p>
            </div>
         </div>
         <div className="text-right flex flex-col items-end">
            <div className="flex items-center space-x-3 mb-1">
                {/* STREAK COUNTER */}
                <div className="flex items-center bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                    <span className="text-base mr-1">🔥</span>
                    <span className="font-black text-orange-500 text-sm">{athlete.streak}</span>
                </div>
                <div className="flex items-center text-yellow-500">
                    <CoinIcon className="w-4 h-4 mr-1" />
                    <span className="font-bold text-sm">{athlete.coins}</span>
                </div>
            </div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nível {athlete.level}</div>
         </div>
      </div>

      {/* GAME DAY / PREP CONTEXT CARD (Only visible when relevant) */}
      {isGameWeek && (
          <div 
            onClick={() => onNavigate && onNavigate(Page.Time)}
            className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-4 border border-gray-700 shadow-xl cursor-pointer hover:border-loco-red transition group relative overflow-hidden"
          >
              <div className="absolute top-0 right-0 w-32 h-32 bg-loco-red/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center">
                      <div className="bg-loco-red p-2.5 rounded-full mr-3 animate-pulse">
                          <VideoIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                          <p className="text-[10px] font-bold text-loco-red uppercase tracking-wide">Semana de Jogo</p>
                          <h3 className="font-bold text-white text-lg">Locomotiva vs Steamrollers</h3>
                          <p className="text-xs text-gray-400 mt-0.5">Acesse o plano de jogo e scout do adversário.</p>
                      </div>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-gray-500 group-hover:text-white transition" />
              </div>
          </div>
      )}

      {/* Unified Status Dashboard (Execution Focus) */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-lg">
            {/* Top Section: Availability & Risk */}
            <div className="flex divide-x divide-gray-800 mb-4">
            <div className="flex-1 pr-4">
                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">Disponibilidade</p>
                <p className="text-green-500 font-bold text-sm">Disponível</p>
            </div>
            <div className="flex-1 pl-4">
                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">Risco de Lesões</p>
                <p className="text-yellow-500 font-bold text-sm">Moderado <span className="text-[10px] text-gray-500">1.15</span></p>
            </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-800 w-full mb-3"></div>

            {/* Bottom Section: Weekly Load */}
            <div>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                    <ChartBarIcon className="w-3 h-3 text-loco-red" />
                    <h2 className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Carga da Semana</h2>
                </div>
                <span className="text-[10px] font-bold text-white">{athlete.weeklyLoad.accumulated} / {athlete.weeklyLoad.goal} AU</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 mb-1">
                <div className="bg-loco-red h-2 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,158,96,0.5)]" style={{ width: `${weeklyLoadPercentage}%` }}></div>
            </div>
            <p className="text-right text-[8px] text-gray-500 italic">{Math.round(weeklyLoadPercentage)}% da meta atingida</p>
            </div>
      </div>

      {/* Current Program Shortcut */}
      <div 
        onClick={() => onNavigate && onNavigate(Page.Programas)}
        className="bg-white dark:bg-loco-gray rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-800 flex items-center justify-between cursor-pointer hover:border-loco-red transition group"
      >
          <div className="flex items-center">
              <div className="bg-loco-red/10 p-2.5 rounded-lg mr-3 group-hover:bg-loco-red/20 transition">
                  <ClipboardCheckIcon className="w-5 h-5 text-loco-red" />
              </div>
              <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Programa Atual</p>
                  <h3 className="font-bold text-black dark:text-white text-sm">Pré-Temporada: Base Aeróbia</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Semana 4 de 12 • Foco: Resistência</p>
              </div>
          </div>
          <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-loco-red transition" />
      </div>

      {/* GymRats Shortcut */}
      <button 
        onClick={() => onNavigate && onNavigate(Page.GymRats)}
        className="w-full bg-gradient-to-r from-loco-red to-green-900 text-white p-4 rounded-xl shadow-lg flex items-center justify-between hover:scale-[1.02] transition-transform relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="flex items-center relative z-10">
            <TrophyIcon className="w-8 h-8 text-yellow-400 mr-4 drop-shadow-md" />
            <div className="text-left">
                <h3 className="font-bold text-lg">Ver Ranking GymRats</h3>
                <p className="text-xs text-white/80">Confira sua posição no time e amigos</p>
            </div>
        </div>
        <div className="bg-white/20 p-2 rounded-full relative z-10 group-hover:bg-white/30 transition">
            <ChevronRightIcon className="w-4 h-4 text-white" />
        </div>
      </button>

      {/* Marketplace Showcase */}
      <div>
         <div className="flex justify-between items-center mb-3 px-1">
            <h3 className="font-bold text-black dark:text-white">Destaques da Loja</h3>
            <button 
                onClick={() => onNavigate && onNavigate(Page.Marketplace)}
                className="text-xs text-loco-red font-bold hover:underline"
            >
                Ver Tudo
            </button>
         </div>
         <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
            {MARKETPLACE_MOCK.map(product => (
                <div 
                    key={product.id} 
                    onClick={() => setSelectedProduct(product)}
                    className="min-w-[140px] bg-white dark:bg-loco-gray rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 cursor-pointer hover:border-loco-red transition"
                >
                    <div className="h-28 bg-gray-100 dark:bg-black relative">
                        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                        {product.condition === 'Novo' && (
                            <span className="absolute top-1 right-1 bg-green-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">NOVO</span>
                        )}
                    </div>
                    <div className="p-2">
                        <p className="text-[10px] text-gray-500 truncate">{product.category}</p>
                        <h4 className="font-bold text-xs text-black dark:text-white truncate mb-1">{product.title}</h4>
                        <p className="font-bold text-loco-red text-sm">R$ {product.price}</p>
                    </div>
                </div>
            ))}
         </div>
      </div>

      <ProductDetailsModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};

export default Missoes;
