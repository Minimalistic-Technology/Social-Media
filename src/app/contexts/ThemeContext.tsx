'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 
  | 'default' 
  | 'dark' 
  | 'blue' 
  | 'green' 
  | 'purple' 
  | 'pink' 
  | 'orange'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: ThemeConfig[]
}

interface ThemeConfig {
  id: Theme
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
  }
  preview: string[]
}

const themeConfigs: ThemeConfig[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Clean and minimal',
    colors: {
      primary: '#8b5cf6',
      secondary: '#f3f4f6',
      accent: '#10b981',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827'
    },
    preview: ['bg-purple-500', 'bg-gray-100', 'bg-white']
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Easy on the eyes',
    colors: {
      primary: '#8b5cf6',
      secondary: '#374151',
      accent: '#10b981',
      background: '#111827',
      surface: '#1f2937',
      text: '#f9fafb'
    },
    preview: ['bg-gray-900', 'bg-gray-800', 'bg-purple-500']
  },
  {
    id: 'blue',
    name: 'Ocean Blue',
    description: 'Calm and professional',
    colors: {
      primary: '#3b82f6',
      secondary: '#e0f2fe',
      accent: '#0ea5e9',
      background: '#f0f9ff',
      surface: '#ffffff',
      text: '#0f172a'
    },
    preview: ['bg-blue-500', 'bg-blue-50', 'bg-sky-500']
  },
  {
    id: 'green',
    name: 'Nature Green',
    description: 'Fresh and vibrant',
    colors: {
      primary: '#10b981',
      secondary: '#ecfdf5',
      accent: '#059669',
      background: '#f0fdf4',
      surface: '#ffffff',
      text: '#064e3b'
    },
    preview: ['bg-emerald-500', 'bg-green-50', 'bg-green-600']
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    description: 'Elegant and luxurious',
    colors: {
      primary: '#7c3aed',
      secondary: '#f3e8ff',
      accent: '#8b5cf6',
      background: '#faf5ff',
      surface: '#ffffff',
      text: '#581c87'
    },
    preview: ['bg-violet-600', 'bg-purple-50', 'bg-purple-500']
  },
  {
    id: 'pink',
    name: 'Rose Pink',
    description: 'Warm and inviting',
    colors: {
      primary: '#ec4899',
      secondary: '#fdf2f8',
      accent: '#f472b6',
      background: '#fef7f3',
      surface: '#ffffff',
      text: '#831843'
    },
    preview: ['bg-pink-500', 'bg-pink-50', 'bg-pink-400']
  },
  {
    id: 'orange',
    name: 'Sunset Orange',
    description: 'Energetic and bold',
    colors: {
      primary: '#f97316',
      secondary: '#fed7aa',
      accent: '#ea580c',
      background: '#fff7ed',
      surface: '#ffffff',
      text: '#9a3412'
    },
    preview: ['bg-orange-500', 'bg-orange-100', 'bg-orange-600']
  }
]

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('default')

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem('app-theme') as Theme
  //   if (savedTheme && themeConfigs.find(t => t.id === savedTheme)) {
  //     setTheme(savedTheme)
  //   }
  // }, [])

  useEffect(() => {
  const savedTheme = localStorage.getItem('app-theme');
  const isValidTheme = themeConfigs.some(t => t.id === savedTheme);

  if (savedTheme && isValidTheme) {
    setTheme(savedTheme as Theme);
  } else {
    // fallback to default
    setTheme('default');
    localStorage.setItem('app-theme', 'default');
  }
}, []);


  useEffect(() => {
    localStorage.setItem('app-theme', theme)
    
    // Apply theme to document
    const themeConfig = themeConfigs.find(t => t.id === theme)
    if (themeConfig) {
      const root = document.documentElement
      root.style.setProperty('--color-primary', themeConfig.colors.primary)
      root.style.setProperty('--color-secondary', themeConfig.colors.secondary)
      root.style.setProperty('--color-accent', themeConfig.colors.accent)
      root.style.setProperty('--color-background', themeConfig.colors.background)
      root.style.setProperty('--color-surface', themeConfig.colors.surface)
      root.style.setProperty('--color-text', themeConfig.colors.text)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: themeConfigs }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
