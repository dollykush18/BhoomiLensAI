import mongoose from 'mongoose'

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, default: null },
    priceText: { type: String, default: '' },
    area: { type: Number, default: null },
    areaText: { type: String, default: '' },
    location: { type: String, default: '' },
    city: { type: String, default: 'Lucknow' },
    propertyType: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    url: { type: String, required: true },
    source: { type: mongoose.Schema.Types.ObjectId, ref: 'Source' },
    sourceName: { type: String, default: '' },
    retailer: { type: mongoose.Schema.Types.ObjectId, ref: 'Retailer' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    scrapedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

listingSchema.index({ source: 1, url: 1 }, { unique: true })
listingSchema.index({ title: 'text', location: 'text' })

export default mongoose.model('Listing', listingSchema)
