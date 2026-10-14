import { useState } from 'react'
import { getPricePrediction } from '../services/pricePredictionService'

export default function PricePrediction() {
  const [form, setForm] = useState({ location: 'Jhansi', propertyType: 'House', area: 1800, bedrooms: 3, bathrooms: 2, propertyAge: 6, furnishing: 'Semi-Furnished', parking: 1 })
  const [result, setResult] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const estimate = await getPricePrediction(form)
    setResult(estimate)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">ML property price prediction</div>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Estimate value</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Property type</label>
              <select value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                <option>House</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Studio</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Area</label>
              <input type="number" value={form.area} onChange={(e) => setForm({ ...form, area: Number(e.target.value) })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Bedrooms</label>
              <input type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Bathrooms</label>
              <input type="number" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Property age</label>
              <input type="number" value={form.propertyAge} onChange={(e) => setForm({ ...form, propertyAge: Number(e.target.value) })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Furnishing</label>
              <select value={form.furnishing} onChange={(e) => setForm({ ...form, furnishing: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                <option>Semi-Furnished</option>
                <option>Fully Furnished</option>
                <option>Unfurnished</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Parking</label>
              <input type="number" value={form.parking} onChange={(e) => setForm({ ...form, parking: Number(e.target.value) })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
            </div>
          </div>

          <button type="submit" className="mt-6 rounded-full bg-forest-700 px-6 py-3 text-sm font-semibold text-white">Get Demo Estimate</button>
        </form>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          {result ? (
            <>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Result</div>
              <div className="mt-4 text-4xl font-bold text-slate-900">₹{result.estimate.toLocaleString('en-IN')}</div>
              <p className="mt-3 text-slate-600">{result.summary}</p>
              <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">{result.disclaimer}</div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500">Fill in the form to generate a demo estimate.</div>
          )}
        </div>
      </div>
    </div>
  )
}
