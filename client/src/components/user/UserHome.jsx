import React from 'react'
import UserNavbar from './UserNavbar'

const UserHome = () => {
  return (
    <>
      <UserNavbar />
      <div className="min-h-screen bg-[#f1f5f9] px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome back!</h1>
          <p className="text-gray-600 text-lg mb-10">Here’s what’s happening around you today.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl shadow p-6 transition hover:shadow-lg duration-300">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">Upcoming Events</h2>
              <ul className="space-y-3">
                <li className="text-gray-800">🎤 Music Fiesta – Jun 21, 7 PM</li>
                <li className="text-gray-800">🎬 Short Film Screening – Jun 23, 4 PM</li>
                <li className="text-gray-800">🎨 Art & Craft Fair – Jun 25, 11 AM</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl shadow p-6 transition hover:shadow-lg duration-300">
              <h2 className="text-xl font-semibold text-green-700 mb-2">Your Bookings</h2>
              <ul className="space-y-3">
                <li className="text-gray-800">✅ TEDx Coimbatore – Confirmed</li>
                <li className="text-gray-800">⏳ Startup Meetup 2025 – Pending</li>
                <li className="text-gray-800">✅ TechExpo Pass – Confirmed</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-yellow-50 rounded-xl shadow p-6 transition hover:shadow-lg duration-300">
            <h2 className="text-xl font-semibold text-yellow-700 mb-2">Tips for Better Booking</h2>
            <p className="text-gray-700">
              Book early to secure your seats. Most events close registration 24 hours in advance. Keep your booking confirmation ready during entry.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserHome
