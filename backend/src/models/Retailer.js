import mongoose from 'mongoose'

// A retailer is any agent / broker / agency / owner who lists land or property.
const retailerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, lowercase: true, default: '' },
    agency: { type: String, trim: true, default: '' },
    city: { type: String, default: 'Lucknow' },
    // Where this retailer record came from: a scraped source or direct registration
    origin: { type: String, enum: ['scraped', 'registered', 'manual'], default: 'scraped' },
    source: { type: mongoose.Schema.Types.ObjectId, ref: 'Source' },
    sourceName: { type: String, default: '' },
    profileUrl: { type: String, default: '' },
    // Stable key used to de-duplicate: phone if known, otherwise name+source
    dedupeKey: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'blocked'], default: 'active' },
    notes: { type: String, default: '' },
    listingCount: { type: Number, default: 0 },
  },
  { timestamps: true },
)

retailerSchema.index({ name: 'text', agency: 'text', phone: 'text' })

export default mongoose.model('Retailer', retailerSchema)
