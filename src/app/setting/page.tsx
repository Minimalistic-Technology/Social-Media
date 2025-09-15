"use client"
import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Clock, 
  Eye, 
  Archive,
  Trash2,
  Heart,
  MessageCircle,
  Bookmark,
  Tag,
  Star,
  Share2,
  Settings,
  ChevronRight,
  Search,
  Globe,
  Smartphone,
  HelpCircle,
  LogOut,
  Mail,
  Phone,
  Camera,
  Lock,
  Users,
  Volume2,
  VolumeX,
  Download,
  Upload,
  Calendar,
  MapPin,
  Languages,
  Palette,
  Monitor,
  Wifi,
  Battery,
  HardDrive,
  Zap,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  X,
  Edit3,
  Save
} from 'lucide-react';

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  showArrow?: boolean;
  badge?: string | number;
  isActive?: boolean;
  hasToggle?: boolean;
  toggleState?: boolean;
  onToggle?: (state: boolean) => void;
}

interface NotificationSettings {
  likes: boolean;
  comments: boolean;
  follows: boolean;
  mentions: boolean;
  messages: boolean;
  posts: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  messageRequests: boolean;
  activityStatus: boolean;
  readReceipts: boolean;
}

interface TimeManagement {
  dailyLimit: number;
  breakReminders: boolean;
  weeklyReport: boolean;
  restrictedHours: { start: string; end: string };
}

const SettingsItem: React.FC<SettingsItemProps> = ({ 
  icon, 
  title, 
  subtitle, 
  onClick, 
  showArrow = true, 
  badge,
  isActive = false,
  hasToggle = false,
  toggleState = false,
  onToggle
}) => (
  <div 
    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 hover: bg-[var(--color-surface)]group ${isActive ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-4">
      <div className={`p-2 rounded-lg transition-colors duration-300 ${isActive ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-[var(--color-text)] group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-[var(--color-muted)] mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2">
      {badge && (
        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
          {badge}
        </span>
      )}
      {hasToggle && onToggle && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(!toggleState);
          }}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            toggleState ? 'bg-[var(--color-primary)]' : 'bg-gray-300'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            toggleState ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      )}
      {showArrow && !hasToggle && (
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
      )}
    </div>
  </div>
);

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-surface)]">
          <h2 className="text-xl font-semibold text-[var(--color-text)]">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [modalOpen, setModalOpen] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Account & Profile States
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Digital creator and photographer',
    location: 'New York, USA'
  });
  
  // Notification States
  const [notifications, setNotifications] = useState<NotificationSettings>({
    likes: true,
    comments: true,
    follows: true,
    mentions: true,
    messages: false,
    posts: true
  });
  
  // Privacy States
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'public',
    messageRequests: true,
    activityStatus: false,
    readReceipts: true
  });
  
  // Time Management States
  const [timeSettings, setTimeSettings] = useState<TimeManagement>({
    dailyLimit: 120,
    breakReminders: true,
    weeklyReport: true,
    restrictedHours: { start: '22:00', end: '08:00' }
  });
  
  // Activity States
  const [activityData, setActivityData] = useState({
    totalLikes: 1247,
    totalComments: 432,
    savedPosts: 89,
    taggedPosts: 156
  });
  
  // Content Management States
  const [contentStats, setContentStats] = useState({
    archivedPosts: 23,
    deletedItems: 12,
    sharedContent: 67,
    totalStorage: '2.4 GB'
  });
  
  // App Preferences States
  const [appSettings, setAppSettings] = useState({
    language: 'English (US)',
    autoplay: true,
    downloadQuality: 'high',
    cellularData: false,
    pushNotifications: true
  });

  const updateNotificationSetting = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const updatePrivacySetting = (key: keyof PrivacySettings, value: any) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const updateAppSetting = (key: string, value: any) => {
    setAppSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingsSections = [
    {
      id: 'account',
      title: 'Account & Profile',
      items: [
        {
          icon: <User className="w-5 h-5" />,
          title: 'Personal Information',
          subtitle: 'Manage your profile details and preferences',
          onClick: () => setModalOpen('profile')
        },
        {
          icon: <Shield className="w-5 h-5" />,
          title: 'Privacy & Security',
          subtitle: 'Control who can see your content',
          onClick: () => setModalOpen('privacy')
        },
        {
          icon: <Bell className="w-5 h-5" />,
          title: 'Notifications',
          subtitle: 'Customize your notification preferences',
          badge: Object.values(notifications).filter(Boolean).length,
          onClick: () => setModalOpen('notifications')
        }
      ]
    },
    {
      id: 'activity',
      title: 'Your Activity',
      items: [
        {
          icon: <Heart className="w-5 h-5" />,
          title: 'Likes',
          subtitle: `${activityData.totalLikes} posts liked`,
          onClick: () => setModalOpen('likes')
        },
        {
          icon: <MessageCircle className="w-5 h-5" />,
          title: 'Comments',
          subtitle: `${activityData.totalComments} comments made`,
          onClick: () => setModalOpen('comments')
        },
        {
          icon: <Bookmark className="w-5 h-5" />,
          title: 'Saved Posts',
          subtitle: `${activityData.savedPosts} posts saved`,
          onClick: () => setModalOpen('saved')
        },
        {
          icon: <Tag className="w-5 h-5" />,
          title: 'Tags & Mentions',
          subtitle: `Tagged in ${activityData.taggedPosts} posts`,
          onClick: () => setModalOpen('tags')
        }
      ]
    },
    {
      id: 'content',
      title: 'Content Management',
      items: [
        {
          icon: <Archive className="w-5 h-5" />,
          title: 'Archived Posts',
          subtitle: `${contentStats.archivedPosts} posts archived`,
          onClick: () => setModalOpen('archive')
        },
        {
          icon: <Trash2 className="w-5 h-5" />,
          title: 'Recently Deleted',
          subtitle: 'Recover deleted content',
          badge: contentStats.deletedItems,
          onClick: () => setModalOpen('deleted')
        },
        {
          icon: <Share2 className="w-5 h-5" />,
          title: 'Shared Content',
          subtitle: `${contentStats.sharedContent} items shared`,
          onClick: () => setModalOpen('shared')
        },
        {
          icon: <HardDrive className="w-5 h-5" />,
          title: 'Storage Management',
          subtitle: `${contentStats.totalStorage} used`,
          onClick: () => setModalOpen('storage')
        }
      ]
    },
    {
      id: 'preferences',
      title: 'App Preferences',
      items: [
        {
          icon: <Clock className="w-5 h-5" />,
          title: 'Time Management',
          subtitle: `${timeSettings.dailyLimit}min daily limit`,
          onClick: () => setModalOpen('time')
        },
        {
          icon: <Globe className="w-5 h-5" />,
          title: 'Language & Region',
          subtitle: appSettings.language,
          onClick: () => setModalOpen('language')
        },
        {
          icon: <Smartphone className="w-5 h-5" />,
          title: 'App Preferences',
          subtitle: 'Customize your app experience',
          onClick: () => setModalOpen('app')
        },
        {
          icon: <Download className="w-5 h-5" />,
          title: 'Data & Storage',
          subtitle: 'Manage downloads and cache',
          onClick: () => setModalOpen('data')
        }
      ]
    }
  ];

  const renderModal = () => {
    switch (modalOpen) {
      case 'profile':
        return (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Personal Information">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="w-full p-3 border border-[var(--color-surface)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full p-3 border border-[var(--color-surface)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="w-full p-3 border border-[var(--color-surface)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="w-full p-3 border border-[var(--color-surface)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
                  rows={3}
                />
              </div>
              <button className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg hover:bg-[var(--color-accent)] transition-colors flex items-center justify-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </Modal>
        );
        
      case 'notifications':
        return (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Notification Settings">
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3  bg-[var(--color-surface)]rounded-lg">
                  <div>
                    <h4 className="font-medium text-[var(--color-text)] capitalize">{key}</h4>
                    <p className="text-sm text-[var(--color-muted)]">Get notified about {key}</p>
                  </div>
                  <button
                    onClick={() => updateNotificationSetting(key as keyof NotificationSettings, !value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-[var(--color-primary)]' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </Modal>
        );
        
      case 'privacy':
        return (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Privacy & Security">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Profile Visibility</label>
                <select
                  value={privacy.profileVisibility}
                  onChange={(e) => updatePrivacySetting('profileVisibility', e.target.value)}
                  className="w-full p-3 border border-[var(--color-surface)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="friends">Friends Only</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-3  bg-[var(--color-surface)]rounded-lg">
                <div>
                  <h4 className="font-medium text-[var(--color-text)]">Message Requests</h4>
                  <p className="text-sm text-[var(--color-muted)]">Allow message requests from everyone</p>
                </div>
                <button
                  onClick={() => updatePrivacySetting('messageRequests', !privacy.messageRequests)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacy.messageRequests ? 'bg-[var(--color-primary)]' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy.messageRequests ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3  bg-[var(--color-surface)]rounded-lg">
                <div>
                  <h4 className="font-medium text-[var(--color-text)]">Activity Status</h4>
                  <p className="text-sm text-[var(--color-muted)]">Show when you're online</p>
                </div>
                <button
                  onClick={() => updatePrivacySetting('activityStatus', !privacy.activityStatus)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacy.activityStatus ? 'bg-[var(--color-primary)]' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy.activityStatus ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </Modal>
        );
        
      case 'time':
        return (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Time Management">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Daily Time Limit (minutes)</label>
                <input
                  type="number"
                  value={timeSettings.dailyLimit}
                  onChange={(e) => setTimeSettings({...timeSettings, dailyLimit: Number(e.target.value)})}
                  className="w-full p-3 border border-[var(--color-surface)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
                  min="30"
                  max="480"
                />
              </div>
              <div className="flex items-center justify-between p-3  bg-[var(--color-surface)]rounded-lg">
                <div>
                  <h4 className="font-medium text-[var(--color-text)]">Break Reminders</h4>
                  <p className="text-sm text-[var(--color-muted)]">Get reminded to take breaks</p>
                </div>
                <button
                  onClick={() => setTimeSettings({...timeSettings, breakReminders: !timeSettings.breakReminders})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    timeSettings.breakReminders ? 'bg-[var(--color-primary)]' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    timeSettings.breakReminders ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Quiet Hours</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[var(--color-muted)] mb-1">Start</label>
                    <input
                      type="time"
                      value={timeSettings.restrictedHours.start}
                      onChange={(e) => setTimeSettings({
                        ...timeSettings,
                        restrictedHours: {...timeSettings.restrictedHours, start: e.target.value}
                      })}
                      className="w-full p-2 border border-[var(--color-surface)] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--color-muted)] mb-1">End</label>
                    <input
                      type="time"
                      value={timeSettings.restrictedHours.end}
                      onChange={(e) => setTimeSettings({
                        ...timeSettings,
                        restrictedHours: {...timeSettings.restrictedHours, end: e.target.value}
                      })}
                      className="w-full p-2 border border-[var(--color-surface)] rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
        
      case 'likes':
        return (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Your Likes">
            <div className="space-y-4">
              <div className="text-center p-6  bg-[var(--color-surface)]rounded-lg">
                <Heart className="w-12 h-12 text-[var(--color-danger)] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[var(--color-text)]">Total Likes Given</h3>
                <p className="text-3xl font-bold text-[var(--color-danger)] mt-2">{activityData.totalLikes}</p>
              </div>
              <div className="space-y-3">
                <button className="w-full p-3 text-left border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  <div className="font-medium">View Liked Posts</div>
                  <div className="text-sm text-[var(--color-muted)]">See all posts you've liked</div>
                </button>
                <button className="w-full p-3 text-left border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  <div className="font-medium">Download Data</div>
                  <div className="text-sm text-[var(--color-muted)]">Export your likes history</div>
                </button>
                <button className="w-full p-3 text-left border border-[var(--color-danger-border)] rounded-lg hover:bg-[var(--color-danger-bg)] transition-colors text-red-600">
                  <div className="font-medium">Clear All Likes</div>
                  <div className="text-sm text-[var(--color-danger)]">Remove all your likes (irreversible)</div>
                </button>
              </div>
            </div>
          </Modal>
        );
        
      case 'archive':
        return (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Archived Posts">
            <div className="space-y-4">
              <div className="text-center p-6  bg-[var(--color-surface)]rounded-lg">
                <Archive className="w-12 h-12 text-[var(--color-muted)] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[var(--color-text)]">Archived Posts</h3>
                <p className="text-3xl font-bold text-gray-600 mt-2">{contentStats.archivedPosts}</p>
              </div>
              <div className="space-y-3">
                <button className="w-full p-3 text-left border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  <div className="font-medium">View Archived Posts</div>
                  <div className="text-sm text-[var(--color-muted)]">Browse your archived content</div>
                </button>
                <button className="w-full p-3 text-left border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  <div className="font-medium">Restore All</div>
                  <div className="text-sm text-[var(--color-muted)]">Unarchive all posts</div>
                </button>
                <button className="w-full p-3 text-left border border-[var(--color-danger-border)] rounded-lg hover:bg-[var(--color-danger-bg)] transition-colors text-red-600">
                  <div className="font-medium">Delete All Archived</div>
                  <div className="text-sm text-[var(--color-danger)]">Permanently delete archived posts</div>
                </button>
              </div>
            </div>
          </Modal>
        );
        
      case 'app':
        return (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="App Preferences">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3  bg-[var(--color-surface)]rounded-lg">
                <div>
                  <h4 className="font-medium text-[var(--color-text)]">Autoplay Videos</h4>
                  <p className="text-sm text-[var(--color-muted)]">Automatically play videos in feed</p>
                </div>
                <button
                  onClick={() => updateAppSetting('autoplay', !appSettings.autoplay)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    appSettings.autoplay ? 'bg-[var(--color-primary)]' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    appSettings.autoplay ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Download Quality</label>
                <select
                  value={appSettings.downloadQuality}
                  onChange={(e) => updateAppSetting('downloadQuality', e.target.value)}
                  className="w-full p-3 border border-[var(--color-surface)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
                >
                  <option value="low">Low (Save Data)</option>
                  <option value="medium">Medium</option>
                  <option value="high">High (Best Quality)</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-3  bg-[var(--color-surface)]rounded-lg">
                <div>
                  <h4 className="font-medium text-[var(--color-text)]">Use Cellular Data</h4>
                  <p className="text-sm text-[var(--color-muted)]">Download content using mobile data</p>
                </div>
                <button
                  onClick={() => updateAppSetting('cellularData', !appSettings.cellularData)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    appSettings.cellularData ? 'bg-[var(--color-primary)]' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    appSettings.cellularData ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </Modal>
        );

      default:
        return null;
    }
  };

  // Filter settings based on search
  const filteredSections = settingsSections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-[var(--color-text)]">Settings</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--color-muted)]">Last updated: Today</span>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search settings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--color-surface)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all text-[var(--color-text)] placeholder-gray-500"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-surface)] p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">Quick Access</h2>
              <nav className="space-y-2">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-[var(--color-text)] hover:bg-gray-50'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
              
              <div className="mt-6 pt-6 border-t border-[var(--color-surface)] space-y-2">
                <button 
                  onClick={() => setModalOpen('help')}
                  className="w-full text-left px-4 py-3 rounded-lg text-[var(--color-text)] hover: bg-[var(--color-surface)]transition-colors flex items-center gap-3">
                  <HelpCircle className="w-5 h-5" />
                  Help & Support
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-[var(--color-danger-bg)] transition-colors flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {(searchTerm ? filteredSections : settingsSections)
              .filter(section => !searchTerm || section.id === activeSection)
              .map((section) => (
                <div key={section.id}>
                  <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-surface)] overflow-hidden">
                    <div className="p-6 border-b border-[var(--color-surface)]">
                      <h2 className="text-xl font-semibold text-[var(--color-text)]">
                        {section.title}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Manage your {section.title.toLowerCase()} preferences
                      </p>
                    </div>
                    <div className="p-6 space-y-2">
                      {section.items.map((item, index) => (
                        <SettingsItem
                          key={index}
                          icon={item.icon}
                          title={item.title}
                          subtitle={item.subtitle}
                          badge={item.badge}
                          onClick={item.onClick}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}

            {/* User Stats Card */}
            <div className="bg-gradient-to-br from-[var(--color-primary-light)]to-[var(--color-primary)] rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Account Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">127</div>
                  <div className="text-blue-100 text-sm">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1.2K</div>
                  <div className="text-blue-100 text-sm">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">892</div>
                  <div className="text-blue-100 text-sm">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">43</div>
                  <div className="text-blue-100 text-sm">Saved</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-surface)] p-6">
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setModalOpen('backup')}
                  className="p-4 border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors text-center group">
                  <Upload className="w-6 h-6 text-gray-400group-hover:text-[var(--color-primary)]
 mx-auto mb-2" />
                  <div className="font-medium text-[var(--color-text)] group-hover:text-blue-600">Backup Data</div>
                </button>
                <button 
                  onClick={() => setModalOpen('export')}
                  className="p-4 border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors text-center group">
                  <Download className="w-6 h-6 text-gray-400group-hover:text-[var(--color-primary)]
 mx-auto mb-2" />
                  <div className="font-medium text-[var(--color-text)] group-hover:text-blue-600">Export Data</div>
                </button>
                <button 
                  onClick={() => setModalOpen('reset')}
                  className="p-4 border border-[var(--color-danger-border)] rounded-lg hover:bg-[var(--color-danger-bg)] transition-colors text-center group">
                  <RefreshCw className="w-6 h-6 text-red-400 group-hover:text-[var(--color-danger)] mx-auto mb-2" />
                  <div className="font-medium text-red-600 group-hover:text-red-700">Reset Settings</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Modals */}
        {modalOpen === 'comments' && (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Your Comments">
            <div className="space-y-4">
              <div className="text-center p-6  bg-[var(--color-surface)]rounded-lg">
                <MessageCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[var(--color-text)]">Total Comments</h3>
                <p className="text-3xl font-bold text-blue-500 mt-2">{activityData.totalComments}</p>
              </div>
              <div className="space-y-3">
                <div className="p-3 border border-[var(--color-surface)] rounded-lg">
                  <div className="font-medium">Recent Activity</div>
                  <div className="text-sm text-[var(--color-muted)] mt-1">Last comment: 2 hours ago</div>
                </div>
                <button className="w-full p-3 text-left border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  <div className="font-medium">View All Comments</div>
                  <div className="text-sm text-[var(--color-muted)]">Browse your comment history</div>
                </button>
                <button className="w-full p-3 text-left border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  <div className="font-medium">Download Comments</div>
                  <div className="text-sm text-[var(--color-muted)]">Export your comments data</div>
                </button>
              </div>
            </div>
          </Modal>
        )}

        {modalOpen === 'saved' && (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Saved Posts">
            <div className="space-y-4">
              <div className="text-center p-6  bg-[var(--color-surface)]rounded-lg">
                <Bookmark className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[var(--color-text)]">Saved Posts</h3>
                <p className="text-3xl font-bold text-green-500 mt-2">{activityData.savedPosts}</p>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium text-green-800">Collections</div>
                  <div className="text-sm text-green-600 mt-1">Organize your saved posts into collections</div>
                </div>
                <button className="w-full p-3 text-left border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  <div className="font-medium">Create Collection</div>
                  <div className="text-sm text-[var(--color-muted)]">Group saved posts by topic</div>
                </button>
                <button className="w-full p-3 text-left border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  <div className="font-medium">View All Saved</div>
                  <div className="text-sm text-[var(--color-muted)]">Browse all saved content</div>
                </button>
              </div>
            </div>
          </Modal>
        )}

        {modalOpen === 'tags' && (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Tags & Mentions">
            <div className="space-y-4">
              <div className="text-center p-6  bg-[var(--color-surface)]rounded-lg">
                <Tag className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[var(--color-text)]">Tagged Posts</h3>
                <p className="text-3xl font-bold text-purple-500 mt-2">{activityData.taggedPosts}</p>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="font-medium text-purple-800">Tag Approval</div>
                  <div className="text-sm text-purple-600 mt-1">Control who can tag you in posts</div>
                </div>
                <button className="w-full p-3 text-left border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  <div className="font-medium">Review Tags</div>
                  <div className="text-sm text-[var(--color-muted)]">Approve or remove tags</div>
                </button>
                <button className="w-full p-3 text-left border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  <div className="font-medium">Tag Settings</div>
                  <div className="text-sm text-[var(--color-muted)]">Manage tagging preferences</div>
                </button>
              </div>
            </div>
          </Modal>
        )}

        {modalOpen === 'deleted' && (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Recently Deleted">
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Auto-Delete Policy</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Items are permanently deleted after 30 days
                </p>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 border border-[var(--color-surface)] rounded-lg">
                    <div>
                      <div className="font-medium">Deleted Post #{item}</div>
                      <div className="text-sm text-[var(--color-muted)]">Deleted {item * 5} days ago</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                        Restore
                      </button>
                      <button className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full p-3 bg-[var(--color-danger-bg)]0 text-white rounded-lg hover:bg-red-600 transition-colors">
                Empty Trash
              </button>
            </div>
          </Modal>
        )}

        {modalOpen === 'shared' && (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Shared Content">
            <div className="space-y-4">
              <div className="text-center p-6  bg-[var(--color-surface)]rounded-lg">
                <Share2 className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[var(--color-text)]">Shared Items</h3>
                <p className="text-3xl font-bold text-indigo-500 mt-2">{contentStats.sharedContent}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3  bg-[var(--color-surface)]rounded-lg">
                  <div className="font-bold text-lg">23</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div className="p-3  bg-[var(--color-surface)]rounded-lg">
                  <div className="font-bold text-lg">44</div>
                  <div className="text-sm text-gray-600">Stories</div>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full p-3 text-left border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  <div className="font-medium">View Sharing History</div>
                  <div className="text-sm text-[var(--color-muted)]">See what you've shared and when</div>
                </button>
                <button className="w-full p-3 text-left border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  <div className="font-medium">Sharing Preferences</div>
                  <div className="text-sm text-[var(--color-muted)]">Control default sharing settings</div>
                </button>
              </div>
            </div>
          </Modal>
        )}

        {modalOpen === 'storage' && (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Storage Management">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-900">Storage Used</span>
                  <span className="text-blue-700 font-bold">{contentStats.totalStorage}</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-[var(--color-primary)] h-2 rounded-full" style={{width: '48%'}}></div>
                </div>
                <div className="text-sm text-blue-700 mt-1">48% of 5GB used</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-[var(--color-surface)] rounded-lg">
                  <div>
                    <div className="font-medium">Photos & Videos</div>
                    <div className="text-sm text-[var(--color-muted)]">1.8 GB</div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Manage</button>
                </div>
                <div className="flex items-center justify-between p-3 border border-[var(--color-surface)] rounded-lg">
                  <div>
                    <div className="font-medium">Cache & Temp Files</div>
                    <div className="text-sm text-[var(--color-muted)]">0.6 GB</div>
                  </div>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">Clear</button>
                </div>
                <button className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Optimize Storage
                </button>
              </div>
            </div>
          </Modal>
        )}

        {modalOpen === 'language' && (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Language & Region">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">App Language</label>
                <select
                  value={appSettings.language}
                  onChange={(e) => updateAppSetting('language', e.target.value)}
                  className="w-full p-3 border border-[var(--color-surface)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
                >
                  <option value="English (US)">English (US)</option>
                  <option value="English (UK)">English (UK)</option>
                  <option value="Spanish">Español</option>
                  <option value="French">Français</option>
                  <option value="German">Deutsch</option>
                  <option value="Japanese">日本語</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Region</label>
                <select className="w-full p-3 border border-[var(--color-surface)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Time Zone</label>
                <select className="w-full p-3 border border-[var(--color-surface)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]">
                  <option>Eastern Time (UTC-5)</option>
                  <option>Pacific Time (UTC-8)</option>
                  <option>Mountain Time (UTC-7)</option>
                  <option>Central Time (UTC-6)</option>
                </select>
              </div>
              <button className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg hover:bg-[var(--color-accent)] transition-colors">
                Save Changes
              </button>
            </div>
          </Modal>
        )}

        {modalOpen === 'data' && (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Data & Storage">
            <div className="space-y-4">
              <div className="p-4  bg-[var(--color-surface)]rounded-lg">
                <h4 className="font-medium mb-3">Data Usage This Month</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Mobile Data</span>
                    <span className="text-sm font-medium">1.2 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Wi-Fi</span>
                    <span className="text-sm font-medium">3.8 GB</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-[var(--color-surface)] rounded-lg">
                  <div>
                    <div className="font-medium">Auto-download on Wi-Fi</div>
                    <div className="text-sm text-[var(--color-muted)]">Download content when connected to Wi-Fi</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[var(--color-primary)]">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 border border-[var(--color-surface)] rounded-lg">
                  <div>
                    <div className="font-medium">Data Saver Mode</div>
                    <div className="text-sm text-[var(--color-muted)]">Reduce data usage</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                  </button>
                </div>
                <button className="w-full p-3 border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)] transition-colors text-left">
                  <div className="font-medium">Clear Cache</div>
                  <div className="text-sm text-[var(--color-muted)]">Free up 142 MB</div>
                </button>
              </div>
            </div>
          </Modal>
        )}

        {modalOpen === 'backup' && (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Backup Data">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Auto Backup Enabled</span>
                </div>
                <p className="text-sm text-green-700">
                  Last backup: Today at 3:24 AM
                </p>
              </div>
              <div className="space-y-3">
                <div className="p-3 border border-[var(--color-surface)] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Photos & Videos</div>
                      <div className="text-sm text-[var(--color-muted)]">5,247 items</div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
                <div className="p-3 border border-[var(--color-surface)] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Profile Data</div>
                      <div className="text-sm text-[var(--color-muted)]">Settings, preferences</div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
                <button className="w-full p-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors">
                  Backup Now
                </button>
                <button className="w-full p-3 border border-[var(--color-surface)] text-[var(--color-text)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  Backup Settings
                </button>
              </div>
            </div>
          </Modal>
        )}

        {modalOpen === 'logout' && (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Logout">
            <div className="space-y-4">
              <div className="text-center p-6">
                <LogOut className="w-16 h-16 text-[var(--color-danger)] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">Are you sure you want to logout?</h3>
                <p className="text-gray-600">You'll need to sign in again to access your account.</p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-yellow-800 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Before you go</span>
                </div>
                <div className="text-sm text-yellow-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>• Unsaved changes will be lost</span>
                    <span className="text-xs bg-yellow-200 px-2 py-1 rounded">3 items</span>
                  </div>
                  <div>• Downloaded content will remain on device</div>
                  <div>• You can sign back in anytime</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border border-[var(--color-surface)] rounded-lg">
                  <input 
                    type="checkbox" 
                    id="rememberDevice"
                    className="w-4 h-4 text-blue-600 border-[var(--color-surface)] rounded focus:ring-[var(--color-primary)]"
                  />
                  <label htmlFor="rememberDevice" className="text-sm text-[var(--color-text)] flex-1">
                    Remember this device for faster sign-in
                  </label>
                </div>
                
                <div className="flex items-center gap-3 p-3 border border-[var(--color-surface)] rounded-lg">
                  <input 
                    type="checkbox" 
                    id="clearCache"
                    className="w-4 h-4 text-blue-600 border-[var(--color-surface)] rounded focus:ring-[var(--color-primary)]"
                  />
                  <label htmlFor="clearCache" className="text-sm text-[var(--color-text)] flex-1">
                    Clear cache and temporary files (142 MB)
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setModalOpen('')}
                  className="flex-1 px-4 py-3 border border-[var(--color-surface)] text-[var(--color-text)] rounded-lg hover: bg-[var(--color-surface)]transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    // Add logout functionality here
                    console.log('User logged out');
                    // You can add actual logout logic here:
                    // - Clear user session
                    // - Clear local storage (if any)
                    // - Redirect to login page
                    // - Clear authentication tokens
                    alert('Logged out successfully! Redirecting to login...');
                    setModalOpen('');
                    // window.location.href = '/login'; // Uncomment for actual redirect
                  }}
                  className="flex-1 px-4 py-3 bg-[var(--color-danger-bg)]0 text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </Modal>
        )}

        {modalOpen === 'help' && (
          <Modal isOpen={true} onClose={() => setModalOpen('')} title="Help & Support">
            <div className="space-y-4">
              <div className="space-y-3">
                <button className="w-full p-4 text-left border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-medium">FAQ</div>
                      <div className="text-sm text-[var(--color-muted)]">Find answers to common questions</div>
                    </div>
                  </div>
                </button>
                <button className="w-full p-4 text-left border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium">Contact Support</div>
                      <div className="text-sm text-[var(--color-muted)]">Get help from our team</div>
                    </div>
                  </div>
                </button>
                <button className="w-full p-4 text-left border border-[var(--color-surface)] rounded-lg hover: bg-[var(--color-surface)]transition-colors">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <div>
                      <div className="font-medium">Rate App</div>
                      <div className="text-sm text-[var(--color-muted)]">Help us improve</div>
                    </div>
                  </div>
                </button>
              </div>
              <div className="pt-4 border-t border-[var(--color-surface)]">
                <div className="text-center text-sm text-[var(--color-muted)]">
                  App Version 2.1.4 • Build 1205
                </div>
              </div>
            </div>
          </Modal>
        )}

        {/* Render active modal */}
        {renderModal()}
      </div>
    </div>
  );
};

export default SettingsPage;