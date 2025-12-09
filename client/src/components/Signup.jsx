import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/auth/signup`, {
        email: formData.email,
        password: formData.password
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-10 rounded-3xl shadow-xl border border-gray-200 bg-white">
        
        <h2 className="text-3xl font-extrabold text-center text-[#0A2A43] mb-2">
          Create Your Account
        </h2>
        
        <p className="text-center text-gray-500 mb-8 text-sm">
          Join KootamX and start booking public events instantly.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A00] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A00] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A00] focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-[#FF7A00] rounded-lg font-semibold hover:bg-[#e96c00] transition-all text-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account? 
          <a href="/login" className="text-[#0A2A43] font-semibold hover:underline ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
