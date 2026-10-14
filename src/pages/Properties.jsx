import { useEffect, useMemo, useState } from 'react'
import { Filter, Search, SlidersHorizontal } from 'lucide-react'
import PropertyCard from '../components/PropertyCard'
import { useAppContext } from '../context/AppContext'

const defaultFilters = {
  location: '',
  propertyType: 'Any',
  listingType: 'Any',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  bathrooms: '',
  minArea: '',
  parking: '',
  sortBy: 'newest',
}

export default function Properties() {
  const { properties } = useAppContext()
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState(defaultFilters)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(timer)
  }, [])

  const visible = useMemo(() => {
    const approved = properties.filter((property) => property.listingStatus === 'approved')
    return approved
      .filter((property) => {
        const matchesLocation = !filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase())
        const matchesType = filters.propertyType === 'Any' || property.propertyType === filters.propertyType
        const matchesListing = filters.listingType === 'Any' || property.listingType === filters.listingType
        const matchesMinPrice = !filters.minPrice || property.price >= Number(filters.minPrice)
        const matchesMaxPrice = !filters.maxPrice || property.price <= Number(filters.maxPrice)
        const matchesBedrooms = !filters.bedrooms || property.bedrooms >= Number(filters.bedrooms)
        const matchesBathrooms = !filters.bathrooms || property.bathrooms >= Number(filters.bathrooms)
        const matchesArea = !filters.minArea || property.area >= Number(filters.minArea)
        const matchesParking = !filters.parking || property.parking >= Number(filters.parking)

        return matchesLocation && matchesType && matchesListing && matchesMinPrice && matchesMaxPrice && matchesBedrooms && matchesBathrooms && matchesArea && matchesParking
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return a.price - b.price
        if (filters.sortBy === 'price-high') return b.price - a.price
        return new Date(b.submissionDate) - new Date(a.submissionDate)
      })
  }, [filters, properties])

  const applyFilter = (field, value) => setFilters((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Property discovery</div>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">Explore Approved Listings</h1>
        </div>
        <div className="rounded-full bg-sage-100 px-3 py-2 text-sm font-medium text-forest-700">{visible.length} matches</div>
      </div>

      <div className="mb-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-6">
        <div className="lg:col-span-2">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Location or keyword</label>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <Search className="h-4 w-4 text-slate-400" />
            <input value={filters.location} onChange={(e) => applyFilter('location', e.target.value)} className="w-full bg-transparent text-sm text-slate-700 outline-none" placeholder="Jhansi, Civil Lines" />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Type</label>
          <select value={filters.propertyType} onChange={(e) => applyFilter('propertyType', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none">
            <option>Any</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Studio</option>
            <option>Duplex</option>
            <option>Bungalow</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Buy/Rent</label>
          <select value={filters.listingType} onChange={(e) => applyFilter('listingType', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none">
            <option>Any</option>
            <option>Buy</option>
            <option>Rent</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Min price</label>
          <input type="number" value={filters.minPrice} onChange={(e) => applyFilter('minPrice', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none" placeholder="2500000" />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Max price</label>
          <input type="number" value={filters.maxPrice} onChange={(e) => applyFilter('maxPrice', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none" placeholder="5000000" />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Sort by</label>
          <select value={filters.sortBy} onChange={(e) => applyFilter('sortBy', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none">
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="lg:col-span-2">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Bedrooms</label>
          <input type="number" value={filters.bedrooms} onChange={(e) => applyFilter('bedrooms', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none" placeholder="2" />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Bathrooms</label>
          <input type="number" value={filters.bathrooms} onChange={(e) => applyFilter('bathrooms', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none" placeholder="2" />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Min area</label>
          <input type="number" value={filters.minArea} onChange={(e) => applyFilter('minArea', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none" placeholder="1200" />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Parking</label>
          <input type="number" value={filters.parking} onChange={(e) => applyFilter('parking', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none" placeholder="1" />
        </div>

        <div className="flex items-end lg:col-span-6">
          <button type="button" onClick={() => setFilters(defaultFilters)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">
            <SlidersHorizontal className="h-4 w-4" /> Clear Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">Loading properties...</div>
      ) : visible.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">No approved properties match the current filters.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((property) => <PropertyCard key={property.id} property={property} />)}
        </div>
      )}
    </div>
  )
}
