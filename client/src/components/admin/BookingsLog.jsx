import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'

const BookingsLog = () => {
  const [logs, setLogs] = useState([])
  const { eventId } = useParams()

  useEffect(() => {
    fetch(`http://localhost:5000/event/${eventId}`)
      .then(res => res.json())
      .then(data => setLogs(data))
  }, [eventId])

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/stream')

    eventSource.onmessage = (event) => {
      const newBooking = JSON.parse(event.data)
      if (newBooking.eventId === eventId) {
        setLogs(prev => [newBooking, ...prev])
      }
    }

    return () => {
      eventSource.close()
    }
  }, [eventId])

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-[#f1f5f9] px-6 py-12">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">Live Bookings for Event ID: {eventId}</h2>
        <div className="space-y-4">
          {logs.length > 0 ? logs.map(log => (
            <div key={log.bookingId} className="bg-white shadow rounded-lg p-4 border-l-4 border-purple-600">
              <p className="text-purple-700 font-semibold">Booking ID: {log.bookingId}</p>
              <p className="text-gray-700">User ID: {log.userId}</p>
              <p className="text-gray-700">Event ID: {log.eventId}</p>
              <p className="text-gray-500 text-sm">{new Date(log._id?.toString().substring(0, 8) * 1000).toLocaleString()}</p>
            </div>
          )) : (
            <p className="text-gray-600">No bookings yet for this event.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default BookingsLog
