
export enum Theme {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export interface AppTheme {
  name: string;
  primaryColor: string;
  backgroundImage?: string;
}

export enum Page {
  Missoes = 'Missões',
  Social = 'Social',
  Desempenho = 'Desempenho',
  Calendario = 'Calendário',
  Mensagens = 'Mensagens',
  Biblioteca = 'Biblioteca',
  Playbook = 'Playbook',
  Inicio = 'Inicio',
  Perfil = 'Perfil',
  Pesquisar = 'Pesquisar',
  Marketplace = 'Marketplace',
  GymRats = 'GymRats',
  Programas = 'Programas',
  Time = 'Time', // New Page for Collective Strategy
  Jornada = 'Jornada',
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  rarity: 'comum' | 'rara' | 'lendaria';
  dateEarned?: string;
}

export interface PersonalRecord {
  metric: string;
  value: string;
  unit: string;
  date?: string;
}

export interface RadarDataPoint {
  subject: string;
  athlete: number;
  positionAvg: number;
  fullMark: number;
}

export interface WeeklyLoad {
  accumulated: number;
  goal: number;
  trainingsDone: number;
  trainingsPlanned: number;
}

export interface WatchData {
  restingHeartRate: number;
  hrv: number;
  steps: number;
  calories: number;
}

export interface Athlete {
  name: string;
  position: string;
  number: number;
  avatarUrl: string;
  titles: string[];
  earnedBadges: Badge[]; 
  displayedBadges: Badge[]; 
  prs: PersonalRecord[];
  radarData: RadarDataPoint[];
  weeklyLoad: WeeklyLoad;
  status: {
    level: 'Disponível' | 'Com restrição' | 'Em reabilitação';
    message: string;
    trend: 'up' | 'down' | 'stable'; // New: Form trend
  };
  acwr: {
    value: number;
    classification: 'baixo' | 'moderado' | 'alto';
  };
  watchData: WatchData;
  xp: number;
  level: number;
  coins: number;
  nextLevelXp: number;
  streak: number; 
}

export interface RecoveryProtocol {
  id: string;
  category: string;
  title: string;
  description: string;
  recommendedTime: string;
  benefits: string[];
  contraindications: string[];
}

export type EventType = 'treino' | 'jogo' | 'teste' | 'fisio' | 'recovery' | 'reuniao';

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: string; 
  rest?: string;
  load?: number; 
  suggestedLoad?: number; 
  coachNotes?: string; 
  videoUrl?: string; 
  actualReps?: number; 
  rir?: number; 
  feedback?: string; 
  done?: boolean;
}

export interface WorkoutBlock {
  title: string; 
  exercises: WorkoutExercise[];
}

export interface CalendarEvent {
  date: string; 
  type: EventType;
  title: string;
  time: string;
  description?: string;
  location?: string;
  programming?: WorkoutBlock[]; 
}

export type MessageCategory = 'Comissão' | 'Saúde' | 'Clube' | 'Sistema';

export interface Message {
  id: string;
  sender: string;
  category: MessageCategory;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
}

export type TrainingType = 'força' | 'campo' | 'corrida' | 'jogo' | 'recovery';
export type TrainingIntensity = 'baixa' | 'média' | 'alta';

export interface TrainingSession {
  id: string;
  date: string;
  type: TrainingType;
  duration: number; 
  rpe: number;
  intensity: TrainingIntensity;
  title: string;
}

export interface TrainingProgram {
    id: string;
    title: string;
    objective: 'velocidade' | 'força' | 'reabilitação';
    duration: string;
    level: 'iniciante' | 'intermediário' | 'avançado';
}

export interface Story {
  id: string;
  user: string;
  avatar: string;
  imageUrl: string;
  timeAgo: string;
  caption?: string;
}

export interface Post {
  id: string;
  author: string;
  handle?: string; 
  avatar: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  reposts?: number;
  timestamp: string;
  likedByUser: boolean;
  type?: 'text' | 'media' | 'achievement';
  stats?: { metric: string; value: string; diff: string };
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  trend: 'up' | 'down' | 'stable';
  isUser: boolean;
}

export interface GymRatGroup {
  id: string;
  name: string;
  entries: LeaderboardEntry[];
}

export interface VideoClip {
  id: string;
  number: number;
  title: string; 
  duration: string;
  thumbnail?: string;
}

export interface VideoCollection {
  id: string;
  title: string;
  date: string;
  type: 'JOGO' | 'TREINO' | 'SCOUT';
  thumbnail: string;
  clips: VideoClip[];
}

export interface PlaybookAssignment {
  position: string;
  alignment: string;
  runResp: string;
  passResp: string;
}

export interface PlaybookCard {
  id: string;
  title: string;
  imageUrl: string;
  assignments: PlaybookAssignment[];
}

export interface PlaybookInstall {
  id: string;
  title: string;
  category: string;
  cardCount: number;
  cards: PlaybookCard[];
}

export interface SuggestedAccount {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  category: 'Liga' | 'Atleta' | 'Time' | 'Mídia';
  isFollowing: boolean;
}

export type ProductCondition = 'Novo' | 'Usado - Bom' | 'Usado - Detalhes';
export type ProductCategory = 'Capacetes' | 'Pads' | 'Luvas' | 'Chuteiras' | 'Acessórios' | 'Merch' | 'Suplementos';

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: ProductCategory;
  condition: ProductCondition;
  seller: {
    name: string;
    avatar?: string;
    type: 'Loja' | 'Atleta';
    isTeammate?: boolean;
  };
  size?: string;
}

export type MissionCategory = 'DIARIA' | 'EXPLORACAO' | 'PREMIUM';
export type MissionStatus = 'PENDENTE' | 'EM_PROGRESSO' | 'CONCLUIDA' | 'RESGATADA';
export type MissionType = 'TREINO' | 'ESTUDO' | 'SAUDE' | 'ADMIN' | 'GERAL';

export interface Mission {
  id: string;
  category: MissionCategory;
  type: MissionType;
  title: string;
  subtitle?: string;
  xp: number;
  coins: number;
  status: MissionStatus;
  progress: number;
  target: number;
  actionLabel: string;
  image?: string;
  locked?: boolean;
  isFixed?: boolean;
  videoUrl?: string; 
  playbookId?: string; 
}

export interface TeamInvitation {
  email: string;
  teamName: string;
  teamLogo: string;
  role: string;
}

export interface WellnessLog {
  date: string;
  recoveryScore: number;
  sleepQuality?: string;
  soreness?: string;
  painLocation?: string[]; 
  stress?: string;
  actionTaken: string; 
}

export type NotificationType = 'alert' | 'info' | 'success' | 'reminder';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface GymPartner {
  id: string;
  name: string;
  distance: string;
  rating: number;
  image: string;
  plan: string;
}
