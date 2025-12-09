const express = require('express')
const mongoose = require('mongoose')

const app = express()

const PORT = process.env.BOOKING_PORT || 5000
const MONGO_URI = process.env.BOOKING_MONGO_URI || 'mongodb://127.0.0.1:27017/bookings'

app.use(express.json())

let clients = []

app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()

  clients.push(res)

  req.on('close', () => {
    clients = clients.filter(c => c !== res)
  })
})

mongoose.connect(MONGO_URI)

const bookingSchema = new mongoose.Schema({
  bookingId: String,
  userId: String,
  eventId: String
})

const Booking = mongoose.model('Booking', bookingSchema)

const sendToClients = booking => {
  clients.forEach(res => {
    res.write(`data: ${JSON.stringify(booking)}\n\n`)
  })
}

app.get('/all', async (req, res) => {
  const list = await Booking.find()
  res.json(list)
})

app.post('/book', async (req, res) => {
  const { userId, eventId } = req.body

  const booking = new Booking({
    bookingId: new mongoose.Types.ObjectId().toString(),
    userId,
    eventId
  })

  await booking.save()
  sendToClients(booking)

  res.status(200).json({ message: 'Booking Successful' })
})

app.get('/test',(req,res)=>{
  res.send("Booking service is up and running")
})
app.get('/event/:eventId', async (req, res) => {
  const list = await Booking.find({ eventId: req.params.eventId })
  res.json(list)
})

app.get('/user/:userId', async (req, res) => {
  const list = await Booking.find({ userId: req.params.userId })
  res.json(list)
})

app.listen(PORT, () => {
  console.log(`Booking service is running on port ${PORT}`)
})
