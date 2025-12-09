import React from 'react';
import AdminNavbar from './AdminNavbar';

const AdminHome = () => {
  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-[#f5f7fa] px-6 py-12">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-extrabold text-[#0A2A43] mb-2">
            Welcome, Admin
          </h1>

          <p className="text-gray-600 text-lg mb-10">
            Manage events, track bookings, and control your platform from here.
          </p>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-semibold text-[#0A2A43] mb-2">
                Create Event
              </h2>
              <p className="text-gray-600">
                Plan and publish new events for users to explore and join.
              </p>
              <a
                href="/admin/create-event"
                className="inline-block mt-5 text-[#FF7A00] font-semibold hover:opacity-80 transition-all"
              >
                Go →
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-semibold text-[#0A2A43] mb-2">
                View Bookings
              </h2>
              <p className="text-gray-600">
                Monitor all user bookings and confirmations in one place.
              </p>
              <a
                href="/admin/view-bookings"
                className="inline-block mt-5 text-[#FF7A00] font-semibold hover:opacity-80 transition-all"
              >
                Go →
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-semibold text-[#0A2A43] mb-2">
                Logout
              </h2>
              <p className="text-gray-600">
                Make sure to logout securely after your admin session.
              </p>
              <a
                href="/login"
                className="inline-block mt-5 text-[#FF7A00] font-semibold hover:opacity-80 transition-all"
              >
                Logout →
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
