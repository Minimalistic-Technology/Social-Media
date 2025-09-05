'use client';

import React from 'react';
import { Bookmark } from 'lucide-react';
import { Post } from '../types/post';
import { useBookmarks } from '../hooks/useBookmarks';

interface BookmarkButtonProps {
  post: Post;
  size?: number;
  className?: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ 
  post, 
  size = 20, 
  className = '' 
}) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(post.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(post);
  };

  return (
    <button
      onClick={handleBookmarkClick}
      className={`p-2 rounded-full transition-all duration-200 hover:bg-gray-700 ${
        bookmarked
          ? 'text-purple-500 hover:text-purple-400'
          : 'text-gray-400 hover:text-white'
      } ${className}`}
      title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
    >
      <Bookmark 
        size={size} 
        fill={bookmarked ? 'currentColor' : 'none'}
        className={`transition-all duration-200 ${
          bookmarked ? 'scale-110' : 'hover:scale-105'
        }`}
      />
    </button>
  );
};
