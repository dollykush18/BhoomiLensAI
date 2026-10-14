export const demoDocuments = [
  {
    id: 'doc-1',
    propertyId: 'prop-1',
    sellerId: 'seller-1',
    type: 'Sale deed / conveyance deed',
    filename: 'sale-deed-prop-1.pdf',
    uploadDate: '2026-09-14',
    size: '1.2 MB',
    status: 'Under Review',
    reviewFeedback: 'Document received and being compared against the listing details.',
    ocrStatus: 'Available',
    reviewHistory: [
      { reviewer: 'Aisha Verma', date: '2026-09-15', decision: 'Under Review', reason: 'Awaiting review' }
    ]
  },
  {
    id: 'doc-2',
    propertyId: 'prop-8',
    sellerId: 'seller-1',
    type: 'Property tax receipt',
    filename: 'tax-receipt-prop-8.pdf',
    uploadDate: '2026-10-08',
    size: '850 KB',
    status: 'Additional Information Required',
    reviewFeedback: 'Please provide the latest tax receipt and previous ownership record.',
    ocrStatus: 'Partial',
    reviewHistory: [
      { reviewer: 'Aisha Verma', date: '2026-10-09', decision: 'Additional Information Required', reason: 'Latest tax record missing' }
    ]
  },
  {
    id: 'doc-3',
    propertyId: 'prop-7',
    sellerId: 'seller-6',
    type: 'Approved building plan',
    filename: 'building-plan-prop-7.png',
    uploadDate: '2026-10-10',
    size: '2.1 MB',
    status: 'Submitted',
    reviewFeedback: '',
    ocrStatus: 'Unavailable',
    reviewHistory: []
  }
]
