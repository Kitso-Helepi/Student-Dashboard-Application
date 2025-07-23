import React, { useState } from 'react'
import {
  FileTextIcon,
  DownloadIcon,
  SearchIcon,
  BookOpenIcon,
  LogOutIcon,
  BellIcon,
  FolderIcon,
  ClockIcon,
  GraduationCapIcon,
  CalendarIcon,
  BookIcon,
  FileIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  StarIcon
} from 'lucide-react'
import { LayoutDashboard } from 'lucide-react'
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

interface StudentDashboardProps {
  currentUser: User
  onLogout: () => void
  schoolConfig: SchoolConfig
}

interface Document {
  id: string
  name: string
  course: string
  type: 'assignment' | 'syllabus' | 'reading' | 'announcement' | 'resource'
  size: string
  uploaded: string
  dueDate?: string
  instructor: string
  priority: 'high' | 'medium' | 'low'
  isNew: boolean
}

export function StudentDashboard({ currentUser, onLogout, schoolConfig }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('all')

  // Mock data for student documents
  const documents: Document[] = [
    {
      id: '1',
      name: 'CS101 Assignment 4 - Data Structures.pdf',
      course: 'CS101',
      type: 'assignment',
      size: '2.4 MB',
      uploaded: 'Today, 9:00 AM',
      dueDate: 'Friday, Jan 19',
      instructor: 'Prof. Chen',
      priority: 'high',
      isNew: true
    },
    {
      id: '2',
      name: 'Introduction to Programming Syllabus.pdf',
      course: 'CS101',
      type: 'syllabus',
      size: '1.2 MB',
      uploaded: '2 days ago',
      instructor: 'Prof. Chen',
      priority: 'medium',
      isNew: false
    },
    {
      id: '3',
      name: 'Calculus II Chapter 5 - Integration.pdf',
      course: 'MATH201',
      type: 'reading',
      size: '3.1 MB',
      uploaded: '3 days ago',
      instructor: 'Dr. Williams',
      priority: 'medium',
      isNew: false
    },
    {
      id: '4',
      name: 'Midterm Exam Schedule Update',
      course: 'MATH201',
      type: 'announcement',
      size: '0.5 MB',
      uploaded: '1 week ago',
      instructor: 'Dr. Williams',
      priority: 'high',
      isNew: false
    }
  ]

  const courses = [
    { id: 'all', name: 'All Courses', count: 24 },
    { id: 'CS101', name: 'CS101 - Intro to Programming', count: 8 },
    { id: 'MATH201', name: 'MATH201 - Calculus II', count: 6 },
    { id: 'ENG101', name: 'ENG101 - English Composition', count: 5 },
    { id: 'PHYS101', name: 'PHYS101 - General Physics', count: 5 }
  ]

  const upcomingDeadlines = [
    {
      id: '1',
      title: 'CS101 Assignment 4',
      course: 'CS101',
      dueDate: 'Jan 19, 2024',
      daysLeft: 2,
      priority: 'high'
    },
    {
      id: '2',
      title: 'Math Homework Set 8',
      course: 'MATH201',
      dueDate: 'Jan 22, 2024',
      daysLeft: 5,
      priority: 'medium'
    },
    {
      id: '3',
      title: 'English Essay Draft',
      course: 'ENG101',
      dueDate: 'Jan 25, 2024',
      daysLeft: 8,
      priority: 'low'
    }
  ]

  const recentAnnouncements = [
    {
      id: '1',
      title: 'Midterm Exam Schedule Released',
      course: 'MATH201',
      content: 'The midterm exam schedule has been updated. Please check the course page for details.',
      timestamp: '2 hours ago',
      instructor: 'Dr. Williams'
    },
    {
      id: '2',
      title: 'Office Hours Change',
      course: 'CS101',
      content: 'Office hours for this week have been moved to Wednesday 2-4 PM.',
      timestamp: '1 day ago',
      instructor: 'Prof. Chen'
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment': return FileTextIcon
      case 'syllabus': return BookIcon
      case 'reading': return BookOpenIcon
      case 'announcement': return BellIcon
      case 'resource': return FolderIcon
      default: return FileIcon
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'bg-navy-100 text-navy-800'
      case 'syllabus': return 'bg-emerald-100 text-emerald-800'
      case 'reading': return 'bg-gold-100 text-gold-800'
      case 'announcement': return 'bg-red-100 text-red-800'
      case 'resource': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesCourse = selectedCourse === 'all' || doc.course === selectedCourse
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.course.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCourse && matchesSearch
  })

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-navy-600 to-emerald-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {currentUser.name.split(' ')[0]}!</h2>
            <p className="text-navy-100">You have {upcomingDeadlines.length} upcoming deadlines and {documents.filter(d => d.isNew).length} new documents</p>
          </div>
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <GraduationCapIcon className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border-2 border-navy-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-navy-100 rounded-md mr-3">
              <BookIcon className="h-5 w-5 text-navy-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-navy-800">{courses.length - 1}</p>
              <p className="text-sm text-navy-600">Active Courses</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-navy-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-emerald-100 rounded-md mr-3">
              <FileTextIcon className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-navy-800">{documents.length}</p>
              <p className="text-sm text-navy-600">Documents</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-navy-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-gold-100 rounded-md mr-3">
              <ClockIcon className="h-5 w-5 text-gold-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-navy-800">{upcomingDeadlines.length}</p>
              <p className="text-sm text-navy-600">Upcoming Due</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-navy-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-md mr-3">
              <BellIcon className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-navy-800">{recentAnnouncements.length}</p>
              <p className="text-sm text-navy-600">New Announcements</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Documents */}
        <div className="lg:col-span-2 bg-white rounded-lg border-2 border-navy-200 shadow-sm">
          <div className="p-4 border-b border-navy-200">
            <h3 className="text-lg font-medium text-navy-800">Recent Documents</h3>
          </div>
          <div className="divide-y divide-navy-200">
            {documents.slice(0, 4).map((doc) => {
              const TypeIcon = getTypeIcon(doc.type)
              return (
                <div key={doc.id} className="p-4 hover:bg-navy-25">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="p-2 bg-navy-50 rounded-md mr-3">
                        <TypeIcon className="h-5 w-5 text-navy-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-navy-800">{doc.name}</h4>
                          {doc.isNew && (
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-navy-600">{doc.course} • {doc.instructor}</p>
                        <p className="text-xs text-navy-500">{doc.uploaded} • {doc.size}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-navy-100 rounded-md">
                      <DownloadIcon className="h-4 w-4 text-navy-600" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="p-4 border-t border-navy-200">
            <button 
              onClick={() => setActiveTab('documents')}
              className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
            >
              View All Documents →
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm">
            <div className="p-4 border-b border-navy-200">
              <h3 className="text-lg font-medium text-navy-800">Upcoming Deadlines</h3>
            </div>
            <div className="p-4 space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center justify-between p-3 bg-navy-50 rounded-md">
                  <div>
                    <p className="text-sm font-medium text-navy-800">{deadline.title}</p>
                    <p className="text-xs text-navy-600">{deadline.course}</p>
                    <p className="text-xs text-navy-500">{deadline.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${getPriorityColor(deadline.priority)}`}>
                      {deadline.daysLeft} days
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Announcements */}
          <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm">
            <div className="p-4 border-b border-navy-200">
              <h3 className="text-lg font-medium text-navy-800">Announcements</h3>
            </div>
            <div className="divide-y divide-navy-200">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-navy-800">{announcement.title}</h4>
                    <span className="text-xs text-navy-500">{announcement.timestamp}</span>
                  </div>
                  <p className="text-sm text-navy-600 mb-2">{announcement.content}</p>
                  <p className="text-xs text-navy-500">{announcement.course} • {announcement.instructor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Course Filter */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm">
            <div className="p-4 border-b border-navy-200">
              <h3 className="font-medium text-navy-800">My Courses</h3>
            </div>
            <div className="p-2">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors text-left ${
                    selectedCourse === course.id
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'text-navy-600 hover:bg-navy-50'
                  }`}
                >
                  <span className="text-sm">{course.name}</span>
                  <span className="text-xs bg-navy-100 px-2 py-1 rounded-full">
                    {course.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-3">
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-navy-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border-2 border-navy-200 rounded-md focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Documents Grid */}
          <div className="space-y-4">
            {filteredDocuments.map((doc) => {
              const TypeIcon = getTypeIcon(doc.type)
              return (
                <div key={doc.id} className="bg-white p-4 rounded-lg border-2 border-navy-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start flex-1">
                      <div className="p-2 bg-navy-50 rounded-md mr-4">
                        <TypeIcon className="h-6 w-6 text-navy-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-navy-800">{doc.name}</h4>
                          {doc.isNew && (
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                              New
                            </span>
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(doc.type)}`}>
                            {doc.type}
                          </span>
                        </div>
                        <p className="text-sm text-navy-600 mb-1">{doc.course} • {doc.instructor}</p>
                        <div className="flex items-center space-x-4 text-xs text-navy-500">
                          <span>{doc.uploaded}</span>
                          <span>{doc.size}</span>
                          {doc.dueDate && (
                            <span className="text-red-600 font-medium">Due: {doc.dueDate}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-2 border border-navy-300 rounded-md hover:bg-navy-50 text-sm flex items-center">
                        <DownloadIcon className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'documents', label: 'My Documents', icon: FileTextIcon },
    { id: 'grades', label: 'Grades', icon: StarIcon }
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
                <p className="text-xs text-navy-600">Student Portal</p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-navy-600 hover:text-navy-800 relative">
                <BellIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 text-white rounded-full text-xs flex items-center justify-center">
                  {recentAnnouncements.length}
                </span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-navy-800">{currentUser.name}</p>
                  <p className="text-xs text-navy-600">ID: {currentUser.schoolId}</p>
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
        {/* Tab Navigation */}
        <div className="mb-8">
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
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'documents' && renderDocuments()}
        {activeTab === 'grades' && (
          <div className="bg-white rounded-lg border-2 border-navy-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-navy-900 mb-4">Grade Center</h2>
            <p className="text-navy-600">Grades and progress tracking interface would be implemented here...</p>
          </div>
        )}
      </div>
    </div>
  )
}