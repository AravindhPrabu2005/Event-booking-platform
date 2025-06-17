import React from 'react'
import AdminNavbar from './AdminNavbar'

const AdminHome = () => {
  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-[#f1f5f9] px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">Welcome Admin!</h1>
          <p className="text-gray-600 text-lg mb-10">Manage events and bookings from here.</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-50 rounded-xl shadow p-6 transition hover:shadow-lg duration-300">
              <h2 className="text-xl font-semibold text-purple-700 mb-2">Create Event</h2>
              <p className="text-gray-700">Plan and publish new events for users to explore and book.</p>
              <a href="/admin/create-event" className="inline-block mt-4 text-purple-600 hover:text-purple-800 font-medium transition duration-200">Go →</a>
            </div>

            <div className="bg-indigo-50 rounded-xl shadow p-6 transition hover:shadow-lg duration-300">
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">View Bookings</h2>
              <p className="text-gray-700">Monitor all user bookings and confirmations in one place.</p>
              <a href="/admin/view-bookings" className="inline-block mt-4 text-indigo-600 hover:text-indigo-800 font-medium transition duration-200">Go →</a>
            </div>

            <div className="bg-rose-50 rounded-xl shadow p-6 transition hover:shadow-lg duration-300">
              <h2 className="text-xl font-semibold text-rose-700 mb-2">Logout</h2>
              <p className="text-gray-700">Make sure to logout securely after your admin session.</p>
              <a href="/login" className="inline-block mt-4 text-rose-600 hover:text-rose-800 font-medium transition duration-200">Logout →</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminHome
