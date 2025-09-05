"use client"
import React, { useState } from 'react';
import { Search } from 'lucide-react';





const Topbar: React.FC = () => {

  return (
    <>
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">Social Home</h1>
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-70">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for creators, inspirations, and projects"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white placeholder-gray-500"
                />
              </div>
            </div>

          </div>
        </div>
      </header>

     

      
    </>
  );
};

export default Topbar;