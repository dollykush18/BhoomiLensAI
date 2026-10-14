import { useAppContext } from '../context/AppContext'

export default function AdminProperties() {
  const { properties, updateProperty, removeProperty } = useAppContext()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Manage properties</div>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Property inventory</h1>
      </div>

      <div className="space-y-4">
        {properties.map((property) => (
          <div key={property.id} className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row">
            <div className="flex items-center gap-4">
              <img src={property.image} alt={property.title} className="h-20 w-24 rounded-xl object-cover" />
              <div>
                <div className="font-semibold text-slate-900">{property.title}</div>
                <div className="text-sm text-slate-500">{property.location}</div>
                <div className="text-sm font-medium text-forest-700">₹{property.price.toLocaleString('en-IN')}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => updateProperty(property.id, { listingStatus: 'approved' })} className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700">Approve</button>
              <button onClick={() => updateProperty(property.id, { listingStatus: 'pending' })} className="rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold text-amber-700">Reject</button>
              <button onClick={() => removeProperty(property.id)} className="rounded-full bg-red-100 px-4 py-2 text-xs font-semibold text-red-700">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
