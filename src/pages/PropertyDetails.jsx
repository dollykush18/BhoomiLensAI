import { Bath, BedDouble, Heart, MapPin, Ruler, ShieldCheck, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import { useAppContext } from '../context/AppContext'

export default function PropertyDetails() {
  const { id } = useParams()
  const { properties, favourites, toggleFavourite } = useAppContext()
  const property = properties.find((item) => item.id === id)

  if (!property) {
    return <div className="mx-auto max-w-4xl px-4 py-16 text-center text-slate-500">This property could not be found.</div>
  }

  const similar = properties.filter((item) => item.id !== property.id && item.propertyType === property.propertyType).slice(0, 3)
  const estimatedValue = Math.round(property.price * 1.08)
  const difference = estimatedValue - property.price

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Property Details</div>
          <h1 className="text-4xl font-bold text-slate-900">{property.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => toggleFavourite(property.id)} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium ${favourites.includes(property.id) ? 'border-rose-200 bg-rose-100 text-rose-600' : 'border-slate-200 bg-white text-slate-700'}`}>
            <Heart className={`h-4 w-4 ${favourites.includes(property.id) ? 'fill-current' : ''}`} />
            Favourite
          </button>
          <Link to="#" className="rounded-full bg-forest-700 px-5 py-2.5 text-sm font-semibold text-white">Contact Seller</Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.3fr,0.7fr]">
        <div>
          <img src={property.image} alt={property.title} className="h-[420px] w-full rounded-[2rem] object-cover shadow-md" />
          <div className="mt-4 grid grid-cols-3 gap-4">
            {[property.image, property.image, property.image].map((img, index) => (
              <img key={index} src={img} alt={`${property.title} ${index + 1}`} className="h-28 w-full rounded-2xl object-cover" />
            ))}
          </div>
        </div>

        <div className="space-y-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Listed Price</div>
              <div className="mt-2 text-3xl font-bold text-forest-700">₹{property.price.toLocaleString('en-IN')}</div>
            </div>
            <div className="rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-forest-700">{property.listingType}</div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-400">Type</div><div className="mt-1 font-semibold text-slate-800">{property.propertyType}</div></div>
            <div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-400">Area</div><div className="mt-1 font-semibold text-slate-800">{property.area} sq.ft</div></div>
            <div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-400">Bedrooms</div><div className="mt-1 font-semibold text-slate-800">{property.bedrooms}</div></div>
            <div className="rounded-2xl bg-slate-50 p-3"><div className="text-slate-400">Bathrooms</div><div className="mt-1 font-semibold text-slate-800">{property.bathrooms}</div></div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><MapPin className="h-4 w-4 text-forest-700" /> {property.location}</div>
            <div className="mt-3 text-sm text-slate-600">{property.description}</div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-2 text-sm font-semibold text-slate-900">Document Review Status</div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700"><ShieldCheck className="h-3.5 w-3.5" /> Under Review</div>
            <p className="mt-3 text-sm text-slate-600">The listing is separate from document review. Documents may be checked according to the platform process, but this does not guarantee legal ownership or a perfect review outcome.</p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr,0.8fr]">
        <div className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Amenities</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {property.amenities.map((item) => (
                <span key={item} className="rounded-full bg-sage-100 px-3 py-2 text-xs font-medium text-forest-700">{item}</span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">Seller information</h2>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <div className="font-semibold text-slate-900">Seller: {property.sellerId}</div>
              <div className="mt-2">Response time: Typically within 24 hours</div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">AI Price Estimate</h2>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Estimated value</div>
                  <div className="mt-2 text-3xl font-bold text-slate-900">₹{estimatedValue.toLocaleString('en-IN')}</div>
                </div>
                <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">+₹{difference.toLocaleString('en-IN')}</div>
              </div>
              <p className="mt-4 text-sm text-slate-600">This demo estimate is based on factors such as location, layout, area, bedrooms, amenities and current listing context.</p>
              <p className="mt-2 text-xs text-slate-500">Valuation disclaimer: Demo estimate only. This is not a guaranteed price appraisal or legal valuation.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Similar properties</h2>
          <div className="mt-4 space-y-4">
            {similar.map((item) => (
              <Link key={item.id} to={`/properties/${item.id}`} className="flex gap-3 rounded-2xl border border-slate-200 p-3 hover:border-forest-700">
                <img src={item.image} alt={item.title} className="h-20 w-24 rounded-xl object-cover" />
                <div>
                  <div className="font-semibold text-slate-900">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.location}</div>
                  <div className="mt-2 text-sm font-bold text-forest-700">₹{item.price.toLocaleString('en-IN')}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
