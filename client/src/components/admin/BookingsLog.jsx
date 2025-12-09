import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import axiosInstance from '../../axiosInstance';

const BookingsLog = () => {
  const [logs, setLogs] = useState([]);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axiosInstance.get(`/bookings/event/${eventId}`);
        setLogs(res.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };
    fetchLogs();
  }, [eventId]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:7000/api/bookings/stream');

    eventSource.onmessage = (event) => {
      const newBooking = JSON.parse(event.data);
      if (newBooking.eventId === eventId) {
        setLogs((prev) => [newBooking, ...prev]);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [eventId]);

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-[#f5f7fa] px-6 py-12">
        <h2 className="text-3xl font-extrabold text-[#0A2A43] mb-8">
          Live Bookings for Event: {eventId}
        </h2>

        <div className="space-y-5">
          {logs.length > 0 ? (
            logs.map((log) => (
              <div
                key={log.bookingId}
                className="bg-white shadow-lg rounded-xl border-l-4 border-[#FF7A00] p-6"
              >
                <p className="text-[#0A2A43] font-bold text-lg">
                  Booking ID: {log.bookingId}
                </p>

                <div className="mt-2">
                  <p className="text-gray-700">User ID: {log.userId}</p>
                  <p className="text-gray-700">Event ID: {log.eventId}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg">No bookings yet for this event.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingsLog;
