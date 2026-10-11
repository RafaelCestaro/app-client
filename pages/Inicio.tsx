
import React, { useState } from 'react';
import { FEED_MOCK, STORIES_MOCK } from '../constants';
import { StoriesModal } from '../components/common/StoriesModal';
import { HeartIcon, HeartIconSolid, ChatBubbleIcon } from '../components/icons';
import { Card } from '../components/common/Card';

// Esta página agora serve como a "Home" (Feed Social)
const Inicio: React.FC = () => {
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set(FEED_MOCK.filter(p => p.likedByUser).map(p => p.id)));

  const toggleLike = (id: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Stories Bar */}
      {/* Adicionado touch-pan-x para melhor resposta ao toque e overflow-x-scroll explícito */}
      <div className="bg-white dark:bg-loco-gray rounded-xl p-4 shadow-sm overflow-x-scroll no-scrollbar touch-pan-x">
        <div className="flex space-x-4 min-w-max">
            {/* My Story Add Button */}
            <div className="flex flex-col items-center space-y-1 cursor-pointer">
                <div className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-600 p-0.5 relative">
                    <img className="w-full h-full rounded-full object-cover" src="https://i.pravatar.cc/300?u=raphaelRB26" alt="Your Story" />
                    <div className="absolute bottom-0 right-0 bg-loco-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs border border-white dark:border-loco-gray">
                        +
                    </div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300 truncate w-16 text-center">Seu story</span>
            </div>

            {/* Other Stories */}
            {STORIES_MOCK.map((story) => (
                <div key={story.id} className="flex flex-col items-center space-y-1 cursor-pointer" onClick={() => setIsStoriesOpen(true)}>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-loco-red p-0.5">
                        <img className="w-full h-full rounded-full object-cover border-2 border-white dark:border-loco-gray" src={story.avatar} alt={story.user} />
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-300 truncate w-16 text-center">{story.user.split(' ')[0]}</span>
                </div>
            ))}
        </div>
      </div>

      <StoriesModal 
        isOpen={isStoriesOpen} 
        stories={STORIES_MOCK} 
        onClose={() => setIsStoriesOpen(false)} 
      />

      {/* Posts Feed */}
      <div className="space-y-6">
        {FEED_MOCK.map((post) => (
            <Card key={post.id} className="p-0 overflow-hidden">
                {/* Header */}
                <div className="p-4 flex items-center">
                    <img className="w-10 h-10 rounded-full object-cover mr-3" src={post.avatar} alt={post.author} />
                    <div>
                        <p className="font-bold text-black dark:text-white text-sm">{post.author}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-2">
                    <p className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap">{post.content}</p>
                </div>

                {/* Image */}
                {post.imageUrl && (
                    <div className="w-full bg-gray-100 dark:bg-black">
                        <img className="w-full object-cover max-h-96" src={post.imageUrl} alt="Post content" />
                    </div>
                )}

                {/* Actions */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex space-x-4 mb-2">
                        <button onClick={() => toggleLike(post.id)} className="flex items-center space-x-1 group">
                            {likedPosts.has(post.id) ? (
                                <HeartIconSolid className="w-6 h-6 text-loco-red transition-transform transform group-active:scale-125" />
                            ) : (
                                <HeartIcon className="w-6 h-6 text-gray-500 dark:text-gray-300 group-hover:text-loco-red transition" />
                            )}
                        </button>
                        <button className="flex items-center space-x-1">
                            <ChatBubbleIcon className="w-6 h-6 text-gray-500 dark:text-gray-300 hover:text-loco-red transition" />
                        </button>
                    </div>
                    <div className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        {likedPosts.has(post.id) ? post.likes + 1 : post.likes} curtidas
                    </div>
                    {post.comments > 0 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 cursor-pointer">
                            Ver todos os {post.comments} comentários
                        </div>
                    )}
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
};

export default Inicio;
