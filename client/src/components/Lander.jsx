import React from "react";
import { useNavigate } from "react-router-dom";

export default function Lander() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white">

      <div className="w-full flex justify-between items-center px-10 py-6 shadow-sm">
        
        <div className="flex items-center gap-3">
          <img 
            src="/logoCrop.png"
            alt="KootamX Logo"
            className="h-12"
          />
          <h1 className="text-3xl font-extrabold text-black">
            KootamX
          </h1>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-lg text-white bg-[#FF7A00] font-semibold hover:bg-[#e76c00] transition-all"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/user/signup")}
            className="px-6 py-2 rounded-lg text-[#0A2A43] border border-[#0A2A43] font-semibold hover:bg-[#0A2A43] hover:text-white transition-all"
          >
            Signup as User
          </button>

          <button
            onClick={() => navigate("/admin/signup")}
            className="px-6 py-2 rounded-lg text-[#0A2A43] border border-[#0A2A43] font-semibold hover:bg-[#0A2A43] hover:text-white transition-all"
          >
            Signup as Admin
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between px-10 lg:px-24 mt-20">

        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold text-[#0A2A43] leading-snug mb-4">
            Welcome to <span className="text-[#FF7A00]">KootamX</span>
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            Discover, join, and book public events easily — anytime, anywhere.
          </p>

          <div className="flex gap-5">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-[#FF7A00] text-white rounded-lg font-semibold hover:bg-[#e76c00] transition-all"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/user/signup")}
              className="px-8 py-3 border border-[#0A2A43] text-[#0A2A43] rounded-lg font-semibold hover:bg-[#0A2A43] hover:text-white transition-all"
            >
              Explore Events
            </button>
          </div>
        </div>

        <div className="mt-12 lg:mt-0">
          <img 
            src="/hero.jpeg"
            alt="Hero"
            className="w-96 h-96 object-cover rounded-3xl shadow-2xl"
          />
        </div>
      </div>

    </div>
  );
}
