import mongoose from 'mongoose'

const scrapeRunSchema = new mongoose.Schema(
  {
    source: { type: mongoose.Schema.Types.ObjectId, ref: 'Source' },
    sourceName: String,
    status: { type: String, enum: ['running', 'success', 'failed'], default: 'running' },
    pagesFetched: { type: Number, default: 0 },
    found: { type: Number, default: 0 },
    created: { type: Number, default: 0 },
    updated: { type: Number, default: 0 },
    errors: { type: [String], default: [] },
    finishedAt: Date,
  },
  { timestamps: true },
)

export default mongoose.model('ScrapeRun', scrapeRunSchema)
