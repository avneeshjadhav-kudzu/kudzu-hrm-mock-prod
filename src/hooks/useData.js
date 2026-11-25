import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as api from '@/lib/api'

export const useDemands = () =>
  useQuery({ queryKey: ['demands'], queryFn: api.listDemands })

export const useDemand = (id) =>
  useQuery({
    queryKey: ['demand', id],
    queryFn: async () => {
      const rows = await api.getDemand(id)
      return rows?.[0] ?? null
    },
    enabled: Boolean(id),
  })

export const useCandidates = () =>
  useQuery({ queryKey: ['candidates'], queryFn: api.listCandidates })

export const useCandidate = (id) =>
  useQuery({
    queryKey: ['candidate', id],
    queryFn: async () => {
      const rows = await api.getCandidate(id)
      return rows?.[0] ?? null
    },
    enabled: Boolean(id),
  })

export const useActiveRecruiters = () =>
  useQuery({ queryKey: ['activeRecruiters'], queryFn: api.listActiveRecruiters })

export const useCreateDemand = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: api.createDemand,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['demands'] }),
  })
}

export const useUpdateDemandRecruiter = (id) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (recruiter) => api.updateDemandRecruiter(id, recruiter),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['demand', id] })
      qc.invalidateQueries({ queryKey: ['demands'] })
    },
  })
}

export const useCreateCandidate = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: api.createCandidate,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['candidates'] }),
  })
}

export const useUpdateCandidateStage = (id) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (stage) => api.updateCandidateStage(id, stage),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['candidate', id] })
      qc.invalidateQueries({ queryKey: ['candidates'] })
    },
  })
}
