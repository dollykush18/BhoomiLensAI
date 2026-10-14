import { Heart, MapPin, BedDouble, Bath, Ruler, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function PropertyCard({ property }) {
  const { favourites, toggleFavourite } = useAppContext()
  const isFavourite = favourites.includes(property.id)

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative">
        <img src={property.image} alt={property.title} className="h-56 w-full object-cover" />
        <button
          type="button"
          onClick={() => toggleFavourite(property.id)}
          className={`absolute right-4 top-4 rounded-full p-2 ${isFavourite ? 'bg-rose-100 text-rose-600' : 'bg-white/90 text-slate-700'}`}
        >
          <Heart className={`h-4 w-4 ${isFavourite ? 'fill-current' : ''}`} />
        </button>
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-forest-700">
          {property.listingStatus === 'approved' ? 'Approved' : 'Pending'}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{property.title}</h3>
            <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-4 w-4" />
              {property.location}
            </div>
          </div>
          {property.verificationStatus && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-medium text-emerald-700">
              <ShieldCheck className="h-3 w-3" />
              {property.verificationStatus}
            </span>
          )}
        </div>

        <div className="text-2xl font-bold text-forest-700">₹{property.price.toLocaleString('en-IN')}</div>

        <div className="grid grid-cols-3 gap-3 border-y border-slate-200 py-3 text-sm text-slate-600">
          <div className="flex items-center gap-1"><BedDouble className="h-4 w-4" /> {property.bedrooms} Beds</div>
          <div className="flex items-center gap-1"><Bath className="h-4 w-4" /> {property.bathrooms} Bath</div>
          <div className="flex items-center gap-1"><Ruler className="h-4 w-4" /> {property.area} sq.ft</div>
        </div>

        <div className="flex items-center justify-between">
          <span className="rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-forest-700">{property.propertyType}</span>
          <Link to={`/properties/${property.id}`} className="rounded-full bg-forest-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-forest-600">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
