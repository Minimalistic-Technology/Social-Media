import React, { useState } from 'react';
import { Heart, MessageCircle, UserPlus, Share2, Camera, MoreHorizontal, ArrowLeft } from 'lucide-react';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'share';
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
  isRead: boolean;
  postImage?: string;
  isFollowingBack?: boolean;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      user: {
        name: 'Lana Rose',
        username: 'lanarose',
        avatar: '/api/placeholder/40/40'
      },
      message: 'liked your photo.',
      timestamp: '2m',
      isRead: false,
      postImage: '/api/placeholder/44/44'
    },
    {
      id: '2',
      type: 'follow',
      user: {
        name: 'Daniel Bale',
        username: 'danielbale',
        avatar: '/api/placeholder/40/40'
      },
      message: 'started following you.',
      timestamp: '5m',
      isRead: false,
      isFollowingBack: false
    },
    {
      id: '3',
      type: 'comment',
      user: {
        name: 'Jane Doe',
        username: 'janedoe',
        avatar: '/api/placeholder/40/40'
      },
      message: 'commented: "Amazing shot! 📸"',
      timestamp: '1h',
      isRead: true,
      postImage: '/api/placeholder/44/44'
    },
    {
      id: '4',
      type: 'like',
      user: {
        name: 'Winnie H.',
        username: 'winnieh',
        avatar: '/api/placeholder/40/40'
      },
      message: 'and 12 others liked your photo.',
      timestamp: '2h',
      isRead: true,
      postImage: '/api/placeholder/44/44'
    },
    {
      id: '5',
      type: 'mention',
      user: {
        name: 'Tina White',
        username: 'tinawhite',
        avatar: '/api/placeholder/40/40'
      },
      message: 'mentioned you in a comment: "@Dayi check this out!"',
      timestamp: '3h',
      isRead: true,
      postImage: '/api/placeholder/44/44'
    },
    {
      id: '6',
      type: 'follow',
      user: {
        name: 'Lila James',
        username: 'lilajames',
        avatar: '/api/placeholder/40/40'
      },
      message: 'started following you.',
      timestamp: '1d',
      isRead: true,
      isFollowingBack: true
    },
    {
      id: '7',
      type: 'like',
      user: {
        name: 'Alex Thompson',
        username: 'alexthompson',
        avatar: '/api/placeholder/40/40'
      },
      message: 'liked your story.',
      timestamp: '2d',
      isRead: true
    }
  ]);

  const [selectedTab, setSelectedTab] = useState<'all' | 'following'>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500 fill-current" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-gray-600" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-blue-500" />;
      case 'mention':
        return <MessageCircle className="w-5 h-5 text-purple-500" />;
      case 'share':
        return <Share2 className="w-5 h-5 text-green-500" />;
      default:
        return <Heart className="w-5 h-5 text-gray-400" />;
    }
  };

  const handleFollowBack = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId
          ? { ...notif, isFollowingBack: !notif.isFollowingBack }
          : notif
      )
    );
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const filteredNotifications = notifications.filter(notif => {
    if (selectedTab === 'following') {
      return notif.type === 'follow' || notif.isFollowingBack;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">Notifications</h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-md mx-auto px-4 flex space-x-8 border-b border-gray-100">
          <button
            onClick={() => setSelectedTab('all')}
            className={`py-3 px-1 font-medium text-sm relative ${
              selectedTab === 'all'
                ? 'text-black'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All
            {selectedTab === 'all' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
            )}
          </button>
          <button
            onClick={() => setSelectedTab('following')}
            className={`py-3 px-1 font-medium text-sm relative ${
              selectedTab === 'following'
                ? 'text-black'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Following
            {selectedTab === 'following' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-md mx-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-gray-500 text-center">When someone likes or comments on your posts, you'll see it here.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`p-4 flex items-start space-x-3 hover:bg-gray-50 cursor-pointer ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
              >
                {/* User Avatar with Icon Overlay */}
                <div className="relative flex-shrink-0">
                  <img
                    src={notification.user.avatar}
                    alt={notification.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>

                {/* Notification Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-semibold">{notification.user.username}</span>{' '}
                        <span className="text-gray-700">{notification.message}</span>{' '}
                        <span className="text-gray-500">{notification.timestamp}</span>
                      </p>
                      
                      {/* Follow Back Button */}
                      {notification.type === 'follow' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFollowBack(notification.id);
                          }}
                          className={`mt-2 px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors ${
                            notification.isFollowingBack
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          {notification.isFollowingBack ? 'Following' : 'Follow Back'}
                        </button>
                      )}
                    </div>

                    {/* Post Thumbnail */}
                    {notification.postImage && (
                      <div className="ml-3 flex-shrink-0">
                        <img
                          src={notification.postImage}
                          alt="Post"
                          className="w-11 h-11 rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Unread Indicator */}
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Today/Earlier Sections */}
      {filteredNotifications.length > 0 && (
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="space-y-6">
            {/* Today Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Today
              </h3>
              <div className="text-sm text-gray-500">
                {filteredNotifications.filter(n => ['2m', '5m', '1h', '2h', '3h'].includes(n.timestamp)).length} notifications
              </div>
            </div>

            {/* Earlier Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Earlier
              </h3>
              <div className="text-sm text-gray-500">
                {filteredNotifications.filter(n => ['1d', '2d'].includes(n.timestamp)).length} notifications
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;