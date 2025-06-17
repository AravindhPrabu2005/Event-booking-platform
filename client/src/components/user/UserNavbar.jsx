import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserNavbar = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="relative">
      <nav className="bg-white shadow-md p-4 z-10 relative rounded-b-xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-700 transition duration-300 hover:scale-105">Event Booking</h1>
          <button className="md:hidden text-blue-700 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          <div className={`w-full md:w-auto md:flex items-center gap-6 mt-4 md:mt-0 transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden'}`}>
            <a href="/user/home" className="block text-gray-800 hover:text-blue-700 transition duration-300">Home</a>
            <a href="/user/events" className="block text-gray-800 hover:text-blue-700 transition duration-300">Browse Events</a>
            <a href="/user/tickets" className="block text-gray-800 hover:text-blue-700 transition duration-300">My Bookings</a>
            <button onClick={handleLogout} className="mt-2 md:mt-0 bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-300">Logout</button>
          </div>
        </div>
      </nav>

      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#ffffff" d="M0,0 C480,80 960,0 1440,80 L1440,0 L0,0 Z" />
      </svg>
    </div>
  )
}

export default UserNavbar
