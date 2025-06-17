const express = require('express')
const axios = require('axios')
const { Kafka } = require('kafkajs')

const PORT = 7000
const app = express()
app.use(express.json())

const kafka = new Kafka({ clientId: 'gateway', brokers: ['localhost:9092'] })
const { producer, connectProducer } = require('./kafka/producer')
connectProducer()


const startKafka = async () => {
  await producer.connect()
}
startKafka()

app.post('/api/booking', async (req, res) => {
  const { userId, eventId } = req.body
  const bookingId = new Date().getTime().toString()
  await producer.send({
    topic: 'booking_created',
    messages: [
      { key: 'booking', value: JSON.stringify({ bookingId, userId, eventId }) }
    ]
  })
  res.json({ bookingId, status: 'submitted' })
})

app.post('/api/signup', async (req, res) => {
  const response = await axios.post('http://localhost:4000/signup', req.body)
  res.json(response.data)
})

app.post('/api/login', async (req, res) => {
  const response = await axios.post('http://localhost:4000/login', req.body)
  res.json(response.data)
})

app.listen(PORT, () => {
  console.log(`Gateway service is running on port ${PORT}`);
});
