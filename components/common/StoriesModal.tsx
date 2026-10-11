
import React, { useEffect, useState } from 'react';
import { Story } from '../../types';
import { CloseIcon } from '../icons';

interface StoriesModalProps {
  stories: Story[];
  isOpen: boolean;
  onClose: () => void;
}

export const StoriesModal: React.FC<StoriesModalProps> = ({ stories, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(0);
      setProgress(0);
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex((c) => c + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 2; // Speed of progress
      });
    }, 100); // Update interval

    return () => clearInterval(timer);
  }, [isOpen, currentIndex, stories.length, onClose]);

  // Reset progress when index changes manually
  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  if (!isOpen) return null;

  const currentStory = stories[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Progress Bars */}
      <div className="absolute top-4 left-0 right-0 flex space-x-1 px-2 z-20">
        {stories.map((_, idx) => (
          <div key={idx} className="h-1 flex-1 bg-gray-600 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ 
                width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%' 
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-0 right-0 px-4 flex justify-between items-center z-20 mt-2">
        <div className="flex items-center">
          <img src={currentStory.avatar} alt={currentStory.user} className="w-8 h-8 rounded-full border border-white mr-2" />
          <div>
             <p className="text-white text-sm font-bold">{currentStory.user}</p>
             <p className="text-gray-300 text-xs">{currentStory.timeAgo}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white p-2">
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="relative w-full h-full flex items-center justify-center bg-black" onClick={handleNext}>
        {/* Left Tap Area */}
        <div className="absolute left-0 top-0 bottom-0 w-1/3 z-10" onClick={handlePrev} />
        
        <img 
          src={currentStory.imageUrl} 
          alt="Story" 
          className="max-h-full max-w-full object-contain"
        />

        {currentStory.caption && (
          <div className="absolute bottom-20 left-0 right-0 p-4 text-center">
            <p className="text-white bg-black/50 p-2 rounded-lg inline-block backdrop-blur-sm">
              {currentStory.caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
