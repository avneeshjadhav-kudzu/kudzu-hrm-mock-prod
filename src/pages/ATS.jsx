import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { StageBadge } from '@/components/Badges'
import EmptyState from '@/components/EmptyState'
import { useCandidates } from '@/hooks/useData'
import { fmtDate } from '@/utils/format'

const PAGE_SIZE = 10

export default function ATS() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const { data: candidates = [], isLoading } = useCandidates()

  useEffect(() => {
    document.title = 'Candidates | Kudzu Mock'
    return () => {
      document.title = 'Kudzu HRM (Mock)'
    }
  }, [])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return candidates
    return candidates.filter((c) => c.name.toLowerCase().includes(term))
  }, [candidates, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-slate-900">Candidates</h1>
        <input
          className="input max-w-xs"
          type="search"
          placeholder="Search by name…"
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
        <EmptyState>No candidates found.</EmptyState>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="w-full">
            <thead className="border-b border-slate-200">
              <tr>
                <th className="th">Name</th>
                <th className="th">Stage</th>
                <th className="th">Status</th>
                <th className="th">Source</th>
                <th className="th">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="td font-medium">
                    <Link
                      className="text-indigo-600 hover:underline"
                      to={`/candidates/${c.id}`}
                    >
                      {c.name}
                    </Link>
                  </td>
                  <td className="td">
                    <StageBadge stage={c.stage} />
                  </td>
                  <td className="td">{c.status}</td>
                  <td className="td">{c.source ?? '—'}</td>
                  <td className="td">{fmtDate(c.created_at)}</td>
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
