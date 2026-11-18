import Source from '../models/Source.js'
import Listing from '../models/Listing.js'
import Retailer from '../models/Retailer.js'
import ScrapeRun from '../models/ScrapeRun.js'
import { politeFetch } from './fetcher.js'
import { extractPage } from './extract.js'

const digits = (s) => (s || '').replace(/\D/g, '').slice(-10)

async function upsertRetailer(item, source) {
  const name = item.retailerName?.trim()
  if (!name) return null
  const phone = digits(item.retailerPhone)
  const dedupeKey = phone ? `phone:${phone}` : `name:${name.toLowerCase()}@${source._id}`
  return Retailer.findOneAndUpdate(
    { dedupeKey },
    {
      $setOnInsert: {
        dedupeKey,
        name,
        phone,
        agency: item.retailerAgency || '',
        origin: 'scraped',
        source: source._id,
        sourceName: source.name,
      },
    },
    { upsert: true, new: true },
  )
}

export async function scrapeSource(sourceId) {
  const source = await Source.findById(sourceId)
  if (!source) throw new Error('Source not found')
  const run = await ScrapeRun.create({ source: source._id, sourceName: source.name })
  const touchedRetailers = new Set()

  try {
    for (const startUrl of source.listUrls) {
      let url = startUrl
      for (let page = 0; url && page < source.maxPages; page++) {
        try {
          const html = await politeFetch(url)
          run.pagesFetched++
          const { items, next } = extractPage(html, source, url)
          run.found += items.length
          for (const item of items) {
            const retailer = await upsertRetailer(item, source)
            if (retailer) touchedRetailers.add(String(retailer._id))
            // eslint-disable-next-line no-unused-vars
            const { retailerName, retailerPhone, retailerAgency, ...fields } = item
            const res = await Listing.updateOne(
              { source: source._id, url: item.url },
              {
                $set: {
                  ...fields,
                  city: 'Lucknow',
                  sourceName: source.name,
                  retailer: retailer?._id,
                  scrapedAt: new Date(),
                },
                $setOnInsert: { status: 'pending' },
              },
              { upsert: true },
            )
            if (res.upsertedCount) run.created++
            else run.updated++
          }
          url = next
        } catch (err) {
          run.errors.push(err.message)
          break
        }
      }
    }
    run.status = run.errors.length && !run.pagesFetched ? 'failed' : 'success'
  } catch (err) {
    run.status = 'failed'
    run.errors.push(err.message)
  }

  for (const id of touchedRetailers) {
    await Retailer.updateOne({ _id: id }, { listingCount: await Listing.countDocuments({ retailer: id }) })
  }
  run.finishedAt = new Date()
  await run.save()
  source.lastRunAt = run.finishedAt
  source.lastRunStatus = run.status
  await source.save()
  return run
}

export async function scrapeAllEnabled() {
  const sources = await Source.find({ enabled: true })
  const runs = []
  for (const s of sources) runs.push(await scrapeSource(s._id))
  return runs
}
