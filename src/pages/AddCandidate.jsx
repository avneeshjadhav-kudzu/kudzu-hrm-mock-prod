import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateCandidate } from '@/hooks/useData'

export default function AddCandidate() {
  const navigate = useNavigate()
  const create = useCreateCandidate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'Portal',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'Add Candidate | Kudzu Mock'
    return () => {
      document.title = 'Kudzu HRM (Mock)'
    }
  }, [])

  const set =
    (key) =>
    (e) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) {
      setError('Name is required.')
      return
    }
    await create.mutateAsync({
      name: form.name.trim(),
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      source: form.source,
      demandId: null,
    })
    navigate('/candidates')
  }

  return (
    <form onSubmit={onSubmit} className="card max-w-2xl space-y-4">
      <h1 className="text-xl font-semibold text-slate-900">Add Candidate</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="label" htmlFor="name">
            Name *
          </label>
          <input id="name" className="input" value={form.name} onChange={set('name')} />
        </div>
        <div>
          <label className="label" htmlFor="cand-email">
            Email
          </label>
          <input
            id="cand-email"
            className="input"
            type="email"
            value={form.email}
            onChange={set('email')}
          />
        </div>
        <div>
          <label className="label" htmlFor="cand-phone">
            Phone
          </label>
          <input id="cand-phone" className="input" value={form.phone} onChange={set('phone')} />
        </div>
        <div>
          <label className="label" htmlFor="source">
            Source
          </label>
          <select id="source" className="input" value={form.source} onChange={set('source')}>
            <option>Portal</option>
            <option>Referral</option>
            <option>Vendor</option>
            <option>LinkedIn</option>
          </select>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button className="btn btn-primary" disabled={create.isPending}>
        {create.isPending ? 'Saving…' : 'Save'}
      </button>
    </form>
  )
}
