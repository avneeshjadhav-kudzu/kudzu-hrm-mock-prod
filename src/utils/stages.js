export const STAGES = ['Sourced', 'Screening', 'Interview', 'Offer', 'Placed']

export function nextStage(current) {
  const idx = STAGES.indexOf(current)
  if (idx === -1 || idx === STAGES.length - 1) return null
  return STAGES[idx + 1]
}

export function canAdvanceTo(current, target) {
  return STAGES.indexOf(target) === STAGES.indexOf(current) + 1
}
