import { useAppContext } from '../context/AppContext'

export default function BuyerEnquiries() {
  const { enquiries, currentUser } = useAppContext()
  const items = enquiries.filter((item) => item.buyerId === currentUser?.id)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">My enquiries</div>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Tracking conversations</h1>
      </div>
      <div className="space-y-4">
        {items.map((enquiry) => (
          <div key={enquiry.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-900">{enquiry.propertyId}</div>
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">{enquiry.status}</span>
            </div>
            <p className="mt-3 text-slate-600">{enquiry.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
