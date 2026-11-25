import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '@/utils/roles'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    document.title = 'Login | Kudzu Mock'
    return () => {
      document.title = 'Kudzu HRM (Mock)'
    }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email.endsWith('@kudzu.test')) {
      setError('Use your @kudzu.test work email.')
      return
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.')
      return
    }
    setSaving(true)
    login(email)
    navigate('/demands')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form onSubmit={onSubmit} className="card w-full max-w-sm">
        <h1 className="text-lg font-semibold text-slate-900">Sign in</h1>
        <p className="mb-4 text-sm text-slate-500">
          Mock sign-in — any @kudzu.test email works.
        </p>
        <label className="label" htmlFor="email">
          Work email
        </label>
        <input
          id="email"
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@kudzu.test"
        />
        <label className="label mt-4" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button className="btn btn-primary mt-6 w-full" disabled={saving}>
          {saving ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
