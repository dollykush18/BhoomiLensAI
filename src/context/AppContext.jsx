import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { demoUsers } from '../data/demoUsers'
import { properties, demoEnquiries, demoReports } from '../data/properties'
import { demoDocuments } from '../data/demoDocuments'

const AppContext = createContext()

const STORAGE_KEY = 'bhoomilens-demo-state'

const initialState = {
  currentUser: null,
  users: demoUsers,
  properties,
  favourites: [],
  enquiries: demoEnquiries,
  reports: demoReports,
  documents: demoDocuments,
  compareList: [],
}

export function AppProvider({ children }) {
  const [state, setState] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState

    try {
      return { ...initialState, ...JSON.parse(raw) }
    } catch {
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const login = (user) => {
    setState((prev) => ({ ...prev, currentUser: user }))
  }

  const logout = () => {
    setState((prev) => ({ ...prev, currentUser: null }))
  }

  const register = (payload) => {
    const newUser = {
      id: `user-${Date.now()}`,
      ...payload,
      registrationDate: new Date().toISOString().slice(0, 10),
      accountStatus: 'Active',
    }

    setState((prev) => ({
      ...prev,
      users: [...prev.users, newUser],
      currentUser: newUser,
    }))

    return newUser
  }

  const toggleFavourite = (propertyId) => {
    setState((prev) => {
      const exists = prev.favourites.includes(propertyId)
      return {
        ...prev,
        favourites: exists ? prev.favourites.filter((id) => id !== propertyId) : [...prev.favourites, propertyId],
      }
    })
  }

  const addEnquiry = (enquiry) => {
    setState((prev) => ({
      ...prev,
      enquiries: [
        {
          id: `enq-${Date.now()}`,
          ...enquiry,
          status: 'Open',
        },
        ...prev.enquiries,
      ],
    }))
  }

  const addProperty = (property) => {
    const newProperty = {
      ...property,
      id: property.id || `prop-${Date.now()}`,
      listingStatus: 'pending',
      submissionDate: new Date().toISOString().slice(0, 10),
      verificationStatus: 'Under Review',
    }

    setState((prev) => ({
      ...prev,
      properties: [newProperty, ...prev.properties],
    }))

    return newProperty
  }

  const updateProperty = (propertyId, updates) => {
    setState((prev) => ({
      ...prev,
      properties: prev.properties.map((item) => (item.id === propertyId ? { ...item, ...updates } : item)),
    }))
  }

  const removeProperty = (propertyId) => {
    setState((prev) => ({
      ...prev,
      properties: prev.properties.filter((item) => item.id !== propertyId),
    }))
  }

  const updateDocumentStatus = (documentId, status, feedback) => {
    setState((prev) => ({
      ...prev,
      documents: prev.documents.map((item) => (item.id === documentId ? { ...item, status, reviewFeedback: feedback } : item)),
    }))
  }

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      register,
      toggleFavourite,
      addEnquiry,
      addProperty,
      updateProperty,
      removeProperty,
      updateDocumentStatus,
    }),
    [state],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
