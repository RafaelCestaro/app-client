
import React, { useState, useEffect, useCallback } from 'react';
import { Page, Theme, AppTheme } from './types';
import { Header } from './components/navigation/Header';
import { Sidebar } from './components/navigation/Sidebar';
import { BottomNav } from './components/navigation/BottomNav';
import { AIAssistant } from './components/common/AIAssistant';
import { FloatingActionMenu } from './components/common/FloatingActionMenu';
import Missoes from './pages/Missoes';
import Social from './pages/Social';
import Desempenho from './pages/Desempenho';
import Calendario from './pages/Calendario';
import Mensagens from './pages/Mensagens';
import Biblioteca from './pages/Biblioteca';
import Playbook from './pages/Playbook';
import Perfil from './pages/Perfil';
import Pesquisar from './pages/Pesquisar';
import Marketplace from './pages/Marketplace';
import GymRats from './pages/GymRats';
import Programas from './pages/Programas';
import Time from './pages/Time';
import Auth from './pages/Auth';
import Jornada from './pages/Jornada';
import { calculateGamification } from './lib/gamification';
import { SunIcon, MoonIcon, DesktopIcon, CloseIcon } from './components/icons';

const TEAM_PRESETS: AppTheme[] = [
    { name: 'São Bernardo FC', primaryColor: '#009E60' }, // Green
    { name: 'Flamengo', primaryColor: '#C8102E' },
    { name: 'Palmeiras', primaryColor: '#006437' },
    { name: 'São Paulo', primaryColor: '#FE0000' },
    { name: 'Corinthians', primaryColor: '#111111' },
    { name: 'Grêmio', primaryColor: '#0D80BF' },
    { name: 'Internacional', primaryColor: '#E30613' },
    { name: 'Seleção', primaryColor: '#FFDF00' },
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState<Page>(Page.Missoes);
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || Theme.System);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  
  // Custom Theme State (Default to São Bernardo Green)
  const [customPrimaryColor, setCustomPrimaryColor] = useState('#009E60');
  const [customBgImage, setCustomBgImage] = useState('');

  // Controlled Missions State
  const [isMissionsOpen, setIsMissionsOpen] = useState(false);

  // Dynamic FAB Metrics state
  const [fabStreak, setFabStreak] = useState(21);
  const [fabLevel, setFabLevel] = useState(1);

  useEffect(() => {
    const updateFabMetrics = () => {
      try {
        const savedCheckins = localStorage.getItem('hudl_checkins_list');
        const savedWorkouts = localStorage.getItem('hudl_workouts_list');
        const checkins = savedCheckins ? JSON.parse(savedCheckins) : [];
        const workouts = savedWorkouts ? JSON.parse(savedWorkouts) : [];
        const state = calculateGamification(checkins, workouts);
        setFabStreak(state.streak);
        setFabLevel(state.level);
      } catch (e) {
        // Fallback silently
      }
    };

    updateFabMetrics();
    const interval = setInterval(updateFabMetrics, 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Initialization Logic
  useEffect(() => {
      const savedLogin = localStorage.getItem('hudl_remember');
      if (savedLogin === 'true') {
          setIsAuthenticated(true);
      }
      
      const savedColor = localStorage.getItem('hudl_primary_color');
      const savedBg = localStorage.getItem('hudl_bg_image');
      
      // If no saved color, default to São Bernardo Green
      if (savedColor) {
          applyPrimaryColor(savedColor);
      } else {
          applyPrimaryColor('#009E60');
      }
      
      if (savedBg) applyBgImage(savedBg);
  }, []);

  const handleLogin = () => {
      setIsAuthenticated(true);
  };

  const applyPrimaryColor = (color: string) => {
      document.documentElement.style.setProperty('--color-primary', color);
      setCustomPrimaryColor(color);
      localStorage.setItem('hudl_primary_color', color);
  };

  const applyBgImage = (url: string) => {
      if (url) {
        document.documentElement.style.setProperty('--bg-image', `url(${url})`);
      } else {
        document.documentElement.style.setProperty('--bg-image', 'none');
      }
      setCustomBgImage(url);
      localStorage.setItem('hudl_bg_image', url);
  };

  const applyPreset = (preset: AppTheme) => {
      applyPrimaryColor(preset.primaryColor);
      applyBgImage(preset.backgroundImage || '');
  };

  useEffect(() => {
    const applyTheme = (t: Theme) => {
      if (t === Theme.System) {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', systemPrefersDark);
      } else {
        document.documentElement.classList.toggle('dark', t === Theme.Dark);
      }
      localStorage.setItem('theme', t);
    };

    applyTheme(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTheme(theme);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const playUpliftingSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const playNote = (freq: number, startTime: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'triangle'; // Smooth, warm chime tone
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      
      const now = ctx.currentTime;
      // Elegant arpeggio: C5 -> E5 -> G5 -> C6
      playNote(523.25, now, 0.4);
      playNote(659.25, now + 0.08, 0.4);
      playNote(783.99, now + 0.16, 0.4);
      playNote(1046.50, now + 0.24, 0.6);
    } catch (e) {
      // Browser safety fallback
    }
  };

  const handleNavigate = useCallback((page: Page) => {
    setActivePage(page);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case Page.Missoes: return <Missoes onNavigate={handleNavigate} />;
      case Page.Social: return <Social />;
      case Page.Desempenho: return <Desempenho />;
      case Page.Calendario: return <Calendario />;
      case Page.Mensagens: return <Mensagens />;
      case Page.Biblioteca: return <Biblioteca />;
      case Page.Playbook: return <Playbook />;
      case Page.Perfil: return <Perfil onNavigate={handleNavigate} />;
      case Page.Pesquisar: return <Pesquisar />;
      case Page.Marketplace: return <Marketplace />;
      case Page.GymRats: return <GymRats />;
      case Page.Programas: return <Programas />;
      case Page.Time: return <Time />;
      case Page.Jornada: return <Jornada onNavigate={handleNavigate} />;
      default: return <Missoes onNavigate={handleNavigate} />;
    }
  };

  const SettingsModal: React.FC = () => (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
        <div className="bg-white dark:bg-loco-gray w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-fade-in-up overflow-y-auto max-h-[90vh] no-scrollbar">
            <button onClick={() => setIsSettingsOpen(false)} className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-loco-gray-light">
                <CloseIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Configurações</h2>
            
            <div className="space-y-8">
                {/* 1. Tema Claro/Escuro */}
                <div>
                    <h3 className="font-semibold mb-2 text-black dark:text-white">Modo de Exibição</h3>
                    <div className="flex space-x-2 rounded-lg bg-gray-200 dark:bg-loco-gray-light p-1">
                        {[
                            { value: Theme.Light, icon: SunIcon, label: 'Claro' },
                            { value: Theme.Dark, icon: MoonIcon, label: 'Escuro' },
                            { value: Theme.System, icon: DesktopIcon, label: 'Sistema' }
                        ].map(item => (
                            <button key={item.value} onClick={() => setTheme(item.value)} className={`w-full flex justify-center items-center space-x-2 p-2 rounded-md text-sm font-medium transition ${theme === item.value ? 'bg-white dark:bg-loco-black shadow' : 'hover:bg-white/50 dark:hover:bg-black/20'}`}>
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Cores do Time (Presets) */}
                <div>
                    <h3 className="font-semibold mb-3 text-black dark:text-white">Cores do Clube</h3>
                    <p className="text-xs text-gray-500 mb-3">Escolha seu clube de coração para personalizar o app.</p>
                    <div className="grid grid-cols-4 gap-3">
                        {TEAM_PRESETS.map((preset) => (
                            <button 
                                key={preset.name} 
                                onClick={() => applyPreset(preset)}
                                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition hover:bg-gray-100 dark:hover:bg-black/20 ${customPrimaryColor === preset.primaryColor ? 'border-black dark:border-white bg-gray-100 dark:bg-white/10' : 'border-transparent'}`}
                            >
                                <div 
                                    className="w-8 h-8 rounded-full border border-black/10 shadow-sm mb-1"
                                    style={{ backgroundColor: preset.primaryColor }}
                                />
                                <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 text-center leading-tight">{preset.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Personalização Avançada */}
                <div className="p-4 bg-gray-100 dark:bg-black/30 rounded-xl space-y-4">
                    <h3 className="font-bold text-sm text-black dark:text-white uppercase tracking-wider">Personalização Avançada</h3>
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2">Cor Principal</label>
                        <div className="flex items-center space-x-3">
                            <input 
                                type="color" 
                                value={customPrimaryColor}
                                onChange={(e) => applyPrimaryColor(e.target.value)}
                                className="h-10 w-14 rounded cursor-pointer border-0 bg-transparent p-0"
                            />
                            <span className="text-sm font-mono text-gray-600 dark:text-gray-300">{customPrimaryColor}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2">Plano de Fundo (URL)</label>
                        <div className="flex space-x-2">
                            <input 
                                type="text" 
                                value={customBgImage}
                                onChange={(e) => applyBgImage(e.target.value)}
                                placeholder="https://exemplo.com/imagem.jpg"
                                className="flex-1 bg-white dark:bg-loco-black border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-xs outline-none focus:border-loco-red text-black dark:text-white"
                            />
                            {customBgImage && (
                                <button 
                                    onClick={() => applyBgImage('')}
                                    className="text-xs bg-red-500/20 text-red-500 px-3 rounded-lg font-bold hover:bg-red-500/30"
                                >
                                    X
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                 <button 
                    onClick={() => {
                        localStorage.removeItem('hudl_remember');
                        setIsAuthenticated(false);
                        setIsSettingsOpen(false);
                    }}
                    className="w-full mt-6 bg-gray-200 dark:bg-gray-800 text-red-500 font-bold py-3 rounded-xl hover:bg-red-500 hover:text-white transition"
                 >
                    Sair da Conta
                 </button>
            </div>
        </div>
    </div>
  );

  if (!isAuthenticated) {
      return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${theme === 'dark' ? 'dark' : ''} transition-colors duration-300`}>
      <Header 
        activePage={activePage} 
        onSettingsClick={() => setIsSettingsOpen(true)}
        onMenuClick={() => setIsSidebarOpen(true)} 
        onAiClick={() => setIsAiOpen(true)}
        onMessagesClick={() => setActivePage(Page.Mensagens)}
        onSearchClick={() => setActivePage(Page.Pesquisar)}
        onGymRatsClick={() => setActivePage(Page.GymRats)}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
            activePage={activePage} 
            onNavigate={handleNavigate} 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)}
            onSettingsClick={() => setIsSettingsOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-loco-black p-4 relative w-full" id="main-content">
          <div className="max-w-7xl mx-auto pb-20 md:pb-0">
             {renderPage()}
          </div>
        </main>
      </div>

      <BottomNav activePage={activePage} onNavigate={handleNavigate} onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Dynamic Journey FAB - Gamified Entry */}
      <button
        onClick={() => {
          playUpliftingSound();
          setActivePage(Page.Jornada);
        }}
        className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-[#94E67C] to-teal-500 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-black focus:outline-none select-none"
        title="Ver Minha Jornada Gamificada"
      >
        <span className="text-2xl">👑</span>
        {/* Streak counter badge */}
        <span className="absolute -top-1 -right-1.5 bg-orange-600 border border-black text-white text-[9px] font-black rounded-full px-1.5 py-0.5 shadow flex items-center">
          🔥 {fabStreak}
        </span>
        {/* Level badge */}
        <span className="absolute -bottom-1 bg-black border border-teal-500/50 text-teal-400 text-[8px] font-extrabold rounded-full px-1.5 py-0.5 leading-none shadow">
          Lvl {fabLevel}
        </span>
      </button>

      {/* Fully Controlled Missions Hub */}
      <FloatingActionMenu 
        isOpen={isMissionsOpen} 
        onToggle={setIsMissionsOpen} 
      />
      
      <AIAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

      {isSettingsOpen && <SettingsModal />}
    </div>
  );
};

export default App;
