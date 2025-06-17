const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const PORT = 4000
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/auth-service').then(() => {
  console.log('Connected to MongoDB')
}).catch(err => {
  console.error('MongoDB connection error:', err)
})

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String
})

const User = mongoose.model('User', userSchema)

app.post('/user/signup', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ error: 'User already exists' })
    const hash = await bcrypt.hash(password, 10)
    const user = new User({ email, password: hash, role: 'user' })
    await user.save()
    const token = jwt.sign({ id: user._id, role: user.role }, 'jwtSecret')
    res.json({ message: 'User account registered', token })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/admin/signup', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
    const existing = await User.findOne({ email })
    if (existing) return res.status(409).json({ error: 'Admin already exists' })
    const hash = await bcrypt.hash(password, 10)
    const admin = new User({ email, password: hash, role: 'admin' })
    await admin.save()
    const token = jwt.sign({ id: admin._id, role: admin.role }, 'jwtSecret')
    res.json({ message: 'Admin account registered', token })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Invalid email or password' })
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' })
    const token = jwt.sign({ id: user._id, role: user.role }, 'jwtSecret')
    res.json({ message: 'Login successful', token, id: user._id, role: user.role })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})


app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`)
})
