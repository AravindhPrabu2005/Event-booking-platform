import React, { useState } from 'react'
import AdminNavbar from './AdminNavbar'

const EventCreation = () => {
     const [formData, setFormData] = useState({
          name: '',
          seats: '',
          description: '',
          date: '',
          startTime: '',
          endTime: '',
          banner: null
     })

     const handleChange = (e) => {
          const { name, value, files } = e.target
          setFormData((prev) => ({
               ...prev,
               [name]: files ? files[0] : value
          }))
     }

     const handleSubmit = async (e) => {
          e.preventDefault()

          const form = new FormData()
          form.append('name', formData.name)
          form.append('seats', formData.seats)
          form.append('description', formData.description)
          form.append('date', formData.date)
          form.append('startTime', formData.startTime)
          form.append('endTime', formData.endTime)
          form.append('banner', formData.banner)

          try {
               const res = await fetch('http://127.0.0.1:8000/api/events', {
                    method: 'POST',
                    body: form
               })
               const data = await res.json()
               alert('Event created successfully!')
               setFormData({
                    name: '',
                    seats: '',
                    description: '',
                    date: '',
                    startTime: '',
                    endTime: '',
                    banner: null
               })
               document.getElementsByName('banner')[0].value = ''
               console.log('Event created:', data)
          } catch (err) {
               console.error('Error creating event:', err)
               alert('Something went wrong. Please try again.')
          }
     }

     return (
          <>
               <AdminNavbar />
               <div className="min-h-screen bg-[#f1f5f9] px-6 py-12">
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
                         <h2 className="text-2xl font-bold text-purple-700 mb-6">Create Event</h2>
                         <form onSubmit={handleSubmit} className="space-y-6">
                              <div>
                                   <label className="block text-gray-700 mb-1">Event Name</label>
                                   <input type="text" name="name" value={formData.name} onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                              </div>

                              <div>
                                   <label className="block text-gray-700 mb-1">Total Seats</label>
                                   <input type="number" name="seats" value={formData.seats} onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                              </div>

                              <div>
                                   <label className="block text-gray-700 mb-1">Description</label>
                                   <textarea name="description" value={formData.description} onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 h-28 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                              </div>

                              <div className="grid md:grid-cols-3 gap-4">
                                   <div>
                                        <label className="block text-gray-700 mb-1">Date</label>
                                        <input type="date" name="date" value={formData.date} onChange={handleChange}
                                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                                   </div>

                                   <div>
                                        <label className="block text-gray-700 mb-1">Start Time</label>
                                        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange}
                                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                                   </div>

                                   <div>
                                        <label className="block text-gray-700 mb-1">End Time</label>
                                        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange}
                                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                                   </div>
                              </div>

                              <div>
                                   <label className="block text-gray-700 mb-1">Banner</label>
                                   <input type="file" name="banner" accept="image/*" onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200" />
                              </div>

                              <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
                                   Create Event
                              </button>
                         </form>
                    </div>
               </div>
          </>
     )
}

export default EventCreation
