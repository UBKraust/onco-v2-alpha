"use client"

// hooks/usePatientDetails.ts

import { useState, useEffect } from "react"
import { getPatientDetails } from "../api/patientApi"

const usePatientDetails = (patientId: string) => {
  const [patientDetails, setPatientDetails] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const details = await getPatientDetails(patientId)
        setPatientDetails(details)
      } catch (err) {
        setError("Failed to fetch patient details")
      } finally {
        setLoading(false)
      }
    }

    fetchPatientDetails()
  }, [patientId])

  return { patientDetails, loading, error }
}

export default usePatientDetails
