import { Building2, CircleDollarSign, FileText, Home, Plus, ShieldCheck, TrendingUp } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardSidebar from '../components/DashboardSidebar'
import StatusBadge from '../components/StatusBadge'
import { useAppContext } from '../context/AppContext'

export default function SellerDashboard() {
  const navigate = useNavigate()
  const { currentUser, properties, documents } = useAppContext()
  const myProperties = properties.filter((property) => property.sellerId === currentUser?.id)
  const summary = [
    { label: 'Total Properties', value: myProperties.length, icon: Home },
    { label: 'Active Listings', value: myProperties.filter((item) => item.listingStatus === 'approved').length, icon: Building2 },
    { label: 'Pending Approvals', value: myProperties.filter((item) => item.listingStatus === 'pending').length, icon: FileText },
    { label: 'Documents Under Review', value: documents.filter((item) => item.sellerId === currentUser?.id && item.status === 'Under Review').length, icon: ShieldCheck },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Seller dashboard</div>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">Property overview</h1>
        </div>
        <button onClick={() => navigate('/seller/add-property')} className="inline-flex items-center gap-2 rounded-full bg-forest-700 px-4 py-3 text-sm font-semibold text-white"><Plus className="h-4 w-4" /> Add property</button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px,1fr]">
        <DashboardSidebar role="seller" />

        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {summary.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm text-slate-500">{label}</span>
                  <div className="rounded-xl bg-sage-100 p-2 text-forest-700"><Icon className="h-4 w-4" /></div>
                </div>
                <div className="text-3xl font-bold text-slate-900">{value}</div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">My properties</h2>
              <Link to="/seller/documents" className="text-sm font-semibold text-forest-700">Document verification</Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3">Thumbnail</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Listing</th>
                    <th className="px-4 py-3">Doc status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myProperties.map((property) => (
                    <tr key={property.id} className="border-t border-slate-200">
                      <td className="px-4 py-3"><img src={property.image} alt={property.title} className="h-12 w-16 rounded-lg object-cover" /></td>
                      <td className="px-4 py-3 font-medium text-slate-900">{property.title}</td>
                      <td className="px-4 py-3 text-slate-600">{property.location}</td>
                      <td className="px-4 py-3 font-semibold text-slate-900">₹{property.price.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3"><StatusBadge status={property.listingStatus === 'approved' ? 'Approved' : 'Pending'} /></td>
                      <td className="px-4 py-3"><StatusBadge status={property.verificationStatus || 'Submitted'} /></td>
                      <td className="px-4 py-3 space-x-2">
                        <button onClick={() => navigate(`/seller/edit-property/${property.id}`)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">Edit</button>
                        <button className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
