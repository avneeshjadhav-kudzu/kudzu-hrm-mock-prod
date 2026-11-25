const KEY = 'bfa_mock_session'

export function getSession() {
  try {
    return JSON.parse(window.localStorage.getItem(KEY))
  } catch {
    return null
  }
}

export function login(email) {
  const session = {
    email,
    name: email.split('@')[0],
    role: 'recruiter',
    roles: ['recruiter'],
  }
  window.localStorage.setItem(KEY, JSON.stringify(session))
  return session
}

export function logout() {
  window.localStorage.removeItem(KEY)
}

export const hasRole = (profile, role) =>
  Boolean(profile?.roles?.includes(role)) || profile?.role === role

export const hasAnyRole = (profile, ...wanted) =>
  wanted.some((role) => hasRole(profile, role))
