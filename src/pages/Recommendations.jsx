import { useEffect, useState } from 'react'
import { getRecommendations } from '../services/recommendationService'
import { Link } from 'react-router-dom'

export default function Recommendations() {
  const [items, setItems] = useState([])

  useEffect(() => {
    getRecommendations({ location: 'Jhansi', bedrooms: 2, budget: 4000000 }).then((data) => setItems(data))
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Recommended for you</div>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Smart matches</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((property) => (
          <div key={property.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img src={property.image} alt={property.title} className="h-48 w-full object-cover" />
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-slate-900">{property.title}</div>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">{property.score}%</span>
              </div>
              <div className="mt-2 text-sm text-slate-500">{property.location}</div>
              <div className="mt-3 text-xl font-bold text-forest-700">₹{property.price.toLocaleString('en-IN')}</div>
              <p className="mt-3 text-sm text-slate-600">{property.reason}</p>
              <div className="mt-4 flex gap-2">
                <Link to={`/properties/${property.id}`} className="flex-1 rounded-full bg-forest-700 px-4 py-2 text-center text-sm font-semibold text-white">View Details</Link>
                <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Save</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
