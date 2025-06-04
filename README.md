# Medical Dashboard - Oncology Patient Management System

## 📋 Overview

A comprehensive medical dashboard designed for oncology patient management, featuring role-based interfaces for Patients, Navigators, and Administrators. Built with Next.js 14+, React, TypeScript, Tailwind CSS, and shadcn/ui components.

## 🏗️ Architecture

### Project Structure
\`\`\`
medical-dashboard/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   ├── (dashboard)/              # Dashboard layouts
│   ├── (main)/                   # Main application routes
│   │   ├── navigator/            # Navigator-specific pages
│   │   │   └── patients/         # Patient management
│   │   │       └── [id]/         # Dynamic patient routes
│   │   │           └── details/  # Patient details page
│   │   ├── patient/              # Patient-specific pages
│   │   └── admin/                # Admin-specific pages
│   └── (public)/                 # Public pages
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components
│   ├── medical/                  # Medical-specific components
│   ├── navigator/                # Navigator components
│   ├── patient/                  # Patient components
│   └── patient-details/          # Patient details cards
├── hooks/                        # Custom React hooks
├── types/                        # TypeScript type definitions
└── data/                         # Mock data and constants
\`\`\`

## 🎯 Key Features

### Patient Details Dashboard (19 Cards)
1. **Patient Overview** - Basic patient information and status
2. **Appointments** - Upcoming and past appointments
3. **Treatment Plan** - Current treatment protocol and progress
4. **Support Network** - Medical team and family contacts
5. **Digital File** - Document management and completion status
6. **Alerts & Risks** - Critical alerts and risk assessments
7. **Compliance AI** - AI-powered compliance monitoring
8. **Adherence** - Treatment adherence tracking
9. **Objectives** - Personal treatment goals
10. **Education** - Educational resources and progress
11. **Biomarkers** - Laboratory results and trends
12. **Timeline** - Patient journey visualization
13. **Consultations** - Medical consultations history
14. **Admin Documents** - Administrative paperwork status
15. **Psychological** - Mental health support and assessments
16. **Chatbot & Costs** - AI assistant usage and cost tracking
17. **Medical History** - Comprehensive medical background
18. **Calendar** - Integrated appointment calendar
19. **AI Protocol** - AI-driven treatment recommendations

## 🔧 Technical Implementation

### Custom Hooks Architecture

Each card component uses dedicated hooks for data management:

\`\`\`typescript
// Example hook structure
export interface PatientData {
  // Type definitions
}

export function useMockPatientData(patientId: string): PatientData {
  return useMemo(() => ({
    // Mock data implementation
  }), [patientId])
}
\`\`\`

### Available Hooks
- `useMockPatient` - Core patient data
- `useMockCompliance` - Compliance and AI checklist
- `useMockAdherence` - Treatment adherence metrics
- `useMockObjectives` - Personal treatment goals
- `useMockEducation` - Educational progress
- `useMockBiomarkers` - Laboratory indicators
- `useMockTimeline` - Patient journey events
- `useMockConsultations` - Medical consultations
- `useMockAdminDocuments` - Administrative documents
- `useMockPsychological` - Mental health data
- `useMockChatbotCosts` - AI assistant and costs
- `useMockMedicalHistory` - Medical background
- `useMockCalendar` - Calendar events
- `useMockAIProtocol` - AI recommendations

### Component Structure

\`\`\`typescript
interface CardProps {
  patientId: string
  // Additional props as needed
}

export function PatientCard({ patientId }: CardProps) {
  const data = useMockData(patientId)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Card content */}
      </CardContent>
    </Card>
  )
}
\`\`\`

## 🎨 UI/UX Design

### Design System
- **Colors**: Medical-appropriate color palette with status indicators
- **Typography**: Clear, readable fonts optimized for medical data
- **Icons**: Lucide React icons for consistency
- **Layout**: Responsive grid system with mobile-first approach

### Status Indicators
- 🟢 **Green**: Normal/Completed/Positive
- 🟡 **Yellow**: Warning/Attention needed
- 🔴 **Red**: Critical/Urgent action required
- 🔵 **Blue**: Information/In progress

### Card Categories
- **Critical Cards**: Alerts, Risks, Biomarkers
- **Progress Cards**: Treatment Plan, Adherence, Timeline
- **Information Cards**: Patient Overview, Medical History
- **Interactive Cards**: Calendar, Objectives, Education

## 📊 Data Management

### Mock Data Structure
Each hook provides realistic medical data including:
- Patient demographics and medical information
- Treatment protocols and medication schedules
- Laboratory results with normal ranges
- Appointment and consultation history
- Educational progress and resources
- AI-generated insights and recommendations

### Type Safety
Full TypeScript implementation with:
- Strict type checking for all data structures
- Interface definitions for all components
- Proper error handling and validation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation
\`\`\`bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

### Environment Setup
\`\`\`bash
# Create .env.local file
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## 🔄 Navigation Flow

### Patient Details Access
\`\`\`
Navigator Dashboard → Patients List → Select Patient → Patient Details
\`\`\`

### Route Structure
\`\`\`
/navigator/patients           # Patients list
/navigator/patients/[id]      # Patient overview
/navigator/patients/[id]/details  # Detailed patient view (19 cards)
\`\`\`

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (Single column layout)
- **Tablet**: 768px - 1024px (Two column layout)
- **Desktop**: > 1024px (Three column layout)

### Mobile Optimizations
- Touch-friendly button sizes
- Collapsible card sections
- Optimized data display for small screens
- Swipe gestures for card navigation

## 🔐 Security & Privacy

### Data Protection
- GDPR compliant data handling
- Secure patient information display
- Role-based access control
- Audit trail for sensitive actions

### Authentication
- Role-based routing protection
- Session management
- Secure API endpoints

## 🧪 Testing Strategy

### Component Testing
\`\`\`typescript
// Example test structure
describe('PatientDetailsCard', () => {
  it('renders patient information correctly', () => {
    // Test implementation
  })
})
\`\`\`

### Hook Testing
\`\`\`typescript
// Example hook test
describe('useMockPatient', () => {
  it('returns patient data for valid ID', () => {
    // Test implementation
  })
})
\`\`\`

## 📈 Performance Optimization

### Implemented Optimizations
- `useMemo` for expensive calculations
- Lazy loading for card components
- Virtual scrolling for large lists
- Image optimization with Next.js

### Monitoring
- Performance metrics tracking
- Error boundary implementation
- Loading state management

## 🔮 Future Enhancements

### Planned Features
- [ ] Real-time data synchronization
- [ ] Advanced AI analytics
- [ ] Mobile app companion
- [ ] Telemedicine integration
- [ ] Multi-language support
- [ ] Advanced reporting system

### API Integration
- [ ] Replace mock hooks with real API calls
- [ ] Implement caching strategies
- [ ] Add offline support
- [ ] Real-time notifications

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript strict mode
2. Use functional components with hooks
3. Implement proper error handling
4. Write comprehensive tests
5. Follow accessibility guidelines

### Code Style
- ESLint configuration for consistency
- Prettier for code formatting
- Conventional commits for version control

## 📚 Documentation

### Component Documentation
Each component includes:
- Purpose and functionality description
- Props interface documentation
- Usage examples
- Accessibility considerations

### Hook Documentation
Each hook includes:
- Data structure definitions
- Usage patterns
- Performance considerations
- Error handling

## 🐛 Troubleshooting

### Common Issues
1. **Empty object error**: Ensure all hooks are properly implemented
2. **Import errors**: Check file paths and exports
3. **Type errors**: Verify interface definitions
4. **Rendering issues**: Check component prop types

### Debug Mode
\`\`\`typescript
// Enable debug logging
const DEBUG = process.env.NODE_ENV === 'development'
if (DEBUG) console.log('Debug info:', data)
\`\`\`

## 📞 Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

---

**Built with ❤️ for better patient care**
\`\`\`

This comprehensive markdown documentation covers all aspects of the medical dashboard project, from architecture and implementation details to usage guidelines and future enhancements. It serves as both a technical reference and user guide for the system.
