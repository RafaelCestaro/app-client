import React, { useState } from 'react';

interface RewardItem {
  id: string;
  title: string;
  category: 'Análise' | 'Planilha' | 'Conteúdo';
  description: string;
  unlocked: boolean;
  unlockRequirement: string;
  icon: string;
  content: string;
}

interface RewardCardProps {
  unlocks: {
    advancedAnalytics: boolean;
    acwrDetailed: boolean;
    premiumMaterials: boolean;
  };
}

export const RewardCard: React.FC<RewardCardProps> = ({ unlocks }) => {
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);

  const REWARDS: RewardItem[] = [
    {
      id: 'r1',
      title: 'Manual de Recuperação Rápida',
      category: 'Conteúdo',
      description: 'Como acelerar a recuperação muscular usando crio, compressão e nutrição tática.',
      unlocked: unlocks.premiumMaterials,
      unlockRequirement: 'Completar Capítulo 1 (Consistência Inicial)',
      icon: '📚',
      content: 'A recuperação é o segredo dos grandes running backs. 1. Crioterapia por 10min em 10-12°C nas primeiras 24h pós-treino para reduzir edemas. 2. Sono de ondas lentas: garanta pelo menos 8.5h na noite do jogo. 3. Nutrição: ingestão imediata de 20-30g de proteína de rápida absorção emparelhada com carboidratos de alto IG.'
    },
    {
      id: 'r2',
      title: 'Monotonia e Strain Avançados',
      category: 'Análise',
      description: 'Análise avançada sobre variabilidade de carga semanal para prevenção de estresse agudo.',
      unlocked: unlocks.advancedAnalytics,
      unlockRequirement: 'Completar Capítulo 3 (Streak de 14 Dias)',
      icon: '📈',
      content: 'Seus dados de Monotonia estão estáveis em 1.25. (Zona ótima: < 1.5). Isto indica que a distribuição das suas sessões de treino está equilibrada, reduzindo o risco de lesões por sobrecarga acumulada. Seu Strain semanal está em 3450 AU, ideal para sua faixa etária e posição.'
    },
    {
      id: 'r3',
      title: 'Planilha de Cargas & RPE Pró',
      category: 'Planilha',
      description: 'Modelo oficial para estruturação personalizada de microciclos de força e potência.',
      unlocked: unlocks.acwrDetailed,
      unlockRequirement: 'Completar Capítulo 4 (Streak de 21 Dias)',
      icon: '📋',
      content: 'Parabéns por atingir a consistência avançada! Aqui está o link para download da planilha profissional de microciclos de sRPE: [sbfc_power_microcycle_v3.xlsx] (Simulado). Use este material para ajustar as suas cargas base do agachamento e supino com feedback automático em RIR.'
    }
  ];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-xl">
      <div className="mb-4">
        <h3 className="text-white font-black text-lg uppercase tracking-tight">Conteúdos & Desbloqueios</h3>
        <p className="text-xs text-gray-400 mt-1">Benefícios táticos adicionais gerados pela sua dedicação diária.</p>
      </div>

      <div className="space-y-3">
        {REWARDS.map(reward => (
          <div 
            key={reward.id}
            onClick={() => reward.unlocked && setSelectedReward(reward)}
            className={`
              p-4 rounded-xl border flex items-center justify-between gap-4 transition duration-300
              ${reward.unlocked 
                ? 'bg-black/40 border-gray-800 hover:border-[#94E67C] cursor-pointer' 
                : 'bg-black/10 border-gray-800/50 opacity-50 cursor-not-allowed'
              }
            `}
          >
            <div className="flex items-center space-x-3.5 min-w-0">
              <span className="text-3xl bg-gray-950 p-2 rounded-xl border border-gray-800">
                {reward.unlocked ? reward.icon : '🔒'}
              </span>
              <div className="min-w-0">
                <span className="text-[9px] uppercase font-black text-teal-400 tracking-wider">
                  {reward.category}
                </span>
                <h4 className="font-bold text-white text-sm truncate mt-0.5">{reward.title}</h4>
                <p className="text-xs text-gray-500 truncate mt-0.5">{reward.description}</p>
              </div>
            </div>

            <div className="text-right shrink-0">
              {reward.unlocked ? (
                <span className="text-xs font-bold text-[#94E67C] flex items-center space-x-1 justify-end">
                  <span>Acessar</span>
                  <span>➜</span>
                </span>
              ) : (
                <span className="text-[9px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded">
                  {reward.unlockRequirement.split('(')[0]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Reward Content Viewer Modal */}
      {selectedReward && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-gray-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative animate-fade-in-up">
            <button 
              onClick={() => setSelectedReward(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <span className="text-4xl bg-gray-900 p-2 rounded-xl border border-gray-800 inline-block mb-3">
              {selectedReward.icon}
            </span>

            <span className="text-[10px] uppercase font-black text-[#94E67C] tracking-widest block">
              {selectedReward.category} Desbloqueado
            </span>

            <h3 className="text-xl font-black text-white mt-1 uppercase tracking-tight">
              {selectedReward.title}
            </h3>

            <p className="text-xs text-gray-400 mt-2">
              {selectedReward.description}
            </p>

            <div className="mt-6 bg-black/55 border border-gray-800 p-4 rounded-xl leading-relaxed text-sm text-gray-300 whitespace-pre-line text-left">
              {selectedReward.content}
            </div>

            <button
              onClick={() => setSelectedReward(null)}
              className="mt-6 w-full py-3 bg-[#94E67C] text-black font-black text-xs uppercase tracking-wider rounded-xl hover:bg-green-400 transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
