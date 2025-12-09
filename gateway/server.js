const express = require('express')
const axios = require('axios')

const PORT = 7000
const app = express()
app.use(express.json())

app.post('/api/booking', async (req, res) => {
  const { userId, eventId } = req.body
  const bookingId = new Date().getTime().toString()

  const response = await axios.post('http://localhost:5000/api/book', {
    userId,
    eventId
  })

  res.json({ bookingId, status: response.data.message })
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
  console.log(`Gateway service is running on port ${PORT}`)
})
