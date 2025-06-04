# Navigator Dashboard Documentation

## Overview
The Navigator Dashboard is designed for healthcare navigators who coordinate patient care, manage patient information, track appointments, monitor alerts, and facilitate communication between patients and the healthcare team.

## Design Principles
- **Efficiency**: Optimize for quick access to patient information and actions
- **Organization**: Clear structure for managing multiple patients
- **Prioritization**: Highlight urgent matters and critical information
- **Clarity**: Present complex information in an understandable way
- **Consistency**: Maintain consistent patterns across all navigator interfaces

## Color Scheme
- **Primary**: Blue (`blue-500`, `blue-600`) - Used for primary actions and navigator-specific elements
- **Secondary**: Various contextual colors for different sections
- **Background**: White for cards, light gray (`bg-gray-100`) for page backgrounds
- **Text**: Dark gray for primary text, medium gray for secondary text
- **Accents**:
  - Green (`green-500`, `green-600`) for success states and positive indicators
  - Red (`red-500`, `red-600`) for alerts and critical information
  - Yellow (`yellow-500`, `yellow-600`) for warnings
  - Purple (`purple-500`, `purple-600`) for special features

## Typography
- **Headings**: 
  - H1: 24px (3xl), font-bold, text-blue-600 for main dashboard title
  - H2: 20px (2xl), font-semibold
  - H3: 18px (xl), font-semibold
  - H4: 16px (lg), font-medium
- **Body**: 
  - Regular: 16px (base)
  - Small: 14px (sm)
  - Extra small: 12px (xs)
- **Font Family**: Default system font stack via Tailwind

## Components

### Tabs
- Used for main navigation within the dashboard
- Clear, descriptive labels with icons
- Active tab indicator
- Responsive behavior (scrollable on mobile)

\`\`\`tsx
<Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
  <TabsList className="grid w-full grid-cols-7">
    <TabsTrigger value="overview" className="flex items-center gap-2">
      <Users className="h-4 w-4" />
      Prezentare
    </TabsTrigger>
    <!-- Additional tabs -->
  </TabsList>
  <TabsContent value="overview" className="space-y-4">
    <NavigatorOverview onSelectPatient={handleSelectPatient} />
  </TabsContent>
  <!-- Additional tab content -->
</Tabs>
\`\`\`

### Patient Lists
- Clear patient information with status indicators
- Action buttons for common tasks
- Sorting and filtering options
- Pagination for large lists

### Alert Cards
- Color-coded by severity
- Clear, concise information
- Timestamp and context
- Action buttons for resolution

### Calendar View
- Clear date and time indicators
- Color-coded by appointment type
- Patient information
- Quick actions (reschedule, cancel)

### Patient Detail View
- Comprehensive patient information
- Tabbed interface for different categories
- Action buttons for common tasks
- Status indicators and history

## Layout Guidelines
- **Grid System**: Use Tailwind's grid system with responsive breakpoints
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Card Layout**: 
  - Single column on mobile
  - Two columns on tablet
  - Multiple columns on desktop
- **Section Organization**: Group related information in clearly defined sections
- **Responsive Behavior**: 
  - Simplified views on mobile
  - More detailed layouts on larger screens
  - Collapsible sections for complex information

## Interaction Patterns
- **Hover States**: Subtle scaling and shadow effects
- **Active States**: Clear visual feedback for active elements
- **Loading States**: Use skeleton loaders for content loading
- **Transitions**: Smooth transitions between states (300ms duration)
- **Feedback**: Immediate visual feedback for user actions
- **Confirmation**: Confirm potentially destructive actions

## Accessibility Guidelines
- **Color Contrast**: Maintain WCAG AA compliance (minimum 4.5:1 for normal text)
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Screen Readers**: Provide appropriate ARIA labels and descriptions
- **Focus Indicators**: Visible focus states for keyboard navigation
- **Alternative Text**: For all images and icons
- **Semantic HTML**: Use appropriate HTML elements for their semantic meaning

## Responsive Design Rules
- **Mobile First**: Design for mobile first, then enhance for larger screens
- **Breakpoints**:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- **Adaptations**:
  - Simplified navigation on mobile (hamburger menu)
  - Stacked layouts on smaller screens
  - Reduced information density on mobile
  - Prioritized content on smaller screens

## Component Usage Examples

### Patient Card
\`\`\`tsx
<Card className="hover:shadow-md transition-shadow">
  <CardHeader className="pb-2">
    <div className="flex justify-between">
      <CardTitle>Maria Popescu</CardTitle>
      <PatientStatusBadge status="active" />
    </div>
    <CardDescription>ID: 12345 • 45 ani</CardDescription>
  </CardHeader>
  <CardContent className="pb-2">
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Diagnostic:</span>
        <span className="font-medium">Cancer de sân</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Tratament:</span>
        <span className="font-medium">Chimioterapie (Ciclu 2/6)</span>
      </div>
    </div>
  </CardContent>
  <CardFooter className="pt-2">
    <Button size="sm" className="w-full">Vezi Detalii</Button>
  </CardFooter>
</Card>
\`\`\`

### Alert Item
\`\`\`tsx
<div className="flex items-center justify-between p-3 border rounded-lg">
  <div className="flex items-center space-x-3">
    <AlertTriangle className="h-4 w-4 text-red-600" />
    <div>
      <p className="text-sm font-medium">Simptome severe</p>
      <p className="text-xs text-muted-foreground">Maria Popescu a raportat simptome severe</p>
    </div>
  </div>
  <div className="flex items-center space-x-2">
    <Badge variant="destructive">Critic</Badge>
    <Clock className="h-3 w-3 text-muted-foreground" />
    <span className="text-xs text-muted-foreground">Acum 30 min</span>
  </div>
</div>
\`\`\`

## Page Structure
1. **Header**: Page title and quick actions
2. **Tabs Navigation**: Main sections of the dashboard
3. **Content Area**: Dynamic content based on selected tab
4. **Patient Details**: Comprehensive patient information when selected
5. **Settings**: Configuration options for the navigator dashboard

## Do's and Don'ts

### Do's
- Prioritize critical information and alerts
- Provide clear patient status indicators
- Enable efficient navigation between patients
- Offer quick access to common actions
- Maintain consistent information hierarchy

### Don'ts
- Don't overwhelm with too much information at once
- Don't hide critical alerts or notifications
- Don't use ambiguous status indicators
- Don't require excessive clicks for common actions
- Don't use inconsistent terminology or icons
