# Admin Dashboard Documentation

## Overview
The Admin Dashboard provides system administrators with tools to manage users, monitor system performance, configure settings, generate reports, and ensure the overall health and security of the platform.

## Design Principles
- **Control**: Provide comprehensive system management capabilities
- **Monitoring**: Enable effective system monitoring and issue detection
- **Security**: Emphasize security and access control
- **Efficiency**: Streamline administrative tasks
- **Clarity**: Present complex system information clearly

## Color Scheme
- **Primary**: Purple (`purple-500`, `purple-600`) - Used for primary actions and admin-specific elements
- **Secondary**: Various contextual colors for different sections
- **Background**: White for cards, light gray (`bg-gray-100`) for page backgrounds
- **Text**: Dark gray for primary text, medium gray for secondary text
- **Accents**:
  - Green (`green-500`, `green-600`) for success states and positive indicators
  - Red (`red-500`, `red-600`) for alerts and critical information
  - Yellow (`yellow-500`, `yellow-600`) for warnings
  - Blue (`blue-500`, `blue-600`) for information

## Typography
- **Headings**: 
  - H1: 24px (3xl), font-bold
  - H2: 20px (2xl), font-semibold
  - H3: 18px (xl), font-semibold
  - H4: 16px (lg), font-medium
- **Body**: 
  - Regular: 16px (base)
  - Small: 14px (sm)
  - Extra small: 12px (xs)
- **Font Family**: Default system font stack via Tailwind

## Components

### KPI Cards
- Compact cards displaying key performance indicators
- Clear numeric values with descriptive labels
- Trend indicators (percentage changes)
- Appropriate icons

\`\`\`tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Total Utilizatori</CardTitle>
    <Users className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">1,247</div>
    <p className="text-xs text-muted-foreground">+12% față de luna trecută</p>
  </CardContent>
</Card>
\`\`\`

### System Status Cards
- Progress indicators for system metrics
- Status badges (Optimal, Warning, Critical)
- Clear labels and values
- Visual indicators for different states

\`\`\`tsx
<div className="space-y-2">
  <div className="flex items-center justify-between">
    <span className="text-sm">Performanță Server</span>
    <Badge className="bg-green-600">Optimă</Badge>
  </div>
  <Progress value={92} className="h-2" />
</div>
\`\`\`

### Alert Lists
- Severity indicators
- Clear descriptions
- Timestamps
- Action buttons

\`\`\`tsx
<div className="flex items-center justify-between p-3 border rounded-lg">
  <div className="flex items-center space-x-3">
    <AlertTriangle className="h-4 w-4 text-red-600" />
    <div>
      <p className="text-sm font-medium">{alert.title}</p>
      <p className="text-xs text-muted-foreground">{alert.message}</p>
    </div>
  </div>
  <div className="flex items-center space-x-2">
    <Badge variant="destructive">{alert.severity}</Badge>
    <Clock className="h-3 w-3 text-muted-foreground" />
    <span className="text-xs text-muted-foreground">{alert.createdAt.toLocaleDateString()}</span>
  </div>
</div>
\`\`\`

### Action Buttons
- Clear, descriptive labels
- Appropriate icons
- Consistent styling
- Logical grouping

\`\`\`tsx
<Button className="w-full justify-start" size="sm">
  <Users className="mr-2 h-4 w-4" />
  Gestionează Utilizatori
</Button>
\`\`\`

## Layout Guidelines
- **Grid System**: Use Tailwind's grid system with responsive breakpoints
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Card Layout**: 
  - Single column on mobile
  - Two columns on tablet
  - Four columns for KPIs on desktop
- **Section Organization**: Group related information in clearly defined sections
- **Responsive Behavior**: 
  - Stack elements vertically on mobile
  - Use horizontal layouts on larger screens
  - Prioritize critical information on smaller screens

## Interaction Patterns
- **Hover States**: Subtle scaling and shadow effects
- **Active States**: Clear visual feedback for active elements
- **Loading States**: Use skeleton loaders for content loading
- **Transitions**: Smooth transitions between states (300ms duration)
- **Confirmation**: Require confirmation for critical actions
- **Feedback**: Immediate visual feedback for user actions

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
  - Single column layouts on mobile
  - Reduced padding and margins on smaller screens
  - Simplified navigation on mobile
  - Prioritized content on smaller screens

## Page Structure
1. **Header**: Page title and description
2. **KPI Cards**: Key metrics in a grid layout
3. **System Status & Quick Actions**: Two-column layout with system metrics and common actions
4. **Alerts**: List of system alerts and notifications
5. **Detailed Reports/Settings**: Additional sections for specific administrative tasks

## Do's and Don'ts

### Do's
- Prioritize critical system information
- Provide clear status indicators
- Enable quick access to common administrative tasks
- Use consistent terminology and icons
- Implement proper confirmation for destructive actions

### Don'ts
- Don't hide critical system alerts
- Don't use ambiguous status indicators
- Don't require excessive clicks for common actions
- Don't overwhelm with too much technical information at once
- Don't use inconsistent color coding
