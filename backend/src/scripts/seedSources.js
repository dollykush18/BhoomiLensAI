import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import Source from '../models/Source.js'

// Starter entries. They are DISABLED and have no selectors on purpose:
// before enabling one, review the site's terms of use and robots.txt, confirm
// the list URL, then fill in the real CSS selectors from the admin panel.
// The scraper first tries schema.org JSON-LD, which needs no selectors.
const starters = [
  { name: '99acres - Lucknow plots', baseUrl: 'https://www.99acres.com', listUrls: [] },
  { name: 'MagicBricks - Lucknow plots', baseUrl: 'https://www.magicbricks.com', listUrls: [] },
  { name: 'Housing.com - Lucknow land', baseUrl: 'https://housing.com', listUrls: [] },
  { name: 'NoBroker - Lucknow plots', baseUrl: 'https://www.nobroker.in', listUrls: [] },
]

await connectDB()
for (const s of starters) {
  await Source.updateOne({ name: s.name }, { $setOnInsert: { ...s, enabled: false } }, { upsert: true })
}
console.log(`Seeded ${starters.length} starter sources (disabled, no list URLs yet)`)
await mongoose.disconnect()
