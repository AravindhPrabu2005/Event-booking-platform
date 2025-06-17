import React, { useEffect, useState } from 'react'
import UserNavbar from './UserNavbar'

const Tickets = () => {
  const userId = localStorage.getItem('id')
  const [tickets, setTickets] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (userId) {
      fetchTickets()
      fetchEvents()
    }
  }, [userId])

  const fetchTickets = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/${userId}`)
      const data = await res.json()
      setTickets(data)
    } catch (err) {
      console.error('Error fetching tickets:', err)
    }
  }

  const fetchEvents = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/events')
      const data = await res.json()
      setEvents(data)
    } catch (err) {
      console.error('Error fetching events:', err)
    }
  }

  const getEventDetails = (eventId) => {
    return events.find(e => e._id === eventId)
  }

  return (
    <>
      <UserNavbar />
      <div className="min-h-screen bg-[#f1f5f9] px-6 py-12">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">My Tickets</h2>
        {tickets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map(t => {
              const event = getEventDetails(t.eventId)
              return (
                <div key={t.bookingId} className="relative bg-white text-black border-4 border-dashed border-purple-500 rounded-lg px-6 py-4 shadow-lg">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#f1f5f9] rounded-full -ml-3"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#f1f5f9] rounded-full -mr-3"></div>
                  <h3 className="text-lg font-bold mb-1">🎟 Booking ID: {t.bookingId}</h3>
                  <p className="text-gray-700 mb-1">🎫 Event: {event?.name || 'Loading...'}</p>
                  <p className="text-gray-600 text-sm mb-1">📅 {event?.date}</p>
                  <p className="text-gray-600 text-sm mb-3">⏰ {event?.startTime} - {event?.endTime}</p>
                  {event?.banner && (
                    <img src={event.banner} alt="Event Banner" className="rounded-md mb-3 w-full h-40 object-cover" />
                  )}
                  <div className="border-t border-dashed border-purple-300 mt-4 pt-3 flex justify-end">
                    {/* <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
                      View Ticket
                    </button> */}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-gray-600 mt-4">You have no tickets yet.</p>
        )}
      </div>
    </>
  )
}

export default Tickets
