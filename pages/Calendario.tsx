
import React, { useState } from 'react';
import { CALENDAR_EVENTS_MOCK } from '../constants';
import { CalendarEvent, EventType } from '../types';
import { ListIcon, GridIcon, CloseIcon, DumbbellIcon } from '../components/icons';

const eventColors: Record<EventType, string> = {
  treino: 'bg-blue-500',
  jogo: 'bg-loco-red',
  teste: 'bg-yellow-500',
  fisio: 'bg-green-500',
  recovery: 'bg-purple-500',
  reuniao: 'bg-indigo-500',
};

const Calendario: React.FC = () => {
  // Inicializando em Fevereiro de 2026 (Mês 1 no JS Date) para coincidir com o início da temporada
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); 
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startOfMonth.getDay());
  
  const days = [];
  let day = startDate;
  
  while (days.length < 42) {
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }

  const handleDayClick = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const events = CALENDAR_EVENTS_MOCK.filter(e => e.date === dateString);
    setSelectedDayEvents(events);
  }

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + amount, 1));
    setSelectedDayEvents([]);
  }

  const openEventDetails = (event: CalendarEvent) => {
      setSelectedEvent(event);
  };

  return (
    <div className="space-y-6 pb-20 relative">
      <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black dark:text-white">Calendário</h1>
          <div className="flex bg-gray-200 dark:bg-loco-gray rounded-lg p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white dark:bg-loco-black shadow text-loco-red' : 'text-gray-500'}`}
              >
                  <GridIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white dark:bg-loco-black shadow text-loco-red' : 'text-gray-500'}`}
              >
                  <ListIcon className="w-5 h-5" />
              </button>
          </div>
      </div>

      {viewMode === 'grid' ? (
          <div className="bg-white dark:bg-loco-gray rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-loco-gray-light">&lt;</button>
              <h2 className="text-xl font-bold text-black dark:text-white">{currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</h2>
              <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-loco-gray-light">&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
              <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((d, i) => {
                const dateString = d.toISOString().split('T')[0];
                const eventsOnDay = CALENDAR_EVENTS_MOCK.filter(e => e.date === dateString);
                const isCurrentMonth = d.getMonth() === currentDate.getMonth();

                return (
                  <div key={i} className={`p-1 h-20 flex flex-col items-center cursor-pointer rounded-lg ${isCurrentMonth ? 'bg-gray-100 dark:bg-loco-gray-light' : 'bg-gray-50 dark:bg-loco-black'} hover:bg-loco-red/20`} onClick={() => handleDayClick(d)}>
                    <span className={`font-semibold ${isCurrentMonth ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>{d.getDate()}</span>
                    <div className="flex-grow overflow-y-auto w-full mt-1 space-y-0.5">
                      {eventsOnDay.map(event => (
                        <div 
                            key={event.title} 
                            title={event.title} 
                            onClick={(e) => { e.stopPropagation(); openEventDetails(event); }}
                            className={`w-full h-1.5 rounded-full ${eventColors[event.type]}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
      ) : (
          <div className="space-y-3">
             {CALENDAR_EVENTS_MOCK.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(event => (
                 <div 
                    key={event.title + event.date} 
                    onClick={() => openEventDetails(event)}
                    className="bg-white dark:bg-loco-gray p-4 rounded-xl flex items-center border-l-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-loco-gray-light transition" 
                    style={{ borderColor: eventColors[event.type].replace('bg-', 'text-') }}
                 > 
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4 ${eventColors[event.type]} flex-shrink-0`}>
                        {new Date(event.date).getDate()}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-black dark:text-white">{event.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(event.date).toLocaleDateString('pt-BR', { weekday: 'short' })} • {event.time}</p>
                        {event.programming && <span className="text-xs text-green-500 font-bold mt-1 block">Ver Treino Detalhado</span>}
                    </div>
                    <div className="text-gray-400">
                        →
                    </div>
                 </div>
             ))}
          </div>
      )}

      {/* Grid View Selected Day Details */}
      {selectedDayEvents.length > 0 && viewMode === 'grid' && (
        <div className="mt-6 animate-fade-in">
          <h3 className="font-bold text-lg mb-2 text-black dark:text-white">Eventos do Dia</h3>
          <div className="space-y-2">
            {selectedDayEvents.map(event => (
              <div 
                key={event.title} 
                onClick={() => openEventDetails(event)}
                className="p-3 bg-white dark:bg-loco-gray rounded-lg flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-loco-gray-light"
              >
                <div className={`w-3 h-3 rounded-full mr-3 ${eventColors[event.type]}`}></div>
                <div>
                  <p className="font-semibold text-black dark:text-white">{event.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Event Modal */}
      {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 p-4 md:p-6">
              <div className="bg-white dark:bg-loco-gray w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up max-h-[85vh] flex flex-col">
                  
                  {/* Header */}
                  <div className={`p-6 text-white flex justify-between items-start ${eventColors[selectedEvent.type]}`}>
                      <div>
                          <h2 className="text-2xl font-bold leading-tight">{selectedEvent.title}</h2>
                          <div className="flex items-center mt-2 opacity-90 text-sm">
                             <span>{new Date(selectedEvent.date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                             <span className="mx-2">•</span>
                             <span>{selectedEvent.time}</span>
                          </div>
                          {selectedEvent.location && <p className="text-sm mt-1 opacity-80">📍 {selectedEvent.location}</p>}
                      </div>
                      <button onClick={() => setSelectedEvent(null)} className="bg-white/20 rounded-full p-2 hover:bg-white/30 transition">
                          <CloseIcon className="w-5 h-5 text-white" />
                      </button>
                  </div>

                  {/* Body */}
                  <div className="p-6 overflow-y-auto flex-1">
                      {selectedEvent.programming ? (
                          <div className="space-y-6">
                              {selectedEvent.programming.map((block, idx) => (
                                  <div key={idx} className="border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                                      <h3 className="text-lg font-bold text-loco-red mb-3">{block.title}</h3>
                                      <div className="space-y-3">
                                          {block.exercises.map((ex, i) => (
                                              <div key={i} className="bg-gray-50 dark:bg-black/30 p-3 rounded-lg">
                                                  <div className="flex justify-between items-baseline">
                                                      <h4 className="font-bold text-black dark:text-white">{ex.name}</h4>
                                                      <span className="text-sm font-mono text-gray-500">{ex.sets} x {ex.reps}</span>
                                                  </div>
                                                  {ex.notes && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">{ex.notes}</p>}
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              ))}
                          </div>
                      ) : (
                          <div className="text-center py-10 text-gray-500">
                              <DumbbellIcon className="w-12 h-12 mx-auto mb-2 opacity-20" />
                              <p>Nenhum detalhe técnico registrado para este evento.</p>
                              <button className="mt-4 text-loco-red font-bold text-sm">Adicionar notas</button>
                          </div>
                      )}
                  </div>

                  {/* Footer Action */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black/20">
                      <button 
                        onClick={() => setSelectedEvent(null)}
                        className="w-full bg-loco-black dark:bg-white text-white dark:text-black font-bold py-3 rounded-xl transition hover:opacity-90"
                      >
                          Entendi
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Calendario;
