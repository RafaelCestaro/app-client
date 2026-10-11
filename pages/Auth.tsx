
import React, { useState, useEffect } from 'react';
import { PENDING_INVITATIONS } from '../constants';
import { TeamInvitation } from '../types';
import { CheckCircleSolidIcon, TrophyIcon } from '../components/icons';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedSport, setSelectedSport] = useState<string>(''); // Novo estado para esporte
  const [rememberMe, setRememberMe] = useState(false);
  
  // Estado para convite
  const [invitation, setInvitation] = useState<TeamInvitation | null>(null);

  // Simulação de verificação de convite ao digitar email
  useEffect(() => {
    if (mode === 'register' && email.includes('@')) {
      const invite = PENDING_INVITATIONS.find(inv => inv.email.toLowerCase() === email.toLowerCase());
      setInvitation(invite || null);
    } else {
      setInvitation(null);
    }
  }, [email, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    if (mode === 'register' && !selectedSport) {
        alert("Por favor, selecione sua modalidade esportiva.");
        return;
    }
    
    // Lógica de Persistência (Simulada)
    if (mode === 'login') {
        if (rememberMe) {
            localStorage.setItem('hudl_remember', 'true');
            localStorage.setItem('hudl_email', email);
        } else {
            localStorage.removeItem('hudl_remember');
            localStorage.removeItem('hudl_email');
        }
    } else {
        // Salvar esporte escolhido (simulado)
        localStorage.setItem('hudl_sport', selectedSport);
    }

    // Simulação de autenticação
    setTimeout(() => {
        onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-loco-black p-4 font-sans text-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-loco-red/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Logo Area */}
        <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-wider mb-2">HUDL<span className="text-loco-red">MODE</span></h1>
            <p className="text-gray-400">A jornada do craque começa aqui.</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-8 rounded-2xl shadow-2xl animate-fade-in">
            
            <h2 className="text-2xl font-bold mb-6 text-center">
                {mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                    <div className="animate-fade-in">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Nome Completo</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 focus:border-loco-red focus:ring-1 focus:ring-loco-red outline-none transition text-white placeholder-gray-600"
                            placeholder="Ex: Raphael Cestaro"
                            required
                        />
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">E-mail</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 focus:border-loco-red focus:ring-1 focus:ring-loco-red outline-none transition text-white placeholder-gray-600"
                        placeholder="seu@email.com"
                        required
                    />
                </div>

                {/* Team Invitation Card (Simulação) */}
                {invitation && mode === 'register' && (
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 p-4 rounded-xl flex items-center animate-fade-in space-x-4">
                        <img src={invitation.teamLogo} alt="Team" className="w-12 h-12 bg-white rounded-full p-1" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-400 uppercase font-bold">Convite Encontrado</p>
                            <p className="font-bold text-white text-lg">{invitation.teamName}</p>
                            <p className="text-xs text-green-500 font-bold flex items-center mt-1">
                                <CheckCircleSolidIcon className="w-3 h-3 mr-1" /> 
                                Vínculo automático como {invitation.role}
                            </p>
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Senha</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 focus:border-loco-red focus:ring-1 focus:ring-loco-red outline-none transition text-white placeholder-gray-600"
                        placeholder="••••••••"
                        required
                    />
                </div>

                {/* SPORT SELECTION (Only in Register Mode) */}
                {mode === 'register' && (
                    <div className="pt-2 animate-fade-in">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Sua Modalidade</label>
                        <div className="grid grid-cols-2 gap-3">
                            <div 
                                onClick={() => setSelectedSport('football')}
                                className={`cursor-pointer rounded-xl p-3 border-2 transition-all duration-200 flex flex-col items-center justify-center text-center
                                    ${selectedSport === 'football' 
                                        ? 'bg-loco-red/10 border-loco-red' 
                                        : 'bg-black/30 border-gray-700 hover:border-gray-500 opacity-70 hover:opacity-100'}
                                `}
                            >
                                <span className="text-2xl mb-1">🏈</span>
                                <span className={`text-xs font-bold ${selectedSport === 'football' ? 'text-white' : 'text-gray-400'}`}>Football</span>
                            </div>

                            <div 
                                onClick={() => setSelectedSport('soccer')}
                                className={`cursor-pointer rounded-xl p-3 border-2 transition-all duration-200 flex flex-col items-center justify-center text-center
                                    ${selectedSport === 'soccer' 
                                        ? 'bg-green-500/10 border-green-500' 
                                        : 'bg-black/30 border-gray-700 hover:border-gray-500 opacity-70 hover:opacity-100'}
                                `}
                            >
                                <span className="text-2xl mb-1">⚽</span>
                                <span className={`text-xs font-bold ${selectedSport === 'soccer' ? 'text-white' : 'text-gray-400'}`}>Futebol</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-600 text-center mt-2 italic">Outros esportes em breve.</p>
                    </div>
                )}

                {/* Remember Me Checkbox */}
                {mode === 'login' && (
                    <div className="flex items-center pl-1">
                        <input 
                            id="remember-me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-700 bg-black/50 text-loco-red focus:ring-loco-red cursor-pointer"
                        />
                        <label htmlFor="remember-me" className="ml-2 text-sm text-gray-400 cursor-pointer select-none">
                            Lembrar de mim
                        </label>
                    </div>
                )}

                <button 
                    type="submit"
                    className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition transform active:scale-95 mt-4
                        ${mode === 'register' && !selectedSport 
                            ? 'bg-gray-700 cursor-not-allowed text-gray-400' 
                            : 'bg-loco-red hover:bg-red-700 shadow-loco-red/20'}
                    `}
                    disabled={mode === 'register' && !selectedSport}
                >
                    {mode === 'login' ? 'Entrar' : 'Criar Conta'}
                </button>
            </form>
            
            <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                    {mode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                    <button 
                        onClick={() => {
                            setMode(mode === 'login' ? 'register' : 'login');
                            setInvitation(null);
                            setEmail('');
                            setPassword('');
                            setSelectedSport('');
                        }}
                        className="text-white font-bold ml-2 hover:underline"
                    >
                        {mode === 'login' ? 'Cadastre-se' : 'Faça Login'}
                    </button>
                </p>
            </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-8">
            &copy; 2024 HudlMode App. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default Auth;
