const STATUS_STYLES = {
  Open: 'bg-emerald-100 text-emerald-800',
  Filled: 'bg-blue-100 text-blue-800',
  'On Hold': 'bg-amber-100 text-amber-800',
}

const STAGE_STYLES = {
  Sourced: 'bg-slate-100 text-slate-700',
  Screening: 'bg-amber-100 text-amber-800',
  Interview: 'bg-blue-100 text-blue-800',
  Offer: 'bg-violet-100 text-violet-800',
  Placed: 'bg-emerald-100 text-emerald-800',
}

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
        STATUS_STYLES[status] ?? 'bg-slate-100 text-slate-600'
      }`}
    >
      {status}
    </span>
  )
}

export function StageBadge({ stage }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
        STAGE_STYLES[stage] ?? 'bg-slate-100 text-slate-600'
      }`}
    >
      {stage}
    </span>
  )
}
