import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cron from 'node-cron'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'
import publicRoutes from './routes/public.js'
import { scrapeAllEnabled } from './scraper/runner.js'

if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not set (copy .env.example to .env)')

const app = express()
app.use(helmet())
app.use(cors({ origin: (process.env.CORS_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean) }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api', publicRoutes)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: 'Server error' })
})

await connectDB()
if (process.env.SCRAPE_CRON) {
  cron.schedule(process.env.SCRAPE_CRON, () => scrapeAllEnabled().catch(console.error))
}
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`API listening on :${port}`))
