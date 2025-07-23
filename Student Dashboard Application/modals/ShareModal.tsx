import React, { useState } from 'react'
import { Dialog } from '../components/Dialog'
import { UserPlusIcon, LinkIcon, XIcon } from 'lucide-react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  fileName: string
}

export function ShareModal({ isOpen, onClose, fileName }: ShareModalProps) {
  const [recipients, setRecipients] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [accessType, setAccessType] = useState<'view' | 'edit'>('view')
  const [expiryEnabled, setExpiryEnabled] = useState(false)
  const [expiryDate, setExpiryDate] = useState('')

  const handleAddRecipient = () => {
    if (inputValue && !recipients.includes(inputValue)) {
      setRecipients([...recipients, inputValue])
      setInputValue('')
    }
  }

  const handleRemoveRecipient = (recipient: string) => {
    setRecipients(recipients.filter((r) => r !== recipient))
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={`Share "${fileName}"`}>
      <div className="space-y-5">
        {/* Recipients input */}
        <div>
          <label className="block text-sm font-medium mb-2">Share with:</label>
          <div className="flex items-center border-2 border-gray-300 rounded-md p-2 mb-2 focus-within:border-gray-500">
            <div className="flex flex-wrap gap-2 mr-2 flex-1">
              {recipients.map((recipient) => (
                <div
                  key={recipient}
                  className="flex items-center bg-gray-100 rounded-md px-2 py-1 text-sm border border-gray-200"
                >
                  <span>{recipient}</span>
                  <button
                    className="ml-1.5 hover:bg-gray-200 rounded-full p-0.5"
                    onClick={() => handleRemoveRecipient(recipient)}
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <input
                type="text"
                className="flex-1 border-none outline-none min-w-[100px] bg-transparent"
                placeholder="Email or name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddRecipient()
                  }
                }}
              />
            </div>
            <button
              className="p-1.5 border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={handleAddRecipient}
            >
              <UserPlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Access type */}
        <div>
          <label className="block text-sm font-medium mb-2">Access type:</label>
          <div className="flex border-2 border-gray-300 rounded-md overflow-hidden">
            <button
              className={`flex-1 py-2.5 text-center transition-colors ${accessType === 'view' ? 'bg-gray-200 font-medium' : 'bg-white hover:bg-gray-50'}`}
              onClick={() => setAccessType('view')}
            >
              View Only
            </button>
            <button
              className={`flex-1 py-2.5 text-center transition-colors ${accessType === 'edit' ? 'bg-gray-200 font-medium' : 'bg-white hover:bg-gray-50'}`}
              onClick={() => setAccessType('edit')}
            >
              Edit Access
            </button>
          </div>
        </div>

        {/* Expiry date */}
        <div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="enable-expiry"
              checked={expiryEnabled}
              onChange={() => setExpiryEnabled(!expiryEnabled)}
              className="w-4 h-4 mr-2"
            />
            <label htmlFor="enable-expiry" className="text-sm">
              Set expiry date
            </label>
          </div>
          {expiryEnabled && (
            <input
              type="date"
              className="w-full border-2 border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-gray-500"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          )}
        </div>

        {/* Link sharing */}
        <div className="border-t-2 border-dashed border-gray-300 pt-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Share via link</label>
            <input type="checkbox" className="w-4 h-4" />
          </div>
          <div className="flex items-center border-2 border-gray-300 rounded-md">
            <input
              type="text"
              value="https://dms.example.com/share/abc123"
              readOnly
              className="flex-1 p-2.5 bg-gray-50 text-sm focus:outline-none"
            />
            <button className="p-2.5 border-l-2 border-gray-300 hover:bg-gray-50 transition-colors">
              <LinkIcon className="h-4 w-4" />
            </button>
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
            className="px-4 py-2.5 border-2 border-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
            onClick={onClose}
          >
            Share
          </button>
        </div>
      </div>
    </Dialog>
  )
}