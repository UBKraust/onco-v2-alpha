# UI Components Guide

This document provides a comprehensive guide to all UI components used across the OncoLink platform. It serves as a reference to maintain consistency in design and implementation.

## Core Components

### Cards
Cards are the primary container component used throughout the application for grouping related information.

#### Card Variants
- **Standard Card**: Basic container with header and content
- **Interactive Card**: With hover effects for clickable cards
- **Status Card**: For displaying status information
- **Action Card**: For grouping related actions

#### Card Usage Guidelines
- Use consistent padding (p-6)
- Include proper header structure with title and optional description
- Group related information within cards
- Use hover effects only for interactive cards
- Maintain consistent spacing between card elements

\`\`\`tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
  <CardFooter>
    {/* Optional footer content */}
  </CardFooter>
</Card>
\`\`\`

### Buttons
Buttons are used for actions throughout the application.

#### Button Variants
- **Primary**: Solid background, white text - for primary actions
- **Secondary**: Outline style - for secondary actions
- **Ghost**: Minimal styling - for tertiary actions
- **Destructive**: Red styling - for destructive actions

#### Button Sizes
- **Default**: Standard size
- **Small (sm)**: Compact size for tight spaces
- **Large (lg)**: Larger size for emphasis

#### Button Usage Guidelines
- Include icons when helpful for recognition
- Use consistent button types for similar actions
- Provide clear, concise labels
- Group related buttons
- Order buttons by importance

\`\`\`tsx
<Button>Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="ghost">Tertiary Action</Button>
<Button size="sm">Small Button</Button>
<Button className="w-full">Full Width</Button>
<Button>
  <Icon className="mr-2 h-4 w-4" />
  With Icon
</Button>
\`\`\`

### Badges
Badges are used to highlight status, counts, or categories.

#### Badge Variants
- **Default**: Primary color
- **Secondary**: Subdued styling
- **Outline**: Border only
- **Destructive**: For negative or critical states

#### Badge Usage Guidelines
- Keep text concise
- Use consistent colors for similar statuses
- Include icons when helpful
- Ensure sufficient contrast with background

\`\`\`tsx
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Critical</Badge>
<Badge className="bg-green-600">Custom</Badge>
\`\`\`

### Tabs
Tabs are used for switching between related content views.

#### Tab Usage Guidelines
- Use clear, concise labels
- Include icons when helpful
- Limit the number of tabs (ideally 2-7)
- Ensure consistent content structure between tabs
- Maintain tab state during navigation

\`\`\`tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
\`\`\`

### Progress Indicators
Progress indicators show the status of a process or value.

#### Progress Variants
- **Default**: Standard progress bar
- **Indeterminate**: For unknown progress duration
- **With Label**: Including percentage or value

#### Progress Usage Guidelines
- Include clear labels
- Use appropriate colors for context
- Provide sufficient contrast
- Consider accessibility for color-blind users

\`\`\`tsx
<Progress value={60} />
<div className="space-y-2">
  <div className="flex justify-between">
    <span>Label</span>
    <span>60%</span>
  </div>
  <Progress value={60} />
</div>
\`\`\`

### Avatars
Avatars represent users throughout the application.

#### Avatar Variants
- **Image**: With user photo
- **Fallback**: With user initials
- **Sizes**: sm, md (default), lg, xl

#### Avatar Usage Guidelines
- Use consistent sizing
- Provide fallback for missing images
- Ensure sufficient contrast for initials
- Use appropriate border radius (rounded-full)

\`\`\`tsx
<Avatar>
  <AvatarImage src="/user-avatar.jpg" alt="User Name" />
  <AvatarFallback>UN</AvatarFallback>
</Avatar>
\`\`\`

### Dropdown Menus
Dropdown menus provide additional options in a compact format.

#### Dropdown Usage Guidelines
- Group related actions
- Use clear, concise labels
- Include icons when helpful
- Provide keyboard navigation
- Consider mobile touch targets

\`\`\`tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreVertical className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Option 1</DropdownMenuItem>
    <DropdownMenuItem>Option 2</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Option 3</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
\`\`\`

## Layout Components

### Grid Layouts
Grid layouts are used for organizing content in rows and columns.

#### Grid Usage Guidelines
- Use responsive grid columns
- Maintain consistent gutters (gap-6)
- Consider content hierarchy
- Ensure proper alignment

\`\`\`tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Grid items */}
</div>
\`\`\`

### Sidebar
The sidebar provides primary navigation throughout the application.

#### Sidebar Variants
- **Expanded**: Full width with labels
- **Collapsed**: Icon-only for more content space
- **Mobile**: Hidden behind hamburger menu

#### Sidebar Usage Guidelines
- Group related navigation items
- Use consistent icons
- Provide clear active state
- Consider responsive behavior
- Include proper accessibility attributes

### Header
The header provides global actions and context.

#### Header Usage Guidelines
- Include logo and application name
- Provide search functionality
- Include user menu
- Consider responsive behavior
- Maintain consistent height

## Form Components

### Input Fields
Input fields allow users to enter text data.

#### Input Variants
- **Default**: Standard text input
- **With Icon**: Including leading or trailing icon
- **Disabled**: Non-interactive state
- **Error**: For validation errors

#### Input Usage Guidelines
- Include clear labels
- Provide placeholder text when helpful
- Include validation feedback
- Consider input masks for formatted data
- Maintain consistent sizing

\`\`\`tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" placeholder="Enter your email" />
</div>
\`\`\`

### Select Dropdowns
Select dropdowns allow users to choose from a list of options.

#### Select Usage Guidelines
- Include clear labels
- Provide placeholder text
- Consider grouping related options
- Maintain consistent sizing
- Include proper accessibility attributes

### Checkboxes and Radio Buttons
Used for boolean options or selecting from a list of options.

#### Usage Guidelines
- Include clear labels
- Group related options
- Consider default states
- Maintain consistent sizing
- Include proper accessibility attributes

\`\`\`tsx
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">I agree to the terms and conditions</Label>
</div>
\`\`\`

## Feedback Components

### Alerts
Alerts provide important information to users.

#### Alert Variants
- **Default**: Informational
- **Success**: Positive outcome
- **Warning**: Potential issue
- **Destructive**: Error or critical issue

#### Alert Usage Guidelines
- Use appropriate variant for context
- Include clear, concise message
- Consider dismissible options
- Include icons when helpful
- Provide actions when appropriate

### Toast Notifications
Toast notifications provide temporary feedback.

#### Toast Usage Guidelines
- Keep messages brief
- Use appropriate variant for context
- Limit duration on screen
- Consider position on screen
- Avoid stacking too many notifications

### Loading Indicators
Loading indicators show that content is being processed.

#### Loading Variants
- **Spinner**: For general loading states
- **Skeleton**: For content loading
- **Progress**: For known duration processes

#### Loading Usage Guidelines
- Use appropriate indicator for context
- Consider loading duration
- Provide feedback for long processes
- Maintain consistent styling

## Utility Components

### Tooltips
Tooltips provide additional information on hover.

#### Tooltip Usage Guidelines
- Keep content brief
- Position consistently
- Consider trigger behavior
- Ensure sufficient contrast
- Include proper accessibility attributes

### Modals
Modals focus user attention on specific content or actions.

#### Modal Usage Guidelines
- Use sparingly for important interactions
- Include clear titles
- Provide obvious close mechanism
- Consider backdrop interaction
- Maintain focus management
- Include proper accessibility attributes

### Popovers
Popovers provide additional content related to a specific element.

#### Popover Usage Guidelines
- Keep content focused
- Position consistently
- Consider trigger behavior
- Ensure sufficient contrast
- Include proper accessibility attributes

## Color System

### Primary Colors
- **Pink**: `pink-500`, `pink-600` - Patient context
- **Blue**: `blue-500`, `blue-600` - Navigator context
- **Purple**: `purple-500`, `purple-600` - Admin context
- **Green**: `green-500`, `green-600` - Caregiver context

### Semantic Colors
- **Success**: `green-500`, `green-600`
- **Warning**: `yellow-500`, `yellow-600`
- **Error**: `red-500`, `red-600`
- **Info**: `blue-500`, `blue-600`

### Neutral Colors
- **Background**: `white`, `gray-50`, `gray-100`
- **Text**: `gray-900`, `gray-700`, `gray-500`
- **Border**: `gray-200`, `gray-300`

### Color Usage Guidelines
- Use primary colors for main actions and branding
- Use semantic colors consistently for status and feedback
- Ensure sufficient contrast for text
- Consider color-blind users
- Limit color palette for consistency

## Typography

### Headings
- **H1**: 24px (3xl), font-bold
- **H2**: 20px (2xl), font-semibold
- **H3**: 18px (xl), font-semibold
- **H4**: 16px (lg), font-medium

### Body Text
- **Regular**: 16px (base)
- **Small**: 14px (sm)
- **Extra Small**: 12px (xs)

### Typography Usage Guidelines
- Maintain consistent heading hierarchy
- Use appropriate font weights
- Consider line height for readability
- Ensure sufficient contrast
- Limit font variations

## Icons

### Icon System
The application uses Lucide React icons throughout the interface.

### Icon Usage Guidelines
- Use consistently across similar contexts
- Include text labels when possible
- Consider accessibility
- Maintain consistent sizing
- Use appropriate color and contrast

\`\`\`tsx
<Icon className="h-4 w-4 text-muted-foreground" />
\`\`\`

## Accessibility Guidelines

### General Accessibility
- Ensure sufficient color contrast
- Provide text alternatives for images
- Use semantic HTML elements
- Enable keyboard navigation
- Include proper ARIA attributes
- Test with screen readers
- Support text resizing

### Component-Specific Guidelines
- **Buttons**: Include proper labels and roles
- **Forms**: Associate labels with inputs
- **Modals**: Manage focus and provide keyboard interaction
- **Tables**: Include proper headers and structure
- **Images**: Provide alt text

## Responsive Design

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

### Responsive Guidelines
- Design mobile-first
- Use fluid layouts
- Consider touch targets on mobile
- Adapt navigation for different screen sizes
- Test on various devices and orientations

## Animation and Transitions

### Animation Guidelines
- Use subtle animations
- Keep durations short (200-300ms)
- Consider reduced motion preferences
- Use consistent timing functions
- Avoid excessive animation

\`\`\`tsx
<div className="transition-all duration-300 ease-in-out hover:scale-105">
  {/* Content */}
</div>
\`\`\`

## Best Practices

### General Guidelines
- Maintain consistent spacing
- Group related elements
- Consider information hierarchy
- Use appropriate component variants
- Follow accessibility guidelines
- Test on various devices and browsers
- Consider performance implications
- Document component usage
