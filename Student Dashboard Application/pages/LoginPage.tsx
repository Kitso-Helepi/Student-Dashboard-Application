import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon, ShieldIcon, UsersIcon, GraduationCapIcon, BookOpenIcon } from 'lucide-react'

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

interface LoginPageProps {
  onLogin: (email: string, password: string) => void
  schoolConfig: SchoolConfig
}

export function LoginPage({ onLogin, schoolConfig }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login delay
    setTimeout(() => {
      onLogin(email, password)
      setIsLoading(false)
    }, 1000)
  }

  const demoCredentials = [
    {
      role: 'System Administrator',
      email: 'admin@riverside.edu',
      permissions: 'Full system access, user management, audit logs, system settings',
      icon: ShieldIcon,
      color: 'emerald',
      description: 'Complete administrative control'
    },
    {
      role: 'Faculty/Staff Member',
      email: 'staff@riverside.edu',
      permissions: 'Department documents, upload/edit files, view activity logs',
      icon: UsersIcon,
      color: 'navy',
      description: 'Departmental document management'
    },
    {
      role: 'Student',
      email: 'student@riverside.edu',
      permissions: 'View shared documents, download assignments, limited uploads',
      icon: GraduationCapIcon,
      color: 'gold',
      description: 'Access to educational materials'
    }
  ]

  const quickLogin = (email: string) => {
    setEmail(email)
    setPassword('password123')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-emerald-50 to-gold-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Branding & Info */}
        <div className="flex flex-col justify-center">
          {/* School Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-navy-600 rounded-full mb-6 shadow-lg">
              <BookOpenIcon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-navy-900 mb-2">{schoolConfig.name}</h1>
            <p className="text-navy-600 text-lg mb-4">{schoolConfig.tagline}</p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold-500 mx-auto rounded-full"></div>
          </div>

          {/* Features Highlight */}
          <div className="bg-white rounded-lg shadow-lg border-2 border-navy-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-navy-900 mb-4">Document Management Features</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-2 bg-emerald-100 rounded-md mr-4">
                  <ShieldIcon className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-navy-800">Secure & Compliant</h3>
                  <p className="text-sm text-navy-600">Enterprise-grade security with role-based access control</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 bg-navy-100 rounded-md mr-4">
                  <UsersIcon className="h-5 w-5 text-navy-600" />
                </div>
                <div>
                  <h3 className="font-medium text-navy-800">Collaborative Platform</h3>
                  <p className="text-sm text-navy-600">Share documents seamlessly across departments</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 bg-gold-100 rounded-md mr-4">
                  <GraduationCapIcon className="h-5 w-5 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-medium text-navy-800">Education-Focused</h3>
                  <p className="text-sm text-navy-600">Designed specifically for academic institutions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="bg-white rounded-lg shadow-lg border-2 border-navy-200 p-6">
            <h2 className="text-lg font-bold text-navy-900 mb-4">Demo Access Roles</h2>
            <div className="space-y-3">
              {demoCredentials.map((cred, index) => {
                const IconComponent = cred.icon
                return (
                  <div
                    key={index}
                    className="p-4 border-2 border-navy-200 rounded-md hover:bg-navy-50 transition-colors cursor-pointer group"
                    onClick={() => quickLogin(cred.email)}
                  >
                    <div className="flex items-start">
                      <div className={`p-2 rounded-md mr-4 bg-${cred.color}-100`}>
                        <IconComponent className={`h-5 w-5 text-${cred.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-navy-800 group-hover:text-navy-900">{cred.role}</h3>
                        <p className="text-sm text-navy-600 mb-1">{cred.email}</p>
                        <p className="text-xs text-navy-500">{cred.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 p-3 bg-navy-50 rounded-md border border-navy-200">
              <p className="text-xs text-navy-600 mb-1 font-medium">All accounts use password:</p>
              <p className="text-sm font-mono bg-white px-2 py-1 rounded border text-navy-800">password123</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex flex-col justify-center">
          <div className="bg-white rounded-lg shadow-lg border-2 border-navy-200 p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Welcome Back</h2>
              <p className="text-navy-600">Sign in to access your document portal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy-800 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-navy-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-navy-200 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
                    placeholder="Enter your school email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-navy-800 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-navy-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border-2 border-navy-200 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-navy-400 hover:text-navy-600" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-navy-400 hover:text-navy-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 border-navy-300 rounded focus:ring-emerald-500 focus:ring-2"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-navy-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                  isLoading || !email || !password
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-navy-600 to-emerald-600 hover:from-navy-700 hover:to-emerald-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In to Portal'
                )}
              </button>
            </form>

            {/* Support Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-navy-600">
                Need help?{' '}
                <button className="font-medium text-emerald-600 hover:text-emerald-800">
                  Contact IT Support
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-navy-500">
              &copy; 2024 {schoolConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}