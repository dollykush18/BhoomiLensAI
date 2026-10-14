import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import StatusBadge from '../components/StatusBadge'

export default function SellerDocumentVerification() {
  const { currentUser, documents, updateDocumentStatus } = useAppContext()
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileType, setFileType] = useState('Sale deed / conveyance deed')
  const sellerDocuments = documents.filter((item) => item.sellerId === currentUser?.id)

  const handleUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return
    setSelectedFile({ name: file.name, size: `${(file.size / 1024 / 1024).toFixed(1)} MB` })
  }

  const submitDocument = () => {
    if (!selectedFile) return
    updateDocumentStatus(sellerDocuments[0]?.id || 'doc-1', 'Submitted', 'Document uploaded and queued for review.')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Document verification</div>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Upload and track documents</h1>
      </div>

      <div className="mb-8 rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 shadow-sm">
        <div className="grid gap-5 lg:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Document type</label>
            <select value={fileType} onChange={(e) => setFileType(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
              <option>Sale deed / conveyance deed</option>
              <option>Previous ownership/title chain documents</option>
              <option>Property tax receipt</option>
              <option>Encumbrance certificate</option>
              <option>Approved building plan</option>
              <option>Other supporting documents</option>
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Upload document</label>
            <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleUpload} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
            {selectedFile && <div className="mt-3 text-sm text-slate-600">Selected: {selectedFile.name} ({selectedFile.size})</div>}
          </div>
        </div>

        <button onClick={submitDocument} className="mt-6 rounded-full bg-forest-700 px-5 py-3 text-sm font-semibold text-white">Submit documents for review</button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sellerDocuments.map((document) => (
          <div key={document.id} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-900">{document.type}</div>
              <StatusBadge status={document.status} />
            </div>
            <div className="mt-4 text-sm text-slate-600">Filename: {document.filename}</div>
            <div className="mt-2 text-sm text-slate-600">Upload date: {document.uploadDate}</div>
            <div className="mt-2 text-sm text-slate-600">File size: {document.size}</div>
            {document.reviewFeedback && <div className="mt-4 rounded-2xl bg-amber-50 p-3 text-sm text-amber-700">{document.reviewFeedback}</div>}
            <button className="mt-4 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">View / Replace</button>
          </div>
        ))}
      </div>
    </div>
  )
}
