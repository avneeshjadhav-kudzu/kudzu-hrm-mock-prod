import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { StatusBadge } from '@/components/Badges'
import EmptyState from '@/components/EmptyState'
import { useDemands } from '@/hooks/useData'
import { fmtDate, fmtSalary } from '@/utils/format'

const PAGE_SIZE = 10

export default function DTS() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const { data: demands = [], isLoading } = useDemands()

  useEffect(() => {
    document.title = 'Demands | Kudzu Mock'
    return () => {
      document.title = 'Kudzu HRM (Mock)'
    }
  }, [])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return demands
    return demands.filter(
      (d) =>
        d.title.toLowerCase().includes(term) || d.client.toLowerCase().includes(term),
    )
  }, [demands, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const rows = filtered.slice(
    (safePage - 1) * PAGE_SIZE + 1,
    safePage * PAGE_SIZE + 1,
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-slate-900">Demands</h1>
        <input
          className="input max-w-xs"
          type="search"
          placeholder="Search title or client…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : filtered.length === 0 ? (
        <EmptyState>No demands found.</EmptyState>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="w-full">
            <thead className="border-b border-slate-200">
              <tr>
                <th className="th">Title</th>
                <th className="th">Client</th>
                <th className="th">Status</th>
                <th className="th">Recruiter</th>
                <th className="th">Salary</th>
                <th className="th">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="td font-medium">
                    <Link className="text-indigo-600 hover:underline" to={`/demands/${d.id}`}>
                      {d.title}
                    </Link>
                  </td>
                  <td className="td">{d.client}</td>
                  <td className="td">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="td">{d.recruiter ?? '—'}</td>
                  <td className="td">{fmtSalary(d.salary_min, d.salary_max)}</td>
                  <td className="td">{fmtDate(d.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="flex items-center justify-between text-sm text-slate-600">
          <button
            className="btn"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ← Prev
          </button>
          <span>
            Page {safePage} of {totalPages}
          </span>
          <button
            className="btn"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
