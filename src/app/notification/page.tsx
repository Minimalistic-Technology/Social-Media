'use client';
import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Topbar from '../Components/Topbar';

// Types
interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'message';
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
  postImage?: string;
}

// Sample notifications data
const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'Lana Rose',
      username: '@lanarose',
      avatar: '/api/placeholder/40/40',
    },
    content: 'liked your post about celebrating holidays',
    timestamp: '2 minutes ago',
    isRead: false,
    postImage: '/api/placeholder/50/50',
  },
  {
    id: '2',
    type: 'follow',
    user: {
      name: 'Daniel Bale',
      username: '@danielbale',
      avatar: '/api/placeholder/40/40',
    },
    content: 'started following you',
    timestamp: '15 minutes ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'comment',
    user: {
      name: 'Jane Doe',
      username: '@janedoe',
      avatar: '/api/placeholder/40/40',
    },
    content: 'commented on your post: "Amazing photo! Love the composition"',
    timestamp: '1 hour ago',
    isRead: true,
    postImage: '/api/placeholder/50/50',
  },
  {
    id: '4',
    type: 'mention',
    user: {
      name: 'Tina White',
      username: '@tinawhite',
      avatar: '/api/placeholder/40/40',
    },
    content: 'mentioned you in a post',
    timestamp: '3 hours ago',
    isRead: true,
  },
  {
    id: '5',
    type: 'like',
    user: {
      name: 'Winnie H.',
      username: '@winnieh',
      avatar: '/api/placeholder/40/40',
    },
    content: 'liked your travel photo',
    timestamp: '1 day ago',
    isRead: true,
    postImage: '/api/placeholder/50/50',
  },
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const getNotificationIcon = (type: Notification['type']) => {
    const baseClass = "w-5 h-5 rounded-full flex items-center justify-center";
    switch (type) {
      case 'like':
        return (
          <div className={`${baseClass} bg-red-500 `}>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'comment':
        return (
          <div className={`${baseClass} bg-blue-500`}>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'follow':
        return (
          <div className={`${baseClass} bg-green-500`}>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
          </div>
        );
      case 'mention':
        return (
          <div className={`${baseClass} bg-purple-500`}>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'message':
        return (
          <div className={`${baseClass} bg-indigo-500`}>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Topbar */}
          <Topbar />

          {/* Page Content */}
          <div className="pt-5 px-6">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-lg shadow-sm ">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                  <p className="text-gray-600 mt-1">Stay updated with your latest activities</p>
                </div>

                <div className="flex items-center space-x-4">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Mark all as read
                    </button>
                  )}

                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setFilter('all')}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        filter === 'all'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      All ({notifications.length})
                    </button>
                    <button
                      onClick={() => setFilter('unread')}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        filter === 'unread'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Unread ({unreadCount})
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="mt-6">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-500">
                    {filter === 'unread'
                      ? "You're all caught up! No unread notifications."
                      : "You don't have any notifications yet."}
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {filteredNotifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      className={`p-4 flex items-start space-x-4 ${
                        index !== filteredNotifications.length - 1 ? 'border-b border-gray-100' : ''
                      } ${!notification.isRead ? 'bg-blue-50' : 'hover:bg-gray-50'} transition-colors cursor-pointer`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      {/* Avatar Placeholder */}
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-gray-600">
                            {notification.user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {/* Notification type icon */}
                        <div className="absolute -bottom-1 -right-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">
                              <span className="font-semibold">{notification.user.name}</span>{' '}
                              <span className="text-gray-600">{notification.content}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                          </div>

                          {notification.postImage && (
                            <div className="ml-3 flex-shrink-0">
                              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                            </div>
                          )}
                        </div>
                      </div>

                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;
