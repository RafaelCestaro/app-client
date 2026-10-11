// Gamification Engine for Athlete Journey - Puro e Testável
import { Badge, Athlete, WellnessLog, TrainingSession } from '../types';

export interface GamifiedChapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: string;
  status: 'locked' | 'active' | 'completed';
  progress: number; // 0 to 100
  reward: string;
}

export interface GamifiedChallenge {
  id: string;
  type: 'diario' | 'semanal' | 'marco';
  title: string;
  progress: number;
  target: number;
  xpReward: number;
  completed: boolean;
}

export interface LeaderboardPlayer {
  rank: number;
  name: string;
  avatar: string;
  adherence: number; // percentage of registered days
  streak: number;
  isUser: boolean;
}

export interface GamificationState {
  level: number;
  xp: number;
  nextLevelXp: number;
  levelName: string;
  streak: number;
  coins: number;
  chapters: GamifiedChapter[];
  challenges: GamifiedChallenge[];
  badges: Badge[];
  unlocks: {
    advancedAnalytics: boolean;
    acwrDetailed: boolean;
    premiumMaterials: boolean;
  };
}

// Level helper names
export const LEVEL_NAMES = [
  'Estreante',
  'Base',
  'Consistente',
  'Performático',
  'Elite',
  'Atleta InterAção'
];

export function getLevelName(level: number): string {
  if (level <= 2) return LEVEL_NAMES[0]; // Estreante
  if (level <= 4) return LEVEL_NAMES[1]; // Base
  if (level <= 6) return LEVEL_NAMES[2]; // Consistente
  if (level <= 8) return LEVEL_NAMES[3]; // Performático
  if (level <= 10) return LEVEL_NAMES[4]; // Elite
  return LEVEL_NAMES[5]; // Atleta InterAção
}

// Dynamic state generator from raw check-ins and training sessions (logged workouts)
export function calculateGamification(
  checkins: WellnessLog[],
  workouts: TrainingSession[]
): GamificationState {
  // Base values from MOCK
  let baseXP = 3450;
  let baseCoins = 1250;
  let baseStreak = 21;

  // Add XP and Coins based on user checkins and workouts
  const checkinCount = checkins.length;
  const workoutCount = workouts.length;

  const checkinXP = checkinCount * 100;
  const checkinCoins = checkinCount * 10;
  const workoutXP = workoutCount * 300;
  const workoutCoins = workoutCount * 50;

  let totalXP = baseXP + checkinXP + workoutXP;
  let totalCoins = baseCoins + checkinCoins + workoutCoins;
  let currentStreak = baseStreak + checkinCount;

  // Calculate Level and Progress
  // Curve: Level 1-2: 1000XP, 3-4: 1500XP, 5-6: 2000XP, 7-8: 2500XP, 9-10: 3000XP, 11+: 4000XP
  let level = 1;
  let xpNeeded = 1000;
  let tempXP = totalXP;

  while (tempXP >= xpNeeded) {
    tempXP -= xpNeeded;
    level += 1;
    // XP scale increases with level
    if (level <= 2) xpNeeded = 1000;
    else if (level <= 4) xpNeeded = 1500;
    else if (level <= 6) xpNeeded = 2000;
    else if (level <= 8) xpNeeded = 2500;
    else if (level <= 10) xpNeeded = 3000;
    else xpNeeded = 4000;
  }

  const nextLevelXp = xpNeeded;
  const currentLevelXp = tempXP;
  const levelName = getLevelName(level);

  // 1. Challenges on-the-fly Calculation
  // Daily challenges
  const hasCheckinToday = checkinCount > 0;
  const hasWorkoutToday = workoutCount > 0;
  const highSleepQuality = checkins.some(c => c.recoveryScore >= 8);

  const challenges: GamifiedChallenge[] = [
    {
      id: 'd1',
      type: 'diario',
      title: 'Fazer o check-in de hoje',
      progress: hasCheckinToday ? 1 : 0,
      target: 1,
      xpReward: 100,
      completed: hasCheckinToday
    },
    {
      id: 'd2',
      type: 'diario',
      title: 'Fazer o check-out do treino de hoje',
      progress: hasWorkoutToday ? 1 : 0,
      target: 1,
      xpReward: 300,
      completed: hasWorkoutToday
    },
    {
      id: 'd3',
      type: 'diario',
      title: 'Manter prontidão excelente (VFC/Sono ≥ 8/10)',
      progress: highSleepQuality ? 1 : 0,
      target: 1,
      xpReward: 150,
      completed: highSleepQuality
    },
    // Weekly
    {
      id: 'w1',
      type: 'semanal',
      title: 'Completar registros de sRPE da semana',
      progress: Math.min(workoutCount, 4),
      target: 4,
      xpReward: 400,
      completed: workoutCount >= 4
    },
    {
      id: 'w2',
      type: 'semanal',
      title: '5 check-ins na semana',
      progress: Math.min(checkinCount, 5),
      target: 5,
      xpReward: 300,
      completed: checkinCount >= 5
    },
    {
      id: 'w3',
      type: 'semanal',
      title: 'Manter recuperação média ≥ 7/10',
      progress: checkinCount > 0 ? Math.round(checkins.reduce((acc, c) => acc + c.recoveryScore, 0) / checkinCount) : 8,
      target: 7,
      xpReward: 350,
      completed: checkinCount === 0 || (checkins.reduce((acc, c) => acc + c.recoveryScore, 0) / checkinCount) >= 7
    },
    // Long-Term (Marcos)
    {
      id: 'l1',
      type: 'marco',
      title: 'Preencher RPE por 7 dias seguidos (Streak)',
      progress: Math.min(currentStreak, 7),
      target: 7,
      xpReward: 500,
      completed: currentStreak >= 7
    },
    {
      id: 'l2',
      type: 'marco',
      title: 'Duração total de treinos (meta 300 mins)',
      progress: Math.min(workouts.reduce((acc, w) => acc + w.duration, 0) + (workoutCount * 60), 300),
      target: 300,
      xpReward: 600,
      completed: (workouts.reduce((acc, w) => acc + w.duration, 0) + (workoutCount * 60)) >= 300
    },
    {
      id: 'l3',
      type: 'marco',
      title: 'Consistência de Peso Corporal por 4 semanas',
      progress: checkinCount >= 2 ? 4 : 2,
      target: 4,
      xpReward: 800,
      completed: checkinCount >= 4
    }
  ];

  // 2. Chapters (Duolingo style trilha)
  const chapters: GamifiedChapter[] = [
    {
      id: 'cap1',
      number: 1,
      title: 'Base de Performance',
      subtitle: 'Registrar o primeiro check-in + check-out (Onboarding)',
      icon: '🌱',
      status: (hasCheckinToday && hasWorkoutToday) || checkinCount > 0 ? 'completed' : 'active',
      progress: (hasCheckinToday ? 50 : 0) + (hasWorkoutToday ? 50 : 0) || (checkinCount > 0 ? 100 : 0),
      reward: 'Badge: Primeiro Passo + Manual de Campo'
    },
    {
      id: 'cap2',
      number: 2,
      title: 'Ritmo Diário',
      subtitle: 'Completar 7 dias seguidos de consistência (Streak inicial)',
      icon: '🔥',
      status: currentStreak >= 7 ? 'completed' : 'active',
      progress: Math.min(Math.round((currentStreak / 7) * 100), 100),
      reward: 'Badge: 7 Dias de Fogo + Planilha de Cargas'
    },
    {
      id: 'cap3',
      number: 3,
      title: 'Recuperação de Elite',
      subtitle: 'Manter sono na faixa ideal e prontidão estável por 2 semanas',
      icon: '💤',
      status: currentStreak >= 14 ? 'completed' : currentStreak >= 7 ? 'active' : 'locked',
      progress: Math.min(Math.round((currentStreak / 14) * 100), 100),
      reward: 'Badge: Mestre do Sono + Vídeo Aula de Crio'
    },
    {
      id: 'cap4',
      number: 4,
      title: 'Carga Inteligente',
      subtitle: '4 semanas de sRPE completo, ACWR em zona de segurança',
      icon: '📊',
      status: currentStreak >= 21 ? 'completed' : currentStreak >= 14 ? 'active' : 'locked',
      progress: Math.min(Math.round((currentStreak / 21) * 100), 100),
      reward: 'Desbloqueio: Dashboard de Carga Avançado'
    },
    {
      id: 'cap5',
      number: 5,
      title: 'Mentalidade Tática',
      subtitle: 'Humor/estresse monitorados com consistência de registros > 80%',
      icon: '🧠',
      status: currentStreak >= 25 ? 'completed' : currentStreak >= 21 ? 'active' : 'locked',
      progress: Math.min(Math.round((currentStreak / 25) * 100), 100),
      reward: 'Badge: Carga Equilibrada + Guia de Nutrição Esportiva'
    },
    {
      id: 'cap6',
      number: 6,
      title: 'Atleta Consistente',
      subtitle: '30+ dias de consistência, atingindo maestria no topo',
      icon: '👑',
      status: currentStreak >= 30 ? 'completed' : currentStreak >= 25 ? 'active' : 'locked',
      progress: Math.min(Math.round((currentStreak / 30) * 100), 100),
      reward: 'Badge: Mês Completo + Mentoria VIP'
    }
  ];

  // 3. Badges shelves
  const earnedBadges: Badge[] = [];
  if (checkinCount > 0 || workoutCount > 0) {
    earnedBadges.push({ id: 'badge_1', name: "Primeiro Passo", icon: "🌱", description: "Fez seu primeiro registro oficial no app", rarity: 'comum', dateEarned: new Date().toISOString().split('T')[0] });
  }
  if (currentStreak >= 7) {
    earnedBadges.push({ id: 'badge_2', name: "7 Dias de Fogo", icon: "🔥", description: "Manteve consistência por 7 dias seguidos", rarity: 'rara', dateEarned: new Date().toISOString().split('T')[0] });
  }
  if (checkins.some(c => c.sleepQuality === 'Excelente' || c.recoveryScore >= 9)) {
    earnedBadges.push({ id: 'badge_3', name: "Mestre do Sono", icon: "💤", description: "Qualidade de recuperação perfeita registrada", rarity: 'comum', dateEarned: new Date().toISOString().split('T')[0] });
  }
  if (currentStreak >= 21) {
    earnedBadges.push({ id: 'badge_4', name: "Carga Equilibrada", icon: "⚖", description: "Manteve ACWR na zona verde de performance", rarity: 'lendaria', dateEarned: new Date().toISOString().split('T')[0] });
  }
  if (currentStreak >= 30) {
    earnedBadges.push({ id: 'badge_5', name: "Mês Completo", icon: "🏆", description: "Consistência extraordinária por mais de 30 dias", rarity: 'lendaria', dateEarned: new Date().toISOString().split('T')[0] });
  }

  // 4. Progress Unlocks
  // Advanced Telemetry / ACWR detailed is unlocked after 14 days of consistency (streak >= 14) or chapters completed
  const advancedAnalytics = currentStreak >= 14;
  const acwrDetailed = currentStreak >= 21;
  const premiumMaterials = currentStreak >= 7;

  return {
    level,
    xp: currentLevelXp,
    nextLevelXp,
    levelName,
    streak: currentStreak,
    coins: totalCoins,
    chapters,
    challenges,
    badges: earnedBadges,
    unlocks: {
      advancedAnalytics,
      acwrDetailed,
      premiumMaterials
    }
  };
}

// Generate roster consistency leaderboard data dynamically
export function calculateLeaderboard(userStreak: number): LeaderboardPlayer[] {
  const basePlayers = [
    { name: 'Gabriel S.', avatar: 'https://i.pravatar.cc/100?u=gabriel', adherence: 96, streak: 28, isUser: false },
    { name: 'Lucas M.', avatar: 'https://i.pravatar.cc/100?u=lucas', adherence: 93, streak: 24, isUser: false },
    { name: 'Matheus K.', avatar: 'https://i.pravatar.cc/100?u=matheus', adherence: 89, streak: 19, isUser: false },
    { name: 'Arthur O.', avatar: 'https://i.pravatar.cc/100?u=arthur', adherence: 82, streak: 15, isUser: false },
    { name: 'Felipe B.', avatar: 'https://i.pravatar.cc/100?u=felipe', adherence: 75, streak: 11, isUser: false },
  ];

  // Adherence percentage based on streak
  const userAdherence = Math.min(Math.round((userStreak / 30) * 100), 100);

  const playersWithUser = [
    ...basePlayers,
    { name: 'Raphael C. (Você)', avatar: 'https://i.pravatar.cc/300?u=raphaelRB26', adherence: userAdherence, streak: userStreak, isUser: true }
  ];

  // Sort by Adherence first, then by Streak
  playersWithUser.sort((a, b) => {
    if (b.adherence !== a.adherence) {
      return b.adherence - a.adherence;
    }
    return b.streak - a.streak;
  });

  // Assign ranks
  return playersWithUser.map((p, idx) => ({
    rank: idx + 1,
    ...p
  }));
}
