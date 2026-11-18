import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, qs } from '../api.js'

export default function Retailers() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [data, setData] = useState({ items: [], total: 0 })
  const [error, setError] = useState('')

  useEffect(() => {
    const t = setTimeout(() => {
      api(`/admin/retailers?${qs({ q, status })}`).then(setData).catch((e) => setError(e.message))
    }, 250)
    return () => clearTimeout(t)
  }, [q, status])

  return (
    <>
      <h2>Retailers <small>({data.total})</small></h2>
      <div className="toolbar">
        <input placeholder="Search name, phone, agency" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
      {error && <p className="error">{error}</p>}
      <table>
        <thead><tr><th>Name</th><th>Agency</th><th>Phone</th><th>Source</th><th>Listings</th><th>Verified</th><th>Status</th></tr></thead>
        <tbody>
          {data.items.map((r) => (
            <tr key={r._id}>
              <td><Link to={`/retailers/${r._id}`}>{r.name}</Link></td>
              <td>{r.agency}</td><td>{r.phone}</td><td>{r.sourceName}</td>
              <td>{r.listingCount}</td><td>{r.verified ? 'Yes' : 'No'}</td><td>{r.status}</td>
            </tr>
          ))}
          {!data.items.length && <tr><td colSpan="7">No retailers found</td></tr>}
        </tbody>
      </table>
    </>
  )
}
