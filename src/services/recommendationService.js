import { properties } from '../data/properties'

export const getRecommendations = async (preferences = {}) => {
  return properties
    .filter((item) => item.listingStatus === 'approved')
    .map((property) => {
      let score = 78
      if (preferences.location && property.location.toLowerCase().includes(preferences.location.toLowerCase())) score += 12
      if (preferences.bedrooms && property.bedrooms >= Number(preferences.bedrooms)) score += 8
      if (preferences.propertyType && property.propertyType === preferences.propertyType) score += 10
      if (preferences.budget && property.price <= Number(preferences.budget)) score += 10
      return { ...property, score: Math.min(score, 98), reason: 'Strong fit for your budget and preferred property features.' }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
}
