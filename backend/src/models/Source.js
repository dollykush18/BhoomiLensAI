import mongoose from 'mongoose'

// A website to collect listings from. Selectors are CSS selectors (cheerio).
const sourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    baseUrl: { type: String, required: true },
    listUrls: { type: [String], default: [] },
    enabled: { type: Boolean, default: false },
    // Try schema.org JSON-LD blocks first (works on many portals without selectors)
    useJsonLd: { type: Boolean, default: true },
    selectors: {
      item: String, // each listing card
      title: String,
      price: String,
      area: String,
      location: String,
      link: String, // anchor inside card (href)
      image: String, // img inside card
      retailerName: String,
      retailerPhone: String,
      retailerAgency: String,
      nextPage: String, // anchor to next page
    },
    maxPages: { type: Number, default: 3 },
    lastRunAt: Date,
    lastRunStatus: String,
  },
  { timestamps: true },
)

export default mongoose.model('Source', sourceSchema)
