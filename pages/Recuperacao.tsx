
import React from 'react';
import { RECOVERY_PROTOCOLS_MOCK } from '../constants';
import { RecoveryCard } from '../components/common/RecoveryCard';

const Recuperacao: React.FC = () => {
  const categories = [...new Set(RECOVERY_PROTOCOLS_MOCK.map(p => p.category))];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-black dark:text-white">Hub de Recuperação</h1>
      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-bold text-loco-red border-b-2 border-loco-red pb-1">{category}</h2>
          <div className="space-y-4">
            {RECOVERY_PROTOCOLS_MOCK.filter(p => p.category === category).map(protocol => (
              <RecoveryCard key={protocol.id} protocol={protocol} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recuperacao;
