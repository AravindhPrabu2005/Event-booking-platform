const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const PORT = 8000
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/event-service').then(() => {
  console.log('Connected to MongoDB for Event Service')
}).catch(err => {
  console.error('MongoDB connection error:', err)
})

// Cloudinary Config
cloudinary.config({
  cloud_name: 'dpoufodoc',
  api_key: '419293463141733',
  api_secret: 'OWPBFCsRlJVDv8M8QAF4ODL6egk'
})

// Cloudinary Storage
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

app.post('/api/events', upload.single('banner'), async (req, res) => {
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

app.get('/api/events', async (req, res) => {
  const events = await Event.find()
  res.json(events)
})

app.listen(PORT, () => {
  console.log(`Event service is running on port ${PORT}`)
})
