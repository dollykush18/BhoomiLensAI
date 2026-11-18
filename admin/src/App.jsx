import { Navigate, NavLink, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { getToken, setToken } from './api.js'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Retailers from './pages/Retailers.jsx'
import RetailerDetail from './pages/RetailerDetail.jsx'
import Listings from './pages/Listings.jsx'
import Sources from './pages/Sources.jsx'

function Layout() {
  const navigate = useNavigate()
  if (!getToken()) return <Navigate to="/login" replace />
  const links = [
    ['/', 'Dashboard'],
    ['/retailers', 'Retailers'],
    ['/listings', 'Listings'],
    ['/sources', 'Sources & Scraping'],
  ]
  return (
    <div className="shell">
      <aside>
        <h1>BhoomiLens<span>Admin</span></h1>
        <nav>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>
          ))}
        </nav>
        <button
          className="ghost"
          onClick={() => {
            setToken(null)
            navigate('/login')
          }}
        >
          Sign out
        </button>
      </aside>
      <main><Outlet /></main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="retailers" element={<Retailers />} />
        <Route path="retailers/:id" element={<RetailerDetail />} />
        <Route path="listings" element={<Listings />} />
        <Route path="sources" element={<Sources />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
