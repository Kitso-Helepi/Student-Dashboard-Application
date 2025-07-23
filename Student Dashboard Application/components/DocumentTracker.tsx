import React, { useState } from 'react'
import { 
  ClockIcon, 
  UserIcon, 
  DownloadIcon, 
  EditIcon, 
  EyeIcon, 
  ShareIcon,
  ShieldIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from 'lucide-react'
import { User } from '../App'

interface DocumentActivity {
  id: string
  action: 'view' | 'edit' | 'download' | 'share' | 'upload' | 'delete'
  user: {
    name: string
    email: string
    role: string
  }
  timestamp: string
  details?: string
  ipAddress?: string
  location?: string
  riskLevel?: 'low' | 'medium' | 'high'
}

interface DocumentTrackerProps {
  documentId: string
  documentName: string
  currentUser: User
  isVisible: boolean
  onClose: () => void
}

export function DocumentTracker({ documentId, documentName, currentUser, isVisible, onClose }: DocumentTrackerProps) {
  const [timeFilter, setTimeFilter] = useState('all')

  // Mock activity data
  const activities: DocumentActivity[] = [
    {
      id: '1',
      action: 'edit',
      user: { name: 'John Staff', email: 'staff@university.edu', role: 'staff' },
      timestamp: '2024-01-15T14:30:00Z',
      details: 'Modified sections 2 and 3',
      ipAddress: '192.168.1.100',
      location: 'Campus Network',
      riskLevel: 'low'
    },
    {
      id: '2',
      action: 'download',
      user: { name: 'Jane Admin', email: 'admin@university.edu', role: 'admin' },
      timestamp: '2024-01-15T13:15:00Z',
      details: 'Downloaded for compliance review',
      ipAddress: '192.168.1.50',
      location: 'Admin Office',
      riskLevel: 'low'
    },
    {
      id: '3',
      action: 'share',
      user: { name: 'John Staff', email: 'staff@university.edu', role: 'staff' },
      timestamp: '2024-01-15T11:45:00Z',
      details: 'Shared with IT Department team',
      ipAddress: '192.168.1.100',
      location: 'Campus Network',
      riskLevel: 'medium'
    },
    {
      id: '4',
      action: 'view',
      user: { name: 'Bob Student', email: 'student@university.edu', role: 'student' },
      timestamp: '2024-01-15T10:20:00Z',
      details: 'Accessed from mobile device',
      ipAddress: '10.0.0.25',
      location: 'Library WiFi',
      riskLevel: 'low'
    },
    {
      id: '5',
      action: 'upload',
      user: { name: 'John Staff', email: 'staff@university.edu', role: 'staff' },
      timestamp: '2024-01-14T16:00:00Z',
      details: 'Initial version uploaded',
      ipAddress: '192.168.1.100',
      location: 'Campus Network',
      riskLevel: 'low'
    }
  ]

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'view': return EyeIcon
      case 'edit': return EditIcon
      case 'download': return DownloadIcon
      case 'share': return ShareIcon
      case 'upload': return ClockIcon
      case 'delete': return XCircleIcon
      default: return ClockIcon
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'view': return 'text-navy-600 bg-navy-100'
      case 'edit': return 'text-blue-600 bg-blue-100'
      case 'download': return 'text-green-600 bg-green-100'
      case 'share': return 'text-purple-600 bg-purple-100'
      case 'upload': return 'text-maroon-600 bg-maroon-100'
      case 'delete': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return (
          <div className="flex items-center px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
            <AlertTriangleIcon className="h-3 w-3 mr-1" />
            High Risk
          </div>
        )
      case 'medium':
        return (
          <div className="flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
            <AlertTriangleIcon className="h-3 w-3 mr-1" />
            Medium Risk
          </div>
        )
      case 'low':
        return (
          <div className="flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Low Risk
          </div>
        )
      default:
        return null
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg border-2 border-navy-200 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b-2 border-navy-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-navy-900">Document Activity Tracker</h2>
              <p className="text-navy-600 mt-1">{documentName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-navy-50 rounded-full transition-colors"
            >
              <XCircleIcon className="h-6 w-6 text-navy-600" />
            </button>
          </div>
          
          {/* Security Status */}
          {currentUser.permissions.includes('audit') && (
            <div className="mt-4 p-4 bg-navy-50 rounded-md border border-navy-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ShieldIcon className="h-5 w-5 text-navy-600 mr-2" />
                  <span className="font-medium text-navy-800">Security Status</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-green-600">✓ Encrypted</span>
                  <span className="text-green-600">✓ Compliant</span>
                  <span className="text-green-600">✓ Backed Up</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-navy-200">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-navy-800">Filter by time:</span>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="border-2 border-navy-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:border-navy-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const ActionIcon = getActionIcon(activity.action)
              const actionColor = getActionColor(activity.action)

              return (
                <div key={activity.id} className="flex items-start p-4 bg-gray-50 rounded-md border border-gray-200">
                  <div className={`p-2 rounded-full mr-4 ${actionColor}`}>
                    <ActionIcon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-navy-800 capitalize">{activity.action}</span>
                        <span className="text-sm text-navy-600">by {activity.user.name}</span>
                        <span className="text-xs bg-navy-100 text-navy-700 px-2 py-1 rounded-full">
                          {activity.user.role}
                        </span>
                      </div>
                      {activity.riskLevel && getRiskBadge(activity.riskLevel)}
                    </div>
                    
                    <div className="text-sm text-navy-600 mb-2">
                      {activity.details}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-navy-500">
                      <span>{formatTimestamp(activity.timestamp)}</span>
                      {currentUser.permissions.includes('audit') && (
                        <>
                          <span>IP: {activity.ipAddress}</span>
                          <span>Location: {activity.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-navy-200 bg-navy-50">
          <div className="flex items-center justify-between text-sm text-navy-600">
            <span>Total activities: {activities.length}</span>
            {currentUser.permissions.includes('audit') && (
              <button className="px-3 py-1 bg-navy-600 text-white rounded-md hover:bg-navy-700 transition-colors">
                Export Audit Log
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}