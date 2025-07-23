import React, { useState } from 'react'
import {
  LayoutDashboardIcon,
  UsersIcon,
  FileTextIcon,
  ShieldIcon,
  SettingsIcon,
  BarChart3Icon,
  ClockIcon,
  CloudIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  UserPlusIcon,
  DatabaseIcon,
  LogOutIcon,
  BookOpenIcon,
  BellIcon,
  DownloadIcon,
  SearchIcon
} from 'lucide-react'
import { User } from '../App'

interface SchoolConfig {
  name: string
  shortName: string
  tagline: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
}

interface AdminDashboardProps {
  currentUser: User
  onLogout: () => void
  schoolConfig: SchoolConfig
}

export function AdminDashboard({ currentUser, onLogout, schoolConfig }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState('overview')

  // Mock data for admin dashboard
  const systemStats = {
    totalUsers: 2847,
    totalDocuments: 15649,
    storageUsed: '287 GB',
    storageLimit: '1 TB',
    activeUsers: 234,
    documentsToday: 89,
    securityAlerts: 3,
    systemHealth: 98.7
  }

  const recentActivity = [
    {
      id: '1',
      type: 'user_login',
      user: 'Prof. Michael Chen',
      action: 'Logged in from 192.168.1.45',
      timestamp: '2 minutes ago',
      severity: 'low'
    },
    {
      id: '2',
      type: 'document_upload',
      user: 'Dr. Sarah Miller',
      action: 'Uploaded "Research Proposal 2024.pdf"',
      timestamp: '15 minutes ago',
      severity: 'low'
    },
    {
      id: '3',
      type: 'security_alert',
      user: 'System',
      action: 'Failed login attempt from unknown IP',
      timestamp: '1 hour ago',
      severity: 'medium'
    },
    {
      id: '4',
      type: 'user_created',
      user: 'Admin',
      action: 'Created new faculty account for J. Williams',
      timestamp: '2 hours ago',
      severity: 'low'
    }
  ]

  const departmentStats = [
    { name: 'Computer Science', users: 156, documents: 3420, storage: '45 GB' },
    { name: 'Mathematics', users: 89, documents: 2156, storage: '32 GB' },
    { name: 'Physics', users: 67, documents: 1890, storage: '28 GB' },
    { name: 'Chemistry', users: 78, documents: 2103, storage: '35 GB' },
    { name: 'Administration', users: 45, documents: 1567, storage: '22 GB' },
    { name: 'Library Services', users: 23, documents: 987, storage: '15 GB' }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border-2 border-navy-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-emerald-100 rounded-full mr-4">
              <UsersIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-800">{systemStats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-navy-600">Total Users</p>
              <p className="text-xs text-emerald-600">+{systemStats.activeUsers} active today</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-navy-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-navy-100 rounded-full mr-4">
              <FileTextIcon className="h-6 w-6 text-navy-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-800">{systemStats.totalDocuments.toLocaleString()}</p>
              <p className="text-sm text-navy-600">Total Documents</p>
              <p className="text-xs text-emerald-600">+{systemStats.documentsToday} uploaded today</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-navy-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-gold-100 rounded-full mr-4">
              <DatabaseIcon className="h-6 w-6 text-gold-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-800">{systemStats.storageUsed}</p>
              <p className="text-sm text-navy-600">Storage Used</p>
              <p className="text-xs text-navy-500">of {systemStats.storageLimit} total</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-navy-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-emerald-100 rounded-full mr-4">
              <TrendingUpIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-800">{systemStats.systemHealth}%</p>
              <p className="text-sm text-navy-600">System Health</p>
              <p className="text-xs text-emerald-600">Excellent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg border-2 border-navy-200 shadow-sm">
          <div className="p-6 border-b border-navy-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-navy-800">Recent System Activity</h3>
              <button className="text-sm text-emerald-600 hover:text-emerald-800">View All</button>
            </div>
          </div>
          <div className="divide-y divide-navy-200">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-navy-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-navy-800">{activity.user}</p>
                    <p className="text-sm text-navy-600">{activity.action}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(activity.severity)}`}>
                      {activity.severity}
                    </span>
                    <span className="text-xs text-navy-500">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="space-y-6">
          {/* Security Alerts */}
          <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm">
            <div className="p-4 border-b border-navy-200">
              <h3 className="text-lg font-medium text-navy-800 flex items-center">
                <ShieldIcon className="h-5 w-5 mr-2" />
                Security Status
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-navy-700">Active Alerts</span>
                <span className="text-sm font-medium text-red-600">{systemStats.securityAlerts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-navy-700">2FA Enabled</span>
                <span className="text-sm font-medium text-emerald-600">87%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-navy-700">Encrypted Docs</span>
                <span className="text-sm font-medium text-emerald-600">98.5%</span>
              </div>
            </div>
          </div>

          {/* Cloud Backup */}
          <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm">
            <div className="p-4 border-b border-navy-200">
              <h3 className="text-lg font-medium text-navy-800 flex items-center">
                <CloudIcon className="h-5 w-5 mr-2" />
                Backup Status
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-navy-700">Last Backup</span>
                <span className="text-sm font-medium text-emerald-600">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-navy-700">Success Rate</span>
                <span className="text-sm font-medium text-emerald-600">99.9%</span>
              </div>
              <div className="w-full bg-navy-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Statistics */}
      <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm">
        <div className="p-6 border-b border-navy-200">
          <h3 className="text-lg font-medium text-navy-800">Department Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-navy-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-navy-700 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-navy-700 uppercase tracking-wider">Users</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-navy-700 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-navy-700 uppercase tracking-wider">Storage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-navy-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-200">
              {departmentStats.map((dept, index) => (
                <tr key={index} className="hover:bg-navy-25">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy-800">{dept.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-600">{dept.users}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-600">{dept.documents.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-600">{dept.storage}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-600">
                    <button className="text-emerald-600 hover:text-emerald-800 mr-3">Manage</button>
                    <button className="text-navy-600 hover:text-navy-800">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboardIcon },
    { id: 'users', label: 'User Management', icon: UsersIcon },
    { id: 'documents', label: 'Document Control', icon: FileTextIcon },
    { id: 'security', label: 'Security Center', icon: ShieldIcon },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3Icon },
    { id: 'settings', label: 'System Settings', icon: SettingsIcon }
  ]

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-navy-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center mr-8">
                <div className="w-10 h-10 bg-navy-600 rounded-lg flex items-center justify-center mr-3">
                  <BookOpenIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-navy-900">{schoolConfig.name}</h1>
                  <p className="text-xs text-navy-600">Administrator Portal</p>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <SearchIcon className="h-5 w-5 text-navy-400" />
                <input
                  type="text"
                  placeholder="Search system..."
                  className="w-64 px-3 py-2 border border-navy-200 rounded-md focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <button className="p-2 text-navy-600 hover:text-navy-800 relative">
                <BellIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                  {systemStats.securityAlerts}
                </span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-navy-800">{currentUser.name}</p>
                  <p className="text-xs text-navy-600">System Administrator</p>
                </div>
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{currentUser.avatar}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-navy-600 hover:text-navy-800"
                  title="Logout"
                >
                  <LogOutIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm">
              <div className="p-4 border-b border-navy-200">
                <h2 className="font-medium text-navy-800">Administration</h2>
              </div>
              <nav className="p-2">
                {sidebarItems.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-md transition-colors ${
                        activeSection === item.id
                          ? 'bg-emerald-100 text-emerald-800 font-medium'
                          : 'text-navy-600 hover:bg-navy-50 hover:text-navy-800'
                      }`}
                    >
                      <IconComponent className="h-5 w-5 mr-3" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeSection === 'overview' && renderOverview()}
            {activeSection === 'users' && (
              <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-4">User Management</h2>
                <p className="text-navy-600">User management interface would be implemented here...</p>
              </div>
            )}
            {activeSection === 'documents' && (
              <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Document Control Center</h2>
                <p className="text-navy-600">Document control interface would be implemented here...</p>
              </div>
            )}
            {activeSection === 'security' && (
              <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Security Center</h2>
                <p className="text-navy-600">Security management interface would be implemented here...</p>
              </div>
            )}
            {activeSection === 'analytics' && (
              <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Analytics & Reports</h2>
                <p className="text-navy-600">Analytics dashboard would be implemented here...</p>
              </div>
            )}
            {activeSection === 'settings' && (
              <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-4">System Settings</h2>
                <p className="text-navy-600">System configuration interface would be implemented here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}