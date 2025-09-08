"use client"
import React, { useState } from 'react';
import { 
  Grid, 
  Heart, 
  MessageCircle, 
  MoreHorizontal,
  Camera,
  X,
  Edit3,
  Save,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Settings
} from 'lucide-react';
import Topbar from '../Components/Topbar';
import Sidebar from '../Components/Sidebar';

// Type definitions
interface ToggleStates {
  hideLikeShareCounts: boolean;
}

interface EditFormData {
  name: string;
  username: string;
  bio: string;
  website: string;
}

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  website: string;
  followers: number;
  following: number;
  posts: number;
}

interface Highlight {
  id: number;
  name: string;
  image: string;
}

interface Post {
  id: number;
  image: string;
  likes: number;
  comments: number;
  type: string;
}

interface Setting {
  id: string;
  title: string;
  count?: number;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<string>('posts');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [currentSettingsView, setCurrentSettingsView] = useState<string>('main');
  const [toggleStates, setToggleStates] = useState<ToggleStates>({
    hideLikeShareCounts: false
  });
  
  // Edit profile form state
  const [editForm, setEditForm] = useState<EditFormData>({
    name: 'Diana Ayi',
    username: 'Dayi',
    bio: 'Content creator & photographer 📸\nLiving life one post at a time ✨\nDM for collaborations 💌',
    website: 'www.dianaayi.com'
  });

  const currentUser: User = {
    id: 'diana_ayi',
    name: 'Diana Ayi',
    username: 'Dayi',
    avatar: 'https://picsum.photos/200/200?random=1',
    bio: 'Content creator & photographer 📸\nLiving life one post at a time ✨\nDM for collaborations 💌',
    website: 'www.dianaayi.com',
    followers: 13500,
    following: 892,
    posts: 1048
  };

  const highlights: Highlight[] = [
    { id: 1, name: 'Travel', image: 'https://picsum.photos/80/80?random=10' },
    { id: 2, name: 'Food', image: 'https://picsum.photos/80/80?random=11' },
    { id: 3, name: 'Fashion', image: 'https://picsum.photos/80/80?random=12' },
    { id: 4, name: 'Nature', image: 'https://picsum.photos/80/80?random=13' },
    { id: 5, name: 'Friends', image: 'https://picsum.photos/80/80?random=14' }
  ];

  const posts: Post[] = [
    { id: 1, image: 'https://picsum.photos/300/300?random=20', likes: 4938, comments: 192, type: 'image' },
    { id: 2, image: 'https://picsum.photos/300/300?random=21', likes: 3247, comments: 89, type: 'image' },
    { id: 3, image: 'https://picsum.photos/300/300?random=22', likes: 5621, comments: 234, type: 'image' },
    { id: 4, image: 'https://picsum.photos/300/300?random=23', likes: 2890, comments: 156, type: 'image' },
    { id: 5, image: 'https://picsum.photos/300/300?random=24', likes: 7234, comments: 312, type: 'image' },
    { id: 6, image: 'https://picsum.photos/300/300?random=25', likes: 4567, comments: 198, type: 'image' },
    { id: 7, image: 'https://picsum.photos/300/300?random=26', likes: 3456, comments: 167, type: 'image' },
    { id: 8, image: 'https://picsum.photos/300/300?random=27', likes: 6789, comments: 289, type: 'image' },
    { id: 9, image: 'https://picsum.photos/300/300?random=28', likes: 5432, comments: 221, type: 'image' }
  ];

  const mainSettings: Setting[] = [
    { id: 'comments', title: 'Comments' },
    { id: 'sharing', title: 'Sharing and remixes' },
    { id: 'restricted', title: 'Restricted', count: 0 },
    { id: 'interactions', title: 'Limit interactions' },
    { id: 'hiddenWords', title: 'Hidden Words' },
    { id: 'followInvite', title: 'Follow and invite friends' },
    { id: 'favorites', title: 'Favorites', count: 0 },
    { id: 'mutedAccounts', title: 'Muted accounts', count: 0 },
    { id: 'contentPrefs', title: 'Content preferences' },
    { id: 'likeShareCounts', title: 'Like and share counts' },
    { id: 'devicePerms', title: 'Device permissions' },
    { id: 'archiving', title: 'Archiving and downloading' },
    { id: 'accessibility', title: 'Accessibility and translations' }
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleEditProfileSave = (): void => {
    console.log('Saving profile:', editForm);
    setShowEditProfile(false);
  };

  const handleToggleChange = (key: keyof ToggleStates): void => {
    setToggleStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSettingClick = (settingId: string): void => {
    if (settingId === 'likeShareCounts') {
      setCurrentSettingsView('likeShareCounts');
    }
  };

  
  // Edit Profile Modal Component
  const EditProfileModal: React.FC = () => (
    <div className={`fixed inset-0 z-50 ${showEditProfile ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60 backdrop-blur-sm" onClick={() => setShowEditProfile(false)} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 dark:border-gray-700/50">
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 ">
            <div className="flex items-center justify-between ">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Profile</h3>
              <button 
                onClick={() => setShowEditProfile(false)}
                className="p-2 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="https://picsum.photos/100/100?random=3"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-500/20"
                />
                <button className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {[
              { key: 'name' as keyof EditFormData, label: 'Name', type: 'input' },
              { key: 'username' as keyof EditFormData, label: 'Username', type: 'input' },
              { key: 'bio' as keyof EditFormData, label: 'Bio', type: 'textarea' },
              { key: 'website' as keyof EditFormData, label: 'Website', type: 'input' }
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {label}
                </label>
                {type === 'textarea' ? (
                  <textarea
                    value={editForm[key]}
                    onChange={(e) => setEditForm({...editForm, [key]: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none backdrop-blur-sm transition-all duration-200"
                  />
                ): (
                  <input
                    type="text"
                    value={editForm[key]}
                    onChange={(e) => setEditForm({...editForm, [key]: e.target.value})}
                    className="w-full p-3 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="p-6 border-t border-gray-200/50 dark:border-gray-700/50 flex space-x-4">
            <button
              onClick={() => setShowEditProfile(false)}
              className="flex-1 px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100/50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-600/50 transition-all duration-200 font-medium backdrop-blur-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleEditProfileSave}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Topbar />
      <Sidebar />
      <main className="ml-64 mt-2 px-4">
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
            {/* Header */}
            {/* <div className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 z-10">
              <div className="max-w-4xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="lg:hidden">
                      <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {currentUser.username}
                    </h1>
                  </div>
                  <button 
                    onClick={() => setShowSettings(true)}
                    className="p-2 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <Settings className="w-6 h-6 text-gray-900 dark:text-white" />
                  </button>
                </div>
              </div>
            </div> */}

            <div className="max-w-7xl mx-auto px-4 py-8 ">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-10 mb-8 ml-60 ">
                {/* Profile Image */}
                <div className="relative">
                  <img
                    src="https://picsum.photos/160/160?random=2"
                    alt={currentUser.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-purple-500"
                  />
                  <button className="absolute bottom-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-light text-gray-900 dark:text-white">
                      {currentUser.username}
                    </h2>
                    <button 
                      onClick={() => setShowEditProfile(true)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-1.5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                    <button className="p-2 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-full transition-colors">
                      <MoreHorizontal className="w-6 h-6 text-gray-900 dark:text-white" />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex space-x-15">
                    <div className="text-center">
                      <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {formatNumber(currentUser.posts)}
                      </div>
                      <div className="text-sm text-gray-500">posts</div>
                    </div>
                    <div className="text-center cursor-pointer hover:text-purple-500 transition-colors">
                      <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {formatNumber(currentUser.followers)}
                      </div>
                      <div className="text-sm text-gray-500">followers</div>
                    </div>
                    <div className="text-center cursor-pointer hover:text-purple-500 transition-colors">
                      <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {formatNumber(currentUser.following)}
                      </div>
                      <div className="text-sm text-gray-500">following</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-1">
                    <div className="font-semibold text-gray-900 dark:text-white">{currentUser.name}</div>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-sm">
                      {currentUser.bio}
                    </div>
                    <a 
                      href={`https://${currentUser.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      {currentUser.website}
                    </a>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <div className="flex space-x-4 overflow-x-auto pb-2 ml-40">
                  {highlights.map((highlight) => (
                    <div key={highlight.id} className="flex flex-col items-center space-y-1 min-w-0 ">
                      <div className="w-16 h-16 mt-2 rounded-full overflow-hidden ring-2 ring-gray-300 dark:ring-gray-600 cursor-pointer hover:ring-purple-500 transition-all hover:scale-105 ml-10 ">
                        <img
                          src={highlight.image}
                          alt={highlight.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-black dark:text-black  text-center truncate w-16">
                        {highlight.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-center">
                  <button
                    onClick={() => setActiveTab('posts')}
                    className={`flex items-center space-x-2 px-4 py-3 border-t-2 font-medium text-sm transition-all duration-200 ${
                      activeTab === 'posts'
                        ? 'border-purple-500 text-purple-500'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                    <span className="hidden md:inline">POSTS</span>
                  </button>
                </div>
              </div>

              {/* Posts Grid */}
              <div className="mt-6">
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                  {posts.map((post) => (
                    <div 
                      key={post.id} 
                      className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg overflow-hidden cursor-pointer group relative"
                    >
                      <img
                        src={post.image}
                        alt={`Post ${post.id}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex items-center space-x-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-5 h-5 fill-current" />
                            <span className="font-semibold">{formatNumber(post.likes)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-5 h-5 fill-current" />
                            <span className="font-semibold">{formatNumber(post.comments)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Settings Panel */}
            {/* <SettingsPanel /> */}
            
            {/* Edit Profile Modal */}
            <EditProfileModal />
          </div>
        </div>
      </main>
    </>
  );
}