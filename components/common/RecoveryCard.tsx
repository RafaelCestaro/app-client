
import React, { useState } from 'react';
import { Card } from './Card';
import { RecoveryProtocol } from '../../types';
import { ChevronDownIcon } from '../icons';

interface RecoveryCardProps {
  protocol: RecoveryProtocol;
}

export const RecoveryCard: React.FC<RecoveryCardProps> = ({ protocol }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="w-full">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div>
          <h3 className="font-bold text-lg text-black dark:text-white">{protocol.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{protocol.recommendedTime}</p>
        </div>
        <ChevronDownIcon className={`w-6 h-6 text-gray-500 dark:text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-4">
          <p className="text-gray-700 dark:text-gray-300">{protocol.description}</p>
          <div>
            <h4 className="font-semibold text-black dark:text-white">Benefícios:</h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              {protocol.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
            </ul>
          </div>
          {protocol.contraindications.length > 0 && (
            <div>
              <h4 className="font-semibold text-black dark:text-white">Contraindicações:</h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                {protocol.contraindications.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
          )}
          <div className="flex space-x-2 mt-4">
            <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition">Iniciar Timer</button>
            <button className="flex-1 bg-loco-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition">Concluir</button>
          </div>
        </div>
      )}
    </Card>
  );
};
