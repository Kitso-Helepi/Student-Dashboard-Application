import React, { useState } from 'react'
import {
  FileTextIcon,
  FolderIcon,
  UploadIcon,
  ShareIcon,
  SearchIcon,
  FilterIcon,
  MoreVerticalIcon,
  EyeIcon,
  DownloadIcon,
  EditIcon,
  PlusIcon,
  ClockIcon,
  UsersIcon,
  BookOpenIcon,
  LogOutIcon,
  BellIcon,
  GridIcon,
  ListIcon,
  TagIcon,
  TrendingUpIcon
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

interface StaffDashboardProps {
  currentUser: User
  onLogout: () => void
  schoolConfig: SchoolConfig
}

interface Document {
  id: string
  name: string
  type: string
  size: string
  modified: string
  folder: string
  shared: boolean
  status: 'draft' | 'review' | 'approved' | 'archived'
  collaborators: number
}

export function StaffDashboard({ currentUser, onLogout, schoolConfig }: StaffDashboardProps) {
  const [activeTab, setActiveTab] = useState('my-documents')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFolder, setActiveFolder] = useState('all')

  // Mock documents data
  const documents: Document[] = [
    {
      id: '1',
      name: 'CS101 Syllabus Fall 2024.pdf',
      type: 'pdf',
      size: '2.4 MB',
      modified: 'Today, 2:30 PM',
      folder: 'syllabi',
      shared: true,
      status: 'approved',
      collaborators: 3
    },
    {
      id: '2',
      name: 'Programming Assignment 3.docx',
      type: 'docx',
      size: '1.8 MB',
      modified: 'Yesterday, 4:20 PM',
      folder: 'assignments',
      shared: false,
      status: 'draft',
      collaborators: 0
    },
    {
      id: '3',
      name: 'Midterm Exam Solutions.pdf',
      type: 'pdf',
      size: '890 KB',
      modified: '2 days ago',
      folder: 'exams',
      shared: true,
      status: 'review',
      collaborators: 2
    },
    {
      id: '4',
      name: 'Research Paper Template.docx',
      type: 'docx',
      size: '456 KB',
      modified: '1 week ago',
      folder: 'templates',
      shared: true,
      status: 'approved',
      collaborators: 5
    }
  ]

  const folders = [
    { id: 'all', name: 'All Documents', count: 24, icon: FolderIcon },
    { id: 'syllabi', name: 'Course Syllabi', count: 6, icon: FileTextIcon },
    { id: 'assignments', name: 'Assignments', count: 8, icon: EditIcon },
    { id: 'exams', name: 'Examinations', count: 4, icon: ClockIcon },
    { id: 'templates', name: 'Templates', count: 3, icon: TagIcon },
    { id: 'shared', name: 'Shared with Me', count: 12, icon: ShareIcon }
  ]

  const recentActivity = [
    {
      id: '1',
      action: 'Emily Johnson downloaded "CS101 Assignment 2.pdf"',
      timestamp: '15 minutes ago',
      type: 'download'
    },
    {
      id: '2',
      action: 'You shared "Programming Guidelines.docx" with CS Department',
      timestamp: '1 hour ago',
      type: 'share'
    },
    {
      id: '3',
      action: 'Dr. Smith commented on "Research Proposal Draft.pdf"',
      timestamp: '3 hours ago',
      type: 'comment'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-800'
      case 'review': return 'bg-gold-100 text-gold-800'
      case 'draft': return 'bg-navy-100 text-navy-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesFolder = activeFolder === 'all' || doc.folder === activeFolder
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFolder && matchesSearch
  })

  const renderMyDocuments = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border-2 border-navy-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-navy-100 rounded-md mr-3">
              <FileTextIcon className="h-5 w-5 text-navy-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-navy-800">24</p>
              <p className="text-sm text-navy-600">My Documents</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-navy-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-emerald-100 rounded-md mr-3">
              <ShareIcon className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-navy-800">12</p>
              <p className="text-sm text-navy-600">Shared</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-navy-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-gold-100 rounded-md mr-3">
              <ClockIcon className="h-5 w-5 text-gold-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-navy-800">3</p>
              <p className="text-sm text-navy-600">In Review</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-navy-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-maroon-100 rounded-md mr-3">
              <TrendingUpIcon className="h-5 w-5 text-maroon-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-navy-800">156</p>
              <p className="text-sm text-navy-600">Total Views</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm">
            <div className="p-4 border-b border-navy-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-navy-800">Folders</h3>
                <button className="p-1 hover:bg-navy-50 rounded">
                  <PlusIcon className="h-4 w-4 text-navy-600" />
                </button>
              </div>
            </div>
            <div className="p-2">
              {folders.map((folder) => {
                const IconComponent = folder.icon
                return (
                  <button
                    key={folder.id}
                    onClick={() => setActiveFolder(folder.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                      activeFolder === folder.id
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'text-navy-600 hover:bg-navy-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <IconComponent className="h-4 w-4 mr-3" />
                      <span className="text-sm">{folder.name}</span>
                    </div>
                    <span className="text-xs bg-navy-100 px-2 py-1 rounded-full">
                      {folder.count}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="p-4 border-t border-navy-200">
              <button className="w-full flex items-center justify-center gap-2 p-3 border-2 border-emerald-300 bg-emerald-50 rounded-md hover:bg-emerald-100 transition-colors text-emerald-700">
                <UploadIcon className="h-4 w-4" />
                <span className="font-medium">Upload Files</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 p-4 bg-white border-2 border-navy-200 rounded-md shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-navy-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-64 border border-navy-200 rounded-md focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              <button className="flex items-center px-3 py-2 border border-navy-200 rounded-md hover:bg-navy-50 text-sm">
                <FilterIcon className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex border border-navy-200 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-navy-100' : 'hover:bg-navy-50'}`}
                >
                  <GridIcon className="h-4 w-4 text-navy-600" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-navy-100' : 'hover:bg-navy-50'}`}
                >
                  <ListIcon className="h-4 w-4 text-navy-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Documents Grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="bg-white p-4 rounded-lg border-2 border-navy-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start">
                      <div className="p-2 border border-navy-200 rounded-md mr-3 bg-navy-50">
                        <FileTextIcon className="h-6 w-6 text-navy-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-navy-800 mb-1">{doc.name}</h4>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>
                          {doc.shared && (
                            <ShareIcon className="h-3 w-3 text-emerald-600" title="Shared" />
                          )}
                        </div>
                        <p className="text-xs text-navy-600">{doc.size} • {doc.modified}</p>
                        {doc.collaborators > 0 && (
                          <p className="text-xs text-navy-500">{doc.collaborators} collaborators</p>
                        )}
                      </div>
                    </div>
                    <button className="p-1 hover:bg-navy-100 rounded-full">
                      <MoreVerticalIcon className="h-4 w-4 text-navy-600" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-navy-200">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-navy-300 rounded text-xs hover:bg-navy-50 flex items-center">
                        <EyeIcon className="h-3 w-3 mr-1" />
                        View
                      </button>
                      <button className="px-3 py-1 border border-navy-300 rounded text-xs hover:bg-navy-50 flex items-center">
                        <EditIcon className="h-3 w-3 mr-1" />
                        Edit
                      </button>
                    </div>
                    <div className="flex space-x-1">
                      <button className="px-3 py-1 bg-emerald-50 border border-emerald-300 text-emerald-700 rounded text-xs hover:bg-emerald-100 flex items-center">
                        <ShareIcon className="h-3 w-3 mr-1" />
                        Share
                      </button>
                      <button className="px-3 py-1 bg-navy-50 border border-navy-300 text-navy-700 rounded text-xs hover:bg-navy-100 flex items-center">
                        <DownloadIcon className="h-3 w-3 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-navy-200 bg-navy-50">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-navy-800">
                  <div className="col-span-5">Name</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Modified</div>
                  <div className="col-span-2">Size</div>
                  <div className="col-span-1">Actions</div>
                </div>
              </div>
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="p-4 border-b border-navy-200 hover:bg-navy-25">
                  <div className="grid grid-cols-12 gap-4 items-center text-sm">
                    <div className="col-span-5 flex items-center">
                      <FileTextIcon className="h-5 w-5 text-navy-600 mr-3" />
                      <div>
                        <p className="font-medium text-navy-800">{doc.name}</p>
                        {doc.shared && (
                          <div className="flex items-center mt-1">
                            <ShareIcon className="h-3 w-3 text-emerald-600 mr-1" />
                            <span className="text-xs text-emerald-600">Shared</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                    <div className="col-span-2 text-navy-600">{doc.modified}</div>
                    <div className="col-span-2 text-navy-600">{doc.size}</div>
                    <div className="col-span-1">
                      <button className="p-1 hover:bg-navy-100 rounded-full">
                        <MoreVerticalIcon className="h-4 w-4 text-navy-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderSharedWithMe = () => (
    <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-navy-900 mb-4">Documents Shared With Me</h2>
      <p className="text-navy-600">Shared documents interface would be implemented here...</p>
    </div>
  )

  const renderRecentActivity = () => (
    <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm">
      <div className="p-4 border-b border-navy-200">
        <h3 className="text-lg font-medium text-navy-800">Recent Activity</h3>
      </div>
      <div className="divide-y divide-navy-200">
        {recentActivity.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-navy-25">
            <p className="text-sm text-navy-800">{activity.action}</p>
            <p className="text-xs text-navy-500 mt-1">{activity.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  )

  const tabs = [
    { id: 'my-documents', label: 'My Documents', icon: FileTextIcon },
    { id: 'shared', label: 'Shared with Me', icon: ShareIcon },
    { id: 'activity', label: 'Recent Activity', icon: ClockIcon }
  ]

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-navy-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-navy-600 rounded-lg flex items-center justify-center mr-3">
                <BookOpenIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-navy-900">{schoolConfig.name}</h1>
                <p className="text-xs text-navy-600">Faculty Portal</p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-navy-600 hover:text-navy-800 relative">
                <BellIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 text-white rounded-full text-xs flex items-center justify-center">2</span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-navy-800">{currentUser.name}</p>
                  <p className="text-xs text-navy-600">{currentUser.department}</p>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-navy-900 mb-2">
            Welcome back, {currentUser.name.split(' ')[1]}
          </h1>
          <p className="text-navy-600">Manage your course documents and collaborate with colleagues</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-navy-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-navy-500 hover:text-navy-700 hover:border-navy-300'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-2" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'my-documents' && renderMyDocuments()}
        {activeTab === 'shared' && renderSharedWithMe()}
        {activeTab === 'activity' && renderRecentActivity()}
      </div>
    </div>
  )
}