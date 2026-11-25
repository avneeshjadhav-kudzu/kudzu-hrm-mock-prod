import { describe, expect, it } from 'vitest'
import { STAGES, canAdvanceTo, nextStage } from './stages'

describe('candidate pipeline', () => {
  it('lists the pipeline in order', () => {
    expect(STAGES).toEqual(['Sourced', 'Screening', 'Interview', 'Offer', 'Placed'])
  })

  it('returns the next stage', () => {
    expect(nextStage('Sourced')).toBe('Screening')
    expect(nextStage('Screening')).toBe('Interview')
    expect(nextStage('Interview')).toBe('Offer')
  })

  it('returns null at the end of the pipeline', () => {
    expect(nextStage('Placed')).toBeNull()
    expect(nextStage('Unknown')).toBeNull()
  })

  it('only allows advancing one step at a time', () => {
    expect(canAdvanceTo('Sourced', 'Screening')).toBe(true)
    expect(canAdvanceTo('Screening', 'Interview')).toBe(true)
    expect(canAdvanceTo('Sourced', 'Offer')).toBe(false)
    expect(canAdvanceTo('Sourced', 'Sourced')).toBe(false)
  })
})
