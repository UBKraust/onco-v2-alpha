export interface EmergencyContact {
  name: string
  phone: string
  relationship: string
}

export interface Patient {
  id: string
  name: string
  age: number
  gender: string
  cnp: string
  phone: string
  email: string
  address: string
  weight: string
  height: string
  bloodType: string
  allergies: string
  emergencyContact: EmergencyContact
  cycle: string
  adherence: string
}

export const useMockPatient = (id: string): Patient | null => {
  const patients: Record<string, Patient> = {
    "1": {
      id: "1",
      name: "Maria Popescu",
      age: 45,
      gender: "Femeie",
      cnp: "1790315123456",
      phone: "+40 721 234 567",
      email: "maria.popescu@email.com",
      address: "Str. Florilor nr. 25, București, Sector 2",
      weight: "68 kg",
      height: "165 cm",
      bloodType: "A Rh+",
      allergies: "Penicilină",
      cycle: "4/6",
      adherence: "85%",
      emergencyContact: {
        name: "Ion Popescu",
        phone: "+40 723 456 789",
        relationship: "Soț",
      },
    },
    "2": {
      id: "2",
      name: "Andrei Ionescu",
      age: 52,
      gender: "Bărbat",
      cnp: "1680523123456",
      phone: "+40 741 987 654",
      email: "andrei.ionescu@email.com",
      address: "Str. Lalelelor nr. 10, Cluj-Napoca",
      weight: "82 kg",
      height: "175 cm",
      bloodType: "B Rh-",
      allergies: "Nu",
      cycle: "2/8",
      adherence: "92%",
      emergencyContact: {
        name: "Elena Ionescu",
        phone: "+40 744 888 222",
        relationship: "Soție",
      },
    },
  }

  return patients[id] ?? null
}
