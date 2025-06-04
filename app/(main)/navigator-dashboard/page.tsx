import { PatientDetailView } from "@/components/navigator/patient-detail-view"

// Add a mock patient object with all required properties
const mockPatient = {
  id: "1",
  name: "Maria Popescu",
  age: 45,
  gender: "Femeie",
  address: "Str. Florilor nr. 25, București",
  phone: "+40 721 234 567",
  email: "maria.popescu@email.com",
}

export default function NavigatorDashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard Navigator</h1>

      {/* Pass the mock patient to PatientDetailView */}
      <PatientDetailView patient={mockPatient} />
    </div>
  )
}
