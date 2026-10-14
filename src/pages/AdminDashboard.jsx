import { BarChart3, Building2, FileText, ShieldCheck, UserCog, Users } from 'lucide-react'
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import DashboardSidebar from '../components/DashboardSidebar'
import { useAppContext } from '../context/AppContext'

const chartData = [
  { name: 'Approved', value: 7 },
  { name: 'Pending', value: 2 },
  { name: 'Rejected', value: 1 },
  { name: 'Review', value: 3 },
]

export default function AdminDashboard() {
  const { users, properties, documents, reports } = useAppContext()
  const approvedCount = properties.filter((item) => item.listingStatus === 'approved').length
  const pendingCount = properties.filter((item) => item.listingStatus === 'pending').length

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users },
    { label: 'Buyers', value: users.filter((item) => item.role === 'buyer').length, icon: UserCog },
    { label: 'Sellers', value: users.filter((item) => item.role === 'seller').length, icon: Building2 },
    { label: 'Total Properties', value: properties.length, icon: FileText },
    { label: 'Active Listings', value: approvedCount, icon: ShieldCheck },
    { label: 'Pending Approvals', value: pendingCount, icon: FileText },
    { label: 'Documents Under Review', value: documents.filter((item) => item.status === 'Under Review').length, icon: BarChart3 },
    { label: 'Reported Properties', value: reports.length, icon: Building2 },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Admin dashboard</div>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Demo statistics overview</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px,1fr]">
        <DashboardSidebar role="admin" />

        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }) => (
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
            <h2 className="text-xl font-bold text-slate-900">Listing status overview</h2>
            <div className="mt-5 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#104C3E" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
