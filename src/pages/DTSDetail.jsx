import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StatusBadge } from '@/components/Badges'
import {
  useActiveRecruiters,
  useDemand,
  useUpdateDemandRecruiter,
} from '@/hooks/useData'
import { fmtDate, fmtSalary } from '@/utils/format'

export default function DTSDetail() {
  const { id } = useParams()
  const { data: demand } = useDemand(id)
  const { data: recruiters = [] } = useActiveRecruiters()
  const updateRecruiter = useUpdateDemandRecruiter(id)
  const [recruiter, setRecruiter] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    document.title = 'Demand Detail | Kudzu Mock'
    return () => {
      document.title = 'Kudzu HRM (Mock)'
    }
  }, [])

  useEffect(() => {
    if (demand && !recruiter) setRecruiter(demand.recruiter ?? '')
  }, [demand]) // eslint-disable-line react-hooks/exhaustive-deps

  const options = useMemo(
    () => recruiters.map((r) => r.name ?? r).filter(Boolean).sort(),
    [recruiters],
  )

  const save = async (e) => {
    e.preventDefault()
    await updateRecruiter.mutateAsync(recruiter)
    setSaved(true)
  }

  if (!demand) {
    return <p className="text-sm text-slate-500">Loading…</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-slate-900">{demand.title}</h1>
        <StatusBadge status={demand.status} />
      </div>

      <div className="card grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Client</p>
          <p className="text-slate-800">{demand.client}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Location</p>
          <p className="text-slate-800">{demand.location ?? '—'}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Salary range</p>
          <p className="text-slate-800">{fmtSalary(demand.salary_min, demand.salary_max)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Created</p>
          <p className="text-slate-800">{fmtDate(demand.created_at)}</p>
        </div>
        {demand.notes && (
          <div className="col-span-2">
            <p className="text-xs uppercase tracking-wide text-slate-400">Notes</p>
            <p className="text-slate-800">{demand.notes}</p>
          </div>
        )}
      </div>

      <form onSubmit={save} className="card max-w-md space-y-4">
        <div>
          <label className="label" htmlFor="recruiter">
            Reassign recruiter
          </label>
          <select
            id="recruiter"
            className="input"
            value={recruiter}
            onChange={(e) => {
              setRecruiter(e.target.value)
              setSaved(false)
            }}
          >
            {options.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" disabled={updateRecruiter.isPending}>
          {updateRecruiter.isPending ? 'Saving…' : saved ? 'Saved!' : 'Save'}
        </button>
      </form>
    </div>
  )
}
