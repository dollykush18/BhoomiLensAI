import { demoEnquiries } from '../data/properties'

export const getEnquiries = async () => demoEnquiries

export const addEnquiry = async (payload) => {
  const newItem = { id: `enq-${Date.now()}`, ...payload, status: 'Open' }
  demoEnquiries.push(newItem)
  return { success: true, enquiry: newItem }
}
