import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './components/Signup';
import LoginPage from './components/Loginpage';
import AdminSignupPage from './components/AdminSignup';
import UserHome from './components/user/UserHome';
import AdminHome from './components/admin/AdminHome';
import Events from './components/user/Events';
import Tickets from './components/user/Tickets';
import Bookings from './components/admin/Bookings';
import EventCreation from './components/admin/EventCreation';
import BookingsLog from './components/admin/BookingsLog';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Common routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/signup" element={<SignupPage />} />
        <Route path="/admin/signup" element={<AdminSignupPage/> } />

        {/* admin routes */}
        <Route path="/admin/home" element={<AdminHome /> } />
        <Route path="/admin/create-event" element={<EventCreation /> } />
        <Route path="/admin/manage-bookings" element={<Bookings /> } />
        <Route path="/admin/view-bookings/:eventId" element={<BookingsLog /> } />

        {/* User routes */}
        <Route path="/user/home" element={<UserHome /> } />
        <Route path="/user/events" element={<Events /> } />
        <Route path="/user/tickets" element={<Tickets /> } />
      </Routes>
    </Router>
  );
}

export default App;
