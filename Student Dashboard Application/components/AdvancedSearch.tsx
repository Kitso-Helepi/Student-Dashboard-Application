import React, { useState } from 'react'
import {
  SearchIcon,
  FilterIcon,
  CalendarIcon,
  TagIcon,
  FolderIcon,
  UserIcon,
  FileTypeIcon,
  XIcon,
  SlidersIcon
} from 'lucide-react'

interface SearchFilters {
  query: string
  fileType: string
  department: string
  dateRange: {
    start: string
    end: string
  }
  uploader: string
  tags: string[]
  size: {
    min: string
    max: string
  }
  securityLevel: string
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void
  onClose: () => void
  isOpen: boolean
}

export function AdvancedSearch({ onSearch, onClose, isOpen }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    fileType: '',
    department: '',
    dateRange: { start: '', end: '' },
    uploader: '',
    tags: [],
    size: { min: '', max: '' },
    securityLevel: ''
  })

  const [activeTag, setActiveTag] = useState('')
  const [showMoreFilters, setShowMoreFilters] = useState(false)

  const fileTypes = [
    { value: '', label: 'All Types' },
    { value: 'pdf', label: 'PDF Documents' },
    { value: 'doc', label: 'Word Documents' },
    { value: 'xls', label: 'Excel Spreadsheets' },
    { value: 'ppt', label: 'PowerPoint Presentations' },
    { value: 'img', label: 'Images' },
    { value: 'txt', label: 'Text Files' }
  ]

  const departments = [
    { value: '', label: 'All Departments' },
    { value: 'it', label: 'IT Department' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'admin', label: 'Administration' },
    { value: 'academic', label: 'Academic Affairs' },
    { value: 'student', label: 'Student Services' }
  ]

  const securityLevels = [
    { value: '', label: 'All Levels' },
    { value: 'public', label: 'Public' },
    { value: 'internal', label: 'Internal' },
    { value: 'confidential', label: 'Confidential' },
    { value: 'restricted', label: 'Restricted' }
  ]

  const suggestedTags = [
    'urgent', 'draft', 'approved', 'review', 'policy', 'procedure',
    'meeting', 'budget', 'contract', 'report', 'presentation', 'forms'
  ]

  const handleAddTag = (tag: string) => {
    if (tag && !filters.tags.includes(tag)) {
      setFilters({
        ...filters,
        tags: [...filters.tags, tag]
      })
      setActiveTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFilters({
      ...filters,
      tags: filters.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleSearch = () => {
    onSearch(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters({
      query: '',
      fileType: '',
      department: '',
      dateRange: { start: '', end: '' },
      uploader: '',
      tags: [],
      size: { min: '', max: '' },
      securityLevel: ''
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg border-2 border-navy-200 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b-2 border-navy-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <SearchIcon className="h-6 w-6 text-navy-600 mr-3" />
              <h2 className="text-xl font-bold text-navy-900">Advanced Search</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-navy-50 rounded-full transition-colors"
            >
              <XIcon className="h-6 w-6 text-navy-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Main Search Query */}
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-2">
              Search Query
            </label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-navy-400" />
              <input
                type="text"
                value={filters.query}
                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border-2 border-navy-200 rounded-md focus:outline-none focus:border-navy-500"
                placeholder="Search by document name, content, or keywords..."
              />
            </div>
          </div>

          {/* Basic Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-800 mb-2">
                File Type
              </label>
              <select
                value={filters.fileType}
                onChange={(e) => setFilters({ ...filters, fileType: e.target.value })}
                className="w-full border-2 border-navy-200 rounded-md px-3 py-2 focus:outline-none focus:border-navy-500"
              >
                {fileTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-800 mb-2">
                Department
              </label>
              <select
                value={filters.department}
                onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                className="w-full border-2 border-navy-200 rounded-md px-3 py-2 focus:outline-none focus:border-navy-500"
              >
                {departments.map(dept => (
                  <option key={dept.value} value={dept.value}>{dept.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-800 mb-2">
                Security Level
              </label>
              <select
                value={filters.securityLevel}
                onChange={(e) => setFilters({ ...filters, securityLevel: e.target.value })}
                className="w-full border-2 border-navy-200 rounded-md px-3 py-2 focus:outline-none focus:border-navy-500"
              >
                {securityLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-2">
              Tags
            </label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <TagIcon className="h-5 w-5 text-navy-400" />
                <input
                  type="text"
                  value={activeTag}
                  onChange={(e) => setActiveTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddTag(activeTag)
                    }
                  }}
                  className="flex-1 border-2 border-navy-200 rounded-md px-3 py-2 focus:outline-none focus:border-navy-500"
                  placeholder="Add tag..."
                />
                <button
                  onClick={() => handleAddTag(activeTag)}
                  className="px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700 transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Selected Tags */}
              {filters.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {filters.tags.map(tag => (
                    <div key={tag} className="flex items-center bg-navy-100 text-navy-800 px-3 py-1 rounded-full text-sm">
                      <span>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 hover:text-navy-600"
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggested Tags */}
              <div className="border-t border-navy-200 pt-3">
                <p className="text-xs text-navy-600 mb-2">Suggested tags:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleAddTag(tag)}
                      className="px-2 py-1 bg-navy-50 text-navy-700 border border-navy-200 rounded-md text-xs hover:bg-navy-100 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className="flex items-center text-navy-600 hover:text-navy-800 transition-colors"
          >
            <SlidersIcon className="h-4 w-4 mr-2" />
            {showMoreFilters ? 'Hide' : 'Show'} Advanced Filters
          </button>

          {/* Advanced Filters */}
          {showMoreFilters && (
            <div className="space-y-4 p-4 bg-navy-50 rounded-md border border-navy-200">
              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => setFilters({
                      ...filters,
                      dateRange: { ...filters.dateRange, start: e.target.value }
                    })}
                    className="w-full border-2 border-navy-200 rounded-md px-3 py-2 focus:outline-none focus:border-navy-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => setFilters({
                      ...filters,
                      dateRange: { ...filters.dateRange, end: e.target.value }
                    })}
                    className="w-full border-2 border-navy-200 rounded-md px-3 py-2 focus:outline-none focus:border-navy-500"
                  />
                </div>
              </div>

              {/* File Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-2">
                    Min File Size (MB)
                  </label>
                  <input
                    type="number"
                    value={filters.size.min}
                    onChange={(e) => setFilters({
                      ...filters,
                      size: { ...filters.size, min: e.target.value }
                    })}
                    className="w-full border-2 border-navy-200 rounded-md px-3 py-2 focus:outline-none focus:border-navy-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-800 mb-2">
                    Max File Size (MB)
                  </label>
                  <input
                    type="number"
                    value={filters.size.max}
                    onChange={(e) => setFilters({
                      ...filters,
                      size: { ...filters.size, max: e.target.value }
                    })}
                    className="w-full border-2 border-navy-200 rounded-md px-3 py-2 focus:outline-none focus:border-navy-500"
                    placeholder="100"
                  />
                </div>
              </div>

              {/* Uploader */}
              <div>
                <label className="block text-sm font-medium text-navy-800 mb-2">
                  Uploaded By
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 h-5 w-5 text-navy-400" />
                  <input
                    type="text"
                    value={filters.uploader}
                    onChange={(e) => setFilters({ ...filters, uploader: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border-2 border-navy-200 rounded-md focus:outline-none focus:border-navy-500"
                    placeholder="Search by uploader name or email..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-navy-200 bg-navy-50">
          <div className="flex items-center justify-between">
            <button
              onClick={handleReset}
              className="px-4 py-2 border-2 border-navy-200 rounded-md hover:bg-navy-50 transition-colors text-navy-700"
            >
              Reset Filters
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border-2 border-navy-200 rounded-md hover:bg-navy-50 transition-colors text-navy-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-navy-600 hover:bg-navy-700 text-white rounded-md font-medium transition-colors flex items-center"
              >
                <SearchIcon className="h-4 w-4 mr-2" />
                Search Documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}