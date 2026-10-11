
import React, { useState } from 'react';
import { MESSAGES_MOCK, MESSAGE_NOTES_MOCK } from '../constants';
import { Message } from '../types';
import { CameraIcon, PlusIcon, PencilSquareIcon, CloseIcon } from '../components/icons';

const Mensagens: React.FC = () => {
  const [filter, setFilter] = useState('Principal');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  
  const [tabs] = useState(['Principal', 'Geral', 'Equipe', 'Outros']);

  // Combine mocks to simulate a real chat list
  const initialChatList = MESSAGES_MOCK.map(m => ({
    id: m.id,
    user: m.sender,
    avatar: `https://i.pravatar.cc/150?u=${m.sender.replace(' ', '')}`,
    lastMessage: m.subject,
    time: '50 min',
    isUnread: !m.read
  }));

  const initialExtraChats = [
    { id: 'ex1', user: 'QB_Lucas', avatar: 'https://i.pravatar.cc/150?u=qb01', lastMessage: 'Enviou um reel de tática...', time: '5 min', isUnread: true },
    { id: 'ex2', user: 'Coach_Defesa', avatar: 'https://i.pravatar.cc/150?u=coachD', lastMessage: '2 novas mensagens', time: '50 min', isUnread: true },
    { id: 'ex3', user: 'WR_Veloz', avatar: 'https://i.pravatar.cc/150?u=wr01', lastMessage: 'Visto há 2 h', time: '', isUnread: false },
    { id: 'ex4', user: 'LB_Paredao', avatar: 'https://i.pravatar.cc/150?u=lb55', lastMessage: 'Bora treinar perna hoje?', time: '2 h', isUnread: true },
    { id: 'ex5', user: 'Rookie_Kick', avatar: 'https://i.pravatar.cc/150?u=kicker', lastMessage: 'Enviado há 2 h', time: '', isUnread: false },
    { id: 'ex6', user: 'Dr_Fisio', avatar: 'https://i.pravatar.cc/150?u=fisio', lastMessage: 'Enviado há 2 h', time: '', isUnread: false },
  ];

  const [chatList, setChatList] = useState([...initialChatList, ...initialExtraChats]);

  // Mock users for "New Message"
  const availableUsers = [
    { id: 'u1', name: 'Coach Offensive', avatar: 'https://i.pravatar.cc/150?u=coachOff' },
    { id: 'u2', name: 'Team Manager', avatar: 'https://i.pravatar.cc/150?u=manager' },
    { id: 'u3', name: 'OL_Big', avatar: 'https://i.pravatar.cc/150?u=ol77' },
    { id: 'u4', name: 'Safety_Hawk', avatar: 'https://i.pravatar.cc/150?u=s21' },
  ];

  const handleSendMessage = (user: any, text: string) => {
    const newChat = {
        id: `new-${Date.now()}`,
        user: user.name,
        avatar: user.avatar,
        lastMessage: text || 'Nova conversa iniciada',
        time: 'Agora',
        isUnread: false
    };
    setChatList([newChat, ...chatList]);
    setIsNewMessageOpen(false);
  };

  // New Message Modal Component
  const NewMessageModal = () => {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [messageText, setMessageText] = useState('');

    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex flex-col animate-fade-in-up">
         <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <button onClick={() => setIsNewMessageOpen(false)} className="text-gray-400 hover:text-white">Cancelar</button>
            <h2 className="text-lg font-bold text-white">Nova Mensagem</h2>
            <button 
                disabled={!selectedUser}
                onClick={() => handleSendMessage(selectedUser, messageText)}
                className={`font-bold ${selectedUser ? 'text-loco-red' : 'text-gray-600'}`}
            >
                Enviar
            </button>
         </div>

         <div className="p-4 border-b border-gray-800">
            <span className="text-gray-400 mr-2">Para:</span>
            {selectedUser ? (
                <span className="bg-loco-red/20 text-loco-red px-2 py-1 rounded-lg text-sm font-bold">{selectedUser.name}</span>
            ) : (
                <input type="text" placeholder="Pesquisar..." className="bg-transparent outline-none text-white" />
            )}
         </div>

         <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-gray-500 text-sm font-bold mb-2">Sugestões</h3>
            {availableUsers.map(user => (
                <div 
                    key={user.id} 
                    onClick={() => setSelectedUser(user)}
                    className="flex items-center p-3 hover:bg-white/5 rounded-lg cursor-pointer"
                >
                    <img src={user.avatar} className="w-12 h-12 rounded-full mr-3" alt={user.name} />
                    <span className="text-white font-semibold">{user.name}</span>
                    {selectedUser?.id === user.id && (
                        <div className="ml-auto w-5 h-5 bg-loco-red rounded-full flex items-center justify-center">✓</div>
                    )}
                </div>
            ))}
         </div>
         
         {selectedUser && (
             <div className="p-4 bg-[#262626] pb-safe">
                 <input 
                    type="text" 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Escreva uma mensagem..." 
                    className="w-full bg-black text-white p-3 rounded-xl outline-none border border-gray-700 focus:border-loco-red"
                    autoFocus
                 />
             </div>
         )}
      </div>
    );
  };

  if (selectedMessage) {
    return (
      <div className="bg-black h-full p-4 text-white">
         <button onClick={() => setSelectedMessage(null)} className="text-white mb-4">← Voltar</button>
         <h2 className="text-xl font-bold">{selectedMessage.subject}</h2>
         <p className="mt-4">{selectedMessage.body}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-20 relative">
      
      {/* Search Bar */}
      <div className="px-4 py-2">
        <div className="bg-[#262626] rounded-xl flex items-center px-4 py-2.5 space-x-3">
            <div className="w-5 h-5 rounded-full border-2 border-blue-500/50 flex items-center justify-center">
                <div className="w-3 h-3 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <input 
                type="text" 
                placeholder="Interaja com Coach AI ou pesquise" 
                className="bg-transparent border-none outline-none text-sm text-gray-300 w-full placeholder-gray-500"
            />
        </div>
      </div>

      {/* Notes / Status Rail */}
      <div className="flex overflow-x-auto space-x-4 px-4 py-4 no-scrollbar">
        {MESSAGE_NOTES_MOCK.map((note) => (
            <div key={note.id} className="flex flex-col items-center min-w-[80px] relative">
                {/* Thought Bubble */}
                {note.note && (
                    <div className="absolute -top-2 z-10 bg-[#262626] text-[10px] px-2 py-1.5 rounded-xl text-center text-gray-200 max-w-[80px] line-clamp-2 shadow-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        {note.note}
                    </div>
                )}
                
                <div className="w-16 h-16 rounded-full mt-6 relative">
                    <img src={note.avatar} alt={note.user} className="w-full h-full rounded-full object-cover border border-gray-800" />
                    {note.isMe && (
                         <div className="absolute -top-1 -right-1 bg-[#262626] rounded-full p-1">
                             <PlusIcon className="w-3 h-3 text-gray-400" />
                         </div>
                    )}
                </div>
                <span className="text-xs text-gray-400 mt-1 truncate w-full text-center">
                    {note.isMe ? 'Sua nota' : note.user}
                </span>
            </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between px-4 mb-4">
          <div className="flex space-x-1 overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
                <button 
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-bold transition whitespace-nowrap ${
                        filter === tab ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    {tab}
                    {tab === 'Principal' && <span className="ml-1 text-loco-red text-xs">•</span>}
                </button>
            ))}
          </div>
      </div>

      {/* Message List */}
      <div className="px-4 space-y-4">
         {chatList.map((chat) => (
             <div key={chat.id} className="flex items-center justify-between active:bg-white/5 rounded-lg transition p-1 -mx-1 cursor-pointer">
                 <div className="flex items-center flex-1 overflow-hidden">
                     <div className="w-14 h-14 rounded-full flex-shrink-0 mr-3 relative">
                         <img src={chat.avatar} alt={chat.user} className="w-full h-full rounded-full object-cover" />
                         {/* Active Indicator Mock */}
                         {Math.random() > 0.7 && (
                             <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-black"></div>
                         )}
                     </div>
                     <div className="flex-1 overflow-hidden">
                         <p className="text-sm font-semibold text-white truncate">{chat.user}</p>
                         <div className="flex items-center text-sm text-gray-400 truncate">
                            <p className={`truncate ${chat.isUnread ? 'text-white font-bold' : ''}`}>
                                {chat.lastMessage}
                            </p>
                            {chat.time && <span className="mx-1">·</span>}
                            <span>{chat.time}</span>
                         </div>
                     </div>
                 </div>
                 
                 <div className="flex items-center pl-2">
                     {chat.isUnread && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-4"></div>}
                     <button className="text-gray-400">
                         <CameraIcon className="w-6 h-6" />
                     </button>
                 </div>
             </div>
         ))}
      </div>

      {/* New Message Floating Button (Page Specific) */}
      <button 
        onClick={() => setIsNewMessageOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-4 z-40 p-4 rounded-full shadow-xl bg-loco-red hover:scale-105 text-white flex items-center justify-center transition-all duration-200"
      >
        <PencilSquareIcon className="w-6 h-6" />
      </button>

      {isNewMessageOpen && <NewMessageModal />}
    </div>
  );
};

export default Mensagens;
