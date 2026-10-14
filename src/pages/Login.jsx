import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { loginUser } from '../services/authService'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAppContext()
  const [form, setForm] = useState({ emailOrPhone: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await loginUser(form)
      login(result.user)
      navigate(result.user.role === 'admin' ? '/admin/dashboard' : result.user.role === 'seller' ? '/seller/dashboard' : '/buyer/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
        <div className="bg-forest-700 p-8 text-white lg:p-12">
          <div className="text-sm uppercase tracking-[0.18em] text-emerald-100">Welcome back</div>
          <h1 className="mt-4 text-4xl font-bold">Login to BhoomiLensAI</h1>
          <p className="mt-4 text-emerald-50">Access your dashboard, track app activities, and continue property discovery responsibly.</p>
          <div className="mt-8 rounded-3xl bg-white/10 p-5 text-sm text-emerald-50">
            Demo credentials: admin@bhoomilens.ai / admin123, buyer@example.com / buyer123, seller1@example.com / seller123
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 lg:p-12">
          <div className="mb-8 text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Account Login</div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email or phone</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <input value={form.emailOrPhone} onChange={(e) => setForm({ ...form, emailOrPhone: e.target.value })} className="w-full bg-transparent text-sm text-slate-700 outline-none" placeholder="buyer@example.com" required />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Lock className="h-4 w-4 text-slate-400" />
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-transparent text-sm text-slate-700 outline-none" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}</button>
              </div>
            </div>
          </div>

          {error && <div className="mt-4 rounded-2xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}

          <div className="mt-5 flex items-center justify-between text-sm text-slate-600">
            <span>Forgot password?</span>
            <Link to="/signup" className="font-medium text-forest-700">Create account</Link>
          </div>

          <button type="submit" disabled={loading} className="mt-6 w-full rounded-full bg-forest-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-forest-600 disabled:opacity-60">
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
