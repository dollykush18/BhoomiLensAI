import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function DocumentReviewDetails() {
  const { id } = useParams()
  const { documents } = useAppContext()
  const document = documents.find((item) => item.id === id)

  if (!document) return <div className="mx-auto max-w-5xl px-4 py-16 text-slate-500">Document not found.</div>

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Document review details</div>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">{document.type}</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <div>Seller: {document.sellerId}</div>
            <div className="mt-2">Property: {document.propertyId}</div>
            <div className="mt-2">Status: {document.status}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <div>OCR status: {document.ocrStatus}</div>
            <div className="mt-2">Feedback: {document.reviewFeedback || 'No reviewer feedback yet.'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
