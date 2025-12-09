import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axiosInstance from '../../axiosInstance';

const Bookings = () => {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchBookings();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get('/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get('/bookings/all');
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const getBookingCount = (eventId) => {
    return bookings.filter((b) => b.eventId === eventId).length;
  };

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/events/${eventId}`);
      setEvents(events.filter((e) => e._id !== eventId));
      alert('Event deleted successfully');
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Failed to delete event');
    }
  };

  const handleViewParticipants = (eventId) => {
    window.location.href = `/admin/view-bookings/${eventId}`;
  };

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-[#f5f7fa] px-6 py-12">
        <h2 className="text-3xl font-extrabold text-[#0A2A43] mb-8">Your Events</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => {
            const booked = getBookingCount(event._id);
            const remaining = event.seats - booked;

            return (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col"
              >
                <img
                  src={event.banner}
                  alt={event.name}
                  className="w-full h-44 object-cover"
                />

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-[#0A2A43] mb-2">{event.name}</h3>

                  <div className="text-gray-600 space-y-1 mb-3">
                    <p>📅 {event.date}</p>
                    <p>🕒 {event.startTime} - {event.endTime}</p>
                  </div>

                  <div className="space-y-1 mb-6">
                    <p className="text-gray-700">🎟️ Total Seats: {event.seats}</p>
                    <p className="text-green-600 font-medium">Booked: {booked}</p>
                    <p className="text-red-600 font-medium">Remaining: {remaining}</p>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => handleViewParticipants(event._id)}
                      className="flex-1 bg-[#0A2A43] text-white py-2 rounded-lg font-semibold hover:bg-[#081f30] transition"
                    >
                      Participants
                    </button>

                    <button
                      onClick={() => handleDelete(event._id)}
                      className="flex-1 bg-[#FF0000] text-white py-2 rounded-lg font-semibold hover:bg-[#e96c00] transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Bookings;
