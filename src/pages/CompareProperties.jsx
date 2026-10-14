import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function CompareProperties() {
  const { properties } = useAppContext()
  const approved = properties.filter((property) => property.listingStatus === 'approved').slice(0, 3)
  const [selected, setSelected] = useState([approved[0]?.id, approved[1]?.id])

  const selectedProperties = approved.filter((property) => selected.includes(property.id))

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Property comparison</div>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Compare your options</h1>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        {approved.map((property) => (
          <label key={property.id} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
            <input type="checkbox" checked={selected.includes(property.id)} onChange={() => setSelected((prev) => prev.includes(property.id) ? prev.filter((id) => id !== property.id) : [...prev, property.id].slice(0, 3))} />
            {property.title}
          </label>
        ))}
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Attribute</th>
              {selectedProperties.map((property) => <th key={property.id} className="px-4 py-3">{property.title}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              ['Price', (item) => `₹${item.price.toLocaleString('en-IN')}`],
              ['Location', (item) => item.location],
              ['Type', (item) => item.propertyType],
              ['Bedrooms', (item) => item.bedrooms],
              ['Bathrooms', (item) => item.bathrooms],
              ['Area', (item) => `${item.area} sq.ft`],
              ['Parking', (item) => item.parking],
            ].map(([label, formatter]) => (
              <tr key={label} className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium text-slate-900">{label}</td>
                {selectedProperties.map((property) => <td key={`${label}-${property.id}`} className="px-4 py-3 text-slate-600">{formatter(property)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
