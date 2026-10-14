import { BarChart3, Building2, Heart, MessageSquareText, UserCog } from 'lucide-react'
import { Link } from 'react-router-dom'
import DashboardSidebar from '../components/DashboardSidebar'
import { useAppContext } from '../context/AppContext'

export default function BuyerDashboard() {
  const { currentUser, favourites, properties, enquiries } = useAppContext()
  const savedProperties = properties.filter((property) => favourites.includes(property.id)).slice(0, 3)
  const recent = properties.filter((property) => property.listingStatus === 'approved').slice(0, 4)
  const myEnquiries = enquiries.filter((item) => item.buyerId === currentUser?.id).slice(0, 3)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Buyer dashboard</div>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">Welcome, {currentUser?.name || 'Buyer'}</h1>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px,1fr]">
        <DashboardSidebar role="buyer" />

        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Saved properties', value: savedProperties.length, icon: Heart },
              { label: 'Active enquiries', value: myEnquiries.length, icon: MessageSquareText },
              { label: 'Recently viewed', value: recent.length, icon: Building2 },
              { label: 'Recommendations', value: 9, icon: BarChart3 },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm text-slate-500">{label}</span>
                  <div className="rounded-xl bg-sage-100 p-2 text-forest-700"><Icon className="h-4 w-4" /></div>
                </div>
                <div className="text-3xl font-bold text-slate-900">{value}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Saved properties</h2>
              <div className="mt-5 space-y-4">
                {savedProperties.map((property) => (
                  <Link key={property.id} to={`/properties/${property.id}`} className="flex gap-3 rounded-2xl border border-slate-200 p-3">
                    <img className="h-20 w-20 rounded-xl object-cover" src={property.image} alt={property.title} />
                    <div>
                      <div className="font-semibold text-slate-900">{property.title}</div>
                      <div className="text-xs text-slate-500">{property.location}</div>
                      <div className="mt-2 text-sm font-bold text-forest-700">₹{property.price.toLocaleString('en-IN')}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">My enquiries</h2>
              <div className="mt-5 space-y-4">
                {myEnquiries.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="font-medium text-slate-900">{item.propertyId}</div>
                    <div className="mt-1 text-sm text-slate-600">{item.message}</div>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">{item.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Recently viewed</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {recent.map((property) => (
                <Link key={property.id} to={`/properties/${property.id}`} className="overflow-hidden rounded-2xl border border-slate-200">
                  <img src={property.image} alt={property.title} className="h-32 w-full object-cover" />
                  <div className="p-3">
                    <div className="font-semibold text-slate-900">{property.title}</div>
                    <div className="text-xs text-slate-500">{property.location}</div>
                    <div className="mt-2 font-bold text-forest-700">₹{property.price.toLocaleString('en-IN')}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
