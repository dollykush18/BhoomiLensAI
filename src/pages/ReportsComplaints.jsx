import { useAppContext } from '../context/AppContext'
import StatusBadge from '../components/StatusBadge'

export default function ReportsComplaints() {
  const { reports } = useAppContext()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Reports & complaints</div>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Review reported listings</h1>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Reported property</th>
              <th className="px-4 py-3">Reporter</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Submission date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t border-slate-200">
                <td className="px-4 py-3 text-slate-900">{report.propertyId}</td>
                <td className="px-4 py-3 text-slate-600">{report.reporter}</td>
                <td className="px-4 py-3 text-slate-600">{report.reason}</td>
                <td className="px-4 py-3 text-slate-600">{report.date}</td>
                <td className="px-4 py-3"><StatusBadge status={report.reviewStatus} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
