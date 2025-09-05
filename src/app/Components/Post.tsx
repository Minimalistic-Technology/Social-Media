

"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, ChevronLeft, ChevronRight, Bookmark, Heart, MessageCircle, MoreHorizontal, Share2, Camera, ArrowLeft, MapPin, Calendar, ExternalLink, UserPlus, UserCheck } from 'lucide-react';
import { Post as PostType } from '../types/post';
import { BookmarkButton } from './BookmarkButton';

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isOnline?: boolean;
  isFollowing?: boolean;
}

interface Story {
  id: string;
  user: User;
  image: string;
  viewed?: boolean;
}

interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked?: boolean;
  hashtags?: string[];
}

interface PostProps {
  post: PostType;
}

// Individual Post Component
const Post: React.FC<PostProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.likes || false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={post.user.avatar} 
              alt={post.user.name} 
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white cursor-pointer hover:underline">
                {post.user.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp}</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        
        <p className="mt-4 text-gray-900 dark:text-white">{post.content}</p>
        
        {/* Hashtags */}
        {post.hashtags && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.hashtags.map((tag, index) => (
              <span key={index} className="text-purple-500 hover:text-purple-600 cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="px-6">
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full rounded-xl object-cover max-h-96"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-6">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${
                liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{likesCount.toLocaleString()}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{post.comments}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-medium">{post.shares}</span>
            </button>
          </div>
          {/* Bookmark Button */}
          <BookmarkButton post={post} />
        </div>
      </div>
    </article>
  );
};

// Stories Component
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
   <div className="mb-8 pl-7">
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
              {/* Removed the number indicator for user stories */}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #111827 100%)'
        }}>
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
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-purple-500 hover:bg-purple-600 text-white rounded-full p-3 transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// UserProfile Component
interface UserProfileProps {
  user: User;
  onBack: () => void;
  currentUser: User | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onBack, currentUser }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'followers' | 'following'>('posts');
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  // Mock data for demonstration
  const userData = {
    ...user,
    bio: "Passionate about photography and travel ✈️ | Coffee enthusiast ☕ | Dog lover 🐕",
    location: "New York, NY",
    joinedDate: "Joined March 2021",
    website: "www.example.com",
    followers: 1247,
    following: 892,
    postsCount: 156,
    posts: [
      {
        id: 1,
        content: "Just finished an amazing photoshoot in Central Park! The autumn colors are absolutely stunning this year. 🍂📸",
        timestamp: "2 hours ago",
        likes: 45,
        comments: 12,
        image: null
      },
      {
        id: 2,
        content: "Coffee and code - the perfect Monday morning combination! ☕💻 Working on some exciting new projects.",
        timestamp: "1 day ago",
        likes: 23,
        comments: 8,
        image: null
      },
      {
        id: 3,
        content: "Grateful for all the amazing people in my life. Sometimes it's the simple moments that mean the most. ❤️",
        timestamp: "3 days ago",
        likes: 67,
        comments: 15,
        image: null
      }
    ],
    followersList: [
      { id: 1, name: "John Smith", username: "@johnsmith", avatar: user.avatar },
      { id: 2, name: "Sarah Wilson", username: "@swilson", avatar: user.avatar },
      { id: 3, name: "Mike Johnson", username: "@mjohnson", avatar: user.avatar },
      { id: 4, name: "Emma Davis", username: "@edavis", avatar: user.avatar }
    ],
    followingList: [
      { id: 1, name: "Alex Chen", username: "@alexchen", avatar: user.avatar },
      { id: 2, name: "Maria Garcia", username: "@mgarcia", avatar: user.avatar },
      { id: 3, name: "David Kim", username: "@dkim", avatar: user.avatar }
    ]
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="space-y-6">
            {userData.posts.map((post: { id: number; content: string; timestamp: string; likes: number; comments: number }) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-medium">{userData.name}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{post.timestamp}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{post.content}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'followers':
        return (
          <div className="space-y-4">
            {userData.followersList.map((follower: { id: number; name: string; username: string; avatar: string }) => (
              <div key={follower.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <img
                    src={follower.avatar}
                    alt={follower.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium">{follower.name}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{follower.username}</p>
                  </div>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Follow Back
                </button>
              </div>
            ))}
          </div>
        );
      
      case 'following':
        return (
          <div className="space-y-4">
            {userData.followingList.map((following: { id: number; name: string; username: string; avatar: string }) => (
              <div key={following.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <img
                    src={following.avatar}
                    alt={following.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-medium">{following.name}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{following.username}</p>
                  </div>
                </div>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Following
                </button>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">{userData.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{userData.postsCount} posts</p>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-purple-600 to-blue-600"></div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex justify-between items-end -mt-16 mb-4">
            <img
              src={userData.avatar}
              alt={userData.name}
                 className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 object-cover"
          />
            
            {currentUser?.id !== userData.id && (
              <button
                onClick={handleFollow}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  isFollowing
                    ? 'bg-gray-600 hover:bg-gray-700 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="w-4 h-4 inline mr-2" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 inline mr-2" />
                    Follow
                  </>
                )}
              </button>
            )}
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-1">{userData.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">@{userData.username}</p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{userData.bio}</p>

          <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400 text-sm mb-4">
            {userData.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{userData.location}</span>
              </div>
            )}
            {userData.website && (
              <div className="flex items-center space-x-1">
                <ExternalLink className="w-4 h-4" />
                <a href={`https://${userData.website}`} className="text-purple-500 hover:underline">
                  {userData.website}
                </a>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{userData.joinedDate}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-6 mb-6">
            <button
              onClick={() => setActiveTab('following')}
              className="hover:underline"
            >
              <span className="font-bold text-gray-900 dark:text-white">{userData.following.toLocaleString()}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">Following</span>
            </button>
            <button
              onClick={() => setActiveTab('followers')}
              className="hover:underline"
            >
              <span className="font-bold text-gray-900 dark:text-white">{userData.followers.toLocaleString()}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">Followers</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 px-6">
        <div className="flex space-x-8">
          {(['posts', 'followers', 'following'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-2 font-medium transition-colors relative ${
                activeTab === tab
                  ? 'text-purple-500 border-b-2 border-purple-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6 py-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

// Main Social Media App Component
const SocialMediaApp: React.FC = () => {
  const [postContent, setPostContent] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'profile'>('home');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Current user data
  const currentUser: User = {
    id: 'current_user',
    name: 'Diana',
    username: 'diana',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
  };

  // Initial posts data
  const initialPosts: Post[] = [
    {
      id: '1',
      user: { id: '7', name: 'Lana Rose', username: 'lana_rose', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face' },
      content: 'Celebrating the holidays with my best friend! 🎄✨ #lifestyle',
      image: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=600&h=400&fit=crop',
      likes: 2323,
      comments: 277,
      shares: 45,
      timestamp: '15 MINUTES AGO',
      liked: true
    },
    {
      id: '2',
      user: { id: '8', name: 'Michael David', username: 'michael_d', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
      content: 'Working late but loving the city lights! The grind never stops 💪 #hustle #citylife',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
      likes: 1456,
      comments: 89,
      shares: 23,
      timestamp: '15 MINUTES AGO'
    }
  ];

  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleUserClick = (user: User): void => {
    setSelectedUser(user);
    setCurrentView('profile');
  };

  const handleBackToHome = (): void => {
    setCurrentView('home');
    setSelectedUser(null);
  };

  const handlePost = (): void => {
    if (postContent.trim() || selectedImage) {
      const newPost: Post = {
        id: Date.now().toString(),
        user: currentUser,
        content: postContent,
        image: selectedImage || undefined,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: 'NOW',
        liked: false
      };
      
      // Add new post to the beginning of the posts array
      setPosts([newPost, ...posts]);
      setPostContent('');
      setSelectedImage(null);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (): void => {
    setSelectedImage(null);
  };

  const handleLike = (postId: string): void => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  // Show profile view if selected - ONLY UserProfile component, no Stories
  if (currentView === 'profile' && selectedUser) {
    return (
      <UserProfile
        user={selectedUser}
        onBack={handleBackToHome}
        currentUser={currentUser}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-screen relative">
      {/* Stories Section */}
      <Stories />

      {/* Post Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <img 
            src={currentUser.avatar} 
            alt="You" 
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="What's on your mind, Diana?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="flex-1 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white placeholder-gray-500"
            onKeyPress={(e) => e.key === 'Enter' && (postContent.trim() || selectedImage) && handlePost()}
          />
          <label className="cursor-pointer text-gray-500 hover:text-purple-500 transition-colors p-2">
            <Camera className="w-5 h-5" />
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>
          <button 
            onClick={handlePost}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!postContent.trim() && !selectedImage}
          >
            Post
          </button>
        </div>
        
        {/* Image Preview in main form */}
        {selectedImage && (
          <div className="mt-4 relative">
            <img 
              src={selectedImage} 
              alt="Selected" 
              className="w-full rounded-xl object-cover max-h-64"
            />
            <button 
              onClick={removeImage}
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-opacity-90 transition-opacity"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={post.user.avatar} 
                    alt={post.user.name} 
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => handleUserClick(post.user)}
                  />
                  <div>
                    <p 
                      className="font-medium text-gray-900 dark:text-white cursor-pointer hover:underline"
                      onClick={() => handleUserClick(post.user)}
                    >
                      {post.user.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              
              <p className="mt-4 text-gray-900 dark:text-white">{post.content}</p>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="px-6">
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="w-full rounded-xl object-cover max-h-96"
                />
              </div>
            )}

            {/* Post Actions */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{post.likes.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.shares}</span>
                  </button>
                </div>
                <button className="text-gray-500 hover:text-purple-500 transition-colors">
                  {/* <Bookmark className="w-5 h-5" /> */}
                   <BookmarkButton post={post} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaApp;




