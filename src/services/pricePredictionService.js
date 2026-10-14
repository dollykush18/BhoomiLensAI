export const getPricePrediction = async (input) => {
  const base = Number(input.price || input.area || 1000)
  const estimate = Math.round(base * 0.92 + Number(input.bedrooms || 1) * 250000 + Number(input.area || 0) * 120)

  return {
    estimate,
    summary: `Estimated value for a ${input.propertyType || 'property'} in ${input.location || 'Jhansi'} with ${input.bedrooms || 2} bedrooms.`,
    disclaimer: 'Demo estimate only — this is not a guaranteed valuation and should not be treated as a professional appraisal.',
    demoMode: true,
  }
}
