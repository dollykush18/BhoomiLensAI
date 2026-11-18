import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import Admin from '../models/Admin.js'

await connectDB()
const email = (process.env.ADMIN_EMAIL || '').toLowerCase()
const password = process.env.ADMIN_PASSWORD
if (!email || !password) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env')
await Admin.findOneAndUpdate({ email }, { email, passwordHash: await bcrypt.hash(password, 10) }, { upsert: true })
console.log(`Admin ready: ${email}`)
await mongoose.disconnect()
