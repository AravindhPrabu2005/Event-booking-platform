require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const serverless = require

const app = express()

const PORT = process.env.EVENT_PORT || 8000
// const MONGO_URI = 'mongodb://127.0.0.1:27017/event-service'
const MONGO_URI = process.env.MONGO_URI

const CLOUD_NAME = process.env.CLOUD_NAME
const CLOUD_API_KEY = process.env.CLOUD_API_KEY
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET

app.use(express.json())

mongoose.connect(MONGO_URI).then(()=>{console.log("event service connected to MongoDB")})

// Cloudinary config
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'event-banners',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }]
  }
})

const upload = multer({ storage })

const eventSchema = new mongoose.Schema({
  name: String,
  seats: Number,
  description: String,
  date: String,
  startTime: String,
  endTime: String,
  banner: String
})

const Event = mongoose.model('Event', eventSchema)

app.post('/events', upload.single('banner'), async (req, res) => {
  const event = new Event({
    name: req.body.name,
    seats: req.body.seats,
    description: req.body.description,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    banner: req.file ? req.file.path : ''
  })

  await event.save()
  res.json(event)
})

app.get('/events', async (req, res) => {
  const events = await Event.find()
  res.json(events)
})

app.listen(PORT, () => {
  console.log(`Event service is running on port ${PORT}`)
})
