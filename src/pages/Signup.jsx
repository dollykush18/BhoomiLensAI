import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Signup() {
  const navigate = useNavigate()
  const { register } = useAppContext()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', role: 'buyer', terms: false })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.password) {
      setError('Please complete all required fields.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!form.terms) {
      setError('Please accept the terms and conditions.')
      return
    }

    setLoading(true)
    setError('')

    const newUser = register({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      role: form.role,
    })

    setSuccess(`Account created for ${newUser.name}. Redirecting to your dashboard...`)
    setTimeout(() => navigate(newUser.role === 'seller' ? '/seller/dashboard' : '/buyer/dashboard'), 800)
    setLoading(false)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
        <div className="mb-8 text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Create account</div>
        <h1 className="text-4xl font-bold text-slate-900">Join BhoomiLensAI</h1>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" placeholder="Full name" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Phone number</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" placeholder="9876543210" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Confirm password</label>
            <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" required />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                <input checked={form.role === 'buyer'} onChange={() => setForm({ ...form, role: 'buyer' })} type="radio" name="role" /> Buyer
              </label>
              <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                <input checked={form.role === 'seller'} onChange={() => setForm({ ...form, role: 'seller' })} type="radio" name="role" /> Seller
              </label>
            </div>
          </div>

          <div className="md:col-span-2 flex items-center gap-2 text-sm text-slate-600">
            <input checked={form.terms} onChange={() => setForm({ ...form, terms: !form.terms })} type="checkbox" />
            <span>I agree to the terms and acknowledge that this is a demo frontend.</span>
          </div>

          {error && <div className="md:col-span-2 rounded-2xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}
          {success && <div className="md:col-span-2 rounded-2xl bg-emerald-50 px-3 py-2 text-sm text-emerald-600">{success}</div>}

          <div className="md:col-span-2 flex items-center justify-between gap-3">
            <Link to="/login" className="text-sm font-medium text-forest-700">Already have an account?</Link>
            <button type="submit" disabled={loading} className="rounded-full bg-forest-700 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">{loading ? 'Creating...' : 'Create an account'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
