import React from 'react'
import { XIcon } from 'lucide-react'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export function Dialog({ isOpen, onClose, children, title }: DialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900 bg-opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Dialog content */}
      <div className="relative bg-white rounded-md shadow-lg max-w-md w-full max-h-[90vh] overflow-auto border-2 border-gray-300">
        {/* Header */}
        {title && (
          <div className="flex justify-between items-center p-5 border-b-2 border-gray-200">
            <h2 className="font-medium text-gray-800">{title}</h2>
            <button
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-200"
              onClick={onClose}
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}