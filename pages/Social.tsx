
import React, { useState } from 'react';
import { FEED_MOCK, STORIES_MOCK, TEXT_FEED_MOCK } from '../constants';
import { StoriesModal } from '../components/common/StoriesModal';
import { HeartIcon, ChatBubbleIcon, RepeatIcon, ShareIcon, MessageCircleIcon, PlusIcon, VideoIcon, GridIcon, TrophyIcon, ChartBarIcon } from '../components/icons';

const Social: React.FC = () => {
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Destaques');
  
  // Simulated "Data-Driven" Feed
  // In a real app, these would be generated from user activities (PRs, Streaks, etc.)
  const dataDrivenFeed = [
      {
          id: 'auto1',
          type: 'achievement',
          author: 'Raphael',
          handle: '@raphaelRB26',
          avatar: 'https://i.pravatar.cc/300?u=raphaelRB26',
          timestamp: '2h',
          title: 'Nova Marca Pessoal! 🚨',
          content: 'Registrou um novo PR no Agachamento: 180kg (+5kg). O OVR de Força subiu para 91.',
          stats: { metric: 'Agachamento', value: '180kg', diff: '+2.5%' },
          likes: 24,
          comments: 5
      },
      ...TEXT_FEED_MOCK.map(p => ({ ...p, type: 'text' })),
      ...FEED_MOCK.map(p => ({ ...p, type: 'media' }))
  ].sort(() => Math.random() - 0.5);

  const filters = ['Destaques', 'Conquistas', 'Film Room', 'Gameday'];

  return (
    <div className="max-w-2xl mx-auto pb-24 pt-2">
      
      {/* Title Header */}
      <div className="px-4 mb-4">
          <h1 className="text-2xl font-black italic tracking-tighter text-white">HUDDLE <span className="text-loco-red text-sm not-italic font-normal tracking-normal ml-1">Comunidade</span></h1>
          <p className="text-xs text-gray-500">Onde os números viram respeito.</p>
      </div>

      <div className="bg-white dark:bg-loco-gray md:rounded-xl shadow-sm border-y md:border border-gray-200 dark:border-gray-800 overflow-hidden">
        
        {/* Stories Section (Sideline Cams) */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 overflow-x-auto no-scrollbar touch-pan-x bg-gray-50 dark:bg-[#151515]">
            <div className="flex space-x-4 min-w-max">
                {STORIES_MOCK.map((story) => (
                    <div key={story.id} className="flex flex-col items-center space-y-1 cursor-pointer" onClick={() => setIsStoriesOpen(true)}>
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 to-loco-red p-[2px]">
                            <img className="w-full h-full rounded-full object-cover border border-white dark:border-loco-gray" src={story.avatar} alt={story.user} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300 truncate w-14 text-center">{story.user.split(' ')[0]}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center px-4 py-3 space-x-2 overflow-x-auto no-scrollbar bg-white dark:bg-loco-gray border-b border-gray-200 dark:border-gray-800">
            {filters.map(f => (
                <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`
                        px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition whitespace-nowrap
                        ${activeFilter === f 
                            ? 'bg-white text-black' 
                            : 'bg-black/40 text-gray-500 hover:bg-black/60'}
                    `}
                >
                    {f}
                </button>
            ))}
        </div>

        {/* Feed Section */}
        <div className="bg-[#f5f5f5] dark:bg-[#0a0a0a]">
            {dataDrivenFeed.map((post: any) => (
                <div key={post.id} className="bg-white dark:bg-loco-gray mb-2 md:mb-0 md:border-b border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-[#252525] transition cursor-pointer">
                    <div className="flex space-x-3">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <img className="w-10 h-10 rounded-lg object-cover" src={post.avatar} alt={post.author} />
                        </div>
                        
                        {/* Content Body */}
                        <div className="flex-1 min-w-0">
                            
                            {/* Special Layout for Achievements (The Data Hook) */}
                            {post.type === 'achievement' ? (
                                <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-3 border border-gray-800 mb-2">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <TrophyIcon className="w-4 h-4 text-yellow-500" />
                                            <span className="text-xs font-bold text-yellow-500 uppercase">{post.title}</span>
                                        </div>
                                        <span className="text-[10px] text-gray-500">{post.timestamp}</span>
                                    </div>
                                    <p className="text-white text-sm font-medium mb-3">{post.content}</p>
                                    
                                    {/* Stat Visualization */}
                                    <div className="flex items-center bg-gray-800 rounded-lg p-2">
                                        <div className="bg-loco-red/20 p-2 rounded-md mr-3">
                                            <ChartBarIcon className="w-5 h-5 text-loco-red" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase">{post.stats.metric}</p>
                                            <div className="flex items-baseline space-x-2">
                                                <span className="text-lg font-bold text-white">{post.stats.value}</span>
                                                <span className="text-xs font-bold text-green-500">{post.stats.diff}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Standard Header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1 truncate">
                                            <span className="font-bold text-black dark:text-white text-sm truncate">{post.author}</span>
                                            <span className="text-gray-500 text-xs truncate">{post.handle}</span>
                                            <span className="text-gray-400 text-xs">· {post.timestamp}</span>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-900 dark:text-gray-200 text-sm mt-1 whitespace-pre-wrap leading-normal break-words font-medium">
                                        {post.content}
                                    </p>

                                    {post.imageUrl && (
                                        <div className="mt-2 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                            <img src={post.imageUrl} alt="Post media" className="w-full h-auto object-cover block" />
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Action Bar */}
                            <div className="flex items-center justify-between mt-3 max-w-md pr-4 opacity-60">
                                <button className="flex items-center space-x-1 text-xs font-bold hover:text-white transition">
                                    <MessageCircleIcon className="w-4 h-4" />
                                    <span>{post.comments}</span>
                                </button>
                                <button className="flex items-center space-x-1 text-xs font-bold hover:text-green-400 transition">
                                    <RepeatIcon className="w-4 h-4" />
                                    <span>{post.reposts || 0}</span>
                                </button>
                                <button className="flex items-center space-x-1 text-xs font-bold hover:text-loco-red transition">
                                    <HeartIcon className="w-4 h-4" />
                                    <span>{post.likes}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </div>

      <StoriesModal 
        isOpen={isStoriesOpen} 
        stories={STORIES_MOCK} 
        onClose={() => setIsStoriesOpen(false)} 
      />
    </div>
  );
};

export default Social;
