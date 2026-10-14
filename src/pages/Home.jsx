import { ArrowRight, Bot, CheckCircle2, MapPin, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import { useAppContext } from '../context/AppContext'

const features = [
  { icon: Sparkles, title: 'AI Property Recommendations', text: 'Get tailored suggestions based on budget, preferred area, and lifestyle needs.' },
  { icon: TrendingUp, title: 'ML Price Prediction', text: 'Explore a demo price estimate using property attributes and listing context.' },
  { icon: Bot, title: 'AI Property Assistant', text: 'Ask natural-language questions and receive matching listings from the demo dataset.' },
  { icon: ShieldCheck, title: 'Document Verification', text: 'Track document review and submission status without exposing private materials publicly.' },
]

export default function Home() {
  const navigate = useNavigate()
  const { properties } = useAppContext()
  const [searchFields, setSearchFields] = useState({ location: '', type: 'Any', budget: '', listingType: 'Buy' })

  const featured = properties.filter((property) => property.listingStatus === 'approved').slice(0, 6)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchFields.location) params.set('location', searchFields.location)
    if (searchFields.type !== 'Any') params.set('type', searchFields.type)
    if (searchFields.budget) params.set('maxPrice', searchFields.budget)
    if (searchFields.listingType) params.set('listingType', searchFields.listingType)
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <div className="bg-slate-50 text-slate-800">
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-700 via-forest-700 to-emerald-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[1.15fr,0.85fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-100">
              <Sparkles className="h-3.5 w-3.5" /> Smart property discovery
            </div>
            <h1 className="max-w-xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">Find Your Dream Property</h1>
            <p className="mt-5 max-w-xl text-base text-emerald-50 md:text-lg">
              Discover properties with AI-powered recommendations, estimated price insights, and a smarter, more transparent way to buy and sell.
            </p>

            <div className="mt-8 grid gap-4 rounded-3xl bg-white/10 p-4 backdrop-blur-sm md:grid-cols-2 xl:grid-cols-4">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-emerald-100">Location</label>
                <input value={searchFields.location} onChange={(e) => setSearchFields({ ...searchFields, location: e.target.value })} className="w-full rounded-2xl border border-white/20 bg-white/10 px-3 py-3 text-sm text-white placeholder:text-emerald-100 focus:outline-none" placeholder="Jhansi" />
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-emerald-100">Type</label>
                <select value={searchFields.type} onChange={(e) => setSearchFields({ ...searchFields, type: e.target.value })} className="w-full rounded-2xl border border-white/20 bg-white/10 px-3 py-3 text-sm text-white focus:outline-none">
                  <option className="text-slate-800">Any</option>
                  <option className="text-slate-800">House</option>
                  <option className="text-slate-800">Apartment</option>
                  <option className="text-slate-800">Villa</option>
                  <option className="text-slate-800">Studio</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-emerald-100">Budget</label>
                <input value={searchFields.budget} onChange={(e) => setSearchFields({ ...searchFields, budget: e.target.value })} className="w-full rounded-2xl border border-white/20 bg-white/10 px-3 py-3 text-sm text-white placeholder:text-emerald-100 focus:outline-none" placeholder="₹40 lakh" />
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-emerald-100">Buy / Rent</label>
                <select value={searchFields.listingType} onChange={(e) => setSearchFields({ ...searchFields, listingType: e.target.value })} className="w-full rounded-2xl border border-white/20 bg-white/10 px-3 py-3 text-sm text-white focus:outline-none">
                  <option className="text-slate-800">Buy</option>
                  <option className="text-slate-800">Rent</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button onClick={handleSearch} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-forest-700 shadow-sm">Search Properties <ArrowRight className="h-4 w-4" /></button>
              <Link to="/properties" className="text-sm font-medium text-emerald-100">Explore listings</Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-[2rem] bg-white/10 blur-3xl" />
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Modern house" className="relative h-[440px] w-full rounded-[2rem] border border-white/20 object-cover shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-forest-700">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Featured Listings</div>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Curated Homes for Smart Buyers</h2>
          </div>
          <Link to="/properties" className="text-sm font-semibold text-forest-700">View All Properties</Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">How it works</div>
            <h3 className="mt-3 text-3xl font-bold text-slate-900">How BhoomiLensAI Works</h3>
            <div className="mt-6 space-y-5">
              {['Set your search preferences and budget.', 'Review AI-assisted recommendations and estimated value.', 'Compare listings, enquire, and track document status.'].map((item, index) => (
                <div key={item} className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-700 text-sm font-bold text-white">{index + 1}</div>
                  <p className="text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Why choose us</div>
            <h3 className="mt-3 text-3xl font-bold text-slate-900">Why Choose BhoomiLensAI</h3>
            <ul className="mt-6 space-y-4">
              {['Transparent listing flow for buyers and sellers.', 'Fewer broker dependencies through direct communication.', 'AI discovery plus price estimates for informed decisions.', 'Document review workflow with clear status tracking.'].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Document Review</div>
              <h3 className="mt-3 text-2xl font-bold text-slate-900">How document review works</h3>
              <p className="mt-4 text-slate-600">Sellers upload relevant property documents, admins review them, and users can track status updates without exposing private content on public pages.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Direct communication</div>
              <h3 className="mt-3 text-2xl font-bold text-slate-900">Benefits of direct buyer-seller communication</h3>
              <p className="mt-4 text-slate-600">Buyers can enquire directly, ask for visit details, and discuss key property information without unnecessary middlemen.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Seller growth</div>
              <h3 className="mt-3 text-2xl font-bold text-slate-900">Launch your property listing</h3>
              <p className="mt-4 text-slate-600">Publish new listings, track approval flow, and keep document review separate from property availability for a transparent experience.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-forest-700 px-8 py-10 text-center text-white md:flex-row md:text-left">
          <div>
            <div className="text-sm uppercase tracking-[0.18em] text-emerald-100">For sellers</div>
            <h3 className="mt-2 text-3xl font-bold">List smarter. Communicate clearer.</h3>
          </div>
          <Link to="/signup" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-forest-700">Create seller account</Link>
        </div>
      </section>
    </div>
  )
}
