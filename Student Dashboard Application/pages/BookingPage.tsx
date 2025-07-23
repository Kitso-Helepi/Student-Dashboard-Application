import React, { useState } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
  SearchIcon,
  CalendarIcon,
} from 'lucide-react'
import { BookingConfirmationModal } from '../modals/BookingConfirmationModal'

export function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  // Mock data
  const locations = [
    {
      id: '1',
      name: 'Study Room A',
      capacity: 4,
      features: ['Whiteboard', 'Power outlets'],
    },
    {
      id: '2',
      name: 'Lecture Hall B',
      capacity: 120,
      features: ['Projector', 'Audio system'],
    },
    {
      id: '3',
      name: 'Computer Lab C',
      capacity: 30,
      features: ['24 PCs', 'Printing station'],
    },
    {
      id: '4',
      name: 'Group Study Room D',
      capacity: 8,
      features: ['TV Screen', 'Whiteboard'],
    },
  ]

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

  // Mock availability - in a real app this would come from an API
  const getAvailability = (roomId: string, timeSlot: string) => {
    // Random availability for demo purposes
    const rand = Math.random()
    if (rand < 0.7) return 'available'
    return 'booked'
  }

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
  }

  // Handle date navigation
  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + days)
    setSelectedDate(newDate)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold text-navy-900">Room Booking System</h1>
        <div className="flex gap-2">
          <div className="relative flex-1 md:flex-none">
            <input
              type="text"
              placeholder="Search locations..."
              className="pl-10 pr-4 py-2 w-full md:w-64 border-2 border-navy-200 rounded-md focus:outline-none focus:border-navy-500 bg-white"
            />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-navy-400" />
          </div>
          <button className="p-2 border-2 border-navy-200 rounded-md hover:bg-navy-50 focus:outline-none focus:border-navy-500">
            <FilterIcon className="h-5 w-5 text-navy-600" />
          </button>
        </div>
      </div>

      {/* Date selector */}
      <div className="flex items-center justify-between mb-6 border-2 border-navy-200 rounded-md p-5 bg-white shadow-sm">
        <button
          className="p-2 border-2 border-navy-200 rounded-md hover:bg-navy-50 focus:outline-none focus:border-navy-500"
          onClick={() => changeDate(-1)}
        >
          <ChevronLeftIcon className="h-5 w-5 text-navy-600" />
        </button>
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-3 text-navy-600" />
          <span className="font-medium text-navy-800">
            {formatDate(selectedDate)}
          </span>
        </div>
        <button
          className="p-2 border-2 border-navy-200 rounded-md hover:bg-navy-50 focus:outline-none focus:border-navy-500"
          onClick={() => changeDate(1)}
        >
          <ChevronRightIcon className="h-5 w-5 text-navy-600" />
        </button>
      </div>

      {/* Booking grid */}
      <div className="border-2 border-navy-200 rounded-md overflow-hidden bg-white shadow-sm">
        {/* Header row */}
        <div className="grid grid-cols-[200px_1fr] border-b-2 border-navy-200">
          <div className="p-4 font-medium bg-navy-100 border-r-2 border-navy-200 text-navy-800">
            Location
          </div>
          <div className="grid grid-cols-9 bg-navy-100">
            {timeSlots.map((slot) => (
              <div
                key={slot}
                className="p-3 text-center text-sm border-r border-navy-200 text-navy-700"
              >
                {slot}
              </div>
            ))}
          </div>
        </div>

        {/* Location rows */}
        {locations.map((location) => (
          <div
            key={location.id}
            className={`grid grid-cols-[200px_1fr] border-b border-navy-200 ${selectedRoom === location.id ? 'bg-navy-50' : ''}`}
          >
            <div
              className="p-4 border-r-2 border-navy-200 hover:bg-navy-50 cursor-pointer"
              onClick={() =>
                setSelectedRoom(
                  location.id === selectedRoom ? null : location.id,
                )
              }
            >
              <div className="font-medium text-navy-800">{location.name}</div>
              <div className="text-xs text-navy-600 mt-1">
                Capacity: {location.capacity}
              </div>
              <div className="text-xs text-navy-600">
                {location.features.join(', ')}
              </div>
            </div>
            <div className="grid grid-cols-9">
              {timeSlots.map((slot) => {
                const availability = getAvailability(location.id, slot)
                const isSelected =
                  selectedRoom === location.id && selectedTimeSlot === slot
                return (
                  <div
                    key={`${location.id}-${slot}`}
                    className={`
                      border-r border-navy-200 p-4 flex items-center justify-center cursor-pointer transition-colors
                      ${availability === 'available' ? 'hover:bg-navy-50' : 'bg-gray-100 cursor-not-allowed'}
                      ${isSelected ? 'bg-maroon-100 border-2 border-maroon-400' : ''}
                    `}
                    onClick={() => {
                      if (availability === 'available') {
                        setSelectedRoom(location.id)
                        setSelectedTimeSlot(slot)
                      }
                    }}
                  >
                    <div
                      className={`
                      w-5 h-5 rounded-full transition-colors
                      ${availability === 'available' ? 'border-2 border-navy-400' : 'bg-gray-400'}
                      ${isSelected ? 'bg-maroon-600 border-0' : ''}
                    `}
                    ></div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Booking action */}
      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center text-sm">
          <div className="flex items-center mr-5">
            <div className="w-4 h-4 rounded-full border-2 border-navy-400 mr-2"></div>
            <span className="text-navy-700">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-gray-400 mr-2"></div>
            <span className="text-navy-700">Booked</span>
          </div>
        </div>
        <button
          className={`px-5 py-2.5 border-2 rounded-md font-medium transition-colors ${
            !selectedRoom || !selectedTimeSlot 
              ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'border-maroon-600 bg-maroon-600 text-white hover:bg-maroon-700'
          }`}
          disabled={!selectedRoom || !selectedTimeSlot}
          onClick={() => setShowConfirmationModal(true)}
        >
          Book Now
        </button>
      </div>

      {/* Confirmation modal */}
      {showConfirmationModal && selectedRoom && selectedTimeSlot && (
        <BookingConfirmationModal
          isOpen={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          roomName={locations.find((l) => l.id === selectedRoom)?.name || ''}
          date={selectedDate}
          timeSlot={selectedTimeSlot}
        />
      )}
    </div>
  )
}