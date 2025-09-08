"use client"
import React from 'react';
import { Search } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Topbar: React.FC = () => {
  const { theme } = useTheme();

  return (
    <header
      className="border-b sticky top-0 z-30"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb', // Dark gray or light gray
        color: 'var(--color-text)',
      }}
    >
      <div className="px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* <h1
              style={{ color: 'var(--color-primary)' }}
              className="text-2xl font-bold"
            >
              Social Home
            </h1> */}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-100">
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: 'var(--color-secondary)' }}
              />
              <input
                type="text"
                placeholder="Search for creators, inspirations, and projects"
                className="w-full pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--color-secondary)',
                  borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                  color: 'var(--color-text)',
                  caretColor: 'var(--color-primary)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
