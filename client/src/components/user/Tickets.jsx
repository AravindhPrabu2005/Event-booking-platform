import React, { useEffect, useState } from 'react';
import UserNavbar from './UserNavbar';
import axiosInstance from '../../axiosInstance';

const Tickets = () => {
  const userId = localStorage.getItem('id');
  const [tickets, setTickets] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchTickets();
      fetchEvents();
    }
  }, [userId]);

  const fetchTickets = async () => {
    try {
      const res = await axiosInstance.get(`/bookings/user/${userId}`);
      setTickets(res.data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get('/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const getEventDetails = (eventId) => {
    return events.find(e => e._id === eventId);
  };

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen bg-[#f5f7fa] px-6 py-12">
        <h2 className="text-3xl font-extrabold text-[#0A2A43] mb-8">My Tickets</h2>

        {tickets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {tickets.map(t => {
              const event = getEventDetails(t.eventId);

              return (
                <div
                  key={t.bookingId}
                  className="relative bg-white text-black border-4 border-dashed border-[#0A2A43] rounded-xl px-6 py-4 shadow-xl"
                >
                  {/* Ticket cutouts */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#f5f7fa] rounded-full -ml-3"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#f5f7fa] rounded-full -mr-3"></div>

                  <h3 className="text-lg font-bold text-[#0A2A43] mb-2">
                    🎟 Booking ID: {t.bookingId}
                  </h3>

                  <p className="text-gray-800">
                    🎫 Event: {event?.name || 'Loading...'}
                  </p>

                  <p className="text-gray-600 text-sm mt-1">
                    📅 {event?.date}
                  </p>

                  <p className="text-gray-600 text-sm mb-3">
                    ⏰ {event?.startTime} – {event?.endTime}
                  </p>

                  {event?.banner && (
                    <img
                      src={event.banner}
                      alt="Event Banner"
                      className="rounded-lg mb-4 w-full h-40 object-cover"
                    />
                  )}

                  <div className="border-t border-dashed border-[#0A2A43]/40 pt-3 mt-3 flex justify-end"></div>
                </div>
              );
            })}

          </div>
        ) : (
          <p className="text-gray-600">You have no tickets yet.</p>
        )}
      </div>
    </>
  );
};

export default Tickets;
