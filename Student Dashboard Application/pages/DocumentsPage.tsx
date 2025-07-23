import React, { useState } from 'react'
import {
  SearchIcon,
  FolderIcon,
  FileIcon,
  FileTextIcon,
  ImageIcon,
  PlusIcon,
  UploadIcon,
  FilterIcon,
  MoreVerticalIcon,
  ShareIcon,
  DownloadIcon,
  EyeIcon,
  ShieldIcon,
  CloudIcon,
  GridIcon,
  ListIcon,
  SortAscIcon,
  TagIcon,
  ClockIcon,
  UsersIcon,
  LockIcon,
  AlertTriangleIcon,
  CheckCircleIcon
} from 'lucide-react'
import { ShareModal } from '../modals/ShareModal'
import { UploadModal } from '../modals/UploadModal'
import { DocumentTracker } from '../components/DocumentTracker'
import { AdvancedSearch } from '../components/AdvancedSearch'
import { CloudBackupStatus } from '../components/CloudBackupStatus'
import { User } from '../App'

interface DocumentsPageProps {
  currentUser: User
}

interface Document {
  id: string
  name: string
  type: string
  size: string
  modified: string
  folder: string
  department: string
  uploader: {
    name: string
    email: string
  }
  securityLevel: 'public' | 'internal' | 'confidential' | 'restricted'
  tags: string[]
  isEncrypted: boolean
  version: string
  lastAccessed: string
  accessCount: number
}

export function DocumentsPage({ currentUser }: DocumentsPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFolder, setActiveFolder] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('modified')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [showDocumentTracker, setShowDocumentTracker] = useState(false)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  const departments = [
    { id: 'all', name: 'All Departments', count: 156, color: 'navy' },
    { id: 'it', name: 'IT Department', count: 45, color: 'navy' },
    { id: 'hr', name: 'Human Resources', count: 32, color: 'maroon' },
    { id: 'finance', name: 'Finance', count: 28, color: 'navy' },
    { id: 'admin', name: 'Administration', count: 25, color: 'maroon' },
    { id: 'academic', name: 'Academic Affairs', count: 20, color: 'navy' },
    { id: 'student', name: 'Student Services', count: 6, color: 'maroon' }
  ]

  const documents: Document[] = [
    {
      id: '1',
      name: 'IT Security Policy 2024.pdf',
      type: 'pdf',
      size: '2.4 MB',
      modified: 'Today, 2:30 PM',
      folder: 'it',
      department: 'IT Department',
      uploader: { name: 'John Staff', email: 'staff@university.edu' },
      securityLevel: 'confidential',
      tags: ['policy', 'security', 'IT'],
      isEncrypted: true,
      version: '2.1',
      lastAccessed: 'Today, 3:15 PM',
      accessCount: 15
    },
    {
      id: '2',
      name: 'Employee Handbook.docx',
      type: 'docx',
      size: '1.8 MB',
      modified: 'Yesterday, 4:20 PM',
      folder: 'hr',
      department: 'Human Resources',
      uploader: { name: 'Sarah HR', email: 'hr@university.edu' },
      securityLevel: 'internal',
      tags: ['handbook', 'HR', 'policies'],
      isEncrypted: true,
      version: '3.0',
      lastAccessed: 'Today, 1:45 PM',
      accessCount: 42
    },
    {
      id: '3',
      name: 'Budget Report Q1.xlsx',
      type: 'xlsx',
      size: '890 KB',
      modified: '2 days ago',
      folder: 'finance',
      department: 'Finance',
      uploader: { name: 'Mike Finance', email: 'finance@university.edu' },
      securityLevel: 'restricted',
      tags: ['budget', 'financial', 'quarterly'],
      isEncrypted: true,
      version: '1.5',
      lastAccessed: 'Today, 9:20 AM',
      accessCount: 8
    },
    {
      id: '4',
      name: 'Campus Map.jpg',
      type: 'jpg',
      size: '3.2 MB',
      modified: '1 week ago',
      folder: 'admin',
      department: 'Administration',
      uploader: { name: 'Admin User', email: 'admin@university.edu' },
      securityLevel: 'public',
      tags: ['map', 'campus', 'navigation'],
      isEncrypted: false,
      version: '1.0',
      lastAccessed: 'Today, 11:30 AM',
      accessCount: 128
    }
  ]

  const filteredDocuments = documents.filter(doc => {
    const matchesFolder = activeFolder === 'all' || doc.folder === activeFolder
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    // Apply role-based filtering
    if (currentUser.role === 'student') {
      return matchesFolder && matchesSearch && (doc.securityLevel === 'public' || doc.securityLevel === 'internal')
    }
    
    return matchesFolder && matchesSearch
  })

  const getSecurityBadge = (level: string) => {
    const badges = {
      public: { color: 'bg-green-100 text-green-800', icon: '🌐' },
      internal: { color: 'bg-blue-100 text-blue-800', icon: '🏢' },
      confidential: { color: 'bg-yellow-100 text-yellow-800', icon: '⚠️' },
      restricted: { color: 'bg-red-100 text-red-800', icon: '🔒' }
    }
    const badge = badges[level as keyof typeof badges]
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <span className="mr-1">{badge.icon}</span>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </span>
    )
  }

  const renderFileIcon = (type: string) => {
    const iconClass = "h-8 w-8 text-navy-600"
    switch (type) {
      case 'pdf': return <FileTextIcon className={iconClass} />
      case 'docx': return <FileIcon className={iconClass} />
      case 'xlsx': return <FileIcon className={iconClass} />
      case 'jpg': return <ImageIcon className={iconClass} />
      default: return <FileIcon className={iconClass} />
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} on:`, selectedDocuments)
    // Implement bulk actions
  }

  const canUserAccess = (document: Document) => {
    if (currentUser.role === 'admin') return true
    if (currentUser.role === 'staff') return document.securityLevel !== 'restricted'
    return document.securityLevel === 'public' || document.securityLevel === 'internal'
  }

  return (
    <div className="space-y-6">
      {/* Header with search and actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Digital Document Repository</h1>
          <p className="text-navy-600 mt-1">
            Centralized, secure document management across all departments
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Quick search..."
              className="pl-10 pr-4 py-2 w-64 border-2 border-navy-200 rounded-md focus:outline-none focus:border-navy-500 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-navy-400" />
          </div>
          
          <button
            onClick={() => setShowAdvancedSearch(true)}
            className="px-4 py-2 border-2 border-navy-200 rounded-md hover:bg-navy-50 focus:outline-none focus:border-navy-500 flex items-center"
          >
            <FilterIcon className="h-4 w-4 mr-2" />
            Advanced Search
          </button>
          
          <div className="flex items-center border-2 border-navy-200 rounded-md overflow-hidden">
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

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white border-2 border-navy-200 rounded-md shadow-sm">
          <div className="flex items-center">
            <FileIcon className="h-8 w-8 text-navy-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-navy-800">{documents.length}</p>
              <p className="text-sm text-navy-600">Total Documents</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white border-2 border-navy-200 rounded-md shadow-sm">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-maroon-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-navy-800">{departments.length - 1}</p>
              <p className="text-sm text-navy-600">Departments</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white border-2 border-navy-200 rounded-md shadow-sm">
          <div className="flex items-center">
            <ShieldIcon className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-navy-800">98%</p>
              <p className="text-sm text-navy-600">Encrypted</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white border-2 border-navy-200 rounded-md shadow-sm">
          <div className="flex items-center">
            <CloudIcon className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-navy-800">100%</p>
              <p className="text-sm text-navy-600">Backed Up</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Department Folders */}
          <div className="bg-white border-2 border-navy-200 rounded-md p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-navy-800">Departments</h3>
              {currentUser.permissions.includes('write') && (
                <button className="p-1.5 border-2 border-navy-200 rounded-md hover:bg-navy-50">
                  <PlusIcon className="h-4 w-4 text-navy-600" />
                </button>
              )}
            </div>
            
            <div className="space-y-2">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  className={`w-full flex items-center justify-between p-3 rounded-md transition-colors ${
                    activeFolder === dept.id 
                      ? `bg-${dept.color === 'maroon' ? 'maroon' : 'navy'}-100 font-medium text-${dept.color === 'maroon' ? 'maroon' : 'navy'}-800` 
                      : 'hover:bg-navy-50 text-navy-700'
                  }`}
                  onClick={() => setActiveFolder(dept.id)}
                >
                  <div className="flex items-center">
                    <FolderIcon className={`h-4 w-4 mr-3 text-${dept.color}-600`} />
                    <span className="text-sm">{dept.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeFolder === dept.id 
                      ? `bg-${dept.color === 'maroon' ? 'maroon' : 'navy'}-200` 
                      : 'bg-navy-100'
                  }`}>
                    {dept.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Upload Button */}
            {currentUser.permissions.includes('upload') && (
              <div className="mt-4 pt-4 border-t-2 border-navy-200">
                <button
                  className="w-full flex items-center justify-center gap-2 p-3 border-2 border-maroon-300 bg-maroon-50 rounded-md hover:bg-maroon-100 transition-colors text-maroon-700"
                  onClick={() => setShowUploadModal(true)}
                >
                  <UploadIcon className="h-4 w-4" />
                  <span className="font-medium">Upload Files</span>
                </button>
              </div>
            )}
          </div>

          {/* Cloud Backup Status */}
          <CloudBackupStatus isCompact={true} />

          {/* Security Compliance */}
          <div className="bg-white border-2 border-navy-200 rounded-md p-4 shadow-sm">
            <h3 className="font-medium text-navy-800 mb-3">Security Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-navy-600">Encryption</span>
                <CheckCircleIcon className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-navy-600">Compliance</span>
                <CheckCircleIcon className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-navy-600">Access Control</span>
                <CheckCircleIcon className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 p-4 bg-white border-2 border-navy-200 rounded-md shadow-sm">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-navy-800">
                {filteredDocuments.length} documents
              </span>
              {selectedDocuments.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-navy-600">
                    {selectedDocuments.length} selected
                  </span>
                  {currentUser.permissions.includes('write') && (
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => handleBulkAction('share')}
                        className="px-2 py-1 bg-navy-100 text-navy-700 rounded text-xs hover:bg-navy-200"
                      >
                        Share
                      </button>
                      <button 
                        onClick={() => handleBulkAction('download')}
                        className="px-2 py-1 bg-navy-100 text-navy-700 rounded text-xs hover:bg-navy-200"
                      >
                        Download
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-navy-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:border-navy-500"
              >
                <option value="modified">Sort by Modified</option>
                <option value="name">Sort by Name</option>
                <option value="size">Sort by Size</option>
                <option value="security">Sort by Security Level</option>
              </select>
            </div>
          </div>

          {/* Document Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className={`p-4 bg-white border-2 rounded-md shadow-sm transition-colors hover:bg-navy-25 ${
                    selectedDocuments.includes(doc.id) ? 'border-maroon-300 bg-maroon-25' : 'border-navy-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDocuments([...selectedDocuments, doc.id])
                          } else {
                            setSelectedDocuments(selectedDocuments.filter(id => id !== doc.id))
                          }
                        }}
                        className="mt-1 mr-3 w-4 h-4 text-maroon-600 border-navy-300 rounded"
                      />
                      <div className="p-2 border-2 border-navy-200 rounded-md mr-3 bg-navy-50">
                        {renderFileIcon(doc.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-navy-800 mb-1">{doc.name}</h4>
                        <div className="flex items-center space-x-2 mb-2">
                          {getSecurityBadge(doc.securityLevel)}
                          {doc.isEncrypted && (
                            <LockIcon className="h-3 w-3 text-green-600" title="Encrypted" />
                          )}
                        </div>
                        <p className="text-xs text-navy-600">
                          {doc.size} • {doc.modified} • v{doc.version}
                        </p>
                        <p className="text-xs text-navy-500">
                          by {doc.uploader.name} • {doc.accessCount} views
                        </p>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-navy-100 rounded-full">
                      <MoreVerticalIcon className="h-4 w-4 text-navy-600" />
                    </button>
                  </div>

                  {/* Tags */}
                  {doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {doc.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-navy-100 text-navy-700 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                      {doc.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{doc.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {canUserAccess(doc) && (
                        <>
                          <button className="px-3 py-1 border border-navy-300 rounded text-xs hover:bg-navy-50 flex items-center">
                            <EyeIcon className="h-3 w-3 mr-1" />
                            View
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedFile(doc.id)
                              setShowDocumentTracker(true)
                            }}
                            className="px-3 py-1 border border-navy-300 rounded text-xs hover:bg-navy-50 flex items-center"
                          >
                            <ClockIcon className="h-3 w-3 mr-1" />
                            History
                          </button>
                        </>
                      )}
                    </div>
                    
                    {currentUser.permissions.includes('share') && canUserAccess(doc) && (
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => {
                            setSelectedFile(doc.id)
                            setShowShareModal(true)
                          }}
                          className="px-3 py-1 bg-maroon-50 border border-maroon-300 text-maroon-700 rounded text-xs hover:bg-maroon-100 flex items-center"
                        >
                          <ShareIcon className="h-3 w-3 mr-1" />
                          Share
                        </button>
                        <button className="px-3 py-1 bg-navy-50 border border-navy-300 text-navy-700 rounded text-xs hover:bg-navy-100 flex items-center">
                          <DownloadIcon className="h-3 w-3 mr-1" />
                          Download
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List view would go here
            <div className="bg-white border-2 border-navy-200 rounded-md shadow-sm overflow-hidden">
              <div className="p-4 border-b border-navy-200 bg-navy-50">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-navy-800">
                  <div className="col-span-1"></div>
                  <div className="col-span-4">Name</div>
                  <div className="col-span-2">Department</div>
                  <div className="col-span-2">Security</div>
                  <div className="col-span-2">Modified</div>
                  <div className="col-span-1">Actions</div>
                </div>
              </div>
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="p-4 border-b border-navy-200 hover:bg-navy-25">
                  <div className="grid grid-cols-12 gap-4 items-center text-sm">
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDocuments([...selectedDocuments, doc.id])
                          } else {
                            setSelectedDocuments(selectedDocuments.filter(id => id !== doc.id))
                          }
                        }}
                        className="w-4 h-4 text-maroon-600 border-navy-300 rounded"
                      />
                    </div>
                    <div className="col-span-4 flex items-center">
                      <div className="p-1 mr-3">{renderFileIcon(doc.type)}</div>
                      <div>
                        <p className="font-medium text-navy-800">{doc.name}</p>
                        <p className="text-xs text-navy-600">{doc.size} • v{doc.version}</p>
                      </div>
                    </div>
                    <div className="col-span-2 text-navy-700">{doc.department}</div>
                    <div className="col-span-2">{getSecurityBadge(doc.securityLevel)}</div>
                    <div className="col-span-2 text-navy-600">{doc.modified}</div>
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

      {/* Modals */}
      {showUploadModal && (
        <UploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          folders={departments.slice(1).map(d => ({ id: d.id, name: d.name, count: d.count }))}
        />
      )}
      
      {showShareModal && selectedFile && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          fileName={documents.find(d => d.id === selectedFile)?.name || ''}
        />
      )}
      
      {showAdvancedSearch && (
        <AdvancedSearch
          isOpen={showAdvancedSearch}
          onClose={() => setShowAdvancedSearch(false)}
          onSearch={(filters) => {
            console.log('Search filters:', filters)
            // Implement search logic
          }}
        />
      )}
      
      {showDocumentTracker && selectedFile && (
        <DocumentTracker
          documentId={selectedFile}
          documentName={documents.find(d => d.id === selectedFile)?.name || ''}
          currentUser={currentUser}
          isVisible={showDocumentTracker}
          onClose={() => setShowDocumentTracker(false)}
        />
      )}
    </div>
  )
}