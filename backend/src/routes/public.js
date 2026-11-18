import { Router } from 'express'
import Listing from '../models/Listing.js'

// Public API for the website: only admin-approved listings are exposed.
const router = Router()

router.get('/listings', async (req, res) => {
  const { q } = req.query
  const limit = Math.min(Number(req.query.limit) || 20, 100)
  const skip = ((Number(req.query.page) || 1) - 1) * limit
  const filter = { status: 'approved' }
  if (q) filter.$text = { $search: String(q) }
  const [items, total] = await Promise.all([
    Listing.find(filter)
      .populate('retailer', 'name phone agency verified')
      .sort({ scrapedAt: -1 })
      .skip(skip)
      .limit(limit),
    Listing.countDocuments(filter),
  ])
  res.json({ items, total })
})

export default router
