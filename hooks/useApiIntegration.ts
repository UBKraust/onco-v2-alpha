"use client"

import { useState, useEffect, useCallback } from "react"
import { apiClient } from "@/lib/api-client"

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApiIntegration<T>(endpoint: string, dependencies: any[] = []) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const data = await apiClient.request<T>(endpoint)
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }, [endpoint])

  useEffect(() => {
    fetchData()
  }, [fetchData, ...dependencies])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return {
    ...state,
    refetch,
  }
}

// Specialized hooks for different data types
export function usePatientData(patientId: string) {
  return useApiIntegration(`/patients/${patientId}`, [patientId])
}

export function useAppointmentsData(patientId: string) {
  return useApiIntegration(`/patients/${patientId}/appointments`, [patientId])
}

export function useMedicalRecordsData(patientId: string) {
  return useApiIntegration(`/patients/${patientId}/medical-records`, [patientId])
}
