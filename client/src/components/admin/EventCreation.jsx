import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axiosInstance from '../../axiosInstance';

const EventCreation = () => {
  const [formData, setFormData] = useState({
    name: '',
    seats: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    banner: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('seats', formData.seats);
    form.append('description', formData.description);
    form.append('date', formData.date);
    form.append('startTime', formData.startTime);
    form.append('endTime', formData.endTime);
    form.append('banner', formData.banner);

    try {
      const res = await axiosInstance.post('/events', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Event created successfully!');

      setFormData({
        name: '',
        seats: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        banner: null
      });

      document.getElementsByName('banner')[0].value = '';
      console.log('Event created:', res.data);

    } catch (err) {
      console.error('Error creating event:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-[#f5f7fa] px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-10">

          <h2 className="text-3xl font-extrabold text-[#0A2A43] mb-6">
            Create New Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-gray-700 mb-1 font-medium">Event Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF7A00] focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">Total Seats</label>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF7A00] focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 focus:ring-2 focus:ring-[#FF7A00] focus:outline-none transition"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF7A00] focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF7A00] focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF7A00] focus:outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">Banner Image</label>
              <input
                type="file"
                name="banner"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white 
                file:mr-4 file:py-2 file:px-4 
                file:rounded-lg file:border-0 
                file:bg-[#FF7A00]/10 file:text-[#FF7A00] 
                hover:file:bg-[#FF7A00]/20 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="bg-[#FF7A00] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#e96c00] transition text-lg"
            >
              Create Event
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default EventCreation;
