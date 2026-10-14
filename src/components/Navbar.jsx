import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Building2, Menu, Search, UserCircle2 } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAppContext()

  const getDashboardRoute = () => {
    if (!currentUser) return '/login'
    if (currentUser.role === 'admin') return '/admin/dashboard'
    if (currentUser.role === 'seller') return '/seller/dashboard'
    return '/buyer/dashboard'
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-forest-700">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-700 text-white shadow-sm">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight">BhoomiLensAI</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Find Better. Buy Smarter.</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'text-forest-700' : 'hover:text-forest-700')}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!currentUser ? (
            <>
              <Link to="/login" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-forest-600 hover:text-forest-700">
                Login
              </Link>
              <Link to="/signup" className="rounded-full bg-forest-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-600">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button onClick={() => navigate(getDashboardRoute())} className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">
                <UserCircle2 className="h-4 w-4" />
                {currentUser.name}
              </button>
              <button onClick={logout} className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">
                Logout
              </button>
            </>
          )}
        </div>

        <button className="inline-flex items-center justify-center rounded-xl border border-slate-200 p-2 md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
