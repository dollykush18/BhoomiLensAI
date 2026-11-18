import { useEffect, useState } from 'react'
import { api } from '../api.js'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api('/admin/stats').then(setStats).catch((e) => setError(e.message))
  }, [])

  if (error) return <p className="error">{error}</p>
  if (!stats) return <p>Loading…</p>

  return (
    <>
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="card"><b>{stats.retailers}</b>Retailers</div>
        <div className="card"><b>{stats.listings}</b>Listings</div>
        <div className="card"><b>{stats.pending}</b>Pending review</div>
        <div className="card"><b>{stats.sources}</b>Active sources</div>
      </div>
      <h3>Recent scrape runs</h3>
      <table>
        <thead><tr><th>Source</th><th>Status</th><th>Found</th><th>New</th><th>When</th></tr></thead>
        <tbody>
          {stats.lastRuns.map((r) => (
            <tr key={r._id}>
              <td>{r.sourceName}</td><td>{r.status}</td><td>{r.found}</td><td>{r.created}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
            </tr>
          ))}
          {!stats.lastRuns.length && <tr><td colSpan="5">No runs yet</td></tr>}
        </tbody>
      </table>
    </>
  )
}
