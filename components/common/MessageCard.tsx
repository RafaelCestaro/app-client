
import React from 'react';
import { Message } from '../../types';

interface MessageCardProps {
  message: Message;
  onClick: () => void;
}

const categoryColors: { [key: string]: string } = {
  'Comissão': 'bg-blue-500',
  'Saúde': 'bg-green-500',
  'Clube': 'bg-yellow-500',
  'Sistema': 'bg-purple-500',
};

export const MessageCard: React.FC<MessageCardProps> = ({ message, onClick }) => {
  return (
    <div onClick={onClick} className="flex items-start p-4 border-b border-gray-200 dark:border-loco-gray-light cursor-pointer hover:bg-gray-100 dark:hover:bg-loco-gray-light transition">
      {!message.read && <div className="w-2.5 h-2.5 bg-loco-red rounded-full mr-3 mt-1.5 flex-shrink-0"></div>}
      <div className={`flex-grow ${message.read ? 'ml-[22px]' : ''}`}>
        <div className="flex justify-between items-baseline">
          <p className="font-bold text-black dark:text-white">{message.sender}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(message.timestamp).toLocaleDateString()}</p>
        </div>
        <p className="text-gray-800 dark:text-gray-200">{message.subject}</p>
        <div className="flex items-center mt-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${categoryColors[message.category]}`}>{message.category}</span>
        </div>
      </div>
    </div>
  );
};
