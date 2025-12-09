import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('role', response.data.role);

      if (response.data.role === 'admin') {
        window.location.href = '/admin/home';
      } else {
        window.location.href = '/user/home';
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-10 rounded-3xl shadow-xl border border-gray-200 bg-white">

        <h2 className="text-3xl font-extrabold text-center text-[#0A2A43] mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-8 text-sm">
          Login to continue your journey with KootamX.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>

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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A00] focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-[#FF7A00] rounded-lg font-semibold hover:bg-[#e96c00] transition-all text-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?
          <a href="/signup" className="text-[#0A2A43] font-semibold hover:underline ml-1">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
