import { Router } from 'express'
import Retailer from '../models/Retailer.js'
import Listing from '../models/Listing.js'
import Source from '../models/Source.js'
import ScrapeRun from '../models/ScrapeRun.js'
import { scrapeSource, scrapeAllEnabled } from '../scraper/runner.js'
import { requireAdmin } from '../middleware/auth.js'

const router = Router()
router.use(requireAdmin)

const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const paging = (q) => {
  const limit = Math.min(Number(q.limit) || 25, 100)
  return { limit, skip: ((Number(q.page) || 1) - 1) * limit }
}

router.get('/stats', async (_req, res) => {
  const [retailers, listings, pending, sources, lastRuns] = await Promise.all([
    Retailer.countDocuments(),
    Listing.countDocuments(),
    Listing.countDocuments({ status: 'pending' }),
    Source.countDocuments({ enabled: true }),
    ScrapeRun.find().sort({ createdAt: -1 }).limit(5),
  ])
  res.json({ retailers, listings, pending, sources, lastRuns })
})

// ---- Retailers ----
router.get('/retailers', async (req, res) => {
  const { q, source, status } = req.query
  const filter = {}
  if (q) filter.$or = ['name', 'phone', 'agency'].map((f) => ({ [f]: new RegExp(esc(q), 'i') }))
  if (source) filter.source = source
  if (status) filter.status = status
  const { limit, skip } = paging(req.query)
  const [items, total] = await Promise.all([
    Retailer.find(filter).sort({ listingCount: -1, createdAt: -1 }).skip(skip).limit(limit),
    Retailer.countDocuments(filter),
  ])
  res.json({ items, total })
})

router.get('/retailers/:id', async (req, res) => {
  const retailer = await Retailer.findById(req.params.id)
  if (!retailer) return res.status(404).json({ message: 'Not found' })
  const listings = await Listing.find({ retailer: retailer._id }).sort({ scrapedAt: -1 }).limit(100)
  res.json({ retailer, listings })
})

router.patch('/retailers/:id', async (req, res) => {
  const { verified, status, notes } = req.body || {}
  const update = {}
  if (typeof verified === 'boolean') update.verified = verified
  if (['active', 'blocked'].includes(status)) update.status = status
  if (typeof notes === 'string') update.notes = notes
  const retailer = await Retailer.findByIdAndUpdate(req.params.id, update, { new: true })
  if (!retailer) return res.status(404).json({ message: 'Not found' })
  res.json(retailer)
})

// ---- Listings ----
router.get('/listings', async (req, res) => {
  const { q, status, source, retailer } = req.query
  const filter = {}
  if (q) filter.$or = ['title', 'location'].map((f) => ({ [f]: new RegExp(esc(q), 'i') }))
  if (status) filter.status = status
  if (source) filter.source = source
  if (retailer) filter.retailer = retailer
  const { limit, skip } = paging(req.query)
  const [items, total] = await Promise.all([
    Listing.find(filter).populate('retailer', 'name phone').sort({ scrapedAt: -1 }).skip(skip).limit(limit),
    Listing.countDocuments(filter),
  ])
  res.json({ items, total })
})

router.patch('/listings/:id', async (req, res) => {
  const { status } = req.body || {}
  if (!['pending', 'approved', 'rejected'].includes(status)) return res.status(400).json({ message: 'Bad status' })
  const listing = await Listing.findByIdAndUpdate(req.params.id, { status }, { new: true })
  if (!listing) return res.status(404).json({ message: 'Not found' })
  res.json(listing)
})

// ---- Sources & scraping ----
router.get('/sources', async (_req, res) => res.json(await Source.find().sort({ name: 1 })))

router.post('/sources', async (req, res) => {
  try {
    res.status(201).json(await Source.create(req.body))
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

router.put('/sources/:id', async (req, res) => {
  const source = await Source.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!source) return res.status(404).json({ message: 'Not found' })
  res.json(source)
})

router.delete('/sources/:id', async (req, res) => {
  await Source.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

router.post('/sources/:id/scrape', async (req, res) => {
  try {
    res.json(await scrapeSource(req.params.id))
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

router.post('/scrape/all', async (_req, res) => res.json(await scrapeAllEnabled()))

router.get('/runs', async (_req, res) => res.json(await ScrapeRun.find().sort({ createdAt: -1 }).limit(50)))

export default router
