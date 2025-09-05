import React from 'react';
import { BookmarksList } from '../Components/BookmarkList';

export default function BookmarksPage() {
  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BookmarksList />
      </div>
    </div>
  );
}