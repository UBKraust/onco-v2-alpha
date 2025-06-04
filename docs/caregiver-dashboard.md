# Caregiver Dashboard Documentation

## Overview
The Caregiver Dashboard is designed for family members and caregivers who support patients. It provides tools to monitor patient status, track appointments, manage medications, communicate with healthcare providers, and access educational resources.

## Design Principles
- **Simplicity**: Easy to understand for non-medical users
- **Support**: Focus on supporting the caregiver's role
- **Reassurance**: Provide clear status information to reduce anxiety
- **Communication**: Enable effective communication with healthcare team
- **Education**: Provide access to relevant educational resources

## Color Scheme
- **Primary**: Green (`green-500`, `green-600`) - Used for primary actions and caregiver-specific elements
- **Secondary**: Various contextual colors for different sections
- **Background**: White for cards, light gray (`bg-gray-100`) for page backgrounds
- **Text**: Dark gray for primary text, medium gray for secondary text
- **Accents**:
  - Blue (`blue-500`, `blue-600`) for information
  - Red (`red-500`, `red-600`) for alerts and critical information
  - Yellow (`yellow-500`, `yellow-600`) for warnings
  - Purple (`purple-500`, `purple-600`) for educational content

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

### Status Cards
- Clear patient status indicators
- Last update timestamp
- Simple, non-technical language
- Visual indicators for different states

\`\`\`tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Starea Pacientului</CardTitle>
    <Heart className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold text-green-600">Stabilă</div>
    <p className="text-xs text-muted-foreground">Ultima actualizare: acum 2 ore</p>
  </CardContent>
</Card>
\`\`\`

### Activity Timeline
- Clear chronological display of events
- Color-coded categories
- Simple descriptions
- Timestamps

\`\`\`tsx
<div className="flex items-start space-x-3 p-3 border rounded-lg">
  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
  <div>
    <p className="font-medium text-sm">Medicația administrată</p>
    <p className="text-xs text-muted-foreground">Acum 2 ore • Chimioterapie orală</p>
  </div>
</div>
\`\`\`

### Quick Action Buttons
- Clear, descriptive labels
- Appropriate icons
- Consistent styling
- Focus on common caregiver tasks

\`\`\`tsx
<Button className="w-full justify-start">
  <Phone className="mr-2 h-4 w-4" />
  Contactează Echipa Medicală
</Button>
\`\`\`

### Information Cards
- Simple, clear information
- Grouped by category
- Non-technical language
- Contact information when relevant

\`\`\`tsx
<div className="p-4 border rounded-lg">
  <h4 className="font-medium">Medic Curant</h4>
  <p className="text-sm text-muted-foreground">Dr. Emily Carter</p>
  <p className="text-xs text-muted-foreground">Oncologie</p>
</div>
\`\`\`

## Layout Guidelines
- **Grid System**: Use Tailwind's grid system with responsive breakpoints
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Card Layout**: 
  - Single column on mobile
  - Two columns on tablet
  - Four columns for status cards on desktop
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
- **Feedback**: Immediate visual feedback for user actions
- **Simplicity**: Minimize complex interactions

## Accessibility Guidelines
- **Color Contrast**: Maintain WCAG AA compliance (minimum 4.5:1 for normal text)
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Screen Readers**: Provide appropriate ARIA labels and descriptions
- **Focus Indicators**: Visible focus states for keyboard navigation
- **Alternative Text**: For all images and icons
- **Semantic HTML**: Use appropriate HTML elements for their semantic meaning
- **Simple Language**: Use clear, non-technical language

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
2. **Status Cards**: Patient status metrics in a grid layout
3. **Activity & Actions**: Two-column layout with recent activity and quick actions
4. **Patient Information**: Comprehensive patient information cards
5. **Resources**: Educational resources and support information

## Do's and Don'ts

### Do's
- Use simple, non-technical language
- Provide clear status updates
- Enable quick communication with healthcare team
- Include educational resources
- Maintain a reassuring tone

### Don'ts
- Don't use complex medical terminology without explanation
- Don't overwhelm with too much information at once
- Don't hide critical alerts or notifications
- Don't require excessive clicks for common actions
- Don't use ambiguous status indicators
