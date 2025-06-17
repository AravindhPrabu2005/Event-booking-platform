const express = require('express')
const mongoose = require('mongoose')
const { Kafka } = require('kafkajs')
const cors = require('cors')

const PORT = 5000
const app = express()

let clients = []

app.get('/stream', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()

  clients.push(res)

  req.on('close', () => {
    clients = clients.filter(c => c !== res)
  })
})



app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/bookings').then(() => {
  console.log('Connected to MongoDB')
}).catch(err => {
  console.error('MongoDB connection error:', err)
})

const bookingSchema = new mongoose.Schema({
  bookingId: String,
  userId: String,
  eventId: String
})

const Booking = mongoose.model('Booking', bookingSchema)

const kafka = new Kafka({ clientId: 'booking-service', brokers: ['localhost:9092'] })
const consumer = kafka.consumer({ groupId: 'booking-group' })
const producer = kafka.producer()

const sendToClients = (booking) => {
  clients.forEach(res => {
    res.write(`data: ${JSON.stringify(booking)}\n\n`)
  })
}

const startKafka = async () => {
  await producer.connect()
  await consumer.connect()
  await consumer.subscribe({ topic: 'booking-created', fromBeginning: false })

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString())
      const booking = new Booking({ ...data })
      await booking.save()
      sendToClients(booking)
      console.log('Booking saved and pushed:', booking)
    }
  })

  console.log('Kafka producer and consumer started')
}

app.get('/all', async (req, res) => {
  const list = await Booking.find()
  res.json(list)
})

app.post('/api/book', async (req, res) => {
  const { userId, eventId } = req.body

  const bookingPayload = {
    bookingId: new mongoose.Types.ObjectId().toString(),
    userId,
    eventId
  }

  try {
    await producer.send({
      topic: 'booking-created',
      messages: [{ value: JSON.stringify(bookingPayload) }]
    })

    res.status(200).json({ message: 'Booking Successful' })
  } catch (err) {
    console.error('Error sending Kafka message:', err)
    res.status(500).json({ error: 'Booking failed' })
  }
})

app.get('/event/:eventId', async (req, res) => {
  const list = await Booking.find({ eventId: req.params.eventId })
  res.json(list)
})


app.get('/:userId', async (req, res) => {
  const list = await Booking.find({ userId: req.params.userId })
  res.json(list)
})

app.listen(PORT, async () => {
  console.log(`Booking service is running on port ${PORT}`)
  await startKafka()
})
