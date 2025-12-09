import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        <div className="flex items-center gap-3">
          <img src="/logoCrop.png" alt="logo" className="h-10" />
          <h1 className="text-2xl font-extrabold text-[#0A2A43]">
            KootamX Admin
          </h1>
        </div>

        <button
          className="md:hidden text-3xl text-[#0A2A43]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div
          className={`flex-col md:flex-row md:flex items-center gap-8 absolute md:static left-0 w-full md:w-auto bg-white md:bg-transparent px-8 md:px-0 py-6 md:py-0 shadow-md md:shadow-none transition-all duration-300 ${
            menuOpen ? 'top-16 opacity-100' : 'top-[-300px] opacity-0 md:opacity-100'
          }`}
        >
          <a
            href="/admin/home"
            className="text-[#0A2A43] font-medium hover:text-[#FF7A00] transition"
          >
            Home
          </a>

          <a
            href="/admin/create-event"
            className="text-[#0A2A43] font-medium hover:text-[#FF7A00] transition"
          >
            Create Event
          </a>

          <a
            href="/admin/manage-bookings"
            className="text-[#0A2A43] font-medium hover:text-[#FF7A00] transition"
          >
            Manage Bookings
          </a>

          <button
            onClick={handleLogout}
            className="bg-[#FF7A00] text-white font-semibold px-5 py-2 rounded-lg hover:bg-[#e96c00] transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
