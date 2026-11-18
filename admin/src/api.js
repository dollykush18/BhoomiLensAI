const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const getToken = () => localStorage.getItem('admin_token')
export const setToken = (t) => (t ? localStorage.setItem('admin_token', t) : localStorage.removeItem('admin_token'))

export async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (res.status === 401 && path !== '/auth/login') {
    setToken(null)
    window.location.href = '/login'
    throw new Error('Session expired')
  }
  if (res.status === 204) return null
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`)
  return data
}

export const qs = (params) => {
  const p = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => v !== '' && v != null && p.set(k, v))
  return p.toString()
}
