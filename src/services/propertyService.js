import { properties } from '../data/properties'

export const getApprovedProperties = async () => properties.filter((item) => item.listingStatus === 'approved')

export const getPropertyById = async (id) => properties.find((item) => item.id === id)

export const addProperty = async (property) => ({ success: true, property: { ...property, id: property.id || `prop-${Date.now()}` } })

export const updatePropertyStatus = async (propertyId, status) => {
  const target = properties.find((item) => item.id === propertyId)
  if (!target) return { success: false }
  target.listingStatus = status
  return { success: true, property: target }
}
