"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Topbar from '../Components/Topbar';
import { useTheme } from '../contexts/ThemeContext'; 
import Stories from '../Components/Stories';

import Post from '../Components/Post';
import { Home, Search, Bell, MessageCircle, Bookmark, TrendingUp, Palette, Settings } from 'lucide-react';

interface HomeLayoutProps {
  children: React.ReactNode;
}


export default function HomeLayout({ children }: HomeLayoutProps) {
  const [darkMode, setDarkMode] = useState(false);
   const { theme, themes } = useTheme();
    const currentTheme = themes.find(t => t.id === theme);
  const sidebarItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Search, label: 'Explore' },
    { icon: Bell, label: 'Notifications', badge: 99 },
    { icon: MessageCircle, label: 'Messages', badge: 5 },
    { icon: Bookmark, label: 'Bookmarks' },
    { icon: TrendingUp, label: 'Analytics' },
    { icon: Palette, label: 'Theme' },
    { icon: Settings, label: 'Settings' }
  ];
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="flex bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        
        <div className="flex-1 lg:ml-64">
          <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />
          
          <div className="flex">
            <main className=" px-4 lg:px-8 py-6 max-w-5xl min-w-4xl mx-auto">
              {/* <Stories /> */}
             
             <Post/>
              {children}
            </main>
            
          
          </div>
        </div>
        
      {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
          <div className="flex items-center justify-around py-2">
            {sidebarItems.slice(0, 5).map((item:any) => (
              <button
                key={item.label}
                className="flex flex-col items-center py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors relative"
                style={{
                  color: item.active ? currentTheme?.colors.primary : undefined
                }}
                onMouseEnter={(e) => {
                  if (!item.active) {
                    e.currentTarget.style.color = currentTheme?.colors.primary || '#8b5cf6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.active) {
                    e.currentTarget.style.color = '';
                  }
                }}
              >
                <item.icon className="w-6 h-6" />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}