
import React, { useState } from 'react';
import { VIDEO_LIBRARY_MOCK } from '../constants';
import { VideoCollection, VideoClip } from '../types';
import { VideoIcon, CloseIcon } from '../components/icons';

const Biblioteca: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<VideoCollection | null>(null);
  const [selectedClip, setSelectedClip] = useState<VideoClip | null>(null);

  const handleCollectionClick = (collection: VideoCollection) => {
    setSelectedCollection(collection);
    if (collection.clips.length > 0) {
      setSelectedClip(collection.clips[0]);
    }
  };

  const handleBack = () => {
    setSelectedCollection(null);
    setSelectedClip(null);
  };

  if (selectedCollection) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button onClick={handleBack} className="text-gray-500 hover:text-white dark:text-gray-400 mr-2 text-sm font-bold">
             ← Voltar
          </button>
          <h2 className="text-xl font-bold text-black dark:text-white">{selectedCollection.title}</h2>
        </div>

        <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
            {/* Video Player Area */}
            <div className="flex-1 flex flex-col bg-black rounded-lg overflow-hidden shadow-xl relative">
                <div className="flex-1 bg-black flex items-center justify-center relative">
                    {selectedClip ? (
                         <div className="text-center w-full">
                            {/* Placeholder for Video Player */}
                            <div className="aspect-video w-full bg-gray-900 flex items-center justify-center relative">
                                 <img src={selectedCollection.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
                                 <div className="z-10 text-center">
                                    <div className="w-16 h-16 bg-loco-red rounded-full flex items-center justify-center mx-auto mb-2 cursor-pointer hover:scale-110 transition">
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                                    </div>
                                    <p className="text-white font-bold text-xl">{selectedClip.title}</p>
                                    <p className="text-gray-400 text-sm">Clip {selectedClip.number} • {selectedClip.duration}</p>
                                 </div>
                            </div>
                            {/* Hudl-like controls mock */}
                            <div className="h-12 bg-gray-900 border-t border-gray-800 flex items-center px-4 justify-between">
                                <div className="text-white text-xs">00:00 / {selectedClip.duration}</div>
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-white"></div>
                                    <div className="w-20 h-1 bg-gray-700 rounded-full self-center"></div>
                                </div>
                            </div>
                         </div>
                    ) : (
                        <p className="text-gray-500">Selecione um clipe</p>
                    )}
                </div>
                <div className="bg-gray-900 p-2 text-white text-sm border-t border-gray-800 flex justify-between">
                   <span>{selectedClip ? `Clipe ${selectedClip.number} / ${selectedCollection.clips.length}` : 'Nenhum clipe'}</span>
                   <span>1x</span>
                </div>
            </div>

            {/* Playlist / Clips List */}
            <div className="w-full md:w-80 bg-gray-900 rounded-lg border border-gray-800 flex flex-col h-64 md:h-auto">
                <div className="p-3 border-b border-gray-800 bg-gray-800">
                    <h3 className="text-white font-bold text-sm uppercase">Clipes ({selectedCollection.clips.length})</h3>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {selectedCollection.clips.map(clip => (
                        <div 
                            key={clip.id} 
                            onClick={() => setSelectedClip(clip)}
                            className={`flex items-center p-3 border-b border-gray-800 cursor-pointer transition hover:bg-gray-700 ${selectedClip?.id === clip.id ? 'bg-loco-red/20 border-l-4 border-l-loco-red' : ''}`}
                        >
                            <span className="text-gray-400 font-mono text-sm w-8">{clip.number}</span>
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${selectedClip?.id === clip.id ? 'text-loco-red' : 'text-white'}`}>{clip.title}</p>
                                <p className="text-xs text-gray-500">{clip.duration}</p>
                            </div>
                            <div className="text-gray-500 text-lg">+</div>
                        </div>
                    ))}
                </div>
                 <div className="p-2 border-t border-gray-800 bg-gray-800 flex justify-between">
                     <button className="bg-gray-700 text-white px-3 py-1 rounded text-xs font-bold">Filtros</button>
                     <button className="bg-gray-700 text-white px-3 py-1 rounded text-xs font-bold">Comentários</button>
                 </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-black dark:text-white">Biblioteca de Vídeos</h1>
      
      {/* Filters Mock */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
          {['Todos', 'Jogos', 'Treinos', 'Scout', 'Favoritos'].map(f => (
               <button key={f} className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                   {f}
               </button>
          ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VIDEO_LIBRARY_MOCK.map(collection => (
          <div 
            key={collection.id} 
            onClick={() => handleCollectionClick(collection)}
            className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 border border-gray-800"
          >
             <div className="aspect-video w-full overflow-hidden relative">
                <img src={collection.thumbnail} alt={collection.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-60 group-hover:opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 p-3 rounded-full group-hover:bg-loco-red transition">
                        <VideoIcon className="w-8 h-8 text-white" />
                    </div>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                    {collection.type}
                </div>
             </div>
             <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1">{collection.title}</h3>
                <p className="text-sm text-gray-400">{collection.date} • {collection.clips.length} Itens</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Biblioteca;
