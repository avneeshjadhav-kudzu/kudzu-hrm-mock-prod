import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { getSession, logout } from '@/utils/roles'

const navLink = ({ isActive }) =>
  `rounded-md px-3 py-1.5 text-sm font-medium ${
    isActive
      ? 'bg-indigo-50 text-indigo-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

export default function Layout() {
  const navigate = useNavigate()
  const session = getSession()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-slate-900">Kudzu HRM</span>
            <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
              Mock Prod
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-500">{session?.email ?? 'unknown'}</span>
            <button
              className="btn"
              onClick={() => {
                logout()
                navigate('/login')
              }}
            >
              Log out
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 px-4 pb-2">
          <NavLink to="/demands" className={navLink}>
            Demands (DTS)
          </NavLink>
          <NavLink to="/candidates" className={navLink}>
            Candidates (ATS)
          </NavLink>
          <NavLink to="/demands/new" className={navLink}>
            Add Demand
          </NavLink>
          <NavLink to="/candidates/new" className={navLink}>
            Add Candidate
          </NavLink>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
