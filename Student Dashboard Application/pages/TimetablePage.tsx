import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from 'lucide-react'

export function TimetablePage() {
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week')
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date())

  // Mock data
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ]

  const classes = [
    {
      id: 1,
      day: 'Monday',
      start: '9:00 AM',
      end: '11:00 AM',
      subject: 'Introduction to Computer Science',
      room: 'Room 101',
      lecturer: 'Dr. Smith',
    },
    {
      id: 2,
      day: 'Monday',
      start: '1:00 PM',
      end: '3:00 PM',
      subject: 'Database Systems',
      room: 'Lab B',
      lecturer: 'Prof. Johnson',
    },
    {
      id: 3,
      day: 'Tuesday',
      start: '10:00 AM',
      end: '12:00 PM',
      subject: 'Web Development',
      room: 'Room 203',
      lecturer: 'Ms. Williams',
    },
    {
      id: 4,
      day: 'Wednesday',
      start: '2:00 PM',
      end: '4:00 PM',
      subject: 'Algorithms',
      room: 'Room 105',
      lecturer: 'Dr. Brown',
    },
    {
      id: 5,
      day: 'Thursday',
      start: '9:00 AM',
      end: '10:00 AM',
      subject: 'Professional Ethics',
      room: 'Lecture Hall A',
      lecturer: 'Prof. Davis',
    },
    {
      id: 6,
      day: 'Friday',
      start: '1:00 PM',
      end: '5:00 PM',
      subject: 'Software Engineering Project',
      room: 'Lab C',
      lecturer: 'Dr. Wilson',
    },
  ]

  // Helper function to determine if a class is scheduled for a specific day and time
  const getClassForDayAndTime = (day: string, time: string) => {
    return classes.find(
      (cls) =>
        cls.day === day &&
        (cls.start === time ||
          (timeSlots.indexOf(cls.start) < timeSlots.indexOf(time) &&
            timeSlots.indexOf(cls.end) > timeSlots.indexOf(time))),
    )
  }

  // Format week range for display
  const formatWeekRange = () => {
    const startOfWeek = new Date(currentWeek)
    // Adjust to Monday (assuming Monday is the first day of week)
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 1)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 4) // Friday

    const startMonth = startOfWeek.toLocaleDateString('en-US', {
      month: 'short',
    })
    const endMonth = endOfWeek.toLocaleDateString('en-US', {
      month: 'short',
    })
    const startDay = startOfWeek.getDate()
    const endDay = endOfWeek.getDate()

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}`
    }
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`
  }

  // Navigate weeks
  const changeWeek = (weeks: number) => {
    const newDate = new Date(currentWeek)
    newDate.setDate(currentWeek.getDate() + weeks * 7)
    setCurrentWeek(newDate)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold text-navy-900">Timetable</h1>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex border-2 border-navy-200 rounded-md overflow-hidden">
            <button
              className={`px-4 py-2 transition-colors ${viewMode === 'week' ? 'bg-navy-600 text-white' : 'bg-white hover:bg-navy-50 text-navy-700'}`}
              onClick={() => setViewMode('week')}
            >
              Week View
            </button>
            <button
              className={`px-4 py-2 transition-colors ${viewMode === 'day' ? 'bg-navy-600 text-white' : 'bg-white hover:bg-navy-50 text-navy-700'}`}
              onClick={() => setViewMode('day')}
            >
              Day View
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sync-calendar"
              className="w-4 h-4 mr-2 text-maroon-600 border-navy-300 rounded focus:ring-maroon-500"
            />
            <label htmlFor="sync-calendar" className="text-sm text-navy-700">
              Sync with Calendar
            </label>
          </div>
        </div>
      </div>

      {/* Week selector */}
      <div className="flex items-center justify-between mb-6 border-2 border-navy-200 rounded-md p-5 bg-white shadow-sm">
        <button
          className="p-2 border-2 border-navy-200 rounded-md hover:bg-navy-50 focus:outline-none focus:border-navy-500"
          onClick={() => changeWeek(-1)}
        >
          <ChevronLeftIcon className="h-5 w-5 text-navy-600" />
        </button>
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-3 text-navy-600" />
          <span className="font-medium text-navy-800">{formatWeekRange()}</span>
        </div>
        <button
          className="p-2 border-2 border-navy-200 rounded-md hover:bg-navy-50 focus:outline-none focus:border-navy-500"
          onClick={() => changeWeek(1)}
        >
          <ChevronRightIcon className="h-5 w-5 text-navy-600" />
        </button>
      </div>

      {/* Timetable grid - Week View */}
      {viewMode === 'week' && (
        <div className="border-2 border-navy-200 rounded-md overflow-hidden bg-white shadow-sm">
          {/* Header row with days */}
          <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr] border-b-2 border-navy-200">
            <div className="p-4 font-medium bg-navy-100 border-r-2 border-navy-200 text-navy-800"></div>
            {weekDays.map((day) => (
              <div
                key={day}
                className="p-4 text-center font-medium bg-navy-100 border-r border-navy-200 text-navy-700"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Time slots */}
          {timeSlots.map((time) => (
            <div
              key={time}
              className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr] border-b border-navy-200"
            >
              <div className="p-3 text-sm border-r-2 border-navy-200 bg-navy-50 font-medium text-navy-700">
                {time}
              </div>
              {weekDays.map((day) => {
                const classInfo = getClassForDayAndTime(day, time)
                const isClassStart = classInfo && classInfo.start === time
                return (
                  <div
                    key={`${day}-${time}`}
                    className={`border-r border-navy-200 p-3 ${classInfo ? (isClassStart ? 'border-2 border-maroon-400 bg-maroon-50' : 'bg-maroon-25 border-dashed border-2 border-maroon-200') : ''}`}
                  >
                    {isClassStart && (
                      <div className="text-xs">
                        <div className="font-medium text-maroon-800">
                          {classInfo.subject}
                        </div>
                        <div className="mt-1 text-navy-600">{classInfo.room}</div>
                        <div className="text-navy-500">
                          {classInfo.lecturer}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}

      {/* Timetable - Day View */}
      {viewMode === 'day' && (
        <div className="border-2 border-navy-200 rounded-md overflow-hidden bg-white shadow-sm">
          {/* Day selector */}
          <div className="flex border-b-2 border-navy-200">
            {weekDays.map((day) => (
              <button
                key={day}
                className="flex-1 py-3 text-center font-medium border-b-2 border-transparent hover:bg-navy-50 transition-colors text-navy-700 hover:text-navy-800"
              >
                {day}
              </button>
            ))}
          </div>

          {/* Classes for selected day */}
          <div className="p-5 space-y-4">
            {classes
              .filter((cls) => cls.day === 'Monday') // Default to Monday for wireframe
              .map((cls) => (
                <div
                  key={cls.id}
                  className="p-5 border-2 border-navy-200 rounded-md hover:bg-navy-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-navy-800">
                        {cls.subject}
                      </h3>
                      <p className="text-sm mt-1 text-navy-600">
                        {cls.start} - {cls.end}
                      </p>
                      <p className="text-sm text-navy-600">{cls.room}</p>
                      <p className="text-sm text-navy-500">{cls.lecturer}</p>
                    </div>
                    <div className="p-3 border-2 border-maroon-200 rounded-md bg-maroon-50">
                      <span className="text-xs text-maroon-700">Tap for details</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}