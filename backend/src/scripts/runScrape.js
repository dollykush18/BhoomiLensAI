import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import { scrapeAllEnabled } from '../scraper/runner.js'

await connectDB()
const runs = await scrapeAllEnabled()
for (const r of runs) console.log(r.sourceName, r.status, `found=${r.found} new=${r.created}`, r.errors.slice(0, 3))
await mongoose.disconnect()
