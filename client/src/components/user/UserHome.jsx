import React from 'react';
import UserNavbar from './UserNavbar';

const UserHome = () => {
  return (
    <>
      <UserNavbar />

      <div className="min-h-screen bg-[#f5f7fa] px-6 py-12">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-extrabold text-[#0A2A43] mb-2">
            Welcome back!
          </h1>

          <p className="text-gray-600 text-lg mb-10">
            Here’s what’s happening around you today.
          </p>

          <div className="grid md:grid-cols-2 gap-10">

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 transition hover:shadow-xl duration-300">
              <h2 className="text-xl font-bold text-[#0A2A43] mb-4">
                Upcoming Events
              </h2>

              <ul className="space-y-4">
                <li className="text-gray-800">🎤 Music Fiesta – Jun 21, 7 PM</li>
                <li className="text-gray-800">🎬 Short Film Screening – Jun 23, 4 PM</li>
                <li className="text-gray-800">🎨 Art & Craft Fair – Jun 25, 11 AM</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 transition hover:shadow-xl duration-300">
              <h2 className="text-xl font-bold text-[#0A2A43] mb-4">
                Your Bookings
              </h2>

              <ul className="space-y-4">
                <li className="text-green-600 font-medium">✅ TEDx Coimbatore – Confirmed</li>
                <li className="text-yellow-600 font-medium">⏳ Startup Meetup 2025 – Pending</li>
                <li className="text-green-600 font-medium">✅ TechExpo Pass – Confirmed</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 transition hover:shadow-xl duration-300">
            <h2 className="text-xl font-bold text-[#0A2A43] mb-3">
              Tips for Better Booking
            </h2>

            <p className="text-gray-700 leading-relaxed">
              Book early to secure your seats. Most events close registration 24 hours in advance. 
              Keep your booking confirmation ready during entry. Enjoy your events with KootamX.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default UserHome;
