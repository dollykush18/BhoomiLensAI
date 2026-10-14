import { BarChart3, Building2, LayoutGrid, MessageSquareText, ShieldCheck, FileText, UserCog, Settings, LogOut, PlusCircle } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const buyerItems = [
  { label: 'Overview', to: '/buyer/dashboard', icon: LayoutGrid },
  { label: 'Explore Properties', to: '/properties', icon: Building2 },
  { label: 'Saved Properties', to: '/buyer/favorites', icon: FileText },
  { label: 'My Enquiries', to: '/buyer/enquiries', icon: MessageSquareText },
  { label: 'Recommendations', to: '/buyer/recommendations', icon: BarChart3 },
  { label: 'AI Assistant', to: '/buyer/assistant', icon: MessageSquareText },
  { label: 'Price Prediction', to: '/buyer/price-prediction', icon: ShieldCheck },
  { label: 'Profile', to: '/buyer/dashboard', icon: UserCog },
  { label: 'Settings', to: '/buyer/dashboard', icon: Settings },
]

const sellerItems = [
  { label: 'Overview', to: '/seller/dashboard', icon: LayoutGrid },
  { label: 'My Properties', to: '/seller/properties', icon: Building2 },
  { label: 'Add Property', to: '/seller/add-property', icon: PlusCircle },
  { label: 'Document Verification', to: '/seller/documents', icon: FileText },
  { label: 'Enquiries', to: '/seller/enquiries', icon: MessageSquareText },
  { label: 'Profile', to: '/seller/profile', icon: UserCog },
  { label: 'Settings', to: '/seller/profile', icon: Settings },
]

const adminItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutGrid },
  { label: 'Manage Properties', to: '/admin/properties', icon: Building2 },
  { label: 'Pending Approvals', to: '/admin/approvals', icon: FileText },
  { label: 'Document Verification', to: '/admin/documents', icon: ShieldCheck },
  { label: 'Manage Users', to: '/admin/users', icon: UserCog },
  { label: 'Reports & Complaints', to: '/admin/reports', icon: BarChart3 },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
]

export default function DashboardSidebar({ role = 'buyer' }) {
  const items = role === 'seller' ? sellerItems : role === 'admin' ? adminItems : buyerItems
  const location = useLocation()

  return (
    <aside className="w-full rounded-3xl border border-slate-200 bg-slate-900 p-4 text-slate-200 lg:w-72">
      <div className="mb-6 px-2 text-xl font-bold text-white">BhoomiLensAI</div>
      <nav className="space-y-2">
        {items.map(({ label, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${location.pathname === to ? 'bg-forest-700 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <button className="mt-8 flex w-full items-center gap-3 rounded-2xl border border-slate-700 px-3 py-3 text-sm font-medium text-slate-300 hover:border-slate-500 hover:text-white">
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </aside>
  )
}
