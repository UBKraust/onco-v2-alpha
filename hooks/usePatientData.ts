"use client"

import { useState } from "react"
import type { Patient, Appointment, Symptom, Document, Message, Task } from "@/types/patient"
import { mockData } from "@/data/mock-patients"

export function usePatientData(patientId = "1") {
  const [patient] = useState<Patient>(mockData.patients.find((p) => p.id === patientId) || mockData.patients[0])
  const [appointments] = useState<Appointment[]>(mockData.appointments)
  const [symptoms, setSymptoms] = useState<Symptom[]>(mockData.symptoms)
  const [documents] = useState<Document[]>(mockData.documents)
  const [messages, setMessages] = useState<Message[]>(mockData.messages)
  const [tasks, setTasks] = useState<Task[]>(mockData.tasks)

  const addSymptom = (symptom: Omit<Symptom, "id">) => {
    const newSymptom = {
      ...symptom,
      id: Date.now().toString(),
    }
    setSymptoms((prev) => [newSymptom, ...prev])
  }

  const toggleTask = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const markMessageAsRead = (messageId: string) => {
    setMessages((prev) => prev.map((message) => (message.id === messageId ? { ...message, isRead: true } : message)))
  }

  return {
    patient,
    appointments,
    symptoms,
    documents,
    messages,
    tasks,
    addSymptom,
    toggleTask,
    markMessageAsRead,
  }
}
