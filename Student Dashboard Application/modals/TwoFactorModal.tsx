import React, { useState } from 'react'
import { ShieldCheckIcon, XIcon, KeyIcon, SmartphoneIcon } from 'lucide-react'

interface TwoFactorModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: () => void
  userEmail: string
}

export function TwoFactorModal({ isOpen, onClose, onVerify, userEmail }: TwoFactorModalProps) {
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [method, setMethod] = useState<'sms' | 'app'>('app')

  const handleVerify = () => {
    setIsVerifying(true)
    
    // Simulate verification process
    setTimeout(() => {
      if (verificationCode === '123456') {
        onVerify()
      } else {
        alert('Invalid verification code. Use 123456 for demo.')
      }
      setIsVerifying(false)
    }, 1500)
  }

  const handleCodeInput = (value: string) => {
    // Only allow numbers and limit to 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6)
    setVerificationCode(numericValue)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg border-2 border-navy-200 w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b-2 border-navy-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 rounded-full mr-4">
                <ShieldCheckIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy-900">Two-Factor Authentication</h2>
                <p className="text-sm text-navy-600">{userEmail}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-navy-50 rounded-full transition-colors"
            >
              <XIcon className="h-5 w-5 text-navy-600" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Method Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-navy-800 mb-3">Choose verification method:</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMethod('app')}
                className={`p-3 rounded-md border-2 transition-colors flex items-center justify-center ${
                  method === 'app' 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-navy-200 hover:bg-navy-50'
                }`}
              >
                <SmartphoneIcon className="h-5 w-5 mr-2 text-navy-600" />
                <span className="text-sm font-medium">Authenticator App</span>
              </button>
              <button
                onClick={() => setMethod('sms')}
                className={`p-3 rounded-md border-2 transition-colors flex items-center justify-center ${
                  method === 'sms' 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-navy-200 hover:bg-navy-50'
                }`}
              >
                <KeyIcon className="h-5 w-5 mr-2 text-navy-600" />
                <span className="text-sm font-medium">SMS Code</span>
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6 p-4 bg-navy-50 rounded-md border border-navy-200">
            <p className="text-sm text-navy-700">
              {method === 'app' 
                ? 'Enter the 6-digit code from your authenticator app.'
                : 'Enter the 6-digit code sent to your registered phone number.'
              }
            </p>
          </div>

          {/* Code Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-navy-800 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => handleCodeInput(e.target.value)}
              className="w-full px-4 py-3 border-2 border-navy-200 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-center tracking-widest text-lg font-mono"
              placeholder="000000"
              maxLength={6}
            />
          </div>

          {/* Demo Hint */}
          <div className="mb-6 p-3 bg-gold-50 rounded-md border border-gold-200">
            <p className="text-xs text-gold-800 font-medium">
              Demo Code: <span className="font-mono">123456</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 border-2 border-navy-200 rounded-md hover:bg-navy-50 transition-colors text-navy-700"
            >
              Cancel
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  // Simulate resending code
                  alert(`${method === 'app' ? 'New code generated in your app' : 'SMS code sent'}`)
                }}
                className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
              >
                Resend Code
              </button>
              
              <button
                onClick={handleVerify}
                disabled={verificationCode.length !== 6 || isVerifying}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  verificationCode.length === 6 && !isVerifying
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isVerifying ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Verify'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="text-center">
            <p className="text-xs text-navy-500">
              Having trouble? Contact IT support for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}