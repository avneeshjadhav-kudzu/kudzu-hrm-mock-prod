import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StageBadge } from '@/components/Badges'
import { useCandidate, useUpdateCandidateStage } from '@/hooks/useData'
import { fmtDate } from '@/utils/format'
import { STAGES } from '@/utils/stages'

export default function ATSDetail() {
  const { id } = useParams()
  const { data: candidate } = useCandidate(id)
  const updateStage = useUpdateCandidateStage(id)
  const [message, setMessage] = useState('')

  useEffect(() => {
    document.title = 'Candidate Detail | Kudzu Mock'
    return () => {
      document.title = 'Kudzu HRM (Mock)'
    }
  }, [])

  useEffect(() => {
    setMessage('')
  }, [id])

  const advance = (stage) => {
    setMessage('')
    updateStage.mutate(stage, {
      onSuccess: () => {
        setMessage(`Moved to ${stage}.`)
      },
    })
  }

  if (!candidate) {
    return <p className="text-sm text-slate-500">Loading…</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-slate-900">{candidate.name}</h1>
        <StageBadge stage={candidate.stage} />
      </div>

      <div className="card grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Email</p>
          <p className="text-slate-800">{candidate.email ?? '—'}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Phone</p>
          <p className="text-slate-800">{candidate.phone ?? '—'}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Source</p>
          <p className="text-slate-800">{candidate.source ?? '—'}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Status</p>
          <p className="text-slate-800">{candidate.status}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Created</p>
          <p className="text-slate-800">{fmtDate(candidate.created_at)}</p>
        </div>
      </div>

      <div className="card space-y-4">
        <h2 className="text-sm font-semibold text-slate-700">Move stage</h2>
        <div className="flex flex-wrap gap-2">
          {STAGES.map((stage) => (
            <button
              key={stage}
              className={stage === candidate.stage ? 'btn btn-primary' : 'btn'}
              disabled={stage === candidate.stage || updateStage.isPending}
              onClick={() => advance(stage)}
            >
              {stage}
            </button>
          ))}
        </div>
        {message && <p className="text-sm text-slate-600">{message}</p>}
      </div>
    </div>
  )
}
