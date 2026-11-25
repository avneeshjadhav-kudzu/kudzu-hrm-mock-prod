import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import { getSession } from '@/utils/roles'
import ATS from '@/pages/ATS'
import ATSDetail from '@/pages/ATSDetail'
import AddCandidate from '@/pages/AddCandidate'
import AddDemand from '@/pages/AddDemand'
import DTS from '@/pages/DTS'
import DTSDetail from '@/pages/DTSDetail'
import Login from '@/pages/Login'

function RequireSession({ children }) {
  return getSession() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <RequireSession>
              <Layout />
            </RequireSession>
          }
        >
          <Route path="/" element={<Navigate to="/demands" replace />} />
          <Route path="/demands" element={<DTS />} />
          <Route path="/demands/new" element={<AddDemand />} />
          <Route path="/demands/:id" element={<DTSDetail />} />
          <Route path="/candidates" element={<ATS />} />
          <Route path="/candidates/new" element={<AddCandidate />} />
          <Route path="/candidates/:id" element={<ATSDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
