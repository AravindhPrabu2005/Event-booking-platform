const express = require('express');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
const FormData = require('form-data');

const app = express();

const AUTH_SERVICE = 'http://localhost:4000';
const BOOKING_SERVICE = 'http://localhost:5000';
const EVENT_SERVICE = 'http://localhost:8000';

app.use(cors());
app.use(express.json());

// ---------------- AUTH ROUTES ----------------
app.post('/api/auth/signup', async (req, res) => {
  const response = await axios.post(`${AUTH_SERVICE}/user/signup`, req.body);
  res.json(response.data);
});

app.post('/api/auth/admin/signup', async (req, res) => {
  const response = await axios.post(`${AUTH_SERVICE}/admin/signup`, req.body);
  res.json(response.data);
});

app.post('/api/auth/login', async (req, res) => {
  const response = await axios.post(`${AUTH_SERVICE}/login`, req.body);
  res.json(response.data);
});

// ---------------- BOOKING ROUTES ----------------
app.post('/api/bookings/book', async (req, res) => {
  const response = await axios.post(`${BOOKING_SERVICE}/book`, req.body);
  res.json(response.data);
});

app.get('/api/bookings/all', async (req, res) => {
  const response = await axios.get(`${BOOKING_SERVICE}/all`);
  res.json(response.data);
});

app.get('/api/bookings/event/:eventId', async (req, res) => {
  const response = await axios.get(`${BOOKING_SERVICE}/event/${req.params.eventId}`);
  res.json(response.data);
});

app.get('/api/bookings/user/:userId', async (req, res) => {
  const response = await axios.get(`${BOOKING_SERVICE}/user/${req.params.userId}`);
  res.json(response.data);
});

// ---------------- EVENT ROUTES ----------------
const upload = multer();

app.post('/api/events', upload.single('banner'), async (req, res) => {
  try {
    const form = new FormData();

    for (let key in req.body) {
      form.append(key, req.body[key]);
    }

    if (req.file) {
      form.append('banner', req.file.buffer, req.file.originalname);
    }

    const response = await axios.post(`${EVENT_SERVICE}/events`, form, {
      headers: form.getHeaders()
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Event upload failed" });
  }
});

app.get('/api/events', async (req, res) => {
  const response = await axios.get(`${EVENT_SERVICE}/events`);
  res.json(response.data);
});

app.listen(7000, () => console.log("API Gateway running on port 7000"));
