export function fmtDate(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function fmtSalary(min, max) {
  const lakhs = (v) => `${(Number(v) / 100000).toFixed(1)} L`
  if (min && max) return `₹${lakhs(min)} – ₹${lakhs(max)}`
  if (min) return `from ₹${lakhs(min)}`
  if (max) return `up to ₹${lakhs(max)}`
  return '—'
}
