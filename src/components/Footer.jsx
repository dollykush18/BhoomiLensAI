import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-4 text-2xl font-bold text-white">BhoomiLensAI</div>
          <p className="text-sm text-slate-300">Transparent property discovery for buyers and sellers with AI-assisted discovery and document review.</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Explore</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/buyer/assistant">AI Assistant</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Support</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>help@bhoomilens.ai</li>
            <li>+91 98765 43210</li>
            <li>Jhansi, Uttar Pradesh</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">For Sellers</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>List your property</li>
            <li>Track document review</li>
            <li>Connect with verified buyers</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-sm text-slate-400">© 2026 BhoomiLensAI. Demo frontend for a college mini project.</div>
    </footer>
  )
}
