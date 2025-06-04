import { Grid } from "@mui/material"
import { PatientInfoCard } from "./patient-info-card"
import { PatientAppointmentsCard } from "./patient-appointments-card"
import { PatientMedicalFileCard } from "./patient-medical-file-card" // Update 1: Import PatientMedicalFileCard

const PatientDashboardNew = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <PatientInfoCard />
      </Grid>
      <Grid item xs={12} md={8}>
        <PatientAppointmentsCard />
      </Grid>
      <Grid item xs={12} md={4}>
        {/* Replace this line */}
        {/* <PatientDocumentsCard /> */}
        {/* With this line */}
        <PatientMedicalFileCard /> {/* Update 2: Replace PatientDocumentsCard with PatientMedicalFileCard */}
      </Grid>
    </Grid>
  )
}

export default PatientDashboardNew
