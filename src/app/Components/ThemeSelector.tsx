'use client'

import React, { useState } from 'react'
import { useTheme, Theme } from '../contexts/ThemeContext'
import { X, Check, Palette, Monitor, Sun, Moon } from 'lucide-react'

interface ThemeSelectorProps {
  isOpen: boolean
  onClose: () => void
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme, themes } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState<Theme>(theme)

  const handleApplyTheme = () => {
    setTheme(selectedTheme)
    onClose()
  }

  const getThemeIcon = (themeId: Theme) => {
    switch (themeId) {
      case 'dark':
        return <Moon className="w-4 h-4" />
      case 'default':
        return <Sun className="w-4 h-4" />
      default:
        return <Palette className="w-4 h-4" />
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Palette className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Choose Theme</h2>
              <p className="text-sm text-gray-500">Customize your app appearance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {themes.map((themeConfig) => (
              <div
                key={themeConfig.id}
                className={`relative cursor-pointer rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                  selectedTheme === themeConfig.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedTheme(themeConfig.id)}
              >
                {/* Selection indicator */}
                {selectedTheme === themeConfig.id && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className="p-4">
                  {/* Theme preview */}
                  <div className="mb-4 h-20 rounded-lg overflow-hidden flex">
                    {themeConfig.preview.map((colorClass, index) => (
                      <div
                        key={index}
                        className={`flex-1 ${colorClass} ${
                          index === 0 ? 'rounded-l-lg' : ''
                        } ${
                          index === themeConfig.preview.length - 1 ? 'rounded-r-lg' : ''
                        }`}
                      />
                    ))}
                  </div>

                  {/* Theme info */}
                  <div className="flex items-center gap-2 mb-2">
                    {getThemeIcon(themeConfig.id)}
                    <h3 className="font-semibold text-gray-900">{themeConfig.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{themeConfig.description}</p>

                  {/* Color palette */}
                  <div className="flex gap-2 mt-3">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: themeConfig.colors.primary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: themeConfig.colors.accent }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: themeConfig.colors.background }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Current: <span className="font-medium">{themes.find(t => t.id === theme)?.name}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyTheme}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Apply Theme
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}