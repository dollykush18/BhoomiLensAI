import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">404</div>
      <h1 className="mt-4 text-5xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-4 text-slate-600">The page you looked for is not available in this demo frontend.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-forest-700 px-6 py-3 text-sm font-semibold text-white">Return home</Link>
    </div>
  )
}
