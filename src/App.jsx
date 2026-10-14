import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import { AppProvider, useAppContext } from './context/AppContext'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetails from './pages/PropertyDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'
import BuyerDashboard from './pages/BuyerDashboard'
import BuyerFavorites from './pages/BuyerFavorites'
import BuyerEnquiries from './pages/BuyerEnquiries'
import Recommendations from './pages/Recommendations'
import AIChat from './pages/AIChat'
import PricePrediction from './pages/PricePrediction'
import CompareProperties from './pages/CompareProperties'
import SellerDashboard from './pages/SellerDashboard'
import AddProperty from './pages/AddProperty'
import SellerDocumentVerification from './pages/SellerDocumentVerification'
import SellerProfile from './pages/SellerProfile'
import SellerEnquiries from './pages/SellerEnquiries'
import AdminDashboard from './pages/AdminDashboard'
import AdminProperties from './pages/AdminProperties'
import PendingApprovals from './pages/PendingApprovals'
import AdminDocumentVerification from './pages/AdminDocumentVerification'
import DocumentReviewDetails from './pages/DocumentReviewDetails'
import ManageUsers from './pages/ManageUsers'
import ReportsComplaints from './pages/ReportsComplaints'
import AdminSettings from './pages/AdminSettings'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function ProtectedRoute({ children, allowRoles }) {
  const { currentUser } = useAppContext()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (allowRoles && !allowRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

function AppShell() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/buyer/dashboard" element={<ProtectedRoute allowRoles={['buyer']}><BuyerDashboard /></ProtectedRoute>} />
          <Route path="/buyer/favorites" element={<ProtectedRoute allowRoles={['buyer']}><BuyerFavorites /></ProtectedRoute>} />
          <Route path="/buyer/enquiries" element={<ProtectedRoute allowRoles={['buyer']}><BuyerEnquiries /></ProtectedRoute>} />
          <Route path="/buyer/recommendations" element={<ProtectedRoute allowRoles={['buyer']}><Recommendations /></ProtectedRoute>} />
          <Route path="/buyer/assistant" element={<ProtectedRoute allowRoles={['buyer']}><AIChat /></ProtectedRoute>} />
          <Route path="/buyer/price-prediction" element={<ProtectedRoute allowRoles={['buyer']}><PricePrediction /></ProtectedRoute>} />
          <Route path="/buyer/compare" element={<ProtectedRoute allowRoles={['buyer']}><CompareProperties /></ProtectedRoute>} />

          <Route path="/seller/dashboard" element={<ProtectedRoute allowRoles={['seller']}><SellerDashboard /></ProtectedRoute>} />
          <Route path="/seller/properties" element={<ProtectedRoute allowRoles={['seller']}><SellerDashboard /></ProtectedRoute>} />
          <Route path="/seller/add-property" element={<ProtectedRoute allowRoles={['seller']}><AddProperty /></ProtectedRoute>} />
          <Route path="/seller/edit-property/:id" element={<ProtectedRoute allowRoles={['seller']}><AddProperty /></ProtectedRoute>} />
          <Route path="/seller/documents" element={<ProtectedRoute allowRoles={['seller']}><SellerDocumentVerification /></ProtectedRoute>} />
          <Route path="/seller/enquiries" element={<ProtectedRoute allowRoles={['seller']}><SellerEnquiries /></ProtectedRoute>} />
          <Route path="/seller/profile" element={<ProtectedRoute allowRoles={['seller']}><SellerProfile /></ProtectedRoute>} />

          <Route path="/admin/dashboard" element={<ProtectedRoute allowRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/properties" element={<ProtectedRoute allowRoles={['admin']}><AdminProperties /></ProtectedRoute>} />
          <Route path="/admin/approvals" element={<ProtectedRoute allowRoles={['admin']}><PendingApprovals /></ProtectedRoute>} />
          <Route path="/admin/documents" element={<ProtectedRoute allowRoles={['admin']}><AdminDocumentVerification /></ProtectedRoute>} />
          <Route path="/admin/documents/:id" element={<ProtectedRoute allowRoles={['admin']}><DocumentReviewDetails /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowRoles={['admin']}><ManageUsers /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute allowRoles={['admin']}><ReportsComplaints /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute allowRoles={['admin']}><AdminSettings /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AppProvider>
  )
}
