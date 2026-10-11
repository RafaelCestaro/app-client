
import React, { useState } from 'react';
import { ATHLETE_MOCK, TRAINING_SESSIONS_MOCK, FEED_MOCK } from '../constants';
import { Page } from '../types';
import { RadarChart } from '../components/common/RadarChart';
import { TrophyIcon, ChartBarIcon, ActivityIcon, ShareIcon, GridIcon, TagIcon, HeartIcon } from '../components/icons';

interface PerfilProps {
  onNavigate?: (page: Page) => void;
}

const Perfil: React.FC<PerfilProps> = ({ onNavigate }) => {
  const athlete = ATHLETE_MOCK;
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'MEDIA' | 'LOCKER'>('OVERVIEW');

  // OVR Calculation (Mock)
  const calculateOVR = () => {
      const technical = athlete.radarData.reduce((acc, curr) => acc + curr.athlete, 0) / athlete.radarData.length;
      const physical = 92; 
      return Math.round((technical * 0.5) + (physical * 0.5));
  };

  const ovr = calculateOVR();

  const handleShareCard = () => {
      // Logic to generate image would go here
      alert("Gerando Scout Card para Instagram Stories...");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-24 overflow-x-hidden">
      
      {/* 1. PLAYER CARD HEADER (FIFA Style) */}
      <div className="relative w-full h-[480px]">
          {/* Dynamic Background based on OVR */}
          <div className={`absolute inset-0 bg-gradient-to-b ${ovr >= 90 ? 'from-yellow-900' : 'from-[#1a1a1a]'} to-black z-0`}>
              <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center pt-8 h-full">
              
              {/* Top Stats Bar */}
              <div className="w-full px-6 flex justify-between items-start mb-4">
                  <div className="flex flex-col items-center">
                      <span className="text-5xl font-black italic text-gray-100 tracking-tighter drop-shadow-lg">{ovr}</span>
                      <span className="text-xs font-bold uppercase text-loco-red tracking-widest bg-black/50 px-2 py-0.5 rounded">OVR</span>
                  </div>
                  
                  <div className="flex flex-col items-end">
                      <div className="flex items-center space-x-1 mb-1">
                          <img src="https://cdn-icons-png.flaticon.com/512/323/323310.png" className="w-5 h-5 filter invert" alt="BR" />
                          <span className="text-xl font-black text-white italic">MEI</span>
                      </div>
                      <div className="flex items-center bg-green-500/20 px-2 py-1 rounded border border-green-500/50">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
                          <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Em Alta</span>
                      </div>
                  </div>
              </div>

              {/* Hero Image (Cutout) */}
              <div className="relative w-64 h-64 z-20 -mt-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                  <img 
                    src={athlete.avatarUrl} 
                    alt={athlete.name} 
                    className="w-full h-full object-cover rounded-3xl border-4 border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] mask-image-gradient"
                    style={{ objectPosition: 'top center' }}
                  />
              </div>

              {/* Name Plate */}
              <div className="text-center -mt-8 z-30">
                  <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic drop-shadow-xl">{athlete.name}</h1>
                  <div className="flex items-center justify-center space-x-2 mt-1">
                      <span className="text-sm font-bold text-gray-400">LOCOMOTIVA FC</span>
                      <span className="text-loco-red">•</span>
                      <span className="text-sm font-bold text-gray-400">#{athlete.number}</span>
                  </div>
              </div>

              {/* Share Action */}
              <button 
                onClick={handleShareCard}
                className="mt-6 flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all active:scale-95"
              >
                  <ShareIcon className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold uppercase tracking-wider">Gerar Scout Card</span>
              </button>
          </div>
      </div>

      {/* 2. TAB NAVIGATION */}
      <div className="flex justify-center border-b border-gray-800 mb-6 bg-black sticky top-0 z-40">
          <button 
            onClick={() => setActiveTab('OVERVIEW')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === 'OVERVIEW' ? 'border-loco-red text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
              Atributos
          </button>
          <button 
            onClick={() => setActiveTab('MEDIA')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === 'MEDIA' ? 'border-loco-red text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
              Highlights
          </button>
          <button 
            onClick={() => setActiveTab('LOCKER')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === 'LOCKER' ? 'border-loco-red text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
              Locker
          </button>
      </div>

      {/* 3. CONTENT AREA */}
      <div className="px-4 animate-fade-in">
          
          {activeTab === 'OVERVIEW' && (
              <div className="space-y-6">
                  {/* Radar Chart Section */}
                  <div className="bg-[#111] border border-gray-800 rounded-2xl p-4 relative">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center">
                          <ActivityIcon className="w-4 h-4 mr-2 text-loco-red" />
                          Radar Técnico
                      </h3>
                      <div className="h-64 -ml-4">
                          <RadarChart data={athlete.radarData} />
                      </div>
                  </div>

                  {/* Physical Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                      {athlete.prs.map((pr, idx) => (
                          <div key={idx} className="bg-[#111] border border-gray-800 p-4 rounded-xl flex flex-col justify-between hover:border-gray-600 transition duration-300">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{pr.metric}</span>
                              <div className="flex items-end">
                                  <span className="text-2xl font-black text-white leading-none">{pr.value}</span>
                                  <span className="text-xs font-bold text-loco-red ml-1 mb-0.5">{pr.unit}</span>
                              </div>
                          </div>
                      ))}
                  </div>

                  {/* Badges / Legacy */}
                  <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">
                      <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Conquistas</h3>
                          <span className="text-xs font-bold text-white">{athlete.earnedBadges.length} Total</span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                          {athlete.earnedBadges.map((badge) => (
                              <div key={badge.id} className="w-12 h-12 bg-gray-900 rounded-full border border-gray-700 flex items-center justify-center text-xl hover:scale-110 transition cursor-help" title={badge.name}>
                                  {badge.icon}
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'MEDIA' && (
              <div className="grid grid-cols-3 gap-1">
                  {/* Simulating Highlights Feed */}
                  {FEED_MOCK.filter(p => p.imageUrl).map(post => (
                      <div key={post.id} className="aspect-square bg-gray-900 relative group cursor-pointer">
                          <img src={post.imageUrl} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                              <div className="flex items-center text-white font-bold text-xs">
                                  <HeartIcon className="w-4 h-4 mr-1 fill-white" /> {post.likes}
                              </div>
                          </div>
                      </div>
                  ))}
                  {/* Placeholders */}
                  {[1,2,3,4].map(i => (
                      <div key={i} className="aspect-square bg-[#1a1a1a] flex items-center justify-center border border-black">
                          <GridIcon className="w-6 h-6 text-gray-700" />
                      </div>
                  ))}
              </div>
          )}

          {activeTab === 'LOCKER' && (
              <div className="space-y-4">
                  <div className="p-6 text-center border-2 border-dashed border-gray-800 rounded-xl hover:border-gray-600 cursor-pointer transition">
                      <TagIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      <p className="text-sm font-bold text-gray-400">Anunciar Equipamento</p>
                  </div>
                  <p className="text-center text-xs text-gray-600 mt-4">Nenhum item à venda no momento.</p>
              </div>
          )}

      </div>
    </div>
  );
};

export default Perfil;
