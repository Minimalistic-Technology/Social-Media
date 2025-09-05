"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';


interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

interface Story {
  id: string;
  user: User;
  image: string;
  viewed?: boolean;
}

interface UserStoryGroup {
  user: User;
  stories: Story[];
  viewed?: boolean;
}

const Stories: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userStories, setUserStories] = useState<Story[]>([]);
  const [otherStories] = useState<Story[]>([
    {
      id: '2',
      user: { id: '2', name: 'Lila James', username: 'lila_james', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face' },
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face'
    },
    {
      id: '3',
      user: { id: '3', name: 'Winnie Hale', username: 'winnie_h', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face' },
      image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=60&h=60&fit=crop&crop=face'
    },
    {
      id: '4',
      user: { id: '4', name: 'Daniel Bale', username: 'daniel_b', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face' },
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'
    },
    {
      id: '5',
      user: { id: '5', name: 'Jane Doe', username: 'jane_d', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&crop=face' },
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=60&h=60&fit=crop&crop=face'
    },
    {
      id: '6',
      user: { id: '6', name: 'Tina White', username: 'tina_w', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&crop=face' },
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=60&h=60&fit=crop&crop=face'
    },
     {
      id: '7',
      user: { id: '7', name: 'Tina White', username: 'tina_w', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&crop=face' },
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=60&h=60&fit=crop&crop=face'
    },
     {
      id: '8',
      user: { id: '8', name: 'Tina White', username: 'tina_w', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&crop=face' },
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=60&h=60&fit=crop&crop=face'
    },
     {
      id: '9',
      user: { id: '9', name: 'Tina White', username: 'tina_w', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&crop=face' },
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=60&h=60&fit=crop&crop=face'
    }
  ]);

  const [currentUserStoryIndex, setCurrentUserStoryIndex] = useState<number | null>(null);
  const [currentOtherStoryIndex, setCurrentOtherStoryIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const handleAddStory = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        const newStory: Story = {
          id: Date.now().toString(),
          user: { 
            id: '1', 
            name: 'Your Story', 
            username: 'you', 
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face' 
          },
          image: imageUrl
        };

        setUserStories(prev => [...prev, newStory]);
      };
      reader.readAsDataURL(file);
    }
    
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleYourStoryClick = () => {
    if (userStories.length > 0) {
      setCurrentUserStoryIndex(0);
      setProgress(0);
    } else {
      handleAddStory();
    }
  };

  const handleOtherStoryClick = (index: number) => {
    setCurrentOtherStoryIndex(index);
    setProgress(0);
  };

  const closeStoryViewer = () => {
    setCurrentUserStoryIndex(null);
    setCurrentOtherStoryIndex(null);
    setProgress(0);
  };

  const goToNextUserStory = () => {
    if (currentUserStoryIndex !== null && currentUserStoryIndex < userStories.length - 1) {
      setCurrentUserStoryIndex(currentUserStoryIndex + 1);
      setProgress(0);
    } else {
      closeStoryViewer();
    }
  };

  const goToPrevUserStory = () => {
    if (currentUserStoryIndex !== null && currentUserStoryIndex > 0) {
      setCurrentUserStoryIndex(currentUserStoryIndex - 1);
      setProgress(0);
    }
  };

  const goToNextOtherStory = () => {
    if (currentOtherStoryIndex !== null && currentOtherStoryIndex < otherStories.length - 1) {
      setCurrentOtherStoryIndex(currentOtherStoryIndex + 1);
      setProgress(0);
    } else {
      closeStoryViewer();
    }
  };

  const goToPrevOtherStory = () => {
    if (currentOtherStoryIndex !== null && currentOtherStoryIndex > 0) {
      setCurrentOtherStoryIndex(currentOtherStoryIndex - 1);
      setProgress(0);
    }
  };

  // Auto progress timer
  useEffect(() => {
    if (currentUserStoryIndex !== null || currentOtherStoryIndex !== null) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (currentUserStoryIndex !== null) {
              goToNextUserStory();
            } else {
              goToNextOtherStory();
            }
            return 0;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [currentUserStoryIndex, currentOtherStoryIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (currentUserStoryIndex !== null || currentOtherStoryIndex !== null) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          if (currentUserStoryIndex !== null) {
            goToNextUserStory();
          } else {
            goToNextOtherStory();
          }
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (currentUserStoryIndex !== null) {
            goToPrevUserStory();
          } else {
            goToPrevOtherStory();
          }
        } else if (e.key === 'Escape') {
          closeStoryViewer();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentUserStoryIndex, currentOtherStoryIndex]);

  const getCurrentStory = () => {
    if (currentUserStoryIndex !== null) {
      return userStories[currentUserStoryIndex];
    } else if (currentOtherStoryIndex !== null) {
      return otherStories[currentOtherStoryIndex];
    }
    return null;
  };

  const getCurrentStories = () => {
    if (currentUserStoryIndex !== null) {
      return userStories;
    } else if (currentOtherStoryIndex !== null) {
      return otherStories;
    }
    return [];
  };

  const getCurrentIndex = () => {
    return currentUserStoryIndex !== null ? currentUserStoryIndex : currentOtherStoryIndex;
  };

  return (
    <>
      <div className="mb-8 pl-7 ">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="flex space-x-7 overflow-x-auto pb-4">
          {/* Your Story Box */}
          <div 
            className="flex-shrink-0 text-center cursor-pointer group"
            onClick={handleYourStoryClick}
          >
            <div className="relative">
              <div className={`w-16 h-16 rounded-2xl p-1 ${
                userStories.length > 0
                  ? 'bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400'
                  : 'bg-gradient-to-br from-purple-400 to-pink-400'
              } group-hover:scale-105 transition-transform duration-200`}>
                <img 
                  src={userStories.length > 0 ? userStories[userStories.length - 1].image : 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face'} 
                  alt="Your Story" 
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                <Plus className="w-4 h-4" />
              </div>
              {userStories.length > 1 && (
                <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {userStories.length}
                </div>
              )}
            </div>
            <p className="text-xs mt-2 text-gray-600 dark:text-gray-400 max-w-[64px] truncate">
              Your Story
            </p>
          </div>

          {/* Other Users' Stories */}
          {otherStories.map((story, index) => (
            <div 
              key={story.id} 
              className="flex-shrink-0 text-center cursor-pointer group"
              onClick={() => handleOtherStoryClick(index)}
            >
              <div className="relative">
                <div className={`w-16 h-16 rounded-2xl p-1 ${
                  story.viewed
                    ? 'bg-gray-300 dark:bg-gray-600'
                    : 'bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400'
                } group-hover:scale-105 transition-transform duration-200`}>
                  <img 
                    src={story.image} 
                    alt={story.user.name} 
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
              </div>
              <p className="text-xs mt-2 text-gray-600 dark:text-gray-400 max-w-[64px] truncate">
                {story.user.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {(currentUserStoryIndex !== null || currentOtherStoryIndex !== null) && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-sm mx-auto">
            {/* Progress bars */}
            <div className="absolute top-4 left-4 right-4 flex space-x-1 z-10">
              {getCurrentStories().map((_, index) => (
                <div key={index} className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{ 
                      width: index === getCurrentIndex() ? `${progress}%` : 
                             index < getCurrentIndex()! ? '100%' : '0%' 
                    }}
                  />
                </div>
              ))}
            </div>

            {/* User info */}
            <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10 mt-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={getCurrentStory()?.user.avatar} 
                  alt={getCurrentStory()?.user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-white text-sm font-medium">{getCurrentStory()?.user.name}</p>
                  <p className="text-gray-300 text-xs">
                    {currentUserStoryIndex !== null ? `${getCurrentIndex()! + 1}/${userStories.length}` : '2h ago'}
                  </p>
                </div>
              </div>
              <button 
                onClick={closeStoryViewer}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Story image */}
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={getCurrentStory()?.image} 
                alt={getCurrentStory()?.user.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Navigation */}
            <div className="absolute inset-y-0 left-0 w-1/3 cursor-pointer" onClick={
              currentUserStoryIndex !== null ? goToPrevUserStory : goToPrevOtherStory
            } />
            <div className="absolute inset-y-0 right-0 w-1/3 cursor-pointer" onClick={
              currentUserStoryIndex !== null ? goToNextUserStory : goToNextOtherStory
            } />

            {/* Navigation arrows (visible on hover) */}
            {getCurrentIndex()! > 0 && (
              <button 
                onClick={currentUserStoryIndex !== null ? goToPrevUserStory : goToPrevOtherStory}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30 rounded-full p-2"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            
            {getCurrentIndex()! < getCurrentStories().length - 1 && (
              <button 
                onClick={currentUserStoryIndex !== null ? goToNextUserStory : goToNextOtherStory}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30 rounded-full p-2"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Add story button when viewing your stories */}
            {currentUserStoryIndex !== null && (
              <button 
                onClick={() => {
                  closeStoryViewer();
                  handleAddStory();
                }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-purple-600 text-white rounded-full p-3 transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Stories;