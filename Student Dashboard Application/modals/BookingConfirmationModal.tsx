import React from 'react'
import { Dialog } from '../components/Dialog'
import { CalendarIcon, ClockIcon, MapPinIcon, CheckIcon } from 'lucide-react'

interface BookingConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  roomName: string
  date: Date
  timeSlot: string
}

export function BookingConfirmationModal({
  isOpen,
  onClose,
  roomName,
  date,
  timeSlot,
}: BookingConfirmationModalProps) {
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Booking Confirmation">
      <div className="space-y-5">
        {/* Booking details */}
        <div className="border-2 border-dashed border-gray-300 rounded-md p-5 bg-gray-50">
          <div className="flex items-start mb-4">
            <div className="p-3 border-2 border-gray-300 rounded-md mr-4 bg-white">
              <MapPinIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">{roomName}</h3>
              <p className="text-sm text-gray-500 mt-1">Room Booking</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-sm">{formatDate(date)}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-sm">{timeSlot}</span>
            </div>
          </div>
        </div>

        {/* Booking purpose */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Booking purpose:
          </label>
          <select className="w-full border-2 border-gray-300 rounded-md p-2.5 bg-white focus:outline-none focus:border-gray-500">
            <option>Study Session</option>
            <option>Group Project</option>
            <option>Meeting</option>
            <option>Other</option>
          </select>
        </div>

        {/* Additional notes */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Additional notes (optional):
          </label>
          <textarea
            className="w-full border-2 border-gray-300 rounded-md p-2.5 h-24 focus:outline-none focus:border-gray-500"
            placeholder="Add any special requirements or notes..."
          ></textarea>
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
            className="px-4 py-2.5 border-2 border-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium flex items-center"
            onClick={onClose}
          >
            <CheckIcon className="h-4 w-4 mr-2" />
            Confirm Booking
          </button>
        </div>
      </div>
    </Dialog>
  )
}