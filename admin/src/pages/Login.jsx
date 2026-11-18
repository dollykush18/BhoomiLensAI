import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, setToken } from '../api.js'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')
    try {
      const { token } = await api('/auth/login', { method: 'POST', body: form })
      setToken(token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form className="login card" onSubmit={submit}>
      <h2>Admin sign in</h2>
      {error && <p className="error">{error}</p>}
      <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <button>Sign in</button>
    </form>
  )
}
