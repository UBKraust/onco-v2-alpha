# OncoLink Design System Overview

## Introduction
The OncoLink Design System provides a comprehensive set of guidelines, components, and patterns to ensure consistency, accessibility, and efficiency across the OncoLink platform. This document provides an overview of the design system and how to use it effectively.

## Core Principles

### 1. Consistency
Maintain visual and functional consistency across all interfaces to create a cohesive user experience.

### 2. Accessibility
Ensure all components and patterns are accessible to users with disabilities, following WCAG AA standards.

### 3. Efficiency
Optimize workflows and interactions to help users accomplish tasks quickly and effectively.

### 4. Clarity
Present information and actions clearly to minimize confusion and cognitive load.

### 5. Flexibility
Design components and patterns that can adapt to various contexts and requirements.

## Design Language

### Brand Identity
- **Logo**: OncoLink logo with gradient from pink to blue
- **Brand Colors**: 
  - Primary: Pink (`pink-500`, `pink-600`)
  - Secondary: Blue (`blue-500`, `blue-600`)
  - Tertiary: Purple (`purple-500`, `purple-600`)
  - Quaternary: Green (`green-500`, `green-600`)

### Color System
- **Primary Colors**: Used for main actions and branding
- **Role-Specific Colors**: Different primary colors for each user role
- **Semantic Colors**: For status and feedback
- **Neutral Colors**: For backgrounds, text, and borders

### Typography
- **Font Family**: Default system font stack via Tailwind
- **Heading Styles**: Consistent sizing and weights
- **Body Styles**: Optimized for readability
- **Special Styles**: For specific use cases

### Iconography
- **Icon Set**: Lucide React icons
- **Usage Guidelines**: Consistent sizing and coloring
- **Accessibility**: Always with text labels or proper ARIA attributes

### Spacing
- **Scale**: Based on Tailwind's spacing scale
- **Consistency**: Maintain consistent spacing throughout the interface
- **Responsiveness**: Adapt spacing for different screen sizes

## Component Library

### Core Components
- **Cards**: For grouping related information
- **Buttons**: For actions and navigation
- **Badges**: For status and counts
- **Tabs**: For switching between related content
- **Progress Indicators**: For showing status and progress

### Layout Components
- **Grid System**: For organizing content
- **Sidebar**: For primary navigation
- **Header**: For global actions and context
- **Footer**: For secondary information and actions

### Form Components
- **Input Fields**: For text entry
- **Select Dropdowns**: For choosing from options
- **Checkboxes and Radio Buttons**: For boolean options or selections
- **Date Pickers**: For date selection
- **File Uploads**: For document management

### Feedback Components
- **Alerts**: For important information
- **Toast Notifications**: For temporary feedback
- **Loading Indicators**: For processing states
- **Error Messages**: For validation and system errors

### Data Display Components
- **Tables**: For structured data
- **Lists**: For sequential information
- **Charts**: For data visualization
- **Timeline**: For chronological events

### Navigation Components
- **Breadcrumbs**: For hierarchical navigation
- **Pagination**: For multi-page content
- **Tabs**: For switching between related content
- **Dropdown Menus**: For additional options

## Role-Specific Design Guidelines

### Patient Interface
- **Primary Color**: Pink
- **Focus**: Health monitoring, appointments, communication
- **Tone**: Supportive, clear, reassuring
- **Components**: Symptom trackers, appointment cards, messaging

### Navigator Interface
- **Primary Color**: Blue
- **Focus**: Patient management, coordination, alerts
- **Tone**: Efficient, informative, actionable
- **Components**: Patient lists, alert management, calendar views

### Admin Interface
- **Primary Color**: Purple
- **Focus**: System management, monitoring, configuration
- **Tone**: Technical, comprehensive, control-oriented
- **Components**: KPI cards, system status, user management

### Caregiver Interface
- **Primary Color**: Green
- **Focus**: Patient support, monitoring, education
- **Tone**: Supportive, informative, reassuring
- **Components**: Status cards, activity timeline, resource access

## Pattern Library

### Common Patterns
- **Authentication**: Login, registration, password reset
- **Notifications**: System alerts, reminders, updates
- **Search**: Finding patients, documents, resources
- **Filtering**: Narrowing down lists and results
- **Sorting**: Organizing information by various criteria

### Role-Specific Patterns
- **Patient**: Symptom reporting, appointment scheduling, medication tracking
- **Navigator**: Patient assignment, alert management, care coordination
- **Admin**: User management, system configuration, reporting
- **Caregiver**: Patient monitoring, medication management, resource access

## Implementation Guidelines

### Development Standards
- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui
- **State Management**: React hooks and context
- **Accessibility**: WCAG AA compliance

### Code Organization
- **Component Structure**: Atomic design principles
- **File Naming**: Kebab-case for files
- **Import Conventions**: Absolute imports with aliases
- **Type Safety**: TypeScript for all components

### Performance Considerations
- **Code Splitting**: For faster initial load
- **Lazy Loading**: For non-critical components
- **Image Optimization**: For faster rendering
- **Caching Strategies**: For improved performance

## Usage Guidelines

### When to Use Components
- **Cards**: For grouping related information
- **Buttons**: For actions and navigation
- **Tabs**: For switching between related content
- **Modals**: For focused interactions
- **Forms**: For data entry and submission

### How to Combine Components
- **Layout Patterns**: Common arrangements of components
- **Component Composition**: Building complex interfaces from simple components
- **Responsive Considerations**: Adapting layouts for different screen sizes

### Customization Guidelines
- **Theming**: How to apply role-specific themes
- **Variants**: When to use different component variants
- **Extensions**: How to extend existing components
- **Custom Components**: When to create new components

## Accessibility Guidelines

### General Principles
- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Screen Readers**: Proper ARIA attributes and semantic HTML
- **Color Contrast**: Sufficient contrast for text and interactive elements
- **Focus Management**: Clear focus indicators and logical tab order
- **Reduced Motion**: Support for users who prefer reduced motion

### Component-Specific Guidelines
- **Buttons**: Proper labels and roles
- **Forms**: Associated labels and error messages
- **Modals**: Focus trapping and keyboard interaction
- **Tables**: Proper headers and structure
- **Images**: Alternative text

## Responsive Design Guidelines

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

### Responsive Strategies
- **Mobile-First**: Design for mobile, then enhance for larger screens
- **Fluid Layouts**: Use percentage-based widths and flexible grids
- **Component Adaptations**: How components change across breakpoints
- **Navigation Patterns**: Different navigation approaches for different screen sizes

## Resources

### Design Assets
- **Component Library**: shadcn/ui
- **Icon Set**: Lucide React
- **Color Palette**: Tailwind CSS colors

### Development Resources
- **Documentation**: Component API references
- **Examples**: Common usage patterns
- **Templates**: Starting points for new features

### Tools
- **Design Tools**: Figma, Adobe XD
- **Development Tools**: VS Code, Chrome DevTools
- **Accessibility Tools**: axe, WAVE, screen readers

## Governance

### Contribution Process
- **Proposing Changes**: How to suggest new components or patterns
- **Review Process**: How changes are evaluated
- **Implementation**: How approved changes are implemented
- **Documentation**: How changes are documented

### Versioning
- **Semantic Versioning**: Major, minor, and patch versions
- **Deprecation Policy**: How components are deprecated
- **Migration Guides**: How to update to new versions

### Support
- **Issue Reporting**: How to report bugs or issues
- **Feature Requests**: How to request new features
- **Help Channels**: Where to get help with the design system
