
import React, { useState } from 'react';
import { CloseIcon, CheckCircleIcon, MapPinIcon, CalendarIcon, CheckCircleSolidIcon, SparklesIcon } from '../icons';
import { RECOVERY_PROTOCOLS_MOCK, PHYSIO_PARTNERS_MOCK } from '../../constants';
import { WellnessLog } from '../../types';

interface WellnessCheckinModalProps {
  isOpen: boolean;
  onClose: (success?: boolean) => void;
}

export const WellnessCheckinModal: React.FC<WellnessCheckinModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [score, setScore] = useState<number | null>(null);
  const [wellnessData, setWellnessData] = useState<Partial<WellnessLog>>({
    sleepQuality: 'Regular',
    soreness: 'Leve',
    stress: 'Médio',
    painLocation: []
  });
  const [appointmentScheduled, setAppointmentScheduled] = useState(false);

  // New State for AI Feedback
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleScoreSubmit = () => {
    if (score === null) return;
    
    if (score <= 3) {
      setStep(2); // Zona Vermelha logic
    } else if (score <= 7) {
      setStep(3); // Zona Amarela logic
    } else {
      // Simulate AI Calculation for Green Zone
      setAiFeedback("Sua recuperação está excelente! Hoje é dia de aumentar a intensidade. Foco em Potência.");
      setStep(4); // Success/Feedback screen
    }
  };

  const handleSubmitLog = (actionTaken: string, extraData: any = {}) => {
    const log: WellnessLog = {
      date: new Date().toISOString(),
      recoveryScore: score || 0,
      actionTaken,
      ...wellnessData,
      ...extraData
    };
    
    // Simulate AI Feedback generation based on inputs
    let feedback = "";
    if (actionTaken === 'Recovery') {
        feedback = "Decisão inteligente. O descanso de hoje é o PR de amanhã. Foque em hidratação (4L) e sono (+8h).";
    } else {
        if (wellnessData.sleepQuality === 'Ruim') feedback += "Sono baixo detectado. Tente um cochilo de 20min pós-almoço. ";
        if (wellnessData.stress === 'Alto') feedback += "Stress alto afeta a coordenação. Faça 5min de respiração antes do treino. ";
        if (!feedback) feedback = "Dados registrados. Mantenha a consistência para subir seu OVR.";
    }
    setAiFeedback(feedback);
    
    // Simulação de envio para API / Planilha
    console.log('----- ENVIANDO DADOS PARA PLANILHA -----');
    console.log(JSON.stringify(log, null, 2));
    
    setStep(4); // Success screen
  };

  const handleSchedulePhysio = () => {
      setAppointmentScheduled(true);
  };

  const togglePainLocation = (loc: string) => {
      const currentLocs = wellnessData.painLocation || [];
      if (currentLocs.includes(loc)) {
          setWellnessData({ ...wellnessData, painLocation: currentLocs.filter(l => l !== loc) });
      } else {
          setWellnessData({ ...wellnessData, painLocation: [...currentLocs, loc] });
      }
  };

  const getScoreColor = (val: number) => {
      if (val <= 3) return 'bg-red-500 border-red-500 text-white';
      if (val <= 7) return 'bg-yellow-500 border-yellow-500 text-black';
      return 'bg-green-500 border-green-500 text-white';
  };

  const bodyParts = [
      'Pescoço', 'Ombros', 'Costas Sup.', 'Lombar', 
      'Peitoral', 'Abdômen', 'Quadril', 'Virilha',
      'Posterior', 'Quadríceps', 'Joelhos', 'Panturrilha', 'Tornozelo'
  ];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-loco-gray w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="bg-loco-black p-4 flex justify-between items-center border-b border-gray-800 sticky top-0 z-10">
          <div className="flex items-center space-x-2">
             <h2 className="text-white font-bold text-lg">Check-in Diário</h2>
          </div>
          <button onClick={() => onClose()} className="text-gray-400 hover:text-white">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          
          {/* STEP 1: Score Input (0-10 Buttons) */}
          {step === 1 && (
            <div className="space-y-6">
               <div className="text-center">
                 <label className="block text-lg font-bold text-gray-700 dark:text-white mb-2">Qual seu nível de prontidão?</label>
                 <p className="text-sm text-gray-500 mb-6">0 = Destruído / 10 = Pronto pra Guerra</p>
                 
                 {/* Visual Scale Indicator */}
                 <div className="mb-6 h-24 flex items-center justify-center">
                    {score !== null ? (
                        <div className="text-center animate-fade-in">
                            <span className={`text-6xl font-bold ${score <= 3 ? 'text-red-500' : score <= 7 ? 'text-yellow-500' : 'text-green-500'}`}>
                                {score}
                            </span>
                            <p className="text-sm font-bold text-gray-400 uppercase mt-1">
                                {score <= 3 ? 'Risco Alto' : score <= 7 ? 'Carga Moderada' : 'Alta Performance'}
                            </p>
                        </div>
                    ) : (
                        <span className="text-4xl text-gray-700 opacity-20 font-bold">--</span>
                    )}
                 </div>

                 {/* 0-10 Button Strip */}
                 <div className="grid grid-cols-6 gap-2">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                        <button
                            key={val}
                            onClick={() => setScore(val)}
                            className={`
                                h-12 rounded-lg font-bold text-lg transition-all transform active:scale-95 border-2
                                ${score === val 
                                    ? getScoreColor(val) 
                                    : 'bg-gray-100 dark:bg-black/40 text-gray-500 dark:text-gray-400 border-transparent hover:border-gray-500'}
                                ${val === 10 ? 'col-span-2' : ''} 
                            `}
                        >
                            {val}
                        </button>
                    ))}
                 </div>
               </div>

               <button 
                 onClick={handleScoreSubmit}
                 disabled={score === null}
                 className="w-full bg-loco-red hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg transition transform active:scale-95"
               >
                 Continuar
               </button>
            </div>
          )}

          {/* STEP 2: Red Zone (0-3) */}
          {step === 2 && (
             <div className="space-y-6">
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-center">
                    <h3 className="text-red-500 font-bold text-lg mb-1">⚠ Alerta de Fadiga</h3>
                    <p className="text-gray-300 text-sm">Seu OVR de durabilidade caiu temporariamente. Vamos recuperar isso.</p>
                </div>
                
                <div>
                    <h4 className="font-bold text-black dark:text-white text-sm uppercase mb-3">Protocolos Sugeridos</h4>
                    <div className="space-y-2">
                         {RECOVERY_PROTOCOLS_MOCK.slice(0, 2).map(p => (
                             <div key={p.id} className="bg-gray-100 dark:bg-black/40 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
                                 <span className="font-bold text-black dark:text-white block">{p.title}</span>
                                 {p.recommendedTime} • {p.benefits[0]}
                             </div>
                         ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-black dark:text-white text-sm uppercase mb-3 flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2 text-loco-red" />
                        Suporte Clínico
                    </h4>
                    <div className="space-y-3">
                        {PHYSIO_PARTNERS_MOCK.map(physio => (
                            <div key={physio.id} className="bg-gray-100 dark:bg-black/40 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 flex">
                                <div className="w-24 h-24 relative flex-shrink-0">
                                    <img src={physio.image} alt={physio.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-3 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-bold text-sm text-black dark:text-white">{physio.name}</h4>
                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                            <MapPinIcon className="w-3 h-3 mr-1" />
                                            {physio.distance} • ⭐ {physio.rating}
                                        </div>
                                    </div>
                                    {appointmentScheduled ? (
                                        <div className="mt-2 bg-green-500/20 text-green-500 text-xs font-bold text-center py-1.5 rounded flex items-center justify-center">
                                            <CheckCircleSolidIcon className="w-3 h-3 mr-1" /> Solicitado
                                        </div>
                                    ) : (
                                        <button onClick={handleSchedulePhysio} className="mt-2 bg-white dark:bg-gray-700 text-black dark:text-white text-xs font-bold text-center py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition border border-gray-300 dark:border-gray-600">
                                            Agendar Avaliação
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button onClick={() => handleSubmitLog('Recovery')} className="w-full bg-loco-red hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition">
                    Registrar Recovery e Descansar
                </button>
             </div>
          )}

          {/* STEP 3: Yellow Zone (4-7) */}
          {step === 3 && (
             <div className="space-y-6">
                <div className="text-center">
                    <h3 className="font-bold text-black dark:text-white text-lg">Detalhes do Bem-Estar</h3>
                    <p className="text-gray-500 text-sm">Dados precisos melhoram sua projeção de carga.</p>
                </div>

                {/* Sleep */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Qualidade do Sono</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Ruim', 'Regular', 'Bom'].map(opt => (
                            <button key={opt} onClick={() => setWellnessData({...wellnessData, sleepQuality: opt})} 
                                className={`py-3 rounded-lg text-xs font-bold border transition ${wellnessData.sleepQuality === opt ? 'bg-loco-red text-white border-loco-red' : 'bg-gray-100 dark:bg-black/40 border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                            >{opt}</button>
                        ))}
                    </div>
                </div>

                {/* Soreness */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Dor Muscular</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Nenhuma', 'Leve', 'Intensa'].map(opt => (
                            <button key={opt} onClick={() => setWellnessData({...wellnessData, soreness: opt})} 
                                className={`py-3 rounded-lg text-xs font-bold border transition ${wellnessData.soreness === opt ? 'bg-loco-red text-white border-loco-red' : 'bg-gray-100 dark:bg-black/40 border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                            >{opt}</button>
                        ))}
                    </div>
                </div>

                {/* PAIN MAP / BODY SELECTOR (NEW) */}
                {wellnessData.soreness !== 'Nenhuma' && (
                    <div className="bg-gray-100 dark:bg-black/30 p-3 rounded-xl border border-gray-200 dark:border-gray-700 animate-fade-in">
                        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase">Onde dói? (Selecione)</label>
                        <div className="flex flex-wrap gap-2">
                            {bodyParts.map(part => (
                                <button
                                    key={part}
                                    onClick={() => togglePainLocation(part)}
                                    className={`
                                        px-3 py-1.5 rounded-full text-[10px] font-bold border transition
                                        ${(wellnessData.painLocation || []).includes(part) 
                                            ? 'bg-red-500 text-white border-red-500' 
                                            : 'bg-white dark:bg-black/50 text-gray-500 border-gray-300 dark:border-gray-600'}
                                    `}
                                >
                                    {part}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* InterAção Logic */}
                {wellnessData.soreness === 'Intensa' && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 animate-fade-in">
                        <p className="text-xs text-red-400 font-bold mb-2">Dor Intensa Detectada</p>
                        <button onClick={handleSchedulePhysio} disabled={appointmentScheduled} className="w-full text-xs bg-white text-black px-2 py-2 rounded font-bold hover:bg-gray-200 disabled:opacity-50">
                            {appointmentScheduled ? 'Solicitação Enviada para InterAção' : 'Solicitar Fisioterapeuta'}
                        </button>
                    </div>
                )}

                {/* Stress */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nível de Estresse</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Baixo', 'Médio', 'Alto'].map(opt => (
                            <button key={opt} onClick={() => setWellnessData({...wellnessData, stress: opt})} 
                                className={`py-3 rounded-lg text-xs font-bold border transition ${wellnessData.stress === opt ? 'bg-loco-red text-white border-loco-red' : 'bg-gray-100 dark:bg-black/40 border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                            >{opt}</button>
                        ))}
                    </div>
                </div>

                <button onClick={() => handleSubmitLog('Monitor')} className="w-full bg-loco-red hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition transform active:scale-95">
                    Salvar Registro
                </button>
             </div>
          )}

          {/* STEP 4: Success with AI Actionable Feedback */}
          {step === 4 && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                 <CheckCircleIcon className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-2">OVR Atualizado!</h2>
              
              <div className="bg-loco-black/50 p-4 rounded-xl border border-loco-red/30 mb-6 text-left relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-loco-red"></div>
                  <div className="flex items-start space-x-3">
                      <SparklesIcon className="w-6 h-6 text-loco-red shrink-0 mt-1" />
                      <div>
                          <p className="text-xs font-bold text-loco-red uppercase tracking-wider mb-1">Coach IA diz:</p>
                          <p className="text-sm text-white leading-relaxed font-medium">"{aiFeedback}"</p>
                      </div>
                  </div>
              </div>
              
              {appointmentScheduled && (
                  <div className="bg-blue-500/10 p-3 rounded-lg mb-4 text-sm text-blue-400 border border-blue-500/30">
                      Sua solicitação de fisioterapia na <strong>InterAção</strong> foi enviada. Aguarde contato.
                  </div>
              )}

              <div className="flex items-center justify-center space-x-2 mb-6">
                  <span className="text-yellow-500 font-bold text-lg">+100 XP</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-orange-500 font-bold text-lg">Streak Mantido 🔥</span>
              </div>

              <button onClick={() => onClose(true)} className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold py-3 rounded-xl transition hover:bg-gray-300 dark:hover:bg-gray-600">
                   Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
