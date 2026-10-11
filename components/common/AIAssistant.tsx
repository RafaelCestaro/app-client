
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, ChatBubbleIcon, CloseIcon } from '../icons';
import { ATHLETE_MOCK } from '../../constants';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', role: 'model', text: `Fala, ${ATHLETE_MOCK.name}! Sou seu Coach IA pessoal. Analisei seus dados do Locomotiva. Como posso te ajudar a melhorar seu jogo de Running Back hoje?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // System instruction tailored to the athlete
      const systemInstruction = `
        Você é um assistente de performance esportiva de elite, especializado em Futebol Americano, especificamente para a posição de Running Back (RB).
        Seu cliente é o Raphael, camisa 26 do time Locomotiva.
        
        Dados do Atleta:
        ${JSON.stringify(ATHLETE_MOCK)}
        
        Sua personalidade:
        - Motivador, mas técnico. Use gírias do futebol americano (gap, zone read, stiff arm, juke).
        - Focado em dados: use os PRs e estatísticas do Raphael para embasar seus conselhos.
        - Objetivo: Ajudar Raphael a ser o melhor RB do Brasil.
        
        Se o usuário perguntar sobre treinos, sugira exercícios baseados em explosão e agilidade.
        Se perguntar sobre o próximo jogo, deseje sorte e lembre de proteger a bola.
        Mantenha as respostas concisas e diretas, ideais para leitura rápida em mobile.
      `;

      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const modelMessageId = (Date.now() + 1).toString();
      // Add temporary loading indicator
      setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: 'Analisando tática...' }]);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.text,
          history: history,
          systemInstruction: systemInstruction
        })
      });

      if (!response.ok) {
        throw new Error("Erro na rede do Coach IA");
      }

      const data = await response.json();
      const replyText = data.text || "Desculpe, tive um problema tático de conexão. Pode repetir?";

      // Beautiful animated typewriter effect
      let currentLength = 0;
      const interval = setInterval(() => {
        if (currentLength < replyText.length) {
          const step = Math.min(3, replyText.length - currentLength); // Type 3 chars at a time for snappier response
          currentLength += step;
          const portion = replyText.substring(0, currentLength);
          setMessages(prev =>
            prev.map(msg => msg.id === modelMessageId ? { ...msg, text: portion } : msg)
          );
        } else {
          clearInterval(interval);
        }
      }, 15);

    } catch (error) {
      console.error("Erro na IA:", error);
      setMessages(prev => [
        ...prev.filter(msg => msg.text !== 'Analisando tática...'),
        { id: Date.now().toString(), role: 'model', text: "Desculpe, tive um problema tático aqui. Pode repetir a jogada?" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />

      {/* Chat Window */}
      <div className="fixed top-16 left-0 right-0 md:top-auto md:bottom-24 md:left-4 md:w-96 h-[calc(100vh-140px)] md:h-[500px] bg-white dark:bg-loco-gray md:rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border-t border-gray-200 dark:border-loco-gray-light animate-fade-in-up">
          
          {/* Header */}
          <div className="bg-loco-black p-4 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center space-x-3">
                <div className="bg-loco-gray-light p-1.5 rounded-full">
                    <ChatBubbleIcon className="w-5 h-5 text-loco-red" />
                </div>
                <div>
                    <h3 className="font-bold text-white">Coach IA</h3>
                    <p className="text-xs text-gray-400">Assistente Pessoal • Online</p>
                </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
                <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-loco-black/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-loco-red text-white rounded-br-none' 
                      : 'bg-gray-200 dark:bg-loco-gray-light text-black dark:text-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-loco-gray-light rounded-2xl rounded-bl-none p-3 flex space-x-1 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-loco-gray border-t border-gray-200 dark:border-loco-gray-light flex items-center gap-2 pb-safe">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Pergunte ao Coach..."
              className="flex-1 bg-gray-100 dark:bg-loco-black border-none rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-loco-red outline-none dark:text-white"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="p-3 bg-loco-red text-white rounded-full hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
    </>
  );
};
