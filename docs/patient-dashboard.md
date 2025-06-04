# Patient Dashboard Documentation

## Overview
The Patient Dashboard serves as the primary interface for patients to monitor their health status, access medical records, track symptoms, manage appointments, and communicate with their healthcare team.

## Design Principles
- **Patient-centered**: Focus on the patient's needs and journey
- **Clarity**: Present information in a clear, understandable manner
- **Accessibility**: Ensure all features are accessible to users with disabilities
- **Consistency**: Maintain consistent design patterns throughout the interface
- **Hierarchy**: Organize information by importance and relevance

## Color Scheme
- **Primary**: Pink (`pink-500`, `pink-600`) - Used for primary actions and patient-specific elements
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

### Cards
- Standard card with `CardHeader`, `CardTitle`, `CardDescription`, and `CardContent`
- Cards should have consistent padding (p-6)
- Hover effects: `hover:shadow-lg hover:scale-105` for interactive cards
- Border: `border-2` with contextual hover colors (e.g., `hover:border-pink-200`)

### Buttons
- Primary: Solid background, white text
- Secondary: Outline style
- Icon buttons: Include both icon and text for accessibility
- Action buttons: Use appropriate icons to reinforce meaning
- Size variants: Default, small (sm), and large (lg)

### Navigation
- Clear, descriptive labels
- Active state indicators
- Consistent icon usage
- Grouped by functional area

### Status Indicators
- Badges with appropriate colors for different statuses
- Icons to reinforce meaning
- Clear, concise text labels

### Data Visualization
- Progress bars for treatment progress
- Simple charts for symptom tracking
- Clear labels and legends
- Accessible color combinations

## Layout Guidelines
- **Grid System**: Use Tailwind's grid system with responsive breakpoints
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Card Layout**: 
  - Single column on mobile
  - Two columns on tablet
  - Three or four columns on desktop
- **Section Organization**: Group related information in clearly defined sections
- **Responsive Behavior**: 
  - Stack elements vertically on mobile
  - Use horizontal layouts on larger screens
  - Hide secondary information on smaller screens

## Interaction Patterns
- **Hover States**: Subtle scaling and shadow effects
- **Active States**: Clear visual feedback for active elements
- **Loading States**: Use skeleton loaders for content loading
- **Transitions**: Smooth transitions between states (300ms duration)
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
  - Hidden or collapsed secondary information on smaller screens

## Component Usage Examples

### Quick Stats Cards
\`\`\`tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Programări</CardTitle>
    <Calendar className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">3</div>
    <p className="text-xs text-muted-foreground">Următoarea: Mâine la 10:00</p>
  </CardContent>
</Card>
\`\`\`

### Action Buttons
\`\`\`tsx
<Button asChild className="h-20 flex-col">
  <Link href="/patient/symptoms">
    <Activity className="h-6 w-6 mb-2" />
    Monitorizare Simptome
  </Link>
</Button>
\`\`\`

### Status Badges
\`\`\`tsx
<Badge className="bg-green-600">Optimă</Badge>
<Badge variant="outline">1,456</Badge>
<Badge variant="secondary">Actualizate</Badge>
\`\`\`

## Page Structure
1. **Header**: Page title and user information
2. **Quick Stats**: Key metrics in card format
3. **Main Content**: Primary information and actions
4. **Quick Actions**: Common tasks and shortcuts
5. **Secondary Information**: Additional details and options

## Do's and Don'ts

### Do's
- Use consistent spacing and alignment
- Group related information together
- Provide clear feedback for user actions
- Use appropriate color coding for different states
- Ensure all interactive elements are accessible

### Don'ts
- Don't use colors inconsistently
- Don't overcrowd the interface with too much information
- Don't use low-contrast text
- Don't rely solely on color to convey information
- Don't use non-standard interaction patterns
