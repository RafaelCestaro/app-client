
import React, { useState, useMemo } from 'react';
import { ATHLETE_MOCK, STRENGTH_EVOLUTION_MOCK, DYNAMOMETRY_MOCK } from '../constants';
import { Tabs } from '../components/common/Tabs';
import { RadarChart } from '../components/common/RadarChart';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell, LineChart, Line, CartesianGrid, Legend, AreaChart, Area } from 'recharts';
import { ChartBarIcon as ChartIcon, DumbbellIcon as WeightIcon, HeartIcon as Heart, StarIcon as Star, TrophyIcon as Trophy, ActivityIcon } from 'lucide-react';

// Custom gauge component for ACWR
const ACWRGauge = ({ value }: { value: number }) => {
  const percentage = Math.min(Math.max((value / 2) * 100, 0), 100); // 2.0 is max scale
  
  let color = '#22c55e'; // Green
  let label = 'Zona Segura';
  if (value > 1.3 && value <= 1.5) { color = '#eab308'; label = 'Atenção'; } // Yellow
  if (value > 1.5) { color = '#ef4444'; label = 'Alto Risco'; } // Red
  if (value < 0.8) { color = '#3b82f6'; label = 'Destreinamento'; } // Blue

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      <div className="relative w-40 h-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-700 rounded-t-full"></div>
        <div 
            className="absolute top-0 left-0 w-full h-full rounded-t-full origin-bottom transition-transform duration-1000 ease-out"
            style={{ 
                background: `conic-gradient(from 180deg at 50% 100%, ${color} 0%, ${color} ${percentage * 1.8}deg, transparent ${percentage * 1.8}deg, transparent 180deg)`,
                transform: 'rotate(0deg)'
            }}
        ></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-gray-900 rounded-t-full flex items-end justify-center pb-2">
            <span className="text-3xl font-bold text-white">{value.toFixed(2)}</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-bold uppercase tracking-widest" style={{ color }}>{label}</p>
      <p className="text-[10px] text-gray-500 uppercase mt-1">Razão Aguda:Crônica</p>
    </div>
  );
};

const Desempenho: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Visão Geral');
  
  // 1RM Calculator State
  const [calcWeight, setCalcWeight] = useState<string>('100');
  const [calcReps, setCalcReps] = useState<string>('5');

  const TABS = ['Visão Geral', 'Força & Clínico', 'Combine & PRs', 'Biometria', 'Técnico'];
  const { prs, radarData, watchData, weeklyLoad } = ATHLETE_MOCK;

  const weeklyEvolutionData = [
    { week: 'S-4', load: 2500, readiness: 85 },
    { week: 'S-3', load: 2800, readiness: 70 },
    { week: 'S-2', load: 2650, readiness: 90 },
    { week: 'S-1', load: 2900, readiness: 65 },
    { week: 'Atual', load: weeklyLoad.accumulated, readiness: 80 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-gray-700 p-3 rounded-lg shadow-xl">
          <p className="text-gray-300 text-xs font-bold mb-1">{label}</p>
          <p className="text-loco-red font-bold text-sm">{payload[0].name}: {payload[0].value}</p>
          {payload[1] && <p className="text-blue-400 font-bold text-xs">{payload[1].name}: {payload[1].value}</p>}
        </div>
      );
    }
    return null;
  };

  // 1RM Calculation Logic (Epley Formula)
  const oneRepMax = useMemo(() => {
      const w = parseFloat(calcWeight);
      const r = parseFloat(calcReps);
      if (isNaN(w) || isNaN(r) || w <= 0 || r <= 0) return 0;
      if (r === 1) return w;
      return Math.round(w * (1 + r / 30));
  }, [calcWeight, calcReps]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Visão Geral':
        return (
          <div className="space-y-6 animate-fade-in">
            {/* Status Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ACWR Card */}
                <div className="bg-gray-900 rounded-2xl p-1 border border-gray-800 shadow-lg flex flex-col items-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 opacity-50"></div>
                    <div className="w-full p-3 border-b border-gray-800 flex justify-between items-center">
                        <h3 className="text-white font-bold text-sm flex items-center">
                            <ChartIcon className="w-4 h-4 mr-2 text-loco-red" /> 
                            Controle de Carga (ACWR)
                        </h3>
                        <span className="bg-gray-800 text-[10px] px-2 py-0.5 rounded text-gray-400">7 dias / 28 dias</span>
                    </div>
                    <ACWRGauge value={1.15} />
                </div>

                {/* Readiness / HRV Summary */}
                <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 shadow-lg flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-white font-bold text-sm flex items-center">
                                <Heart className="w-4 h-4 mr-2 text-green-500" />
                                Prontidão Física
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">Baseado em HRV e Sono</p>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-bold text-green-500">92%</span>
                            <span className="block text-[10px] text-green-600 font-bold uppercase">Alta Performance</span>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">HRV (VFC)</span>
                            <span className="text-white font-mono">{watchData.hrv} ms <span className="text-green-500 text-xs">▲</span></span>
                        </div>
                        <div className="w-full bg-gray-800 h-1.5 rounded-full">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Sono</span>
                            <span className="text-white font-mono">7h 45m <span className="text-gray-500 text-xs">-</span></span>
                        </div>
                        <div className="w-full bg-gray-800 h-1.5 rounded-full">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overall Performance Radar */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg">
                <h3 className="font-bold text-lg text-white mb-4 text-center">Performance Overall</h3>
                <div className="h-[350px]">
                    <RadarChart data={radarData} />
                </div>
                <div className="flex justify-center space-x-6 mt-4 text-xs font-bold">
                    <div className="flex items-center"><div className="w-2 h-2 bg-loco-red mr-2 rounded-full"></div> Raphael</div>
                    <div className="flex items-center"><div className="w-2 h-2 bg-[#8884d8] mr-2 rounded-full"></div> Média Liga</div>
                </div>
            </div>

            {/* Load Chart */}
            <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 shadow-lg">
              <div className="flex justify-between items-end mb-6">
                  <div>
                    <h3 className="font-bold text-lg text-white">Evolução de Carga</h3>
                    <p className="text-xs text-gray-500">Últimas 5 semanas (AU)</p>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                      <div className="flex items-center"><div className="w-2 h-2 bg-loco-red rounded-full mr-1"></div> Carga</div>
                      <div className="flex items-center"><div className="w-2 h-2 bg-gray-500 rounded-full mr-1"></div> Meta</div>
                  </div>
              </div>
              
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyEvolutionData} barSize={32}>
                    <defs>
                        <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#009E60" stopOpacity={1}/>
                        <stop offset="95%" stopColor="#004d2e" stopOpacity={0.8}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="week" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                    <ReferenceLine y={3000} stroke="#6b7280" strokeDasharray="3 3" label={{ value: 'Meta', position: 'right', fill: '#6b7280', fontSize: 10 }} />
                    <Bar dataKey="load" fill="url(#colorLoad)" radius={[4, 4, 0, 0]}>
                        {weeklyEvolutionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fillOpacity={index === 4 ? 1 : 0.6} />
                        ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'Força & Clínico':
        return (
          <div className="space-y-6 animate-fade-in">
            
            {/* 1RM Calculator */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-loco-red/10 p-2 rounded-lg">
                         <WeightIcon className="w-6 h-6 text-loco-red" />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-white">Calculadora 1RM</h3>
                        <p className="text-xs text-gray-500">Estime sua repetição máxima baseada em seu treino.</p>
                    </div>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Carga Levantada (KG)</label>
                        <input 
                            type="number" 
                            value={calcWeight}
                            onChange={(e) => setCalcWeight(e.target.value)}
                            className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-loco-red transition"
                            placeholder="Ex: 100"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Repetições</label>
                        <input 
                            type="number" 
                            value={calcReps}
                            onChange={(e) => setCalcReps(e.target.value)}
                            className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-loco-red transition"
                            placeholder="Ex: 5"
                        />
                    </div>
                </div>

                {/* Result Hero */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 text-center border border-gray-700 mb-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Seu 1RM Estimado</p>
                    <p className="text-4xl font-black text-white mt-1">{oneRepMax} <span className="text-lg text-loco-red">kg</span></p>
                </div>

                {/* Data Tables */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Percentages Table */}
                    <div>
                         <h4 className="font-bold text-white text-sm mb-3 border-b border-gray-800 pb-2">Percentuais de Carga (1RM)</h4>
                         <div className="space-y-1">
                             {[100, 95, 90, 85, 80, 75, 70, 65, 60, 50].map(pct => (
                                 <div key={pct} className={`flex justify-between items-center p-2 rounded ${pct === 100 ? 'bg-loco-red/10 border border-loco-red/30' : 'hover:bg-gray-800'}`}>
                                     <span className={`text-sm font-bold ${pct >= 90 ? 'text-loco-red' : 'text-gray-400'}`}>{pct}%</span>
                                     <span className="text-sm font-mono text-white">{Math.round(oneRepMax * (pct/100))} kg</span>
                                 </div>
                             ))}
                         </div>
                    </div>

                    {/* Rep Max Table */}
                    <div>
                         <h4 className="font-bold text-white text-sm mb-3 border-b border-gray-800 pb-2">Repetições Máximas (Estimado)</h4>
                         <div className="space-y-1">
                             {[
                                 { reps: 1, pct: 100 },
                                 { reps: 2, pct: 97 },
                                 { reps: 3, pct: 94 },
                                 { reps: 4, pct: 92 },
                                 { reps: 5, pct: 89 },
                                 { reps: 6, pct: 86 },
                                 { reps: 8, pct: 81 },
                                 { reps: 10, pct: 75 },
                                 { reps: 12, pct: 71 },
                                 { reps: 15, pct: 67 },
                             ].map((row) => (
                                 <div key={row.reps} className={`flex justify-between items-center p-2 rounded hover:bg-gray-800 ${row.reps === parseInt(calcReps) ? 'bg-white/5' : ''}`}>
                                     <span className="text-sm font-bold text-gray-400">{row.reps} Reps</span>
                                     <span className="text-sm font-mono text-white">{Math.round(oneRepMax * (row.pct/100))} kg</span>
                                 </div>
                             ))}
                         </div>
                    </div>
                </div>
            </div>

            {/* Strength Evolution Chart */}
            <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 shadow-lg">
                <div className="mb-4">
                    <h3 className="font-bold text-lg text-white">Evolução de Força (1RM)</h3>
                    <p className="text-xs text-gray-500">Progresso estimado nos principais levantamentos</p>
                </div>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={STRENGTH_EVOLUTION_MOCK}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                            <Line type="monotone" dataKey="agachamento" name="Agachamento" stroke="#009E60" strokeWidth={3} dot={{r: 4, fill: '#009E60'}} activeDot={{r: 6}} />
                            <Line type="monotone" dataKey="terra" name="Lev. Terra" stroke="#2563EB" strokeWidth={3} dot={{r: 4, fill: '#2563EB'}} />
                            <Line type="monotone" dataKey="supino" name="Supino" stroke="#F59E0B" strokeWidth={3} dot={{r: 4, fill: '#F59E0B'}} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Insight Box */}
                <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-xl p-3 flex items-center">
                    <div className="bg-green-500 p-1.5 rounded-full mr-3">
                        <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <p className="text-xs text-green-400 font-bold uppercase">Evolução Notável</p>
                        <p className="text-sm text-gray-300">Seu 1RM no <span className="text-white font-bold">Agachamento</span> subiu 12% nos últimos 3 meses.</p>
                    </div>
                </div>
            </div>

            {/* Dynamometry / Clinical Data */}
            <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 shadow-lg">
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-lg text-white">Dinamometria (Isocinética)</h3>
                        <p className="text-xs text-gray-500">Pico de Torque - Extensão de Joelho (60°/s)</p>
                    </div>
                    <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-1 rounded uppercase">Clínico</span>
                </div>
                
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={DYNAMOMETRY_MOCK}>
                            <defs>
                                <linearGradient id="colorLeft" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorRight" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 20', 'dataMax + 20']} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                            <Area type="monotone" dataKey="ext_E" name="Esq (Nm)" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLeft)" />
                            <Area type="monotone" dataKey="ext_D" name="Dir (Nm)" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRight)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Symmetry Status */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-black/40 p-3 rounded-xl text-center">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Último LSI</p>
                        <p className="text-lg font-bold text-white">98%</p>
                    </div>
                    <div className="bg-black/40 p-3 rounded-xl text-center">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Deficit</p>
                        <p className="text-lg font-bold text-green-500">2%</p>
                    </div>
                    <div className="bg-black/40 p-3 rounded-xl text-center">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Status</p>
                        <p className="text-sm font-bold text-green-500 mt-1">Simétrico</p>
                    </div>
                </div>
            </div>

          </div>
        );

      case 'Biometria':
        return (
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
                <div className="col-span-2 bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-800 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Status Fisiológico</p>
                        <h3 className="text-2xl font-bold text-white mt-1">Recuperado</h3>
                        <p className="text-green-500 text-sm mt-1">Pronto para alta intensidade</p>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-black/30">
                        <Heart className="w-8 h-8 text-green-500" />
                    </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-xs">FC Repouso</span>
                        <Heart className="w-4 h-4 text-red-500" />
                    </div>
                    <p className="text-2xl font-bold text-white">{watchData.restingHeartRate} <span className="text-sm text-gray-500">bpm</span></p>
                    <div className="mt-2 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 w-1/3"></div>
                    </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-xs">HRV</span>
                        <ActivityIcon className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold text-white">{watchData.hrv} <span className="text-sm text-gray-500">ms</span></p>
                    <div className="mt-2 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-3/4"></div>
                    </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-xs">Passos</span>
                        <span className="text-orange-500 text-xs">👟</span>
                    </div>
                    <p className="text-xl font-bold text-white">{watchData.steps.toLocaleString('pt-BR')}</p>
                </div>

                <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-xs">Calorias</span>
                        <span className="text-red-500 text-xs">🔥</span>
                    </div>
                    <p className="text-xl font-bold text-white">{watchData.calories}</p>
                </div>
            </div>
        );

      case 'Combine & PRs':
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">Recordes Pessoais</h3>
                <button className="text-xs text-loco-red font-bold bg-loco-red/10 px-3 py-1 rounded-full">Novo Teste</button>
            </div>
            
            {prs.map((pr, idx) => (
                <div key={idx} className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex justify-between items-center group hover:border-gray-600 transition">
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${pr.metric.includes('jardas') || pr.metric.includes('Corrida') ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-500'}`}>
                            {pr.metric.includes('jardas') ? <Star className="w-5 h-5" /> : <WeightIcon className="w-5 h-5" />}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white group-hover:text-loco-red transition">{pr.metric}</p>
                            <p className="text-[10px] text-gray-500">{pr.date}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-white">{pr.value} <span className="text-xs text-gray-500">{pr.unit}</span></p>
                        {/* Mock Trend */}
                        <p className="text-[10px] text-green-500 font-bold">▲ Recorde</p>
                    </div>
                </div>
            ))}
          </div>
        );

      case 'Técnico':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg">
                <h3 className="font-bold text-lg text-white mb-4 text-center">Perfil do Atleta (Scout)</h3>
                <div className="h-[350px]">
                    <RadarChart data={radarData} />
                </div>
                <div className="flex justify-center space-x-6 mt-4 text-xs font-bold">
                    <div className="flex items-center"><div className="w-2 h-2 bg-loco-red mr-2 rounded-full"></div> Raphael</div>
                    <div className="flex items-center"><div className="w-2 h-2 bg-[#8884d8] mr-2 rounded-full"></div> Média Liga</div>
                </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-900 to-loco-black border border-gray-800 rounded-xl p-4">
                <h4 className="text-white font-bold mb-2 text-sm">Feedback do Coach</h4>
                <p className="text-gray-400 text-xs italic leading-relaxed">
                    "Excelente visão de jogo e agilidade lateral. Precisa focar um pouco mais no bloqueio de passe para se tornar um RB de 3 descidas completo."
                </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-end">
          <h1 className="text-3xl font-bold text-black dark:text-white tracking-tight">Performance</h1>
          <span className="text-xs font-mono text-gray-500 mb-1">v2.4 Pro</span>
      </div>
      
      <Tabs tabs={TABS} activeTab={activeTab} onTabClick={setActiveTab} />
      
      <div className="mt-4 min-h-[400px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default Desempenho;
