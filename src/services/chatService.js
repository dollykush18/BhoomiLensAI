import { properties } from '../data/properties'

export const getDemoChatReply = async (message) => {
  const text = message.toLowerCase()

  const matches = properties.filter((property) => {
    if (text.includes('jhansi') && property.location.toLowerCase().includes('jhansi')) return true
    if (text.includes('2 bhk') && property.bedrooms >= 2) return true
    if (text.includes('parking') && property.amenities.some((item) => item.toLowerCase().includes('parking'))) return true
    if (text.includes('house') && property.propertyType.toLowerCase().includes('house')) return true
    return false
  })

  return {
    reply: 'I found a few properties matching your request in the current demo dataset. These are the best matches based on your filters.',
    matches: matches.slice(0, 3),
    demoMode: true,
  }
}
