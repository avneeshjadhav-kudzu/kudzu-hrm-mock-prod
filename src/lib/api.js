import { supabase } from './supabase'

export const DB_SCHEMA = import.meta.env.VITE_DB_SCHEMA || 'bug_fix_automation_mock_prod'

async function call(fn, params) {
  const { data, error } = await supabase.rpc(fn, params)
  if (error) throw new Error(`${fn}: ${error.message}`)
  return data
}

// ── demands (DTS) ────────────────────────────────────────────────────────────

export const listDemands = () => call('bfa_list_demands', { p_schema: DB_SCHEMA })

export const getDemand = (id) =>
  call('bfa_get_demand', { p_schema: DB_SCHEMA, p_id: id })

export const createDemand = (d) =>
  call('bfa_create_demand', {
    p_schema: DB_SCHEMA,
    p_title: d.title,
    p_client: d.client,
    p_location: d.location,
    p_salary_min: d.salaryMin,
    p_salary_max: d.salaryMax,
    p_status: d.status,
    p_recruiter: d.recruiter,
    p_notes: d.notes,
  })

export const updateDemandRecruiter = (id, recruiter) =>
  call('bfa_update_demand_recruiter', {
    p_schema: DB_SCHEMA,
    p_id: id,
    p_recruiter: recruiter,
  })

// ── candidates (ATS) ─────────────────────────────────────────────────────────

export const listCandidates = () =>
  call('bfa_list_candidates', { p_schema: DB_SCHEMA })

export const getCandidate = (id) =>
  call('bfa_get_candidate', { p_schema: DB_SCHEMA, p_id: id })

export const createCandidate = (c) =>
  call('bfa_create_candidate', {
    p_schema: DB_SCHEMA,
    p_name: c.name,
    p_email: c.email,
    p_phone: c.phone,
    p_source: c.source,
    p_demand_id: c.demandId || null,
  })

export const updateCandidateStage = (id, stage) =>
  call('bfa_update_candidate_stage', {
    p_schema: DB_SCHEMA,
    p_id: id,
    p_stage: stage,
  })

// ── canonical pickers ────────────────────────────────────────────────────────

export const listActiveRecruiters = () =>
  call('bfa_list_active_recruiters', { p_schema: DB_SCHEMA })
