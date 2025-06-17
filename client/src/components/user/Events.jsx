import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserNavbar from './UserNavbar'

const Events = () => {
     const [events, setEvents] = useState([])
     const navigate = useNavigate()

     useEffect(() => {
          fetchEvents()
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

     const handleBook = async (eventId) => {
     const userId = localStorage.getItem('id')
     console.log('Booking with userId:', userId) // <- Add this

     if (!userId) {
          alert('Please login first')
          return
     }

     try {
          const res = await fetch('http://127.0.0.1:5000/api/book', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ userId, eventId })
          })

          if (!res.ok) {
               const text = await res.text()
               throw new Error(`Server responded with ${res.status}: ${text}`)
          }

          const data = await res.json()
          alert('Booking Successful!')
     } catch (err) {
          console.error('Booking failed:', err)
          alert('Booking failed.')
     }
}



     return (
          <>
               <UserNavbar />
               <div className="min-h-screen bg-[#f1f5f9] px-6 py-12">
                    <h2 className="text-2xl font-bold text-purple-700 mb-6">Available Events</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {events.map((event) => (
                              <div key={event._id} className="bg-white rounded-xl shadow-md p-4 flex flex-col">
                                   <img src={event.banner} alt={event.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                                   <h3 className="text-xl font-semibold text-purple-700 mb-2">{event.name}</h3>
                                   <p className="text-gray-700 mb-1">📅 {event.date}</p>
                                   <p className="text-gray-700 mb-1">🕒 {event.startTime} - {event.endTime}</p>
                                   <p className="text-gray-700 mb-1">🪑 Seats: {event.seats}</p>
                                   <p className="text-gray-600 mb-4">{event.description}</p>
                                   <button onClick={() => handleBook(event._id)} className="mt-auto bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
                                        attend
                                   </button>
                              </div>
                         ))}
                    </div>
               </div>
          </>
     )
}

export default Events
