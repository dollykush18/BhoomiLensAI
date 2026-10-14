import { demoDocuments } from '../data/demoDocuments'

export const getDocumentsForSeller = async (sellerId) =>
  demoDocuments.filter((item) => item.sellerId === sellerId)

export const getAllDocuments = async () => demoDocuments

export const updateDocumentReview = async (documentId, status, reason) => {
  const target = demoDocuments.find((item) => item.id === documentId)
  if (!target) return { success: false }

  target.status = status
  target.reviewFeedback = reason || 'Review updated.'
  return { success: true, document: target }
}
