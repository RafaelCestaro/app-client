
import { Athlete, CalendarEvent, Message, RecoveryProtocol, TrainingProgram, TrainingSession, Story, Post, LeaderboardEntry, GymRatGroup, VideoCollection, PlaybookInstall, SuggestedAccount, Product, Mission, Badge, TeamInvitation, Notification, GymPartner } from './types';

export const BADGES_LIBRARY: Badge[] = [
    { id: 'b1', name: "Touchdown Machine", icon: "🏈", description: "Marcou 3 TDs em uma única partida", rarity: 'lendaria', dateEarned: '2024-05-10' },
    { id: 'b2', name: "Pick Six", icon: "⚡", description: "Interceptação retornada para TD", rarity: 'rara', dateEarned: '2024-06-12' },
    { id: 'b3', name: "Iron Man", icon: "🦾", description: "Jogou ataque e defesa (Iron Man Football)", rarity: 'comum', dateEarned: '2024-07-28' },
    { id: 'b4', name: "Pancake", icon: "🥞", description: "Bloqueio dominante que derrubou o oponente", rarity: 'lendaria', dateEarned: '2024-08-01' },
    { id: 'b5', name: "Capitão", icon: "©️", description: "Liderança reconhecida pelo time", rarity: 'rara', dateEarned: '2024-02-15' },
    { id: 'b6', name: "Gym Rat", icon: "🐀", description: "Frequência perfeita na academia por 1 mês", rarity: 'comum', dateEarned: '2024-07-20' },
    { id: 'b7', name: "Clutch", icon: "🥶", description: "Pontuação decisiva no último quarto", rarity: 'rara', dateEarned: '2024-04-10' },
];

export const ATHLETE_MOCK: Athlete = {
  name: "Raphael Cestaro",
  position: "Running Back",
  number: 26,
  avatarUrl: "https://i.pravatar.cc/300?u=raphaelRB26",
  titles: ["Campeão BFA", "MVP de Ataque"],
  earnedBadges: BADGES_LIBRARY,
  displayedBadges: [BADGES_LIBRARY[0], BADGES_LIBRARY[3], BADGES_LIBRARY[6]],
  prs: [
    { metric: "40yd Dash", value: "4.52", unit: "s", date: "2024-07-18" },
    { metric: "Supino (1RM)", value: "130", unit: "kg", date: "2024-07-10" },
    { metric: "Agachamento (1RM)", value: "180", unit: "kg", date: "2024-06-30" },
    { metric: "Jardas Totais", value: "1,250", unit: "yds", date: "2024-07-28" },
    { metric: "Touchdowns", value: "14", unit: "TDs", date: "2024-07-28" },
    { metric: "Yards/Carry", value: "5.4", unit: "avg", date: "2024-07-28" },
  ],
  radarData: [
    { subject: "Velocidade", athlete: 92, positionAvg: 85, fullMark: 100 },
    { subject: "Agilidade", athlete: 95, positionAvg: 80, fullMark: 100 },
    { subject: "Força", athlete: 88, positionAvg: 82, fullMark: 100 },
    { subject: "Visão", athlete: 90, positionAvg: 75, fullMark: 100 },
    { subject: "Mãos", athlete: 78, positionAvg: 70, fullMark: 100 },
    { subject: "Bloqueio", athlete: 65, positionAvg: 60, fullMark: 100 },
  ],
  weeklyLoad: {
    accumulated: 2250,
    goal: 3000,
    trainingsDone: 4,
    trainingsPlanned: 6,
  },
  status: {
    level: "Disponível",
    message: "Pronto para o Gameday.",
    trend: 'up'
  },
  acwr: {
    value: 1.15,
    classification: "moderado",
  },
  watchData: {
    restingHeartRate: 48,
    hrv: 72,
    steps: 8500,
    calories: 3200,
  },
  xp: 3450,
  level: 10,
  coins: 1250,
  nextLevelXp: 4000,
  streak: 21,
};

export const STRENGTH_EVOLUTION_MOCK = [
  { month: 'Jan', agachamento: 140, terra: 160, supino: 100 },
  { month: 'Fev', agachamento: 145, terra: 165, supino: 105 },
  { month: 'Mar', agachamento: 155, terra: 175, supino: 110 },
  { month: 'Abr', agachamento: 160, terra: 180, supino: 115 },
  { month: 'Mai', agachamento: 170, terra: 190, supino: 120 },
  { month: 'Jun', agachamento: 175, terra: 195, supino: 125 },
  { month: 'Jul', agachamento: 180, terra: 200, supino: 130 },
];

export const DYNAMOMETRY_MOCK = [
  { date: '10/01', ext_E: 220, ext_D: 215, flex_E: 130, flex_D: 128, simetria: 98 },
  { date: '15/03', ext_E: 235, ext_D: 225, flex_E: 140, flex_D: 135, simetria: 96 },
  { date: '20/05', ext_E: 250, ext_D: 245, flex_E: 155, flex_D: 150, simetria: 98 },
  { date: '30/07', ext_E: 265, ext_D: 260, flex_E: 165, flex_D: 162, simetria: 99 },
];

export const MISSIONS_MOCK: Mission[] = [
  // --- TAREFAS DIÁRIAS (Aba Principal) ---
  {
    id: 'm_daily_1',
    category: 'DIARIA',
    type: 'SAUDE',
    title: 'Check-in de Prontidão',
    subtitle: 'Como está sua musculatura hoje?',
    xp: 100,
    coins: 10,
    status: 'PENDENTE',
    progress: 0,
    target: 1,
    actionLabel: 'Responder',
    image: 'https://images.unsplash.com/photo-1544367563-12123d8966cd?q=80&w=500&auto=format&fit=crop',
    isFixed: true
  },
  {
    id: 'm_daily_2',
    category: 'DIARIA',
    type: 'TREINO',
    title: 'Log de Treino: Gym',
    subtitle: 'Registre suas cargas de hoje',
    xp: 300,
    coins: 50,
    status: 'PENDENTE',
    progress: 0,
    target: 1,
    actionLabel: 'Logar',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop',
    isFixed: true
  },
  {
    id: 'm_daily_3',
    category: 'DIARIA',
    type: 'SAUDE',
    title: 'Hidratação de Elite',
    subtitle: 'Meta: 4.0 Litros',
    xp: 50,
    coins: 5,
    status: 'EM_PROGRESSO',
    progress: 2.5,
    target: 4.0,
    actionLabel: 'Beber',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=500&auto=format&fit=crop',
    isFixed: true
  },
  {
    id: 'm_daily_4',
    category: 'DIARIA',
    type: 'ESTUDO',
    title: 'Film Study: Blitz Pickup',
    subtitle: 'Identificando pressão pré-snap',
    xp: 150,
    coins: 15,
    status: 'PENDENTE',
    progress: 0,
    target: 1,
    actionLabel: 'Assistir',
    image: 'https://images.unsplash.com/photo-1611000272272-354f4cd5ce07?q=80&w=500&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/M_2Kqe_S8es',
    isFixed: true
  },

  // --- EXPLORAÇÃO ---
  {
    id: 'm_sec_nutri',
    category: 'EXPLORACAO',
    type: 'SAUDE',
    title: 'Nutrição: Creatina',
    subtitle: 'Confirmar suplementação',
    xp: 50,
    coins: 5,
    status: 'PENDENTE',
    progress: 0,
    target: 1,
    actionLabel: 'Confirmar',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=500&auto=format&fit=crop',
    isFixed: false
  },
  
  // --- PREMIUM ---
  {
    id: 'm_prem_1',
    category: 'PREMIUM',
    type: 'GERAL',
    title: 'Sequência de MVP',
    subtitle: 'Mantenha 7 dias seguidos de check-in',
    xp: 1000,
    coins: 200,
    status: 'EM_PROGRESSO',
    progress: 5,
    target: 7,
    actionLabel: 'Ver Dias',
    image: 'https://images.unsplash.com/photo-1552674605-469523170d9e?q=80&w=500&auto=format&fit=crop',
    isFixed: false
  }
];

export const RECOVERY_PROTOCOLS_MOCK: RecoveryProtocol[] = [
    { id: "1", category: "Sugestão do Dia", title: "Banheira de Gelo", description: "Imersão para reduzir inflamação após contato físico intenso.", recommendedTime: "10-15 min", benefits: ["Reduz dor de pancadas", "Acelera recuperação"], contraindications: ["Pessoas com problemas cardíacos"] },
    { id: "2", category: "Essencial", title: "Sono de Qualidade", description: "Dormir de 7 a 9 horas.", recommendedTime: "7-9 horas", benefits: ["Hormônio do crescimento", "Foco mental (Playbook)"], contraindications: ["Uso de celular antes de dormir"] },
    { id: "3", category: "Essencial", title: "Botas de Compressão", description: "Use botas pneumáticas para drenagem nas pernas.", recommendedTime: "20 min", benefits: ["Circulação", "Relaxamento pós-treino"], contraindications: [] },
    { id: "4", category: "Essencial", title: "Mobilidade de Quadril", description: "Soltar flexores de quadril.", recommendedTime: "15 min", benefits: ["Evita lesões em sprints", "Melhora cortes"], contraindications: [] },
    { id: "5", category: "Extra", title: "Liberação Miofascial", description: "Rolo ou massagem.", recommendedTime: "15 min", benefits: ["Soltura muscular", "Flexibilidade"], contraindications: ["Sobre hematomas recentes"] },
];

export const CALENDAR_EVENTS_MOCK: CalendarEvent[] = [
    // --- JANEIRO 2026 ---
    { date: "2026-01-26", type: "fisio", title: "Alinhamento Saúde", time: "09:00" },
    { date: "2026-01-27", type: "fisio", title: "Alinhamento Saúde", time: "09:00" },
    { date: "2026-01-28", type: "fisio", title: "Alinhamento Saúde", time: "09:00" },
    { date: "2026-01-29", type: "fisio", title: "Alinhamento Saúde", time: "09:00" },
    { date: "2026-01-30", type: "fisio", title: "Alinhamento Saúde", time: "09:00" },

    // --- FEVEREIRO 2026 ---
    { date: "2026-02-03", type: "teste", title: "Treino Físico + Teste Khan", time: "19:00", programming: [{ title: "Testes Físicos", exercises: [{ id: "t1", name: "Agachamento Max", sets: 1, reps: "1RM" }]}] },
    { date: "2026-02-04", type: "teste", title: "Treino Físico + Teste Khan", time: "19:00" },
    { date: "2026-02-05", type: "reuniao", title: "Reunião Calendário Geral", time: "20:00" },
    { date: "2026-02-07", type: "teste", title: "Treino Físico + Testes", time: "09:00" },
    { date: "2026-02-09", type: "fisio", title: "Alinhamento Núcleo Saúde", time: "19:00" },
    { date: "2026-02-12", type: "treino", title: "Treino Físico", time: "19:00" },
    { date: "2026-02-14", type: "treino", title: "Treino Eletivo", time: "09:00" },
    { date: "2026-02-16", type: "recovery", title: "Carnaval (Folga)", time: "Dia Todo" },
    { date: "2026-02-17", type: "recovery", title: "Carnaval (Folga)", time: "Dia Todo" },
    { date: "2026-02-18", type: "recovery", title: "Quarta de Cinzas", time: "Dia Todo" },
    { date: "2026-02-21", type: "treino", title: "Treino Físico", time: "09:00" },
    { date: "2026-02-24", type: "treino", title: "Treino Físico", time: "19:00" },
    { date: "2026-02-28", type: "treino", title: "Treino Físico", time: "09:00" },

    // --- MARÇO 2026 ---
    { date: "2026-03-02", type: "reuniao", title: "Treinamento Cultura", time: "20:00" },
    { date: "2026-03-03", type: "treino", title: "Treino Tático", time: "20:00", programming: [{ title: "Instalação", exercises: [{ id: "i1", name: "Run Install", sets: 1, reps: "30 min" }]}] },
    { date: "2026-03-05", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-03-07", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-03-09", type: "reuniao", title: "Treinamento Cultura", time: "20:00" },
    { date: "2026-03-10", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-03-12", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-03-14", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-03-17", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-03-19", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-03-21", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-03-24", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-03-26", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-03-28", type: "jogo", title: "JOGO (Previsão)", time: "14:00", location: "Estádio Municipal" },
    { date: "2026-03-31", type: "recovery", title: "Pausa", time: "Dia Todo" },

    // --- ABRIL 2026 ---
    { date: "2026-04-01", type: "recovery", title: "Pausa", time: "Dia Todo" },
    { date: "2026-04-02", type: "recovery", title: "Pausa", time: "Dia Todo" },
    { date: "2026-04-03", type: "recovery", title: "Sexta-Feira Santa", time: "Dia Todo" },
    { date: "2026-04-04", type: "recovery", title: "Pausa", time: "Dia Todo" },
    { date: "2026-04-07", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-04-09", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-04-11", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-04-14", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-04-16", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-04-18", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-04-21", type: "recovery", title: "Feriado Tiradentes", time: "Dia Todo" },
    { date: "2026-04-23", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-04-25", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-04-28", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-04-30", type: "treino", title: "Treino Tático", time: "20:00" },

    // --- MAIO 2026 ---
    { date: "2026-05-01", type: "recovery", title: "Dia do Trabalho", time: "Dia Todo" },
    { date: "2026-05-02", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-05-05", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-05-07", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-05-09", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-05-12", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-05-14", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-05-16", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-05-19", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-05-21", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-05-23", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-05-26", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-05-28", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-05-30", type: "treino", title: "Treino Tático", time: "14:00" },

    // --- JUNHO 2026 ---
    { date: "2026-06-02", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-06-04", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-06-06", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-06-09", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-06-11", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-06-13", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-06-16", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-06-18", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-06-20", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-06-23", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-06-25", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-06-27", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-06-30", type: "treino", title: "Treino Tático", time: "20:00" },

    // --- JULHO 2026 ---
    { date: "2026-07-02", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-07-04", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-07-07", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-07-09", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-07-11", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-07-13", type: "recovery", title: "Folga", time: "Dia Todo" },
    { date: "2026-07-14", type: "recovery", title: "Folga", time: "Dia Todo" },
    { date: "2026-07-15", type: "recovery", title: "Folga", time: "Dia Todo" },
    { date: "2026-07-16", type: "recovery", title: "Folga", time: "Dia Todo" },
    { date: "2026-07-17", type: "recovery", title: "Folga", time: "Dia Todo" },
    { date: "2026-07-18", type: "recovery", title: "Folga", time: "Dia Todo" },
    { date: "2026-07-21", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-07-23", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-07-25", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-07-28", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-07-30", type: "treino", title: "Treino Tático", time: "20:00" },

    // --- AGOSTO 2026 ---
    { date: "2026-08-01", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-08-04", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-08-06", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-08-08", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-08-11", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-08-13", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-08-15", type: "recovery", title: "Nossa Senhora (Feriado)", time: "Dia Todo" },
    { date: "2026-08-18", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-08-20", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-08-22", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-08-25", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-08-27", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-08-29", type: "treino", title: "Treino Tático", time: "14:00" },

    // --- SETEMBRO 2026 ---
    { date: "2026-09-01", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-09-03", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-09-05", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-09-07", type: "recovery", title: "Independência (Feriado)", time: "Dia Todo" },
    { date: "2026-09-08", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-09-10", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-09-12", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-09-15", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-09-17", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-09-19", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-09-22", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-09-24", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-09-26", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-09-29", type: "treino", title: "Treino Tático", time: "20:00" },

    // --- OUTUBRO 2026 ---
    { date: "2026-10-01", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-10-03", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-10-06", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-10-08", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-10-10", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-10-12", type: "recovery", title: "Nossa Senhora (Feriado)", time: "Dia Todo" },
    { date: "2026-10-13", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-10-15", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-10-17", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-10-20", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-10-22", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-10-24", type: "treino", title: "Treino Tático", time: "14:00" },
    { date: "2026-10-27", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-10-29", type: "treino", title: "Treino Tático", time: "20:00" },
    { date: "2026-10-31", type: "treino", title: "Treino Tático", time: "14:00" },
];

export const MESSAGES_MOCK: Message[] = [
    { id: "msg1", sender: "HC (Head Coach)", category: "Comissão", subject: "Gameplan Domingo", body: "Rafa, vamos correr muito em zona externa. Estude os LBs deles, eles over-pursue. Confio em você.", timestamp: "2024-07-25T18:00:00Z", read: false },
    { id: "msg2", sender: "Coach OL", category: "Comissão", subject: "Ajuste de Bloqueio", body: "Nosso RT vai dobrar no DT. Fique atento ao cutback lane na jogada '26 Power'.", timestamp: "2024-07-23T08:00:00Z", read: true },
    { id: "msg3", sender: "Fisioterapeuta", category: "Saúde", subject: "Recovery", body: "Notei que você mancou no treino de ontem. Passe na maca antes do treino de hoje.", timestamp: "2024-07-22T21:00:00Z", read: true },
    { id: "msg4", sender: "Diretoria", category: "Clube", subject: "Mensalidade", body: "Lembrete: Mensalidade de agosto vence dia 10. Chave PIX em anexo.", timestamp: "2024-07-20T11:00:00Z", read: true },
];

export const MESSAGE_NOTES_MOCK = [
    { id: 'n0', user: 'Sua nota', avatar: 'https://i.pravatar.cc/300?u=raphaelRB26', note: 'Focado nos 100y 🏈', isMe: true },
    { id: 'n1', user: 'QB_Lucas', avatar: 'https://i.pravatar.cc/150?u=qb01', note: 'Proteção de passe hj!' },
    { id: 'n2', user: 'MLB_Mike', avatar: 'https://i.pravatar.cc/150?u=lb55', note: 'Defense wins championships' },
    { id: 'n3', user: 'Coach_Off', avatar: 'https://i.pravatar.cc/150?u=coachOff', note: 'Estudem o playbook!' },
];

export const TRAINING_SESSIONS_MOCK: TrainingSession[] = [
  { id: 't1', date: '2024-07-26', type: 'campo', duration: 120, rpe: 8, intensity: 'alta', title: 'Treino Full Pads' },
  { id: 't2', date: '2024-07-25', type: 'força', duration: 75, rpe: 7, intensity: 'média', title: 'Lower Body Power' },
  { id: 't3', date: '2024-07-24', type: 'jogo', duration: 60, rpe: 3, intensity: 'baixa', title: 'Film Study' },
  { id: 't4', date: '2024-07-23', type: 'corrida', duration: 45, rpe: 9, intensity: 'alta', title: 'Sprints / Agilidade' },
];

export const TRAINING_PROGRAMS_MOCK: TrainingProgram[] = [
    { id: 'p1', title: 'Off-Season: Hipertrofia', objective: 'força', duration: '12 Semanas', level: 'avançado' },
    { id: 'p2', title: 'Velocidade e Agilidade (Combine)', objective: 'velocidade', duration: '8 Semanas', level: 'avançado' },
    { id: 'p3', title: 'Prevenção de LCA', objective: 'reabilitação', duration: 'Contínuo', level: 'intermediário' },
];

export const PLANNED_WORKOUTS_MOCK = [
  { 
    id: 'pw1', 
    title: 'Treino de Campo (Pads)', 
    description: 'Instalação de jogo corrido', 
    type: 'Campo',
    blocks: []
  },
  { 
    id: 'pw2', 
    title: 'Academia - Potência', 
    description: 'Levantamento Olímpico e Pliometria', 
    type: 'Força',
    blocks: [
        {
            title: "Aquecimento Neural",
            exercises: [
                { id: "e1", name: "Box Jumps", sets: 3, reps: "5", coachNotes: "Altura média, foco na aterrissagem" }
            ]
        },
        {
            title: "Bloco Principal",
            exercises: [
                { id: "e2", name: "Power Clean", sets: 5, reps: "3", suggestedLoad: 80, coachNotes: "Explosão máxima" },
                { id: "e3", name: "Back Squat", sets: 4, reps: "6", suggestedLoad: 140, coachNotes: "Quebrar a paralela" }
            ]
        }
    ]
  },
  { id: 'pw3', title: 'Análise de Vídeo', description: 'Estudo do adversário (Hudl)', type: 'Estudo', blocks: [] },
  { id: 'pw4', title: 'Recovery Ativo', description: 'Mobilidade e Bike', type: 'Recuperação', blocks: [] },
];

export const STORIES_MOCK: Story[] = [
  {
    id: 's1',
    user: 'NFL Brasil',
    avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png',
    imageUrl: 'https://images.unsplash.com/photo-1611000272272-354f4cd5ce07?q=80&w=1000&auto=format&fit=crop',
    timeAgo: '30m',
    caption: 'Playoffs chegando! Quem leva o Super Bowl? 🏈'
  },
  {
    id: 's2',
    user: 'Locomotiva FA',
    avatar: 'https://i.pravatar.cc/150?u=teamLogo',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1000&auto=format&fit=crop',
    timeAgo: '2h',
    caption: 'Domingo é dia de casa cheia! Ingressos à venda. 🚂'
  },
  {
    id: 's3',
    user: 'Patrick Mahomes',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Patrick_Mahomes_2019.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?q=80&w=1000&auto=format&fit=crop',
    timeAgo: '4h',
    caption: 'Back to work. ⏰'
  },
  {
    id: 's4',
    user: 'Coach D.',
    avatar: 'https://i.pravatar.cc/150?u=coachD',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop',
    timeAgo: '6h',
    caption: 'Fundamentos ganham jogos. Olho no footwork.'
  }
];

export const FEED_MOCK: Post[] = [
    {
        id: 'p1',
        author: 'Locomotiva Futebol Americano',
        handle: '@locomotiva_fa',
        avatar: 'https://i.pravatar.cc/150?u=teamLogo',
        content: 'GAMEDAY ALERT! 🚨\n\nNeste domingo enfrentamos o Steamrollers valendo a liderança da conferência. Contamos com a torcida da nação grená! #GoLoco 🚂',
        imageUrl: 'https://images.unsplash.com/photo-1628779238951-be2c9f255902?q=80&w=1000&auto=format&fit=crop',
        likes: 450,
        comments: 89,
        timestamp: '1h atrás',
        likedByUser: true
    },
    {
        id: 'p2',
        author: 'FABR Network',
        handle: '@fabr_net',
        avatar: 'https://i.pravatar.cc/150?u=fabr',
        content: 'DESTAQUE DA SEMANA: Raphael Cestaro lidera a liga em jardas terrestres (120yds/jogo). O jogo corrido do Locomotiva é o mais perigoso do campeonato? 👇',
        imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop',
        likes: 1250,
        comments: 134,
        timestamp: '3h atrás',
        likedByUser: false
    },
];

export const TEXT_FEED_MOCK: Post[] = [
    {
        id: 't1',
        author: 'Coach Tático',
        handle: '@xs_os_analise',
        avatar: 'https://i.pravatar.cc/150?u=analista',
        content: 'A leitura de bloqueio no Gap Scheme do Locomotiva está elite. A paciência do RB esperar o Guard fazer o pull é o segredo. 🧠🏈',
        likes: 84,
        comments: 12,
        reposts: 5,
        timestamp: '2h',
        likedByUser: false
    },
    {
        id: 't2',
        author: 'Raphael Cestaro',
        handle: '@raphaelRB26',
        avatar: 'https://i.pravatar.cc/300?u=raphaelRB26',
        content: 'Focado. Domingo é guerra! O trabalho duro da semana vai pagar. 🚂👊 #RB26',
        likes: 243,
        comments: 45,
        reposts: 10,
        timestamp: '6h',
        likedByUser: false
    }
];

export const LEADERBOARD_MOCK: LeaderboardEntry[] = [
  { rank: 1, name: "LB Paredão", avatar: "https://i.pravatar.cc/150?u=lb55", points: 3450, trend: "stable", isUser: false },
  { rank: 2, name: "Raphael Cestaro", avatar: "https://i.pravatar.cc/300?u=raphaelRB26", points: 3320, trend: "up", isUser: true },
  { rank: 3, name: "WR Veloz", avatar: "https://i.pravatar.cc/150?u=wr01", points: 3150, trend: "up", isUser: false },
  { rank: 4, name: "Safety Hawk", avatar: "https://i.pravatar.cc/150?u=s21", points: 2980, trend: "down", isUser: false },
];

export const GYMRATS_GROUPS_MOCK: GymRatGroup[] = [
    {
        id: 'team',
        name: 'Elenco Locomotiva',
        entries: LEADERBOARD_MOCK
    },
    {
        id: 'unit',
        name: 'Unidade de Ataque',
        entries: [
            { rank: 1, name: "Raphael Cestaro", avatar: "https://i.pravatar.cc/300?u=raphaelRB26", points: 3320, trend: "stable", isUser: true },
            { rank: 2, name: "QB Lucas", avatar: "https://i.pravatar.cc/150?u=qb01", points: 2800, trend: "up", isUser: false },
        ]
    }
];

export const VIDEO_LIBRARY_MOCK: VideoCollection[] = [
  {
    id: 'v1',
    title: 'Game Tape: Locomotiva vs Spartans',
    date: 'Oct 23 2024',
    type: 'JOGO',
    thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop',
    clips: Array.from({ length: 15 }, (_, i) => ({
      id: `clip-${i+1}`,
      number: i + 1,
      title: i === 0 ? 'TD Run 40yds' : 'Offense Drive',
      duration: '0:45'
    }))
  },
  {
    id: 'v2',
    title: 'Scout: Defesa Steamrollers',
    date: 'Oct 17 2024',
    type: 'SCOUT',
    thumbnail: 'https://images.unsplash.com/photo-1611000272272-354f4cd5ce07?q=80&w=1000&auto=format&fit=crop',
    clips: [
      { id: 'c1', number: 1, title: 'Blitz Packages 3rd Down', duration: '0:22' },
      { id: 'c2', number: 2, title: 'Cover 3 Tendencies', duration: '0:18' },
    ]
  }
];

export const PLAYBOOK_MOCK: PlaybookInstall[] = [
  {
    id: 'i1',
    title: 'Jogo Corrido (Run Game)',
    category: 'Ofensivo',
    cardCount: 5,
    cards: [
      {
        id: 'card1',
        title: '26 Power (I-Form)',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/I_formation_FB_run.svg/1200px-I_formation_FB_run.svg.png', 
        assignments: [
          { position: 'RB', alignment: '7yds deep', runResp: 'Ler bloco do Guard (A Gap)', passResp: '-' },
          { position: 'FB', alignment: '4yds deep', runResp: 'Kick out DE', passResp: '-' },
          { position: 'LG', alignment: 'LOS', runResp: 'Pull p/ LB', passResp: '-' },
        ]
      }
    ]
  },
  {
    id: 'i2',
    title: 'Conceitos de Passe',
    category: 'Ofensivo',
    cardCount: 3,
    cards: []
  }
];

export const SUGGESTED_ACCOUNTS_MOCK: SuggestedAccount[] = [
  {
    id: 'nf1',
    name: 'Locomotiva FA',
    handle: '@locomotiva_fa',
    avatarUrl: 'https://i.pravatar.cc/150?u=teamLogo',
    category: 'Time',
    isFollowing: true
  },
  {
    id: 'at1',
    name: 'Christian McCaffrey',
    handle: '@cmc_22',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Christian_McCaffrey_2019.jpg',
    category: 'Atleta',
    isFollowing: false
  }
];

export const MARKETPLACE_MOCK: Product[] = [
  {
    id: 'p1',
    title: 'Luva Nike Vapor Jet 6.0',
    price: 350,
    originalPrice: 450,
    imageUrl: 'https://m.media-amazon.com/images/I/61L2iXQ+zmL._AC_SY695_.jpg',
    category: 'Luvas',
    condition: 'Novo',
    seller: { name: 'Touchdown Store', type: 'Loja' },
    size: 'L'
  },
  {
    id: 'p2',
    title: 'Chuteira Nike Alpha Menace Pro',
    price: 650,
    imageUrl: 'https://static.netshoes.com.br/produtos/chuteira-futebol-americano-nike-alpha-menace-pro-2-masculina/02/HZM-3543-002/HZM-3543-002_zoom1.jpg?ts=1695699266',
    category: 'Chuteiras',
    condition: 'Usado - Bom',
    seller: { name: 'QB Lucas', type: 'Atleta', avatar: 'https://i.pravatar.cc/150?u=qb01', isTeammate: true },
    size: '42 BR'
  },
  {
    id: 'p3',
    title: 'Shoulder Pad Riddell Power',
    price: 1200,
    imageUrl: 'https://m.media-amazon.com/images/I/81+2+9+9+9L._AC_SX679_.jpg',
    category: 'Pads',
    condition: 'Usado - Detalhes',
    seller: { name: 'OL Big', type: 'Atleta', avatar: 'https://i.pravatar.cc/150?u=ol77', isTeammate: true },
    size: 'XL'
  },
  {
    id: 'p4',
    title: 'Viseira Oakley Transparente',
    price: 250,
    imageUrl: 'https://m.media-amazon.com/images/I/51+2+9+9+9L._AC_SX679_.jpg',
    category: 'Acessórios',
    condition: 'Novo',
    seller: { name: 'Loja Oficial', type: 'Loja' },
    size: 'Único'
  }
];

export const PENDING_INVITATIONS: TeamInvitation[] = [
  {
    email: 'raphael@locomotiva.com.br',
    teamName: 'Locomotiva FA',
    teamLogo: 'https://i.pravatar.cc/150?u=teamLogo',
    role: 'Atleta (Ataque)'
  }
];

export const NOTIFICATIONS_MOCK: Notification[] = [
  { id: 'n1', type: 'alert', title: 'Film Study Obrigatório', message: 'Coach D. adicionou novos clipes da defesa adversária.', timestamp: '10 min atrás', read: false },
  { id: 'n2', type: 'reminder', title: 'Check-in Pré-Treino', message: 'Registre seu bem-estar antes do treino das 20h.', timestamp: '2h atrás', read: false },
];

export const GYM_PARTNERS_MOCK: GymPartner[] = [
    { id: 'g1', name: 'CT Ironberg', distance: '1.2 km', rating: 5.0, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop', plan: 'Parceiro Ouro' },
    { id: 'g2', name: 'SmartFit Centro', distance: '3.5 km', rating: 4.5, image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=500&auto=format&fit=crop', plan: 'Basic' },
];

export const PHYSIO_PARTNERS_MOCK = [
    { id: 'ph1', name: 'Clínica Recupera', distance: '0.8 km', rating: 5.0, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=500&auto=format&fit=crop' },
];
