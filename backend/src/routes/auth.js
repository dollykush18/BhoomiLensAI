import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {}
  const admin = email && (await Admin.findOne({ email: String(email).toLowerCase() }))
  if (!admin || !(await bcrypt.compare(String(password || ''), admin.passwordHash))) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }
  const token = jwt.sign({ id: admin._id, role: 'admin', email: admin.email }, process.env.JWT_SECRET, {
    expiresIn: '8h',
  })
  res.json({ token, admin: { name: admin.name, email: admin.email } })
})

export default router
