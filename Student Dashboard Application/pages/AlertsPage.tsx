import React, { useState } from 'react'
import { BellIcon, ChevronRightIcon } from 'lucide-react'

export function AlertsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null)

  // Mock data
  const alerts = [
    {
      id: '1',
      type: 'academic',
      title: 'Assignment Deadline Extended',
      source: 'Faculty of IT',
      date: 'Today, 10:30 AM',
      summary:
        'The deadline for the Database Systems assignment has been extended to next Friday.',
      content:
        'Dear Students, Due to the technical issues experienced with the submission system, the deadline for the Database Systems (IT302) assignment has been extended to Friday, May 15th at 11:59 PM. Please ensure you submit your work before this new deadline. No further extensions will be granted. Best regards, Prof. Johnson',
    },
    {
      id: '2',
      type: 'event',
      title: 'Career Fair Next Week',
      source: 'Student Services',
      date: 'Yesterday',
      summary:
        'Annual Tech Career Fair happening next Tuesday in the Main Hall.',
      content:
        'The Annual Technology Career Fair will take place next Tuesday from 10:00 AM to 4:00 PM in the Main Hall. Over 30 companies will be present including Microsoft, Google, and local tech startups. Bring your resume and be prepared for on-the-spot interviews. Professional attire is recommended. This is a great opportunity to secure internships and graduate positions.',
    },
    {
      id: '3',
      type: 'admin',
      title: 'Library Hours Changed',
      source: 'Administration Office',
      date: '2 days ago',
      summary: 'New extended hours for the library during exam period.',
      content:
        'Starting next week, the library will extend its opening hours to support students during the exam period. The new hours will be Monday to Friday: 7:00 AM to 2:00 AM, Saturday and Sunday: 9:00 AM to 12:00 AM. These extended hours will be in effect until the end of the exam period on June 20th. Study rooms can be booked online through the student portal.',
    },
    {
      id: '4',
      type: 'academic',
      title: 'Lecture Canceled',
      source: 'Computer Science Department',
      date: '3 days ago',
      summary: "Tomorrow's Algorithms lecture has been canceled.",
      content:
        "This is to inform all students that tomorrow's Algorithms lecture (CS401) has been canceled due to Dr. Brown's unexpected illness. The lecture will not be rescheduled, but additional notes will be provided on the course website. The assignment due date remains unchanged. Please check the course website for updates and additional reading materials to cover the topics that would have been discussed in class.",
    },
  ]

  // Filter alerts
  const filteredAlerts =
    activeFilter === 'all'
      ? alerts
      : alerts.filter((alert) => alert.type === activeFilter)

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'academic':
        return 'bg-navy-600'
      case 'event':
        return 'bg-maroon-600'
      case 'admin':
        return 'bg-navy-400'
      default:
        return 'bg-navy-500'
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-navy-900">Alerts &amp; Announcements</h1>
        <div className="relative">
          <div className="p-2.5 border-2 border-navy-300 rounded-full hover:bg-navy-50 transition-colors">
            <BellIcon className="h-5 w-5 text-navy-600" />
          </div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-maroon-600 rounded-full border-2 border-white"></div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex mb-6 border-2 border-navy-200 rounded-md overflow-hidden bg-white shadow-sm">
        <button
          className={`flex-1 py-3 text-center font-medium transition-colors ${activeFilter === 'all' ? 'bg-navy-600 text-white' : 'bg-white hover:bg-navy-50 text-navy-700'}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium transition-colors ${activeFilter === 'academic' ? 'bg-navy-600 text-white' : 'bg-white hover:bg-navy-50 text-navy-700'}`}
          onClick={() => setActiveFilter('academic')}
        >
          Academic
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium transition-colors ${activeFilter === 'event' ? 'bg-maroon-600 text-white' : 'bg-white hover:bg-navy-50 text-navy-700'}`}
          onClick={() => setActiveFilter('event')}
        >
          Events
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium transition-colors ${activeFilter === 'admin' ? 'bg-navy-400 text-white' : 'bg-white hover:bg-navy-50 text-navy-700'}`}
          onClick={() => setActiveFilter('admin')}
        >
          Admin
        </button>
      </div>

      {/* Alerts list */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`border-2 ${expandedAlert === alert.id ? 'border-navy-400' : 'border-navy-200'} rounded-md overflow-hidden bg-white shadow-sm transition-colors`}
          >
            {/* Alert header */}
            <div
              className="flex justify-between items-center p-5 cursor-pointer hover:bg-navy-50 transition-colors"
              onClick={() =>
                setExpandedAlert(expandedAlert === alert.id ? null : alert.id)
              }
            >
              <div className="flex items-start">
                <div
                  className={`w-3 h-3 mt-2 rounded-full mr-4 ${getAlertColor(alert.type)}`}
                ></div>
                <div>
                  <h3 className="font-medium text-navy-800">{alert.title}</h3>
                  <p className="text-xs text-navy-600 mt-1">
                    {alert.source} • {alert.date}
                  </p>
                  <p className="text-sm mt-1 text-navy-700">{alert.summary}</p>
                </div>
              </div>
              <ChevronRightIcon
                className={`h-5 w-5 text-navy-400 transition-transform ${expandedAlert === alert.id ? 'rotate-90' : ''}`}
              />
            </div>

            {/* Expanded content */}
            {expandedAlert === alert.id && (
              <div className="p-5 border-t-2 border-navy-200 bg-navy-25">
                <p className="text-sm text-navy-700">{alert.content}</p>
                <div className="mt-5 flex justify-end">
                  <button className="text-xs border-2 border-maroon-200 bg-maroon-50 rounded-md px-3 py-1.5 hover:bg-maroon-100 transition-colors text-maroon-700">
                    Mark as Read
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}