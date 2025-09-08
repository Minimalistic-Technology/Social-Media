'use client';

import React from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import { Bookmark, Trash2 } from 'lucide-react';

export const BookmarksList: React.FC = () => {
  const { bookmarkedPosts, removeBookmark, clearAllBookmarks, isLoading } = useBookmarks();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (bookmarkedPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-gray-500 mb-4">
          <Bookmark size={64} />
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">No bookmarks yet</h3>
        <p className="text-gray-400 max-w-sm">
          Save posts you want to read later by clicking the bookmark icon
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold">Bookmarks</h1>
          <p className="text-gray-400">{bookmarkedPosts.length} saved posts</p>
        </div>
        {bookmarkedPosts.length > 0 && (
          <button
            onClick={clearAllBookmarks}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <Trash2 size={16} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Bookmarked Posts */}
      <div className="grid gap-4">
        {bookmarkedPosts.map(post => (
          <div key={post.id} className="bg-white rounded-lg p-4 border">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="text-white font-medium">{post.user.name}</h3>
                  <p className="text-gray-400 text-sm">@{post.user.username}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">{post.timestamp}</span>
                <button
                  onClick={() => removeBookmark(post.id)}
                  className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-white mb-3">{post.content}</p>

            {/* Hashtags */}
            {post.hashtags && post.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-purple-400 text-sm hover:underline cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Post Image */}
            {post.image && (
              <div className="rounded-lg overflow-hidden mb-3">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}

            {/* Post Stats */}
            <div className="flex items-center space-x-6 text-gray-400 text-sm pt-3 border-t border-gray-700">
              <span>{post.likes} likes</span>
              <span>{post.comments} comments</span>
              <span>{post.shares} shares</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};