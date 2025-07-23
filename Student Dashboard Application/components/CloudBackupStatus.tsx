import React, { useState, useEffect } from 'react'
import {
  CloudIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  RefreshCwIcon,
  ShieldIcon,
  ClockIcon,
  HardDriveIcon,
  WifiIcon
} from 'lucide-react'

interface BackupStatus {
  status: 'synced' | 'syncing' | 'error' | 'offline'
  lastSync: string
  nextBackup: string
  syncProgress: number
  totalFiles: number
  syncedFiles: number
  storageUsed: string
  storageLimit: string
  isEncrypted: boolean
  connectionStatus: 'connected' | 'disconnected' | 'slow'
}

interface CloudBackupStatusProps {
  isCompact?: boolean
}

export function CloudBackupStatus({ isCompact = false }: CloudBackupStatusProps) {
  const [backupStatus, setBackupStatus] = useState<BackupStatus>({
    status: 'synced',
    lastSync: '2024-01-15T14:30:00Z',
    nextBackup: '2024-01-15T18:00:00Z',
    syncProgress: 100,
    totalFiles: 1247,
    syncedFiles: 1247,
    storageUsed: '8.7 GB',
    storageLimit: '100 GB',
    isEncrypted: true,
    connectionStatus: 'connected'
  })

  const [isRefreshing, setIsRefreshing] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'text-green-600 bg-green-100'
      case 'syncing': return 'text-blue-600 bg-blue-100'
      case 'error': return 'text-red-600 bg-red-100'
      case 'offline': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'synced': return CheckCircleIcon
      case 'syncing': return RefreshCwIcon
      case 'error': return AlertCircleIcon
      case 'offline': return CloudIcon
      default: return CloudIcon
    }
  }

  const getConnectionIcon = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600'
      case 'disconnected': return 'text-red-600'
      case 'slow': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setBackupStatus({
        ...backupStatus,
        lastSync: new Date().toISOString()
      })
      setIsRefreshing(false)
    }, 2000)
  }

  // Compact view for sidebar
  if (isCompact) {
    const StatusIcon = getStatusIcon(backupStatus.status)
    return (
      <div className="p-3 bg-white border-2 border-navy-200 rounded-md shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-2 rounded-full mr-3 ${getStatusColor(backupStatus.status)}`}>
              <StatusIcon className={`h-4 w-4 ${backupStatus.status === 'syncing' ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-navy-800 capitalize">{backupStatus.status}</p>
              <p className="text-xs text-navy-600">Cloud Backup</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1 hover:bg-navy-50 rounded-full transition-colors"
          >
            <RefreshCwIcon className={`h-4 w-4 text-navy-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    )
  }

  // Full view
  const StatusIcon = getStatusIcon(backupStatus.status)
  const storagePercentage = (parseFloat(backupStatus.storageUsed) / parseFloat(backupStatus.storageLimit)) * 100

  return (
    <div className="bg-white border-2 border-navy-200 rounded-md shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-navy-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CloudIcon className="h-6 w-6 text-navy-600 mr-3" />
            <h3 className="font-medium text-navy-800">Cloud Backup Status</h3>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 hover:bg-navy-50 rounded-full transition-colors"
          >
            <RefreshCwIcon className={`h-5 w-5 text-navy-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Main Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-3 rounded-full mr-4 ${getStatusColor(backupStatus.status)}`}>
              <StatusIcon className={`h-6 w-6 ${backupStatus.status === 'syncing' ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <p className="font-medium text-navy-800 capitalize">{backupStatus.status}</p>
              <p className="text-sm text-navy-600">
                {backupStatus.status === 'synced' && 'All files are up to date'}
                {backupStatus.status === 'syncing' && `Syncing ${backupStatus.syncedFiles}/${backupStatus.totalFiles} files`}
                {backupStatus.status === 'error' && 'Sync failed - check connection'}
                {backupStatus.status === 'offline' && 'Offline - will sync when connected'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <WifiIcon className={`h-4 w-4 ${getConnectionIcon(backupStatus.connectionStatus)}`} />
            <span className="text-sm text-navy-600 capitalize">{backupStatus.connectionStatus}</span>
          </div>
        </div>

        {/* Sync Progress */}
        {backupStatus.status === 'syncing' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-navy-700">Sync Progress</span>
              <span className="text-sm text-navy-600">{backupStatus.syncProgress}%</span>
            </div>
            <div className="w-full bg-navy-200 rounded-full h-2">
              <div
                className="bg-navy-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${backupStatus.syncProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Storage Usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <HardDriveIcon className="h-4 w-4 text-navy-600 mr-2" />
              <span className="text-sm text-navy-700">Storage Usage</span>
            </div>
            <span className="text-sm text-navy-600">
              {backupStatus.storageUsed} of {backupStatus.storageLimit}
            </span>
          </div>
          <div className="w-full bg-navy-200 rounded-full h-2">
            <div
              className="bg-maroon-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${storagePercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Security Status */}
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-md border border-green-200">
          <div className="flex items-center">
            <ShieldIcon className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-800">
              {backupStatus.isEncrypted ? 'Encrypted & Secure' : 'Not Encrypted'}
            </span>
          </div>
          <CheckCircleIcon className="h-4 w-4 text-green-600" />
        </div>

        {/* Timing Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 text-navy-600 mr-2" />
            <div>
              <p className="text-navy-700">Last Sync</p>
              <p className="text-navy-600">{formatTimestamp(backupStatus.lastSync)}</p>
            </div>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 text-navy-600 mr-2" />
            <div>
              <p className="text-navy-700">Next Backup</p>
              <p className="text-navy-600">{formatTimestamp(backupStatus.nextBackup)}</p>
            </div>
          </div>
        </div>

        {/* File Count */}
        <div className="text-center p-3 bg-navy-50 rounded-md border border-navy-200">
          <p className="text-sm text-navy-600">
            <span className="font-medium text-navy-800">{backupStatus.syncedFiles.toLocaleString()}</span> of{' '}
            <span className="font-medium text-navy-800">{backupStatus.totalFiles.toLocaleString()}</span> files synced
          </p>
        </div>
      </div>
    </div>
  )
}