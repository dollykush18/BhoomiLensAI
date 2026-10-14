import { useAppContext } from '../context/AppContext'
import PropertyCard from '../components/PropertyCard'

export default function BuyerFavorites() {
  const { favourites, properties } = useAppContext()
  const items = properties.filter((property) => favourites.includes(property.id))

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Saved homes</div>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Favourite properties</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.length ? items.map((property) => <PropertyCard key={property.id} property={property} />) : <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">No saved properties yet.</div>}
      </div>
    </div>
  )
}
