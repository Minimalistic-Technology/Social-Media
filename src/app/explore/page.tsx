"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Play, Volume2, VolumeX, Pause, Share, User } from 'lucide-react';
import Topbar from '../Components/Topbar';

import Sidebar from '../Components/Sidebar';


interface Reel {
  id: string;
  username: string;
  avatar: string;
  videoUrl: string;
  thumbnail: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
  duration: string;
  isVerified?: boolean;
}

const ExploreReels: React.FC = () => {
  const [selectedReel, setSelectedReel] = useState<string | null>(null);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [hoveredReel, setHoveredReel] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const fullscreenVideoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const reelsContainerRef = useRef<HTMLDivElement>(null);

  // Mock data for reels
  const reels: Reel[] = [
    {
      id: '1',
      username: 'travel_vibes',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
      caption: 'Beautiful sunset at the beach 🌅 #sunset #beach #paradise',
      likes: 15420,
      comments: 234,
      isLiked: false,
      isSaved: false,
      duration: '0:15',
      isVerified: true
    },
    {
      id: '2',
      username: 'foodie_life',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=600&fit=crop',
      caption: 'Perfect pizza recipe! 🍕 Who wants the recipe?',
      likes: 8932,
      comments: 167,
      isLiked: true,
      isSaved: false,
      duration: '0:23'
    },
   
    {
      id: '4',
      username: 'art_studio',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop',
      caption: 'Creating magic with watercolors ✨ #art #painting',
      likes: 5743,
      comments: 145,
      isLiked: false,
      isSaved: false,
      duration: '1:12'
    },
    {
      id: '5',
      username: 'tech_insider',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=600&fit=crop',
      caption: 'Latest iPhone features revealed! 📱 #tech #apple',
      likes: 23567,
      comments: 456,
      isLiked: true,
      isSaved: true,
      duration: '0:38',
      isVerified: true
    },
    {
      id: '6',
      username: 'nature_shots',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
      caption: 'Peaceful forest morning 🌲 #nature #forest #peace',
      likes: 9876,
      comments: 203,
      isLiked: false,
      isSaved: false,
      duration: '0:28'
    }
  ];

  const [reelsData, setReelsData] = useState<Reel[]>(reels);

  const handleLike = (reelId: string) => {
    setReelsData(prev => 
      prev.map(reel => 
        reel.id === reelId 
          ? { 
              ...reel, 
              isLiked: !reel.isLiked,
              likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1
            }
          : reel
      )
    );
  };

  const handleSave = (reelId: string) => {
    setReelsData(prev => 
      prev.map(reel => 
        reel.id === reelId 
          ? { ...reel, isSaved: !reel.isSaved }
          : reel
      )
    );
  };

  const handleVideoPlay = (reelId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    const video = videoRefs.current[reelId];
    if (video) {
      if (isPlaying === reelId) {
        video.pause();
        setIsPlaying(null);
      } else {
        Object.values(videoRefs.current).forEach(v => v?.pause());
        setIsPlaying(reelId);
        video.play();
        video.muted = isMuted;
      }
    }
  };

  const handleReelClick = (reelId: string) => {
    const reelIndex = reelsData.findIndex(reel => reel.id === reelId);
    setCurrentReelIndex(reelIndex);
    setSelectedReel(reelId);
    
    // Auto-play the selected reel in fullscreen
    setTimeout(() => {
      const fullscreenVideo = fullscreenVideoRefs.current[reelId];
      if (fullscreenVideo) {
        fullscreenVideo.play();
        fullscreenVideo.muted = isMuted;
      }
    }, 100);
  };

  const handleScroll = (e: React.WheelEvent) => {
    if (!selectedReel) return;
    
    e.preventDefault();
    const delta = e.deltaY;
    const threshold = 50;
    
    if (Math.abs(delta) > threshold) {
      if (delta > 0 && currentReelIndex < reelsData.length - 1) {
        // Scroll down - next reel
        const nextIndex = currentReelIndex + 1;
        const nextReel = reelsData[nextIndex];
        setCurrentReelIndex(nextIndex);
        setSelectedReel(nextReel.id);
        
        // Pause current video and play next
        Object.values(fullscreenVideoRefs.current).forEach(v => v?.pause());
        setTimeout(() => {
          const nextVideo = fullscreenVideoRefs.current[nextReel.id];
          if (nextVideo) {
            nextVideo.play();
            nextVideo.muted = isMuted;
          }
        }, 100);
        
      } else if (delta < 0 && currentReelIndex > 0) {
        // Scroll up - previous reel
        const prevIndex = currentReelIndex - 1;
        const prevReel = reelsData[prevIndex];
        setCurrentReelIndex(prevIndex);
        setSelectedReel(prevReel.id);
        
        // Pause current video and play previous
        Object.values(fullscreenVideoRefs.current).forEach(v => v?.pause());
        setTimeout(() => {
          const prevVideo = fullscreenVideoRefs.current[prevReel.id];
          if (prevVideo) {
            prevVideo.play();
            prevVideo.muted = isMuted;
          }
        }, 100);
      }
    }
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  useEffect(() => {
    return () => {
      Object.values(videoRefs.current).forEach(video => {
        if (video) {
          video.pause();
        }
      });
      Object.values(fullscreenVideoRefs.current).forEach(video => {
        if (video) {
          video.pause();
        }
      });
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedReel) return;
      
      if (e.key === 'ArrowDown' && currentReelIndex < reelsData.length - 1) {
        const nextIndex = currentReelIndex + 1;
        const nextReel = reelsData[nextIndex];
        setCurrentReelIndex(nextIndex);
        setSelectedReel(nextReel.id);
      } else if (e.key === 'ArrowUp' && currentReelIndex > 0) {
        const prevIndex = currentReelIndex - 1;
        const prevReel = reelsData[prevIndex];
        setCurrentReelIndex(prevIndex);
        setSelectedReel(prevReel.id);
      } else if (e.key === 'Escape') {
        setSelectedReel(null);
        Object.values(fullscreenVideoRefs.current).forEach(v => v?.pause());
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedReel, currentReelIndex, reelsData]);

  return (
    <div className="min-h-screen bg-[var(--color-gradient-background)] relative">
      <Topbar />
      <Sidebar />
    
      {/* Reels Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8 ml-64 ">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-gradient-text)] bg-clip-text mb-3">
            Explore Reels
          </h2>
          <p className="text-[var(--color-muted)] text-lg">Discover trending videos from creators you might like</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {reelsData.map((reel) => (
            <div
              key={reel.id}
              className="relative group cursor-pointer rounded-2xl overflow-hidden bg-black aspect-[9/16] shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              onClick={() => handleReelClick(reel.id)}
              onMouseEnter={() => setHoveredReel(reel.id)}
              onMouseLeave={() => setHoveredReel(null)}
            >
              <video
                ref={(el) => {
                  videoRefs.current[reel.id] = el;
                }}
                src={reel.videoUrl}
                poster={reel.thumbnail}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                muted={isMuted}
                loop
                onEnded={() => setIsPlaying(null)}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={(e) => handleVideoPlay(reel.id, e)}
                  className={`bg-white/90 backdrop-blur-sm rounded-full p-4 transition-all duration-300 transform hover:scale-110 ${
                    hoveredReel === reel.id || isPlaying === reel.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {isPlaying === reel.id ? (
                    <Pause className="w-8 h-8 text-black" />
                  ) : (
                    <Play className="w-8 h-8 text-black fill-black" />
                  )}
                </button>
              </div>
              
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-[var(--color-text)] text-sm font-medium">{reel.duration}</span>
              </div>

              {isPlaying === reel.id && (
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  {/* <span className="text-[var(--color-text)] text-sm font-medium bg-red-500 px-2 py-1 rounded-full">LIVE</span> */}
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="relative">
                    <img
                      src={reel.avatar}
                      alt={reel.username}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    {reel.isVerified && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-info)] rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-[var(--color-text)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="text-[var(--color-text)] text-sm font-semibold">@{reel.username}</span>
                </div>
                
                <p className="text-[var(--color-text)] text-sm line-clamp-2 mb-3 leading-relaxed">
                  {reel.caption}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(reel.id);
                      }}
                      className="flex items-center space-x-1 group/like"
                    >
                      <Heart className={`w-5 h-5 transition-all duration-200 group-hover/like:scale-110 ${
                        reel.isLiked ? 'text-red-500 fill-red-500' : 'text-[var(--color-text)]'
                      }`} />
                      <span className="text-[var(--color-text)] text-sm font-medium">{formatCount(reel.likes)}</span>
                    </button>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-5 h-5 text-[var(--color-text)]" />
                      <span className="text-[var(--color-text)] text-sm font-medium">{reel.comments}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave(reel.id);
                    }}
                    className="group/save"
                  >
                    <Bookmark className={`w-5 h-5 transition-all duration-200 group-hover/save:scale-110 ${
                      reel.isSaved ? 'text-yellow-500 fill-yellow-500' : 'text-[var(--color-text)]'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Reel Modal with Scrolling */}
      {selectedReel && (
        <div 
          className="fixed inset-0  bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-hidden"
          onWheel={handleScroll}
        >
          <div className="relative w-full max-w-sm h-full flex">
            {/* Video Container */}
            <div className="flex-1 relative bg-black">
              <video
                ref={(el) => {
                  if (el) fullscreenVideoRefs.current[selectedReel] = el;
                }}
                src={reelsData.find(r => r.id === selectedReel)?.videoUrl}
                autoPlay
                loop
                muted={isMuted}
                className="w-full h-full object-cover"
                poster={reelsData.find(r => r.id === selectedReel)?.thumbnail}
              />
              
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedReel(null);
                  Object.values(fullscreenVideoRefs.current).forEach(v => v?.pause());
                }}
                className="absolute top-6 left-6 bg-black/60 backdrop-blur-md rounded-full p-3 text-[var(--color-text)] hover:bg-black/80 transition-all duration-200 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Mute/Unmute Button */}
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  const video = fullscreenVideoRefs.current[selectedReel];
                  if (video) {
                    video.muted = !isMuted;
                  }
                }}
                className="absolute top-6 right-6 bg-black/60 backdrop-blur-md rounded-full p-3 text-[var(--color-text)] hover:bg-black/80 transition-all duration-200 hover:scale-110"
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>

              {/* Scroll Indicators */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
                {currentReelIndex > 0 && (
                  <div className="w-2 h-8 bg-white/30 rounded-full animate-pulse"></div>
                )}
                <div className="w-2 h-12 bg-white rounded-full"></div>
                {currentReelIndex < reelsData.length - 1 && (
                  <div className="w-2 h-8 bg-white/30 rounded-full animate-pulse"></div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-24 left-6 right-24">
                {/* <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full animate-pulse" style={{width: '33%'}}></div>
                </div> */}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="absolute right-6 bottom-32 flex flex-col space-y-6">
              {selectedReel && (() => {
                const reel = reelsData.find(r => r.id === selectedReel)!;
                return (
                  <>
                    <button
                      onClick={() => handleLike(selectedReel)}
                      className="flex flex-col items-center space-y-2 group"
                    >
                      <div className="bg-black/40 backdrop-blur-md rounded-full p-4 group-hover:bg-black/60 transition-all duration-200 group-hover:scale-110">
                        <Heart className={`w-8 h-8 ${reel.isLiked ? 'text-red-500 fill-red-500' : 'text-[var(--color-text)]'}`} />
                      </div>
                      <span className="text-[var(--color-text)] text-sm font-bold">
                        {formatCount(reel.likes)}
                      </span>
                    </button>
                    
                    <button className="flex flex-col items-center space-y-2 group">
                      <div className="bg-black/40 backdrop-blur-md rounded-full p-4 group-hover:bg-black/60 transition-all duration-200 group-hover:scale-110">
                        <MessageCircle className="w-8 h-8 text-[var(--color-text)]" />
                      </div>
                      <span className="text-[var(--color-text)] text-sm font-bold">{reel.comments}</span>
                    </button>
                    
                    <button className="flex flex-col items-center space-y-2 group">
                      <div className="bg-black/40 backdrop-blur-md rounded-full p-4 group-hover:bg-black/60 transition-all duration-200 group-hover:scale-110">
                        <Share className="w-8 h-8 text-[var(--color-text)]" />
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleSave(selectedReel)}
                      className="flex flex-col items-center space-y-2 group"
                    >
                      <div className="bg-black/40 backdrop-blur-md rounded-full p-4 group-hover:bg-black/60 transition-all duration-200 group-hover:scale-110">
                        <Bookmark className={`w-8 h-8 ${reel.isSaved ? 'text-yellow-500 fill-yellow-500' : 'text-[var(--color-text)]'}`} />
                      </div>
                    </button>
                  </>
                );
              })()}
            </div>
            
            {/* Bottom Info */}
            {selectedReel && (() => {
              const reel = reelsData.find(r => r.id === selectedReel)!;
              return (
                <div className="absolute bottom-6 left-6 right-28">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="relative">
                      <img
                        src={reel.avatar}
                        alt={reel.username}
                        className="w-12 h-12 rounded-full border-3 border-white shadow-lg"
                      />
                      {reel.isVerified && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-info)] rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-[var(--color-text)]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="text-[var(--color-text)] font-bold text-lg">@{reel.username}</span>
                      <button className="ml-3 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full text-[var(--color-text)] text-sm font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
                        Follow
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-[var(--color-text)] text-base mb-3 leading-relaxed">{reel.caption}</p>
                  
                  <div className="flex items-center space-x-3 text-[var(--color-text)]/70 text-sm">
                    <span>{reel.duration}</span>
                    <span>•</span>
                    <span>2 days ago</span>
                    <span>•</span>
                    <span>{currentReelIndex + 1} of {reelsData.length}</span>
                  </div>
                </div>
              );
            })()}
          </div>

        
        </div>
      )}
    </div>
  );
};

export default ExploreReels;