
import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { PLANNED_WORKOUTS_MOCK, GYM_PARTNERS_MOCK } from '../../constants';
import { CheckCircleIcon, CloseIcon, MapPinIcon, CameraIcon, ChartBarIcon, ChevronDownIcon } from '../icons';
import { WorkoutExercise } from '../../types';

interface WorkoutLoggerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImportIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
);

export const WorkoutLoggerModal: React.FC<WorkoutLoggerModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [rpe, setRpe] = useState(5);
  const [duration, setDuration] = useState(60);
  const [selectedGym, setSelectedGym] = useState<string | null>(null);
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([]);
  
  // Detailed Exercise State
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);

  // 1RM Calculator State
  const [activeCalcId, setActiveCalcId] = useState<string | null>(null);
  const [base1RM, setBase1RM] = useState<number>(100); // Default placeholder

  // Reset state when modal opens
  useEffect(() => {
      if (isOpen) {
          setStep(1);
          setSelectedWorkout(null);
          setExercises([]);
          setRpe(5);
          setDuration(60);
          setSelectedGym(null);
          setActiveCalcId(null);
      }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectWorkout = (workout: any) => {
      setSelectedWorkout(workout);
      
      // If workout has detailed blocks (simulating imported spreadsheet), populate state and go to detail step
      if (workout.blocks && workout.blocks.length > 0) {
          const allExercises: WorkoutExercise[] = [];
          workout.blocks.forEach((block: any) => {
              block.exercises.forEach((ex: any) => {
                  const repsString = ex.reps.toString();
                  const targetReps = parseInt(repsString.split('-').pop() || '0');

                  allExercises.push({ 
                      ...ex, 
                      load: ex.suggestedLoad || 0,
                      actualReps: targetReps,
                      rir: undefined,
                      feedback: undefined
                  });
              });
          });
          setExercises(allExercises);
          setStep(2); // Detailed Logging Step
      } else {
          setStep(3); // Skip to RPE/Duration
      }
  };

  const handleSaveDetailed = () => {
      setStep(3); // Go to RPE/Duration summary
  };

  const handleFinish = () => {
      if (selectedWorkout) {
          setCompletedWorkouts(prev => [...prev, selectedWorkout.id]);
      }
      setStep(4); // Success
  };

  const handleRegisterAnother = () => {
      // Reset states but keep modal open
      setStep(1);
      setSelectedWorkout(null);
      setExercises([]);
      setRpe(5);
      setDuration(60);
      setSelectedGym(null);
  };

  const updateExerciseLoad = (id: string, newLoad: number) => {
      setExercises(prev => prev.map(ex => ex.id === id ? { ...ex, load: newLoad } : ex));
  };

  const toggleVideoUpload = (id: string) => {
      setExercises(prev => prev.map(ex => ex.id === id ? { ...ex, videoUrl: ex.videoUrl ? undefined : 'uploaded' } : ex));
  };

  const updateRIR = (id: string, rirValue: number) => {
      setExercises(prev => prev.map(ex => {
          if (ex.id !== id) return ex;

          const targetReps = parseInt(ex.reps.toString().split('-')[0]) || 0;
          const actualReps = ex.actualReps || targetReps;
          let feedback = '';
          
          if (rirValue >= 3) {
              feedback = `↑ Aumentar Carga (+${Math.round((ex.load || 0) * 0.05)}kg)`;
          } else if (rirValue <= 1 && actualReps < targetReps) {
              feedback = `↓ Diminuir Carga (-${Math.round((ex.load || 0) * 0.05)}kg)`;
          } else if (rirValue === 0) {
              feedback = '↔ Manter Carga (Foco na Técnica)';
          } else {
              feedback = '✔ Carga Ideal (Manter)';
          }

          return { ...ex, rir: rirValue, feedback };
      }));
  };

  const updateActualReps = (id: string, reps: number) => {
      setExercises(prev => prev.map(ex => ex.id === id ? { ...ex, actualReps: reps } : ex));
  };

  const getRpeColor = (val: number) => {
      if (val <= 3) return 'bg-blue-500 border-blue-500 text-white';
      if (val <= 6) return 'bg-green-500 border-green-500 text-white';
      if (val <= 8) return 'bg-yellow-500 border-yellow-500 text-black';
      return 'bg-red-500 border-red-500 text-white';
  };

  // 1RM Logic
  const toggleCalculator = (ex: WorkoutExercise) => {
      if (activeCalcId === ex.id) {
          setActiveCalcId(null);
      } else {
          setActiveCalcId(ex.id);
          // Try to set a reasonable base 1RM. 
          // If load exists, assume it's around 75% of max to start, or use load directly
          const estimatedBase = ex.load ? Math.round(ex.load / 0.75) : 100;
          setBase1RM(estimatedBase);
      }
  };

  const applyPercentage = (pct: number) => {
      if (activeCalcId) {
          const newLoad = Math.round(base1RM * (pct / 100));
          updateExerciseLoad(activeCalcId, newLoad);
      }
  };

  const calculateEst1RM = (weight: number, reps: number) => {
      if (!weight || !reps) return 0;
      if (reps === 1) return weight;
      return Math.round(weight * (1 + reps / 30));
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-loco-gray w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="bg-loco-black p-4 flex justify-between items-center border-b border-gray-800 sticky top-0 z-10">
          <h2 className="text-white font-bold text-lg">
            {step === 1 ? 'Registrar Atividade' : step === 2 ? 'Detalhes do Treino' : step === 3 ? 'Resumo da Sessão' : 'Sucesso!'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          
          {/* Step 1: Select Workout */}
          {step === 1 && (
            <div className="space-y-6">
              <button 
                onClick={() => {
                    const gymWorkout = PLANNED_WORKOUTS_MOCK.find(w => w.type === 'Força');
                    if (gymWorkout) handleSelectWorkout(gymWorkout);
                }}
                className="w-full bg-blue-600/10 border border-blue-500/30 p-4 rounded-xl flex items-center justify-center space-x-3 hover:bg-blue-600/20 transition mb-4 group"
              >
                  <ImportIcon className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-blue-500">Importar Planilha do Coach</span>
              </button>

              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-300 font-bold text-sm uppercase tracking-wide">Treinos Planejados</p>
                {PLANNED_WORKOUTS_MOCK.map(workout => {
                  const isDone = completedWorkouts.includes(workout.id);
                  return (
                    <div 
                        key={workout.id}
                        onClick={() => handleSelectWorkout(workout)}
                        className={`
                            p-4 rounded-xl cursor-pointer border transition relative overflow-hidden
                            ${isDone ? 'bg-green-500/10 border-green-500/50' : 'bg-gray-100 dark:bg-black/40 border-transparent hover:border-loco-red'}
                        `}
                    >
                        {isDone && (
                            <div className="absolute top-2 right-2 text-green-500">
                                <CheckCircleIcon className="w-5 h-5" />
                            </div>
                        )}
                        <div className="flex justify-between items-center">
                        <h3 className={`font-bold ${isDone ? 'text-green-500' : 'text-black dark:text-white'}`}>{workout.title}</h3>
                        <span className="text-xs bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded text-black dark:text-white">{workout.type}</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{workout.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Athlete Pass */}
              <div>
                  <div className="flex items-center justify-between mb-3">
                      <p className="text-gray-600 dark:text-gray-300 font-bold text-sm uppercase tracking-wide flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-1 text-loco-red" />
                          Parceiros Próximos
                      </p>
                      <span className="text-[10px] bg-loco-red text-white px-2 py-0.5 rounded-full font-bold">Pass</span>
                  </div>
                  
                  <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
                      {GYM_PARTNERS_MOCK.map(gym => (
                          <div 
                            key={gym.id} 
                            onClick={() => setSelectedGym(gym.id)}
                            className={`
                                min-w-[160px] bg-gray-100 dark:bg-black/40 rounded-xl overflow-hidden border cursor-pointer transition-all
                                ${selectedGym === gym.id ? 'border-loco-red ring-1 ring-loco-red' : 'border-transparent hover:border-gray-500'}
                            `}
                          >
                              <div className="h-24 relative">
                                  <img src={gym.image} alt={gym.name} className="w-full h-full object-cover" />
                                  <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                      {gym.plan}
                                  </div>
                              </div>
                              <div className="p-2">
                                  <h4 className="font-bold text-xs text-black dark:text-white truncate">{gym.name}</h4>
                                  <div className="flex justify-between items-center mt-1">
                                      <span className="text-[10px] text-gray-500">{gym.distance}</span>
                                      <span className="text-[10px] text-yellow-500 font-bold">★ {gym.rating}</span>
                                  </div>
                                  {selectedGym === gym.id ? (
                                      <div className="mt-2 bg-green-500 text-white text-[10px] font-bold text-center py-1.5 rounded flex items-center justify-center">
                                          <CheckCircleIcon className="w-3 h-3 mr-1" /> Check-in
                                      </div>
                                  ) : (
                                      <div className="mt-2 bg-loco-red text-white text-[10px] font-bold text-center py-1.5 rounded opacity-0 group-hover:opacity-100 transition">
                                          Fazer Check-in
                                      </div>
                                  )}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && selectedWorkout && (
              <div className="space-y-6">
                  {selectedWorkout.blocks.map((block: any, bIdx: number) => (
                      <div key={bIdx} className="space-y-3">
                          <h3 className="font-bold text-loco-red uppercase text-sm border-b border-gray-800 pb-1">{block.title}</h3>
                          {block.exercises.map((ex: any) => {
                              const currentEx = exercises.find(e => e.id === ex.id) || ex;
                              const estimatedCurrent1RM = calculateEst1RM(currentEx.load || 0, currentEx.actualReps || 0);
                              
                              return (
                                <div key={ex.id} className="bg-gray-100 dark:bg-black/30 p-3 rounded-xl border border-transparent hover:border-gray-600 transition">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-black dark:text-white text-sm">{ex.name}</h4>
                                            <p className="text-xs text-gray-500">{ex.sets} séries x {ex.reps}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            {/* Calculator Toggle */}
                                            <button 
                                                onClick={() => toggleCalculator(ex)}
                                                className={`p-2 rounded-full transition ${activeCalcId === ex.id ? 'bg-loco-red text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}
                                            >
                                                <ChartBarIcon className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => toggleVideoUpload(ex.id)}
                                                className={`p-2 rounded-full transition ${currentEx.videoUrl ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}
                                            >
                                                <CameraIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {ex.coachNotes && (
                                        <div className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 text-[10px] p-1.5 rounded mb-3 font-medium">
                                            Obs: {ex.coachNotes}
                                        </div>
                                    )}

                                    {/* --- 1RM CALCULATOR PANEL (Collapsible) --- */}
                                    {activeCalcId === ex.id && (
                                        <div className="bg-gray-800/50 rounded-lg p-3 mb-4 border border-gray-600 animate-fade-in">
                                            <div className="flex justify-between items-center mb-3">
                                                <label className="text-[10px] uppercase font-bold text-gray-400">Definir 1RM Base (kg)</label>
                                                <input 
                                                    type="number"
                                                    value={base1RM}
                                                    onChange={(e) => setBase1RM(Number(e.target.value))}
                                                    className="w-20 bg-black border border-gray-600 rounded px-2 py-1 text-sm font-bold text-white text-right focus:border-loco-red outline-none"
                                                />
                                            </div>
                                            <div className="grid grid-cols-5 gap-1 mb-2">
                                                {[50, 60, 70, 80, 90].map(pct => (
                                                    <button
                                                        key={pct}
                                                        onClick={() => applyPercentage(pct)}
                                                        className={`py-1.5 rounded text-[10px] font-bold transition text-white hover:opacity-80
                                                            ${pct >= 90 ? 'bg-red-600' : pct >= 70 ? 'bg-yellow-600' : 'bg-green-600'}
                                                        `}
                                                    >
                                                        {pct}%
                                                    </button>
                                                ))}
                                            </div>
                                            <p className="text-[10px] text-gray-400 text-center italic">Clique para aplicar carga</p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div>
                                            <label className="text-[10px] text-gray-500 uppercase font-bold flex justify-between">
                                                Carga (kg)
                                                {/* Percentage Feedback */}
                                                {base1RM > 0 && activeCalcId === ex.id && currentEx.load > 0 && (
                                                    <span className="text-loco-red">{Math.round((currentEx.load / base1RM) * 100)}%</span>
                                                )}
                                            </label>
                                            <div className="relative">
                                                <input 
                                                    type="number" 
                                                    value={currentEx.load}
                                                    onChange={(e) => updateExerciseLoad(ex.id, Number(e.target.value))}
                                                    className="w-full bg-white dark:bg-loco-black border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm font-bold text-black dark:text-white outline-none focus:border-loco-red"
                                                />
                                                {ex.suggestedLoad && (
                                                    <span className="absolute right-2 top-1.5 text-[9px] text-green-500 font-bold">IA: {ex.suggestedLoad}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-gray-500 uppercase font-bold flex justify-between">
                                                Reps
                                                {/* Live Est 1RM Feedback */}
                                                {estimatedCurrent1RM > 0 && (
                                                    <span className="text-blue-400">Est. 1RM: {estimatedCurrent1RM}</span>
                                                )}
                                            </label>
                                            <input 
                                                type="number" 
                                                value={currentEx.actualReps}
                                                onChange={(e) => updateActualReps(ex.id, Number(e.target.value))}
                                                className="w-full bg-white dark:bg-loco-black border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm font-bold text-black dark:text-white outline-none focus:border-loco-red"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Reps na Reserva (RIR)</label>
                                        <div className="flex space-x-1">
                                            {[0, 1, 2, 3, 5].map(rirVal => (
                                                <button
                                                    key={rirVal}
                                                    onClick={() => updateRIR(ex.id, rirVal)}
                                                    className={`
                                                        flex-1 py-1.5 rounded text-xs font-bold transition
                                                        ${currentEx.rir === rirVal 
                                                            ? 'bg-loco-red text-white' 
                                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}
                                                    `}
                                                >
                                                    {rirVal === 0 ? 'Falha' : rirVal === 5 ? '5+' : rirVal}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {currentEx.feedback && (
                                        <div className={`mt-3 p-2 rounded text-xs font-bold text-center border ${
                                            currentEx.feedback.includes('Aumentar') ? 'bg-green-500/10 text-green-500 border-green-500/30' :
                                            currentEx.feedback.includes('Diminuir') ? 'bg-red-500/10 text-red-500 border-red-500/30' :
                                            'bg-blue-500/10 text-blue-500 border-blue-500/30'
                                        }`}>
                                            {currentEx.feedback}
                                        </div>
                                    )}
                                </div>
                              );
                          })}
                      </div>
                  ))}
                  
                  <button onClick={handleSaveDetailed} className="w-full bg-loco-red hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition">
                    Salvar e Continuar
                  </button>
              </div>
          )}

          {/* Step 3: RPE Summary (Modified with 1-10 strip) */}
          {step === 3 && (
            <div className="space-y-6">
               <div>
                 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Duração Total (min)</label>
                 <div className="flex items-center space-x-4">
                    <input 
                      type="range" min="10" max="180" step="5" value={duration} 
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      className="w-full accent-loco-red"
                    />
                    <span className="text-xl font-bold text-black dark:text-white w-12 text-center">{duration}</span>
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 text-center">Percepção de Esforço (RPE)</label>
                 
                 <div className="flex justify-center mb-6">
                    <div className={`text-5xl font-bold ${rpe <= 3 ? 'text-blue-500' : rpe <= 6 ? 'text-green-500' : rpe <= 8 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {rpe}
                    </div>
                 </div>

                 {/* 1-10 Button Strip */}
                 <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                       <button 
                         key={val}
                         onClick={() => setRpe(val)}
                         className={`
                            py-3 rounded-lg font-bold transition text-sm border-2
                            ${rpe === val 
                                ? getRpeColor(val) 
                                : 'bg-gray-100 dark:bg-black/40 text-gray-600 dark:text-gray-300 border-transparent hover:border-gray-500'}
                         `}
                       >
                         {val}
                       </button>
                    ))}
                 </div>
                 
                 <div className="flex justify-between text-xs text-gray-500 mt-2 font-bold uppercase px-1">
                    <span>Leve</span>
                    <span>Moderado</span>
                    <span>Exaustivo</span>
                 </div>
               </div>

               <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Carga da Sessão (AU)</p>
                  <p className="text-3xl font-bold text-loco-red">{duration * rpe}</p>
                  {selectedGym && (
                      <p className="text-xs text-green-500 mt-1 font-bold flex items-center justify-center">
                          <MapPinIcon className="w-3 h-3 mr-1" /> 
                          Local: {GYM_PARTNERS_MOCK.find(g => g.id === selectedGym)?.name}
                      </p>
                  )}
               </div>

               <button 
                 onClick={handleFinish}
                 className="w-full bg-loco-red hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition transform active:scale-95"
               >
                 Concluir Treino
               </button>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                 <CheckCircleIcon className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Treino Registrado!</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Você ganhou <span className="text-orange-500 font-bold">+500 XP</span>.</p>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition">
                   Compartilhar no GymRats
                </button>
                <button 
                    onClick={handleRegisterAnother}
                    className="w-full bg-loco-red hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-md transition"
                >
                   Registrar Outro Treino
                </button>
                <button onClick={onClose} className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold py-3 rounded-xl transition">
                   Fechar
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
