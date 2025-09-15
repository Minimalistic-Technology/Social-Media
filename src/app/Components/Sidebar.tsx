"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { ThemeSelector } from './ThemeSelector';
import { useTheme } from '../contexts/ThemeContext';

import {
  Home,
  Search,
  MessageCircle,
  Bookmark,
  TrendingUp,
  Bell,
  Palette,
  User,
  Settings
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

const Sidebar: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  
  const { theme, themes } = useTheme();
  // const currentTheme = themes.find(t => t.id === theme);
  const currentTheme = themes.find(t => t.id === theme);

// If theme is missing, fall back safely
if (!currentTheme) {
  return null; // or return a loading/error component
}


  const currentUser: User = {
    id: 'current_user',
    name: 'Diana Ayi',
    username: 'Dayi',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
  };

  const sidebarItems = [
    { icon: User, label: 'Profile',  href: '/profile' },
    { icon: Home, label: 'Home', href: '/home', active: true },
    { icon: Search, label: 'Explore', href: '/explore' },
    { icon: MessageCircle, label: 'Messages', badge: 0, href: '/messages' },
    { icon: Bookmark, label: 'Bookmarks', href: '/bookmarks' },
    { icon: Bell, label: 'Notification', href: '/notification' },
    
    { 
      icon: Palette, 
      label: 'Theme', 
      href: null,
      onClick: () => setIsThemeSelectorOpen(true)
    },
    { icon: Settings, label: 'Settings', href: '/setting' }
  ];

  const handlePost = () => {
    if (postContent.trim() || selectedImage) {
      alert('Post created successfully!');
      resetForm();
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const resetForm = () => {
    setPostContent('');
    setSelectedImage(null);
    setShowCreateModal(false);
  };

  return (
    <>
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 
              className="text-2xl font-bold"
              style={{ color: currentTheme?.colors.primary }}
            >
              Social Home
            </h1>
          </div>

          {/* User Profile Section - Now clickable */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <Link href="/profile" className="block">
              <div className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200 cursor-pointer">
                <img
                  src={currentUser.avatar}
                  alt="Diana"
                  className="w-10 h-10 rounded-full ring-2"
                  style={{ ringColor: currentTheme?.colors.primary }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{currentUser.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">@{currentUser.username}</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              const content = (
                <div
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    item.active
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                  style={item.active ? { 
                    backgroundColor: currentTheme?.colors.primary,
                    backgroundImage: `linear-gradient(135deg, ${currentTheme?.colors.primary} 0%, ${currentTheme?.colors.accent} 100%)`
                  } : {}}
                >
                  <IconComponent className="w-5 h-5 mr-3" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </div>
              );

              if (item.onClick) {
                return (
                  <button key={item.label} onClick={item.onClick} className="w-full text-left">
                    {content}
                  </button>
                );
              }

              return item.href ? (
                <Link key={item.label} href={item.href}>
                  {content}
                </Link>
              ) : (
                <button key={item.label} className="w-full text-left">
                  {content}
                </button>
              );
            })}
          </nav>

          <div className="p-4">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="w-full text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${currentTheme?.colors.primary} 0%, ${currentTheme?.colors.accent} 100%)` 
              }}
            >
              Create Post
            </button>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create Post</h2>
              <button 
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="flex items-start space-x-3 mb-4">
              <img 
                src={currentUser.avatar} 
                alt="You" 
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{currentUser.name}</p>
                <textarea
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full mt-2 bg-transparent border-none resize-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 text-lg"
                  rows={4}
                  autoFocus
                />
              </div>
            </div>

            {selectedImage && (
              <div className="mb-4 relative">
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

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4 text-gray-500">
                <label className="cursor-pointer hover:text-purple-500 transition-colors">
                  <span className="text-sm">🖼️ Photo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </label>
                <span className="text-sm">😊 Feeling</span>
                <span className="text-sm">📍 Location</span>
              </div>
              <button 
                onClick={handlePost}
                className="text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  background: `linear-gradient(135deg, ${currentTheme?.colors.primary} 0%, ${currentTheme?.colors.accent} 100%)` 
                }}
                disabled={!postContent.trim() && !selectedImage}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Theme Selector Modal */}
      <ThemeSelector
        isOpen={isThemeSelectorOpen}
        onClose={() => setIsThemeSelectorOpen(false)}
      />
    </>
  );
};

export default Sidebar;
