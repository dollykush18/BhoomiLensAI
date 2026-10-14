import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import StatusBadge from '../components/StatusBadge'

export default function AdminDocumentVerification() {
  const { documents, updateDocumentStatus } = useAppContext()
  const [search, setSearch] = useState('')

  const filtered = documents.filter((item) => {
    const text = `${item.type} ${item.propertyId} ${item.sellerId}`.toLowerCase()
    return text.includes(search.toLowerCase())
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Admin document review</div>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Document verification queue</h1>
      </div>

      <div className="mb-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" placeholder="Search by seller, property or document type" />
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Seller</th>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Document Type</th>
              <th className="px-4 py-3">Submission</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">OCR</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((document) => (
              <tr key={document.id} className="border-t border-slate-200">
                <td className="px-4 py-3">{document.sellerId}</td>
                <td className="px-4 py-3">{document.propertyId}</td>
                <td className="px-4 py-3">{document.type}</td>
                <td className="px-4 py-3">{document.uploadDate}</td>
                <td className="px-4 py-3"><StatusBadge status={document.status} /></td>
                <td className="px-4 py-3">{document.ocrStatus}</td>
                <td className="px-4 py-3 space-x-2">
                  <button onClick={() => updateDocumentStatus(document.id, 'Reviewed', 'Review completed with preliminary OCR check. Final decision still requires human validation.')} className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">Mark Reviewed</button>
                  <button onClick={() => updateDocumentStatus(document.id, 'Additional Information Required', 'Please provide the latest tax receipt and ownership record.')} className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700">Request More Info</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
