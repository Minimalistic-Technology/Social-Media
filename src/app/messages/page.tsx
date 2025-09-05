"use client"
import React, { useState } from 'react';
import { Search, Send, ArrowLeft, Plus, Phone, Video, Info, Smile, Paperclip, Camera, MoreHorizontal } from 'lucide-react';

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isOnline?: boolean;
}

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead?: boolean;
}

interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  messages: ChatMessage[];
}

interface FriendRequest {
  id: string;
  user: User;
  mutualFriends: number;
  timestamp: string;
}

const MessagePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Primary');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      user: { 
        id: '9', 
        name: 'Ethan Reynolds', 
        username: 'ethan_r', 
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
        isOnline: true
      },
      lastMessage: 'Some web development stuff. Really enjoying it!',
      timestamp: '2:37 PM',
      messages: [
        { id: 'm1', senderId: '9', content: 'Hey! How are you doing?', timestamp: '2:30 PM', isRead: true },
        { id: 'm2', senderId: 'me', content: 'I\'m doing great! Just working on some projects', timestamp: '2:32 PM', isRead: true },
        { id: 'm3', senderId: '9', content: 'That sounds exciting! What kind of projects?', timestamp: '2:35 PM', isRead: true },
        { id: 'm4', senderId: 'me', content: 'Some web development stuff. Really enjoying it!', timestamp: '2:37 PM', isRead: false },
        { id: 'm5', senderId: '9', content: 'That\'s awesome! I\'ve been learning React lately', timestamp: '2:40 PM', isRead: false },
        { id: 'm6', senderId: 'me', content: 'React is great! Are you building anything specific?', timestamp: '2:42 PM', isRead: true },
        { id: 'm7', senderId: '9', content: 'Working on a portfolio website. It\'s challenging but fun!', timestamp: '2:45 PM', isRead: false },
        { id: 'm8', senderId: 'me', content: 'Nice! Portfolio sites are a great way to showcase your work', timestamp: '2:47 PM', isRead: true },
        { id: 'm9', senderId: '9', content: 'Exactly! I want to include some interactive elements', timestamp: '2:50 PM', isRead: false },
        { id: 'm10', senderId: 'me', content: 'Interactive elements can really make a portfolio stand out. Have you considered using Three.js for 3D effects?', timestamp: '2:52 PM', isRead: true },
        { id: 'm11', senderId: '9', content: 'That sounds interesting! I haven\'t tried Three.js yet', timestamp: '2:55 PM', isRead: false },
        { id: 'm12', senderId: 'me', content: 'It\'s definitely worth learning. The documentation is pretty good too', timestamp: '2:57 PM', isRead: true }
      ]
    },
    {
      id: '2',
      user: { 
        id: '10', 
        name: 'Ava Thompson', 
        username: 'ava_t', 
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        isOnline: false
      },
      lastMessage: 'On my way',
      timestamp: '5m',
      messages: [
        { id: 'm4', senderId: 'me', content: 'Are you coming to the meeting?', timestamp: '1:15 PM', isRead: true },
        { id: 'm5', senderId: '10', content: 'On my way', timestamp: '1:20 PM', isRead: false }
      ]
    },
    {
      id: '3',
      user: { 
        id: '11', 
        name: 'Pablo Morandi', 
        username: 'pablo_m', 
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        isOnline: true
      },
      lastMessage: 'I may be late :)',
      timestamp: '8m',
      messages: [
        { id: 'm6', senderId: '11', content: 'Meeting at 3 PM right?', timestamp: '12:45 PM', isRead: true },
        { id: 'm7', senderId: 'me', content: 'Yes, conference room B', timestamp: '12:50 PM', isRead: true },
        { id: 'm8', senderId: '11', content: 'I may be late :)', timestamp: '12:52 PM', isRead: false }
      ]
    },
    {
      id: '4',
      user: { 
        id: '12', 
        name: 'Olivia Hayes', 
        username: 'olivia_h', 
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face',
        isOnline: true
      },
      lastMessage: 'Great. Get the wrong girl',
      timestamp: '1h',
      messages: [
        { id: 'm9', senderId: '12', content: 'Did you see the presentation?', timestamp: '11:30 AM', isRead: true },
        { id: 'm10', senderId: '12', content: 'Great. Get the wrong girl', timestamp: '11:35 AM', isRead: false }
      ]
    },
    {
      id: '5',
      user: { 
        id: '13', 
        name: 'Nathan Hughes', 
        username: 'nathan_h', 
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        isOnline: false
      },
      lastMessage: 'You change a call',
      timestamp: '2h',
      messages: [
        { id: 'm11', senderId: '13', content: 'Let\'s schedule a call later', timestamp: '10:30 AM', isRead: true },
        { id: 'm12', senderId: '13', content: 'You change a call', timestamp: '10:35 AM', isRead: false }
      ]
    },
    {
      id: '6',
      user: { 
        id: '14', 
        name: 'Peter Pol', 
        username: 'peter_p', 
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
        isOnline: false
      },
      lastMessage: 'You change a call',
      timestamp: '3h',
      messages: [
        { id: 'm13', senderId: '14', content: 'Can we reschedule?', timestamp: '9:30 AM', isRead: true },
        { id: 'm14', senderId: '14', content: 'You change a call', timestamp: '9:35 AM', isRead: false }
      ]
    },
    {
      id: '7',
      user: { 
        id: '15', 
        name: 'Mason Cooper', 
        username: 'mason_c', 
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face',
        isOnline: false
      },
      lastMessage: 'You Unfriended me???',
      timestamp: '5h',
      messages: [
        { id: 'm15', senderId: '15', content: 'Hey, what happened?', timestamp: '8:30 AM', isRead: true },
        { id: 'm16', senderId: '15', content: 'You Unfriended me???', timestamp: '8:35 AM', isRead: false }
      ]
    }
  ]);

  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    {
      id: 'fr1',
      user: { 
        id: '16', 
        name: 'Hajia Bintu', 
        username: 'hajia_bintu', 
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop&crop=face'
      },
      mutualFriends: 8,
      timestamp: '2h'
    },
    {
      id: 'fr2',
      user: { 
        id: '17', 
        name: 'Marcus Johnson', 
        username: 'marcus_j', 
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      },
      mutualFriends: 3,
      timestamp: '5h'
    }
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const messageId = `m${Date.now()}`;

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversation) {
        const updatedMessages = [ {
          id: messageId,
          senderId: 'me',
          content: newMessage,
          timestamp,
          isRead: true
        },...conv.messages];
        
        return {
          ...conv,
          messages: updatedMessages,
          lastMessage: newMessage,
          timestamp: 'now',
          unread: 0
        };
      }
      return conv;
    }));

    setNewMessage('');
    setShowEmojiPicker(false);
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          unread: 0,
          messages: conv.messages.map(msg => ({ ...msg, isRead: true }))
        };
      }
      return conv;
    }));
  };

  const handleAttachment = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*,audio/*,.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const messageId = `m${Date.now()}`;
        
        if (selectedConversation) {
          setConversations(prev => prev.map(conv => {
            if (conv.id === selectedConversation) {
              return {
                ...conv,
                messages: [...conv.messages, {
                  id: messageId,
                  senderId: 'me',
                  content: `📎 ${file.name}`,
                  timestamp,
                  isRead: true
                }],
                lastMessage: `📎 ${file.name}`,
                timestamp: 'now'
              };
            }
            return conv;
          }));
        }
      }
    };
    input.click();
  };

  const handleEmojiClick = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handlePhoneCall = () => {
    console.log('Starting voice call...');
    alert('Voice call feature would be implemented here');
  };

  const handleVideoCall = () => {
    setIsVideoCallActive(true);
    console.log('Starting video call...');
    setTimeout(() => {
      setIsVideoCallActive(false);
    }, 5000);
  };

  const handleAcceptRequest = (requestId: string) => {
    const request = friendRequests.find(r => r.id === requestId);
    if (request) {
      const newConversation: Conversation = {
        id: `conv_${request.user.id}`,
        user: request.user,
        lastMessage: 'You are now connected',
        timestamp: 'now',
        messages: [{
          id: `welcome_${request.user.id}`,
          senderId: 'system',
          content: 'You are now connected! Say hi 👋',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: true
        }]
      };
      
      setConversations(prev => [newConversation, ...prev]);
      setFriendRequests(prev => prev.filter(r => r.id !== requestId));
    }
  };

  const handleDeclineRequest = (requestId: string) => {
    setFriendRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const handleProfileClick = () => {
    setShowSidebar(!showSidebar);
  };

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);
  const commonEmojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {/* Left Sidebar - Chat List */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-purple-600" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Messages</h1>
            </div>
          </div>
          
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Chats</h2>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search in chats"
              className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 dark:text-white placeholder-gray-500"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div 
              key={conversation.id} 
              onClick={() => {
                setSelectedConversation(conversation.id);
                markAsRead(conversation.id);
                setShowSidebar(false); // Close sidebar when selecting new conversation
              }}
              className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                selectedConversation === conversation.id ? 'bg-blue-50 dark:bg-gray-700' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                    {conversation.user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {conversation.user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {conversation.user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{conversation.timestamp}</p>
                  </div>
                  <p className={`text-sm truncate ${
                    conversation.unread ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unread && (
                  <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                    {conversation.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {selectedConversation && selectedConv ? (
          <>
            {/* Video Call Overlay */}
            {isVideoCallActive && (
              <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-semibold">
                      {selectedConv.user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Video call with {selectedConv.user.name}</h3>
                  <p className="text-sm text-gray-300 mb-4">Connecting...</p>
                  <button 
                    onClick={() => setIsVideoCallActive(false)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
                  >
                    End Call
                  </button>
                </div>
              </div>
            )}

            {/* Chat Header */}
            <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 -m-2 transition-colors"
                onClick={handleProfileClick}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                    {selectedConv.user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {selectedConv.user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{selectedConv.user.name}</h3>
                  <p className="text-xs text-green-500">
                    {selectedConv.user.isOnline ? 'Active now' : 'Last seen 2h ago'}
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Messages Container */}
            <div className="flex-1 flex overflow-hidden">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-ful flex flex-col-reverse space-y-4">
                  {selectedConv.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-sm px-4 py-2 rounded-2xl ${
                        message.senderId === 'me' 
                          ? 'bg-purple-600 text-white' 
                          : message.senderId === 'system'
                          ? 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-center text-sm'
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === 'me' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Details Sidebar - Only shows when showSidebar is true */}
              {showSidebar && (
                <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-4">
                      {selectedConv.user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {selectedConv.user.name}
                    </h3>
                    <p className="text-sm text-green-500 mb-6">Active now</p>
                    
                    <div className="flex justify-center space-x-6 mb-6">
                      <button 
                        onClick={handlePhoneCall}
                        className="flex flex-col items-center space-y-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <Phone className="w-5 h-5" />
                        </div>
                        <span className="text-xs">Call</span>
                      </button>
                      <button 
                        onClick={handleVideoCall}
                        className="flex flex-col items-center space-y-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <Video className="w-5 h-5" />
                        </div>
                        <span className="text-xs">Video</span>
                      </button>
                      <button className="flex flex-col items-center space-y-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <Search className="w-5 h-5" />
                        </div>
                        <span className="text-xs">Search</span>
                      </button>
                      <button className="flex flex-col items-center space-y-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <Info className="w-5 h-5" />
                        </div>
                        <span className="text-xs">Info</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input - Fixed at bottom */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 relative">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleAttachment}
                  className="text-gray-500 hover:text-purple-600 transition-colors"
                  title="Attach file"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className="text-gray-500 hover:text-purple-600 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
                
                <div className="flex-1 flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500"
                  />
                  <button 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className={`ml-2 transition-colors ${showEmojiPicker ? 'text-purple-600' : 'text-gray-500 hover:text-purple-600'}`}
                    title="Add emoji"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                
                <button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-purple-600 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-full transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute bottom-20 right-4 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl z-50">
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Emojis</span>
                      <button 
                        onClick={() => setShowEmojiPicker(false)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid grid-cols-8 gap-1 max-h-40 overflow-y-auto">
                      {commonEmojis.slice(0, 48).map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => handleEmojiClick(emoji)}
                          className="text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          // Welcome Screen - No chat selected
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-12 h-12 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Your Messages
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Send private messages to friends and colleagues
              </p>
              <button 
                onClick={() => console.log('Send message clicked')}
                className="bg-purple-600 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePanel;