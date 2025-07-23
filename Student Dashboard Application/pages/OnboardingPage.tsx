import React, { useState } from 'react'
import { CheckIcon, ArrowRightIcon, ShieldCheckIcon, CloudIcon, SearchIcon, FileTextIcon, PlayIcon, BookOpenIcon } from 'lucide-react'
import { User } from '../App'

interface OnboardingPageProps {
  user: User
  onComplete: () => void
}

export function OnboardingPage({ user, onComplete }: OnboardingPageProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const onboardingSteps = [
    {
      id: 'welcome',
      title: 'Welcome to Digital Filing System',
      description: `Hello ${user.name}! Let's get you started with our secure document management platform.`,
      icon: ShieldCheckIcon,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-navy-100 rounded-full mb-4">
              <ShieldCheckIcon className="h-10 w-10 text-navy-600" />
            </div>
            <h3 className="text-lg font-medium text-navy-800 mb-2">Secure Document Management</h3>
            <p className="text-navy-600">Your documents are protected with enterprise-grade security and encryption.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-navy-50 rounded-md border border-navy-200">
              <h4 className="font-medium text-navy-800 mb-2">Your Role: {user.role}</h4>
              <p className="text-sm text-navy-600">You have {user.permissions.length} permissions assigned</p>
            </div>
            {user.department && (
              <div className="p-4 bg-navy-50 rounded-md border border-navy-200">
                <h4 className="font-medium text-navy-800 mb-2">Department</h4>
                <p className="text-sm text-navy-600">{user.department}</p>
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      description: 'Learn about our security features and compliance standards.',
      icon: ShieldCheckIcon,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border-2 border-navy-200 rounded-md">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h4 className="font-medium text-navy-800">Encryption</h4>
              </div>
              <p className="text-sm text-navy-600">All documents are encrypted at rest and in transit using AES-256 encryption.</p>
            </div>
            
            <div className="p-4 border-2 border-navy-200 rounded-md">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h4 className="font-medium text-navy-800">Access Control</h4>
              </div>
              <p className="text-sm text-navy-600">Role-based permissions ensure you only see what you're authorized to access.</p>
            </div>
            
            <div className="p-4 border-2 border-navy-200 rounded-md">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h4 className="font-medium text-navy-800">Audit Trails</h4>
              </div>
              <p className="text-sm text-navy-600">Every action is logged for compliance and security monitoring.</p>
            </div>
            
            <div className="p-4 border-2 border-navy-200 rounded-md">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h4 className="font-medium text-navy-800">Backup</h4>
              </div>
              <p className="text-sm text-navy-600">Automatic cloud backups ensure your documents are never lost.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'navigation',
      title: 'System Navigation',
      description: 'Discover the key features and how to navigate the system.',
      icon: SearchIcon,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-navy-50 rounded-md border border-navy-200">
              <FileTextIcon className="h-6 w-6 text-navy-600 mt-1 mr-4" />
              <div>
                <h4 className="font-medium text-navy-800 mb-1">Documents Hub</h4>
                <p className="text-sm text-navy-600">Central location for all your files with advanced search and filtering capabilities.</p>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-navy-50 rounded-md border border-navy-200">
              <SearchIcon className="h-6 w-6 text-navy-600 mt-1 mr-4" />
              <div>
                <h4 className="font-medium text-navy-800 mb-1">Smart Search</h4>
                <p className="text-sm text-navy-600">Find documents instantly using metadata, content, tags, or department filters.</p>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-navy-50 rounded-md border border-navy-200">
              <CloudIcon className="h-6 w-6 text-navy-600 mt-1 mr-4" />
              <div>
                <h4 className="font-medium text-navy-800 mb-1">Cloud Integration</h4>
                <p className="text-sm text-navy-600">Real-time sync status and backup monitoring for peace of mind.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'permissions',
      title: 'Your Permissions',
      description: 'Understand what you can do in the system based on your role.',
      icon: ShieldCheckIcon,
      content: (
        <div className="space-y-6">
          <div className="p-4 bg-maroon-50 rounded-md border-2 border-maroon-200">
            <h4 className="font-medium text-maroon-800 mb-3">Your Permissions</h4>
            <div className="grid grid-cols-2 gap-3">
              {user.permissions.map((permission, index) => (
                <div key={index} className="flex items-center">
                  <CheckIcon className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm text-navy-700 capitalize">{permission.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
          
          {user.role === 'admin' && (
            <div className="p-4 bg-navy-50 rounded-md border border-navy-200">
              <h4 className="font-medium text-navy-800 mb-2">Admin Features</h4>
              <ul className="text-sm text-navy-600 space-y-1">
                <li>• Access to all departments and documents</li>
                <li>• User management and role assignment</li>
                <li>• System audit logs and compliance reports</li>
                <li>• Backup and security settings</li>
              </ul>
            </div>
          )}
          
          {user.role === 'staff' && (
            <div className="p-4 bg-navy-50 rounded-md border border-navy-200">
              <h4 className="font-medium text-navy-800 mb-2">Staff Features</h4>
              <ul className="text-sm text-navy-600 space-y-1">
                <li>• Upload and manage department documents</li>
                <li>• Share files with team members</li>
                <li>• Access document templates</li>
                <li>• View document activity within your department</li>
              </ul>
            </div>
          )}
        </div>
      )
    }
  ]

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep])
      setCurrentStep(currentStep + 1)
    } else {
      setCompletedSteps([...completedSteps, currentStep])
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const currentStepData = onboardingSteps[currentStep]
  const IconComponent = currentStepData.icon

  return (
    <div className="min-h-screen bg-navy-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-navy-900">Getting Started</h1>
            <span className="text-sm text-navy-600">
              Step {currentStep + 1} of {onboardingSteps.length}
            </span>
          </div>
          <div className="w-full bg-navy-200 rounded-full h-2">
            <div
              className="bg-navy-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg border-2 border-navy-200 p-8 mb-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-100 rounded-full mb-4">
              <IconComponent className="h-8 w-8 text-navy-600" />
            </div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">{currentStepData.title}</h2>
            <p className="text-navy-600">{currentStepData.description}</p>
          </div>

          {currentStepData.content}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="px-4 py-2 text-navy-600 hover:text-navy-800 transition-colors"
          >
            Skip Tutorial
          </button>
          
          <div className="flex items-center gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 border-2 border-navy-200 rounded-md hover:bg-navy-50 transition-colors text-navy-700"
              >
                Previous
              </button>
            )}
            
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-navy-600 hover:bg-navy-700 text-white rounded-md font-medium transition-colors flex items-center"
            >
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}