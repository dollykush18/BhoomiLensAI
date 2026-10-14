import { useAppContext } from '../context/AppContext'

export default function PendingApprovals() {
  const { properties, updateProperty } = useAppContext()
  const pending = properties.filter((item) => item.listingStatus === 'pending')

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Pending approvals</div>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Review new submissions</h1>
      </div>

      <div className="space-y-4">
        {pending.map((property) => (
          <div key={property.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-slate-900">{property.title}</div>
                <div className="text-sm text-slate-500">{property.location}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => updateProperty(property.id, { listingStatus: 'approved' })} className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700">Approve</button>
                <button onClick={() => updateProperty(property.id, { listingStatus: 'pending', verificationStatus: 'Additional Information Required' })} className="rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold text-amber-700">Request Info</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
