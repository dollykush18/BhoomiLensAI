import { useEffect, useState } from 'react'
import { api } from '../api.js'

const FIELDS = ['item', 'title', 'price', 'area', 'location', 'link', 'image', 'retailerName', 'retailerPhone', 'retailerAgency', 'nextPage']
const blank = { name: '', baseUrl: '', listUrls: [], enabled: false, useJsonLd: true, maxPages: 3, selectors: {} }

export default function Sources() {
  const [sources, setSources] = useState([])
  const [editing, setEditing] = useState(null)
  const [busy, setBusy] = useState('')
  const [message, setMessage] = useState('')

  const load = () => api('/admin/sources').then(setSources).catch((e) => setMessage(e.message))
  useEffect(() => { load() }, [])

  async function save(e) {
    e.preventDefault()
    try {
      const body = { ...editing, listUrls: editing.listUrls.filter(Boolean) }
      if (editing._id) await api(`/admin/sources/${editing._id}`, { method: 'PUT', body })
      else await api('/admin/sources', { method: 'POST', body })
      setEditing(null)
      load()
    } catch (err) {
      setMessage(err.message)
    }
  }

  async function run(id) {
    setBusy(id)
    setMessage('')
    try {
      const r = await api(`/admin/sources/${id}/scrape`, { method: 'POST' })
      setMessage(`${r.sourceName}: ${r.status} — found ${r.found}, new ${r.created}, updated ${r.updated}${r.errors.length ? ` · ${r.errors[0]}` : ''}`)
      load()
    } catch (err) {
      setMessage(err.message)
    } finally {
      setBusy('')
    }
  }

  async function remove(id) {
    if (!confirm('Delete this source? Listings already collected are kept.')) return
    await api(`/admin/sources/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <>
      <h2>Sources &amp; Scraping</h2>
      <p className="hint">
        Only enable a site after checking its terms of use and robots.txt. The scraper obeys robots.txt and
        rate-limits requests. Scraped listings arrive as <b>pending</b> until you approve them.
      </p>
      {message && <p className="notice">{message}</p>}
      <div className="row">
        <button onClick={() => setEditing({ ...blank })}>+ Add source</button>
        <button onClick={async () => { setBusy('all'); try { await api('/admin/scrape/all', { method: 'POST' }); setMessage('Scrape of all enabled sources finished'); load() } catch (e) { setMessage(e.message) } finally { setBusy('') } }} disabled={!!busy}>
          {busy === 'all' ? 'Running…' : 'Scrape all enabled'}
        </button>
      </div>

      <table>
        <thead><tr><th>Name</th><th>Enabled</th><th>URLs</th><th>Last run</th><th></th></tr></thead>
        <tbody>
          {sources.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td><td>{s.enabled ? 'Yes' : 'No'}</td><td>{s.listUrls.length}</td>
              <td>{s.lastRunAt ? `${s.lastRunStatus} · ${new Date(s.lastRunAt).toLocaleString()}` : '—'}</td>
              <td className="row">
                <button onClick={() => run(s._id)} disabled={!!busy || !s.listUrls.length}>{busy === s._id ? 'Running…' : 'Scrape now'}</button>
                <button className="ghost" onClick={() => setEditing({ ...blank, ...s, selectors: s.selectors || {} })}>Edit</button>
                <button className="danger" onClick={() => remove(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <form className="card editor" onSubmit={save}>
          <h3>{editing._id ? 'Edit' : 'New'} source</h3>
          <label>Name<input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} required /></label>
          <label>Base URL<input value={editing.baseUrl} onChange={(e) => setEditing({ ...editing, baseUrl: e.target.value })} required /></label>
          <label>List page URLs (one per line — Lucknow land/plot search pages)
            <textarea rows="3" value={editing.listUrls.join('\n')} onChange={(e) => setEditing({ ...editing, listUrls: e.target.value.split('\n').map((x) => x.trim()) })} />
          </label>
          <label>Max pages per URL<input type="number" min="1" max="50" value={editing.maxPages} onChange={(e) => setEditing({ ...editing, maxPages: Number(e.target.value) })} /></label>
          <label className="check"><input type="checkbox" checked={editing.useJsonLd} onChange={(e) => setEditing({ ...editing, useJsonLd: e.target.checked })} /> Try JSON-LD structured data first</label>
          <label className="check"><input type="checkbox" checked={editing.enabled} onChange={(e) => setEditing({ ...editing, enabled: e.target.checked })} /> Enabled</label>
          <h4>CSS selectors (relative to each listing card, except “item” and “nextPage”)</h4>
          <div className="grid">
            {FIELDS.map((f) => (
              <label key={f}>{f}
                <input value={editing.selectors[f] || ''} onChange={(e) => setEditing({ ...editing, selectors: { ...editing.selectors, [f]: e.target.value } })} />
              </label>
            ))}
          </div>
          <div className="row">
            <button>Save</button>
            <button type="button" className="ghost" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      )}
    </>
  )
}
