import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api.js'

export default function RetailerDetail() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api(`/admin/retailers/${id}`).then(setData).catch((e) => setError(e.message))
  }, [id])

  async function patch(body) {
    const retailer = await api(`/admin/retailers/${id}`, { method: 'PATCH', body })
    setData((d) => ({ ...d, retailer }))
  }

  if (error) return <p className="error">{error}</p>
  if (!data) return <p>Loading…</p>
  const { retailer: r, listings } = data

  return (
    <>
      <p><Link to="/retailers">← Retailers</Link></p>
      <h2>{r.name}</h2>
      <div className="card">
        <p><b>Agency:</b> {r.agency || '—'}</p>
        <p><b>Phone:</b> {r.phone || '—'}</p>
        <p><b>Email:</b> {r.email || '—'}</p>
        <p><b>Source:</b> {r.sourceName || r.origin}</p>
        <p><b>Status:</b> {r.status} · <b>Verified:</b> {r.verified ? 'Yes' : 'No'}</p>
        <div className="row">
          <button onClick={() => patch({ verified: !r.verified })}>{r.verified ? 'Remove verification' : 'Mark verified'}</button>
          <button className="danger" onClick={() => patch({ status: r.status === 'blocked' ? 'active' : 'blocked' })}>
            {r.status === 'blocked' ? 'Unblock' : 'Block'}
          </button>
        </div>
      </div>
      <h3>Listings ({listings.length})</h3>
      <table>
        <thead><tr><th>Title</th><th>Location</th><th>Price</th><th>Status</th></tr></thead>
        <tbody>
          {listings.map((l) => (
            <tr key={l._id}>
              <td><a href={l.url} target="_blank" rel="noreferrer">{l.title}</a></td>
              <td>{l.location}</td><td>{l.price ? `₹${l.price.toLocaleString('en-IN')}` : l.priceText}</td><td>{l.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
