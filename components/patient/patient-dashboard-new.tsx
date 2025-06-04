import { PatientQuickActions } from "./patient-quick-actions"
import { QuickMessageWidget } from "./quick-message-widget"

const PatientDashboardNew = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Patient Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Patient Quick Actions */}
        <div className="lg:col-span-2">
          <PatientQuickActions />
        </div>

        {/* Quick Message Widget */}
        <div className="lg:col-span-1">
          <QuickMessageWidget />
        </div>

        {/* Placeholder for other widgets */}
        <div className="lg:col-span-3">{/* Add other widgets here */}</div>
      </div>
    </div>
  )
}

export default PatientDashboardNew
