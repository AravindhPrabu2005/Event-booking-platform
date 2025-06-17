import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'

const Bookings = () => {
  const [events, setEvents] = useState([])
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    fetchEvents()
    fetchBookings()
  }, [])

  const fetchEvents = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/events')
      const data = await res.json()
      setEvents(data)
    } catch (err) {
      console.error('Error fetching events:', err)
    }
  }

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/all')
      const data = await res.json()
      setBookings(data)
    } catch (err) {
      console.error('Error fetching bookings:', err)
    }
  }

  const getBookingCount = (eventId) => {
    return bookings.filter(b => b.eventId === eventId).length
  }

  const handleDelete = async (eventId) => {
    const confirm = window.confirm('Are you sure you want to delete this event?')
    if (!confirm) return

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/events/${eventId}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        setEvents(events.filter(e => e._id !== eventId))
        alert('Event deleted successfully')
      } else {
        alert('Failed to delete event')
      }
    } catch (err) {
      console.error('Error deleting event:', err)
    }
  }

  const handleViewParticipants = (eventId) => {
    window.location.href = `/admin/view-bookings/${eventId}`
  }

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-[#f1f5f9] px-6 py-12">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">Your Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => {
            const booked = getBookingCount(event._id)
            const remaining = event.seats - booked
            return (
              <div key={event._id} className="bg-white rounded-xl shadow-md p-4 flex flex-col">
                <img src={event.banner} alt={event.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-purple-700 mb-2">{event.name}</h3>
                <p className="text-gray-600 mb-1">📅 {event.date}</p>
                <p className="text-gray-600 mb-1">🕒 {event.startTime} - {event.endTime}</p>
                <p className="text-gray-700 mb-1">🎟️ Total: {event.seats}</p>
                <p className="text-green-600 mb-1">✅ Booked: {booked}</p>
                <p className="text-red-600 mb-4">❌ Remaining: {remaining}</p>
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => handleViewParticipants(event._id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    View Participants
                  </button>
                  <button onClick={() => handleDelete(event._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Bookings
