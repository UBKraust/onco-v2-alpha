"use client"

// API Client for medical dashboard
export class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  setAuthToken(token: string) {
    this.token = token
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API Request failed:", error)
      throw error
    }
  }

  // Patient API methods
  async getPatient(id: string) {
    return this.request(`/patients/${id}`)
  }

  async getPatients(filters?: any) {
    const params = new URLSearchParams(filters)
    return this.request(`/patients?${params}`)
  }

  async updatePatient(id: string, data: any) {
    return this.request(`/patients/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // Appointments API methods
  async getAppointments(patientId: string) {
    return this.request(`/patients/${patientId}/appointments`)
  }

  async createAppointment(patientId: string, data: any) {
    return this.request(`/patients/${patientId}/appointments`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Medical records API methods
  async getMedicalRecords(patientId: string) {
    return this.request(`/patients/${patientId}/medical-records`)
  }

  async uploadDocument(patientId: string, file: File) {
    const formData = new FormData()
    formData.append("file", file)

    return this.request(`/patients/${patientId}/documents`, {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  }
}

export const apiClient = new ApiClient()
