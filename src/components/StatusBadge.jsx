export default function StatusBadge({ status }) {
  const palette = {
    'Submitted': 'bg-blue-100 text-blue-700',
    'Under Review': 'bg-amber-100 text-amber-700',
    'Additional Information Required': 'bg-amber-100 text-amber-700',
    'Reviewed': 'bg-emerald-100 text-emerald-700',
    'Rejected': 'bg-red-100 text-red-700',
    'Approved': 'bg-emerald-100 text-emerald-700',
    'Pending': 'bg-slate-200 text-slate-700',
    'Open': 'bg-sky-100 text-sky-700',
  }

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${palette[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  )
}
