"use client"
import React, { useEffect, useState } from 'react';
import { 
  Grid, 
  Heart, 
  MessageCircle, 
  MoreHorizontal,
  Camera,
  X,
  Edit3,
  Save,
  Clock
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

type Mood = {
  emoji: string;
  description: string;
  message: string;
};

type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
};

const moodOptions: Mood[] = [
  { emoji: "😊", description: "Feeling Inspired", message: "Sharing creativity today!" },
  { emoji: "😔", description: "Feeling Down", message: "Taking time to recharge." },
  { emoji: "😎", description: "Confident", message: "Ready to conquer the day." },
  { emoji: "🤯", description: "Overwhelmed", message: "One thing at a time..." },
  { emoji: "💡", description: "Creative Spark", message: "Ideas are flowing!" },
];

const quizData: QuizQuestion[] = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: 2,
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1,
  },
  {
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    answer: 1,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<string>('posts');
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [darkMode] = useState<boolean>(true);
  const [currentMood, setCurrentMood] = useState<Mood>(moodOptions[0]);
  const [selectedMoodIndex, setSelectedMoodIndex] = useState<number>(0);
  
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value);
    setSelectedMoodIndex(index);
  };

  const handleSaveMood = () => {
    setCurrentMood(moodOptions[selectedMoodIndex]);
  };

 useEffect(() => {
    // Here you can replace with your own "mood detection" logic
    const randomIndex = Math.floor(Math.random() * moodOptions.length);
    setCurrentMood(moodOptions[randomIndex]);
  }, []);
  // Mood Card Component
  const MoodCard: React.FC = () => (
    <div className="bg-[var(--color-background)]/80 dark:bg-[var(--color-surface)]/80 backdrop-blur-lg rounded-2xl p-6 w-60 shadow-xl border border-white/20 dark:border-gray-700/50 text-center">
      <h3 className="text-lg font-semibold mb-3 text-[var(--color-text)] dark:text-white">
        Current Mood
      </h3>
      <div className="text-5xl mb-2">{currentMood.emoji}</div>
      <p className="font-bold text-lg text-[var(--color-text)] dark:text-white">
        {currentMood.description}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-4">
        {currentMood.message}
      </p>
      <div className="mb-2">
        {/* <select
          className="w-full p-2 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm"
          value={selectedMoodIndex}
          onChange={handleChange}
        >
          {moodOptions.map((mood, index) => (
            <option key={index} value={index}>
              {mood.emoji} {mood.description}
            </option>
          ))}
        </select> */}
      </div>
      <button
        onClick={handleSaveMood}
        className="w-full mt-2 py-2 px-4 rounded-lg  bg-[var(--color-primary)] hover:bg-[var(--color-accent)]  text-white text-sm transition"
      >
        Save Mood
      </button>
    </div>
  );

  // Daily Quiz Widget Component
  const DailyQuizWidget: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);

    const handleAnswer = (index: number) => {
      if (index === quizData[currentIndex].answer) {
        setScore(prev => prev + 1);
      }

      const nextIndex = currentIndex + 1;
      if (nextIndex < quizData.length) {
        setCurrentIndex(nextIndex);
      } else {
        setCompleted(true);
      }
    };

    const resetQuiz = () => {
      setCurrentIndex(0);
      setScore(0);
      setCompleted(false);
    };

    return (
      <div className="bg-[var(--color-background)]/80 dark:bg-[var(--color-surface)]/80 backdrop-blur-lg rounded-2xl p-6 w-60 shadow-xl border border-white/20 dark:border-gray-700/50">
        <h3 className="text-lg font-semibold text-[var(--color-text)] dark:text-white mb-4 flex items-center gap-2">
          🧠 Daily Quiz
        </h3>

        {!completed ? (
          <div>
            <p className="text-sm text-[var(--color-text)] dark:text-white mb-2">
              {quizData[currentIndex].question}
            </p>
            <div className="space-y-2">
              {quizData[currentIndex].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full text-sm py-2 px-3 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white  transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-sm font-medium text-[var(--color-text)] dark:text-white mb-2">
              You scored {score} / {quizData.length}
            </p>
            <button
              onClick={resetQuiz}
              className="mt-2 text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    );
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
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-[var(--color-primary)]/20"
                />
                <button className="absolute bottom-0 right-0 bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110">
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
                    className="w-full p-3 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none backdrop-blur-sm transition-all duration-200"
                  />
                ): (
                  <input
                    type="text"
                    value={editForm[key]}
                    onChange={(e) => setEditForm({...editForm, [key]: e.target.value})}
                    className="w-full p-3 border border-gray-300/50 dark:border-gray-600/50 rounded-lg bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent backdrop-blur-sm transition-all duration-200"
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
              className="flex-1 px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-xl hover:scale-105"
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
    <div className="min-h-screen flex flex-col">
      <Topbar />
      
      <div className="flex flex-1 min-h-screen">
        <div className="w-64 hidden md:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
          <div className="max-w-full mx-auto px-4 py-8">
            {/* Profile Header with Screen Time */}
            <div className="grid grid-cols-1 lg:grid-cols-4">
              <div className="lg:col-span-1">
                <MoodCard />
              </div>
              
              {/* Profile Section */}
              <div className="lg:col-span-2 pl-5">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-10">
                  {/* Profile Image */}
                  <div className="relative">
                    <img
                      src="https://picsum.photos/160/160?random=2"
                      alt={currentUser.name}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-[var(--color-primary)]"
                    />
                    <button className="absolute bottom-2 right-2 bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110">
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
                        className="bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white px-4 py-1.5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
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
                      <div className="text-center cursor-pointer hover:text-[var(--color-primary)] transition-colors">
                        <div className="text-xl font-semibold text-gray-900 dark:text-white">
                          {formatNumber(currentUser.followers)}
                        </div>
                        <div className="text-sm text-gray-500">followers</div>
                      </div>
                      <div className="text-center cursor-pointer hover:text-[var(--color-primary)] transition-colors">
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
                        className="text-[var(--color-accent)] hover:underline text-sm"
                      >
                        {currentUser.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Current Phase Widget */}
              <div className="lg:col-span-1">
                <DailyQuizWidget />
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <div className="flex space-x-4 overflow-x-auto pb-2 ml-70">
                {highlights.map((highlight) => (
                  <div key={highlight.id} className="flex flex-col items-center space-y-1 min-w-0">
                    <div className="w-16 h-16 mt-2 rounded-full overflow-hidden ring-2 ring-gray-300 dark:ring-gray-600 cursor-pointer hover:ring-[var(--color-primary)] transition-all hover:scale-105 ml-10">
                      <img
                        src={highlight.image}
                        alt={highlight.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-black dark:text-black text-center truncate w-16 ml-7">
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
                      ? 'border-purple-500 text-[var(--color-primary)]'
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
          
          {/* Edit Profile Modal */}
          <EditProfileModal />
        </div>
      </div>
    </div>
  );
}