import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActiveRecruiters, useCreateDemand } from '@/hooks/useData'

export default function AddDemand() {
  const navigate = useNavigate()
  const formRef = useRef(null)
  const { data: recruiters = [] } = useActiveRecruiters()
  const create = useCreateDemand()
  const [form, setForm] = useState({
    title: '',
    client: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    status: 'Open',
    recruiter: '',
    notes: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'Add Demand | Kudzu Mock'
    return () => {
      document.title = 'Kudzu HRM (Mock)'
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.metaKey && e.key === 's') {
        e.preventDefault()
        formRef.current?.requestSubmit()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const set =
    (key) =>
    (e) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.title.trim() || !form.client.trim()) {
      setError('Title and client are required.')
      return
    }
    await create.mutateAsync({
      title: form.title.trim(),
      client: form.client.trim(),
      location: form.location.trim() || null,
      salaryMin: form.salaryMin ? Number(form.salaryMin) : null,
      salaryMax: form.salaryMax ? Number(form.salaryMax) : null,
      status: form.status,
      recruiter: form.recruiter || null,
      notes: form.notes.trim() || null,
    })
    navigate('/demands')
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="card max-w-2xl space-y-4">
      <h1 className="text-xl font-semibold text-slate-900">Add Demand</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="label" htmlFor="title">
            Title *
          </label>
          <input
            id="title"
            className="input"
            value={form.title}
            onChange={set('title')}
            placeholder="e.g. Senior Backend Engineer"
          />
        </div>
        <div>
          <label className="label" htmlFor="client">
            Client *
          </label>
          <input
            id="client"
            className="input"
            value={form.client}
            onChange={set('client')}
          />
        </div>
        <div>
          <label className="label" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            className="input"
            value={form.location}
            onChange={set('location')}
          />
        </div>
        <div>
          <label className="label" htmlFor="salaryMin">
            Salary min (₹/yr)
          </label>
          <input
            id="salaryMin"
            className="input"
            type="number"
            value={form.salaryMin}
            onChange={set('salaryMin')}
          />
        </div>
        <div>
          <label className="label" htmlFor="salaryMax">
            Salary max (₹/yr)
          </label>
          <input
            id="salaryMax"
            className="input"
            type="number"
            value={form.salaryMax}
            onChange={set('salaryMax')}
          />
        </div>
        <div>
          <label className="label" htmlFor="status">
            Status
          </label>
          <select id="status" className="input" value={form.status} onChange={set('status')}>
            <option>Open</option>
            <option>Filled</option>
            <option>On Hold</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="recruiter">
            Recruiter
          </label>
          <select
            id="recruiter"
            className="input"
            value={form.recruiter}
            onChange={set('recruiter')}
          >
            <option value="">Unassigned</option>
            {recruiters.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="label" htmlFor="notes">
            Notes
          </label>
          <textarea id="notes" className="input" rows={3} value={form.notes} onChange={set('notes')} />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button className="btn btn-primary" disabled={create.isPending}>
        {create.isPending ? 'Saving…' : 'Save'}
      </button>
      <p className="text-xs text-slate-400">Tip: Ctrl+S saves the form.</p>
    </form>
  )
}
