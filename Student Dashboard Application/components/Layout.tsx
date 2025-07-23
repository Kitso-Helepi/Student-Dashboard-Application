import React from 'react'
import { FileIcon, CalendarIcon, ClockIcon, BellIcon, LogOutIcon, ShieldIcon, UserIcon } from 'lucide-react'
import { User } from '../App'

interface LayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
  onLogout: () => void
  currentUser: User
}

export function Layout({ children, activeTab, onTabChange, onLogout, currentUser }: LayoutProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-maroon-100 text-maroon-800 border-maroon-300'
      case 'staff': return 'bg-navy-100 text-navy-800 border-navy-300'
      case 'student': return 'bg-blue-100 text-blue-800 border-blue-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return ShieldIcon
      case 'staff': return UserIcon
      case 'student': return UserIcon
      default: return UserIcon
    }
  }

  const RoleIcon = getRoleIcon(currentUser.role)

  return (
    <div className="flex flex-col min-h-screen bg-navy-50">
      {/* Header */}
      <header className="border-b-2 border-navy-200 bg-white p-5 shadow-sm">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center">
            <div className="flex items-center mr-6">
              <ShieldIcon className="h-8 w-8 text-navy-600 mr-3" />
              <h1 className="text-2xl font-bold tracking-tight text-navy-900">
                Digital Filing System
              </h1>
            </div>
            {currentUser.department && (
              <div className="hidden md:block px-3 py-1 bg-navy-100 text-navy-700 rounded-full text-sm border border-navy-200">
                {currentUser.department}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {/* User Info */}
            <div className="flex items-center">
              <div className="mr-3 text-right hidden sm:block">
                <p className="text-sm font-medium text-navy-800">{currentUser.name}</p>
                <p className="text-xs text-navy-600">{currentUser.email}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(currentUser.role)}`}>
                <div className="flex items-center">
                  <RoleIcon className="h-3 w-3 mr-1" />
                  {currentUser.role.toUpperCase()}
                </div>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="p-2 border-2 border-navy-200 rounded-md hover:bg-navy-50 focus:outline-none focus:border-navy-500 transition-colors"
              title="Logout"
            >
              <LogOutIcon className="h-5 w-5 text-navy-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-5 overflow-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>

      {/* Bottom navigation */}
      <nav className="border-t-2 border-navy-200 bg-white shadow-inner">
        <div className="flex justify-around max-w-lg mx-auto">
          <button
            className={`flex flex-col items-center py-4 px-6 transition-colors ${
              activeTab === 'documents' 
                ? 'border-t-2 border-maroon-600 -mt-0.5 bg-maroon-50' 
                : 'hover:bg-navy-50'
            }`}
            onClick={() => onTabChange('documents')}
          >
            <FileIcon
              className={`h-5 w-5 mb-1 ${
                activeTab === 'documents' 
                  ? 'text-maroon-600' 
                  : 'text-navy-500 hover:text-navy-700'
              }`}
            />
            <span
              className={`text-xs ${
                activeTab === 'documents' 
                  ? 'font-medium text-maroon-600' 
                  : 'text-navy-500 hover:text-navy-700'
              }`}
            >
              Documents
            </span>
          </button>
          
          {/* Only show other tabs for non-student users or if they have permissions */}
          {(currentUser.role !== 'student' || currentUser.permissions.includes('booking')) && (
            <button
              className={`flex flex-col items-center py-4 px-6 transition-colors ${
                activeTab === 'booking' 
                  ? 'border-t-2 border-maroon-600 -mt-0.5 bg-maroon-50' 
                  : 'hover:bg-navy-50'
              }`}
              onClick={() => onTabChange('booking')}
            >
              <CalendarIcon
                className={`h-5 w-5 mb-1 ${
                  activeTab === 'booking' 
                    ? 'text-maroon-600' 
                    : 'text-navy-500 hover:text-navy-700'
                }`}
              />
              <span
                className={`text-xs ${
                  activeTab === 'booking' 
                    ? 'font-medium text-maroon-600' 
                    : 'text-navy-500 hover:text-navy-700'
                }`}
              >
                Booking
              </span>
            </button>
          )}
          
          {(currentUser.role !== 'student' || currentUser.permissions.includes('timetable')) && (
            <button
              className={`flex flex-col items-center py-4 px-6 transition-colors ${
                activeTab === 'timetable' 
                  ? 'border-t-2 border-maroon-600 -mt-0.5 bg-maroon-50' 
                  : 'hover:bg-navy-50'
              }`}
              onClick={() => onTabChange('timetable')}
            >
              <ClockIcon
                className={`h-5 w-5 mb-1 ${
                  activeTab === 'timetable' 
                    ? 'text-maroon-600' 
                    : 'text-navy-500 hover:text-navy-700'
                }`}
              />
              <span
                className={`text-xs ${
                  activeTab === 'timetable' 
                    ? 'font-medium text-maroon-600' 
                    : 'text-navy-500 hover:text-navy-700'
                }`}
              >
                Timetable
              </span>
            </button>
          )}
          
          <button
            className={`flex flex-col items-center py-4 px-6 transition-colors ${
              activeTab === 'alerts' 
                ? 'border-t-2 border-maroon-600 -mt-0.5 bg-maroon-50' 
                : 'hover:bg-navy-50'
            }`}
            onClick={() => onTabChange('alerts')}
          >
            <BellIcon
              className={`h-5 w-5 mb-1 ${
                activeTab === 'alerts' 
                  ? 'text-maroon-600' 
                  : 'text-navy-500 hover:text-navy-700'
              }`}
            />
            <span
              className={`text-xs ${
                activeTab === 'alerts' 
                  ? 'font-medium text-maroon-600' 
                  : 'text-navy-500 hover:text-navy-700'
              }`}
            >
              Alerts
            </span>
          </button>
        </div>
      </nav>
    </div>
  )
}