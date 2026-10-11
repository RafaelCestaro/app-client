
import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { CheckCircleSolidIcon, LockIcon, CalendarIcon, DumbbellIcon, TargetIcon, ChevronRightIcon } from '../components/icons';

const Programas: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ATUAL' | 'HISTORICO'>('ATUAL');

  // Mock de Dados do Programa
  const currentProgram = {
    title: "Off-season: Hipertrofia & Potência",
    coach: "Coach Dave",
    duration: "12 Semanas",
    currentWeek: 4,
    progress: 35,
    weeks: [
      { id: 1, title: "Semana 1: Adaptação", status: "completed" },
      { id: 2, title: "Semana 2: Base de Força", status: "completed" },
      { id: 3, title: "Semana 3: Volume Alto", status: "completed" },
      { id: 4, title: "Semana 4: Deload & Técnica", status: "current", days: [
          { day: 'Seg', focus: 'Lower Body', status: 'done' },
          { day: 'Ter', focus: 'Upper Body + Core', status: 'done' },
          { day: 'Qua', focus: 'Mobilidade / Recovery', status: 'pending' },
          { day: 'Qui', focus: 'Full Body Explosão', status: 'locked' },
          { day: 'Sex', focus: 'Sprints & Agilidade', status: 'locked' },
      ]},
      { id: 5, title: "Semana 5: Intensificação I", status: "locked" },
      { id: 6, title: "Semana 6: Intensificação II", status: "locked" },
    ]
  };

  const pastWorkouts = [
    { date: "20/07", title: "Agachamento Pesado", load: "3200kg Vol", pr: true },
    { date: "18/07", title: "Supino & Ombros", load: "2100kg Vol", pr: false },
    { date: "16/07", title: "Levantamento Terra", load: "2800kg Vol", pr: false },
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-black dark:text-white">Meus Programas</h1>
            <p className="text-gray-500 text-sm">Siga o plano. Confie no processo.</p>
        </div>
        <div className="bg-loco-red/10 p-2 rounded-lg">
            <TargetIcon className="w-6 h-6 text-loco-red" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-800">
          <button 
            onClick={() => setActiveTab('ATUAL')}
            className={`pb-3 text-sm font-bold uppercase tracking-wider border-b-2 transition ${activeTab === 'ATUAL' ? 'border-loco-red text-loco-red' : 'border-transparent text-gray-500'}`}
          >
              Programa Atual
          </button>
          <button 
            onClick={() => setActiveTab('HISTORICO')}
            className={`pb-3 text-sm font-bold uppercase tracking-wider border-b-2 transition ${activeTab === 'HISTORICO' ? 'border-loco-red text-loco-red' : 'border-transparent text-gray-500'}`}
          >
              Histórico (Logbook)
          </button>
      </div>

      {activeTab === 'ATUAL' && (
          <div className="space-y-6 animate-fade-in">
              {/* Program Overview Card */}
              <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 border border-gray-800 relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-loco-red/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                  
                  <div className="relative z-10">
                      <span className="text-xs font-bold text-loco-red uppercase tracking-widest mb-1 block">Fase Atual</span>
                      <h2 className="text-2xl font-bold text-white mb-2">{currentProgram.title}</h2>
                      <div className="flex items-center text-gray-400 text-xs mb-4 space-x-3">
                          <span className="flex items-center"><DumbbellIcon className="w-3 h-3 mr-1" /> {currentProgram.coach}</span>
                          <span className="flex items-center"><CalendarIcon className="w-3 h-3 mr-1" /> {currentProgram.duration}</span>
                      </div>

                      {/* Progress Bar */}
                      <div>
                          <div className="flex justify-between text-xs font-bold text-white mb-1">
                              <span>Progresso Total</span>
                              <span>{currentProgram.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div className="h-full bg-loco-red w-[35%] rounded-full"></div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Timeline View */}
              <div className="space-y-4">
                  <h3 className="text-lg font-bold text-black dark:text-white">Linha do Tempo</h3>
                  
                  <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-3 space-y-8 pl-6 py-2">
                      {currentProgram.weeks.map((week) => (
                          <div key={week.id} className="relative">
                              {/* Timeline Dot */}
                              <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 ${
                                  week.status === 'completed' ? 'bg-green-500 border-green-500' :
                                  week.status === 'current' ? 'bg-white border-loco-red animate-pulse' :
                                  'bg-gray-800 border-gray-600'
                              }`}></div>

                              {/* Week Content */}
                              <div className={`${week.status === 'current' ? 'opacity-100' : 'opacity-60'}`}>
                                  <div className="flex justify-between items-center mb-2">
                                      <h4 className={`font-bold ${week.status === 'current' ? 'text-loco-red text-lg' : 'text-gray-500 dark:text-gray-400'}`}>
                                          {week.title}
                                      </h4>
                                      {week.status === 'completed' && <CheckCircleSolidIcon className="w-5 h-5 text-green-500" />}
                                      {week.status === 'locked' && <LockIcon className="w-4 h-4 text-gray-600" />}
                                  </div>

                                  {/* Days Grid (Only for Current Week) */}
                                  {week.status === 'current' && week.days && (
                                      <div className="grid grid-cols-1 gap-2 mt-3">
                                          {week.days.map((day, idx) => (
                                              <div key={idx} className="bg-white dark:bg-loco-gray p-3 rounded-lg border border-gray-100 dark:border-gray-700 flex justify-between items-center shadow-sm">
                                                  <div className="flex items-center">
                                                      <span className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-black rounded-lg text-xs font-bold text-gray-500 mr-3">
                                                          {day.day}
                                                      </span>
                                                      <span className="text-sm font-semibold text-black dark:text-white">{day.focus}</span>
                                                  </div>
                                                  
                                                  {day.status === 'done' ? (
                                                      <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">Feito</span>
                                                  ) : day.status === 'pending' ? (
                                                      <button className="text-xs font-bold text-white bg-loco-red px-3 py-1.5 rounded hover:bg-red-700 transition">
                                                          Iniciar
                                                      </button>
                                                  ) : (
                                                      <LockIcon className="w-4 h-4 text-gray-600" />
                                                  )}
                                              </div>
                                          ))}
                                      </div>
                                  )}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      )}

      {activeTab === 'HISTORICO' && (
          <div className="space-y-4 animate-fade-in">
              {pastWorkouts.map((log, idx) => (
                  <Card key={idx} className="flex justify-between items-center">
                      <div>
                          <p className="text-xs text-gray-500 font-bold mb-1">{log.date}</p>
                          <h4 className="font-bold text-black dark:text-white">{log.title}</h4>
                          <p className="text-sm text-gray-500">{log.load}</p>
                      </div>
                      <div className="text-right">
                          {log.pr && (
                              <span className="text-[10px] bg-yellow-500/20 text-yellow-500 font-bold px-2 py-1 rounded mb-2 inline-block">🏆 PR Batido</span>
                          )}
                          <div className="text-gray-400">
                              <ChevronRightIcon className="w-5 h-5" />
                          </div>
                      </div>
                  </Card>
              ))}
              <p className="text-center text-gray-500 text-xs mt-4">Mostrando os últimos 30 dias.</p>
          </div>
      )}
    </div>
  );
};

export default Programas;
