import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, qs } from '../api.js'

export default function Listings() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('pending')
  const [data, setData] = useState({ items: [], total: 0 })
  const [error, setError] = useState('')

  const load = useCallback(
    () => api(`/admin/listings?${qs({ q, status })}`).then(setData).catch((e) => setError(e.message)),
    [q, status],
  )

  useEffect(() => {
    const t = setTimeout(load, 250)
    return () => clearTimeout(t)
  }, [load])

  async function setListingStatus(id, s) {
    await api(`/admin/listings/${id}`, { method: 'PATCH', body: { status: s } })
    load()
  }

  return (
    <>
      <h2>Listings <small>({data.total})</small></h2>
      <div className="toolbar">
        <input placeholder="Search title or location" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      {error && <p className="error">{error}</p>}
      <table>
        <thead><tr><th>Title</th><th>Location</th><th>Price</th><th>Retailer</th><th>Source</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {data.items.map((l) => (
            <tr key={l._id}>
              <td><a href={l.url} target="_blank" rel="noreferrer">{l.title}</a></td>
              <td>{l.location}</td>
              <td>{l.price ? `₹${l.price.toLocaleString('en-IN')}` : l.priceText}</td>
              <td>{l.retailer ? <Link to={`/retailers/${l.retailer._id}`}>{l.retailer.name}</Link> : '—'}</td>
              <td>{l.sourceName}</td><td>{l.status}</td>
              <td className="row">
                <button onClick={() => setListingStatus(l._id, 'approved')}>Approve</button>
                <button className="danger" onClick={() => setListingStatus(l._id, 'rejected')}>Reject</button>
              </td>
            </tr>
          ))}
          {!data.items.length && <tr><td colSpan="7">No listings</td></tr>}
        </tbody>
      </table>
    </>
  )
}
