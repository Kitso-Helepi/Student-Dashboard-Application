import React, { useState } from 'react'
import { Dialog } from '../components/Dialog'
import { UploadIcon, FolderIcon, XIcon, FileIcon } from 'lucide-react'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  folders: Array<{
    id: string
    name: string
    count: number
  }>
}

export function UploadModal({ isOpen, onClose, folders }: UploadModalProps) {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<
    {
      name: string
      size: string
    }[]
  >([])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    // In a real app, we would handle the actual file upload
    // For the wireframe, we'll just simulate adding files
    const newFiles = Array.from(
      {
        length: 2,
      },
      (_, i) => ({
        name: `Document-${i + 1}.pdf`,
        size: `${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 9)}MB`,
      }),
    )
    setUploadedFiles([...uploadedFiles, ...newFiles])
  }

  const handleRemoveFile = (index: number) => {
    const newFiles = [...uploadedFiles]
    newFiles.splice(index, 1)
    setUploadedFiles(newFiles)
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Upload Files">
      <div className="space-y-5">
        {/* Drag and drop area */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center bg-gray-50 transition-colors hover:bg-gray-100"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm mb-3">Drag and drop files here, or</p>
          <button className="px-4 py-2.5 border-2 border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors font-medium">
            Browse Files
          </button>
        </div>

        {/* Uploaded files */}
        {uploadedFiles.length > 0 && (
          <div className="border-2 border-gray-300 rounded-md divide-y divide-gray-200 bg-white">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center">
                  <div className="p-3 border-2 border-dashed border-gray-300 rounded-md mr-3 bg-gray-50">
                    <FileIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{file.size}</p>
                  </div>
                </div>
                <button
                  className="p-1.5 hover:bg-gray-100 rounded-full"
                  onClick={() => handleRemoveFile(index)}
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Select folder */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Select folder:
          </label>
          <div className="grid grid-cols-2 gap-3">
            {folders.map((folder) => (
              <button
                key={folder.id}
                className={`flex items-center p-4 border-2 rounded-md transition-colors ${selectedFolder === folder.id ? 'border-gray-700 bg-gray-50' : 'border-gray-300 hover:bg-gray-50'}`}
                onClick={() => setSelectedFolder(folder.id)}
              >
                <FolderIcon className="h-5 w-5 mr-3 text-gray-600" />
                <span className="text-sm">{folder.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            className="px-4 py-2.5 border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2.5 border-2 border-gray-700 rounded-md transition-colors font-medium ${uploadedFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            disabled={uploadedFiles.length === 0}
            onClick={onClose}
          >
            Upload {uploadedFiles.length > 0 ? `(${uploadedFiles.length})` : ''}
          </button>
        </div>
      </div>
    </Dialog>
  )
}