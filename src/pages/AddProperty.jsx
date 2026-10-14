import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const initialForm = {
  title: '',
  description: '',
  propertyType: 'House',
  listingType: 'Buy',
  price: '',
  location: '',
  area: '',
  bedrooms: '2',
  bathrooms: '2',
  furnishing: 'Semi-Furnished',
  parking: '1',
  amenities: 'Parking, Garden, Security',
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
}

export default function AddProperty() {
  const navigate = useNavigate()
  const { currentUser, addProperty } = useAppContext()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title || !form.description || !form.location || !form.price || !form.area) {
      setError('Please fill in the required fields before submitting.')
      return
    }

    addProperty({
      ...form,
      price: Number(form.price),
      area: Number(form.area),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      parking: Number(form.parking),
      sellerId: currentUser?.id || 'seller-1',
      amenities: form.amenities.split(',').map((item) => item.trim()).filter(Boolean),
    })

    setError('')
    setSuccess('Property submitted successfully and marked as pending approval.')
    setTimeout(() => navigate('/seller/dashboard'), 800)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Seller submission</div>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Add Property</h1>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
            <input value={form.title} onChange={(e) => handleChange('title', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" required />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
            <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={4} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Property Type</label>
            <select value={form.propertyType} onChange={(e) => handleChange('propertyType', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
              <option>House</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Duplex</option>
              <option>Studio</option>
              <option>Bungalow</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Sale or Rent</label>
            <select value={form.listingType} onChange={(e) => handleChange('listingType', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
              <option>Buy</option>
              <option>Rent</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Price</label>
            <input type="number" value={form.price} onChange={(e) => handleChange('price', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Location</label>
            <input value={form.location} onChange={(e) => handleChange('location', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Area (sq.ft)</label>
            <input type="number" value={form.area} onChange={(e) => handleChange('area', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Bedrooms</label>
            <input type="number" value={form.bedrooms} onChange={(e) => handleChange('bedrooms', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Bathrooms</label>
            <input type="number" value={form.bathrooms} onChange={(e) => handleChange('bathrooms', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Furnishing</label>
            <select value={form.furnishing} onChange={(e) => handleChange('furnishing', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
              <option>Semi-Furnished</option>
              <option>Fully Furnished</option>
              <option>Unfurnished</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Parking</label>
            <input type="number" value={form.parking} onChange={(e) => handleChange('parking', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Amenities</label>
            <input value={form.amenities} onChange={(e) => handleChange('amenities', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Property image URL</label>
            <input value={form.image} onChange={(e) => handleChange('image', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
          </div>
        </div>

        {error && <div className="mt-5 rounded-2xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}
        {success && <div className="mt-5 rounded-2xl bg-emerald-50 px-3 py-2 text-sm text-emerald-600">{success}</div>}

        <div className="mt-8 flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/seller/dashboard')} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700">Cancel</button>
          <button type="submit" className="rounded-full bg-forest-700 px-6 py-3 text-sm font-semibold text-white">Submit for Approval</button>
        </div>
      </form>
    </div>
  )
}
