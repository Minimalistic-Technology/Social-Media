'use client';

import { useState, useEffect } from 'react';
import { Post } from '../types/post';

export const useBookmarks = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('socialMediaBookmarks');
      if (savedBookmarks) {
        setBookmarkedPosts(JSON.parse(savedBookmarks));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Save bookmarks to localStorage whenever bookmarks change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('socialMediaBookmarks', JSON.stringify(bookmarkedPosts));
      } catch (error) {
        console.error('Error saving bookmarks:', error);
      }
    }
  }, [bookmarkedPosts, isLoading]);

  const toggleBookmark = (post: Post) => {
    setBookmarkedPosts(prev => {
      const isCurrentlyBookmarked = prev.some(p => p.id === post.id);
      
      if (isCurrentlyBookmarked) {
        return prev.filter(p => p.id !== post.id);
      } else {
        return [...prev, { ...post }];
      }
    });
  };

  const isBookmarked = (postId: string) => {
    return bookmarkedPosts.some(post => post.id === postId);
  };

  const removeBookmark = (postId: string) => {
    setBookmarkedPosts(prev => prev.filter(p => p.id !== postId));
  };

  const clearAllBookmarks = () => {
    setBookmarkedPosts([]);
  };

  return {
    bookmarkedPosts,
    toggleBookmark,
    isBookmarked,
    removeBookmark,
    clearAllBookmarks,
    isLoading,
    bookmarkCount: bookmarkedPosts.length,
  };
};
