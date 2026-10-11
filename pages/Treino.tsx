
import React, { useState } from 'react';
import { Tabs } from '../components/common/Tabs';
import { Card } from '../components/common/Card';
import { TRAINING_SESSIONS_MOCK, TRAINING_PROGRAMS_MOCK } from '../constants';

const Treino: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Hoje');
  const TABS = ['Hoje', 'Histórico', 'Programas'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Hoje':
        return (
          <div className="space-y-6">
            <Card>
              <h3 className="font-bold text-lg mb-4 text-black dark:text-white">Check-in Diário</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Como você está se sentindo hoje?</p>
              {/* Simple wellness questionnaire mock */}
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span>Qualidade do Sono</span> <span className="font-bold text-loco-red">Bom</span></div>
                <div className="flex justify-between items-center"><span>Nível de Fadiga</span> <span className="font-bold text-green-500">Baixo</span></div>
                <div className="flex justify-between items-center"><span>Dores Musculares</span> <span className="font-bold text-green-500">Leve</span></div>
              </div>
            </Card>
            <Card>
              <h3 className="font-bold text-lg mb-4 text-black dark:text-white">Treino do Dia: Campo (Especialistas)</h3>
              <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">Registre os dados do seu treino de hoje.</p>
                  <div className="flex flex-col space-y-4">
                      <button className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition hover:bg-gray-700">Registrar Duração</button>
                      <button className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition hover:bg-gray-700">Registrar RPE</button>
                      <button className="w-full bg-loco-red text-white font-bold py-3 px-4 rounded-lg transition hover:bg-red-700">Marcar como Concluído</button>
                  </div>
              </div>
            </Card>
          </div>
        );
      case 'Histórico':
        return (
          <Card>
            <h3 className="font-bold text-lg mb-4 text-black dark:text-white">Histórico de Treinos</h3>
            <div className="space-y-3">
              {TRAINING_SESSIONS_MOCK.map(session => (
                <div key={session.id} className="p-3 bg-gray-100 dark:bg-loco-gray-light rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-black dark:text-white">{session.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(session.date + 'T12:00:00Z').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' })}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-bold capitalize text-loco-red">{session.type}</p>
                       <p className="text-xs text-gray-500 dark:text-gray-400">{session.duration} min / RPE {session.rpe}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      case 'Programas':
        return (
            <Card>
                <h3 className="font-bold text-lg mb-4 text-black dark:text-white">Programas de Treino</h3>
                <div className="space-y-3">
                {TRAINING_PROGRAMS_MOCK.map(program => (
                    <div key={program.id} className="p-4 bg-gray-100 dark:bg-loco-gray-light rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-black dark:text-white">{program.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Objetivo: {program.objective} | {program.duration}</p>
                        </div>
                        <button className="bg-loco-red text-white font-bold py-1 px-3 text-sm rounded-lg transition hover:bg-red-700">Ver</button>
                    </div>
                ))}
                </div>
            </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-black dark:text-white">Treino</h1>
      <Tabs tabs={TABS} activeTab={activeTab} onTabClick={setActiveTab} />
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Treino;
