import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import axiosInstance from '../../axiosInstance';

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get('/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const handleBook = async (eventId) => {
    const userId = localStorage.getItem('id');

    if (!userId) {
      alert('Please login first');
      return;
    }

    try {
      await axiosInstance.post('/bookings/book', {
        userId,
        eventId
      });
      alert('Booking Successful!');
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Booking failed.');
    }
  };

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen bg-[#f5f7fa] px-6 py-12">
        <h2 className="text-3xl font-extrabold text-[#0A2A43] mb-8">Available Events</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col transition hover:shadow-xl duration-300"
            >
              <img
                src={event.banner}
                alt={event.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />

              <h3 className="text-xl font-bold text-[#0A2A43] mb-2">{event.name}</h3>

              <p className="text-gray-700">📅 {event.date}</p>
              <p className="text-gray-700">🕒 {event.startTime} - {event.endTime}</p>
              <p className="text-gray-700">🪑 Seats: {event.seats}</p>

              <p className="text-gray-600 mt-3 mb-6 leading-relaxed">
                {event.description}
              </p>

              <button
                onClick={() => handleBook(event._id)}
                className="mt-auto bg-[#FF7A00] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#e96c00] transition"
              >
                Attend
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
