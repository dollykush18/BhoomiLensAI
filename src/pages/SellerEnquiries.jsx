import { useAppContext } from '../context/AppContext'

export default function SellerEnquiries() {
  const { enquiries, properties } = useAppContext()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Seller enquiries</div>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Buyer conversations</h1>
      </div>
      <div className="space-y-4">
        {enquiries.map((enquiry) => (
          <div key={enquiry.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-900">Property: {enquiry.propertyId}</div>
              <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">{enquiry.status}</span>
            </div>
            <p className="mt-3 text-slate-600">{enquiry.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
