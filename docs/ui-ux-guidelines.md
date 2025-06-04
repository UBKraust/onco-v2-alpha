# Ghid UI/UX - Platforma OncoLink

## Principii Generale de Design

### 1. Consistență
- **Layout Grid**: Folosim sistemul grid Tailwind (1, 2, 3, 4, 6, 12 coloane)
- **Spacing**: Multipli de 4px (space-4, space-6, space-8, etc.)
- **Breakpoints**: Mobile-first cu md: și lg: breakpoints
- **Component Reuse**: Aceleași componente în toate dashboard-urile

### 2. Hierarhie Vizuală
\`\`\`css
/* Typography Hierarchy */
h1: text-3xl font-bold          /* Titluri principale dashboard */
h2: text-2xl font-bold          /* Titluri secțiuni */
h3: text-xl font-semibold       /* Titluri card-uri */
h4: text-lg font-medium         /* Subtitluri */
body: text-sm                   /* Text normal */
caption: text-xs text-muted-foreground /* Text secundar */
\`\`\`

### 3. Paleta de Culori

#### Culori Principale (Role-based):
\`\`\`css
/* Patient Theme */
--patient-primary: #ec4899      /* Pink-500 */
--patient-light: #fce7f3        /* Pink-100 */
--patient-border: #fbcfe8       /* Pink-200 */

/* Navigator Theme */
--navigator-primary: #3b82f6    /* Blue-500 */
--navigator-light: #dbeafe      /* Blue-100 */
--navigator-border: #bfdbfe     /* Blue-200 */

/* Admin Theme */
--admin-primary: #8b5cf6        /* Purple-500 */
--admin-light: #ede9fe          /* Purple-100 */
--admin-border: #ddd6fe         /* Purple-200 */

/* Caregiver Theme */
--caregiver-primary: #10b981    /* Green-500 */
--caregiver-light: #d1fae5      /* Green-100 */
--caregiver-border: #a7f3d0     /* Green-200 */
\`\`\`

#### Culori Semantice:
\`\`\`css
/* Status Colors */
--success: #10b981              /* Green-500 */
--warning: #f59e0b              /* Yellow-500 */
--error: #ef4444                /* Red-500 */
--info: #3b82f6                 /* Blue-500 */

/* Text Colors */
--text-primary: #111827         /* Gray-900 */
--text-secondary: #6b7280       /* Gray-500 */
--text-muted: #9ca3af           /* Gray-400 */
\`\`\`

## Componente UI Standard

### 1. Card Component
\`\`\`typescript
// Standard Card Structure
<Card className="hover:shadow-lg transition-all duration-200">
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Titlu</CardTitle>
    <Icon className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">Valoare</div>
    <p className="text-xs text-muted-foreground">Descriere</p>
  </CardContent>
</Card>
\`\`\`

### 2. Button Variants
\`\`\`css
/* Primary Button */
.btn-primary {
  @apply bg-primary text-primary-foreground hover:bg-primary/90;
}

/* Secondary Button */
.btn-secondary {
  @apply border border-input bg-background hover:bg-accent hover:text-accent-foreground;
}

/* Outline Button */
.btn-outline {
  @apply border border-input bg-background hover:bg-accent hover:text-accent-foreground;
}

/* Quick Action Button */
.btn-quick-action {
  @apply h-20 flex-col bg-primary text-primary-foreground;
}
\`\`\`

### 3. Badge Variants
\`\`\`css
/* Default Badge */
.badge-default {
  @apply bg-primary text-primary-foreground;
}

/* Success Badge */
.badge-success {
  @apply bg-green-600 text-white;
}

/* Warning Badge */
.badge-warning {
  @apply bg-yellow-500 text-white;
}

/* Error Badge */
.badge-error {
  @apply bg-red-600 text-white;
}

/* Outline Badge */
.badge-outline {
  @apply border border-input bg-background;
}
\`\`\`

## Layout Patterns

### 1. Dashboard Layout Standard
\`\`\`typescript
<div className="space-y-6">
  {/* Header Section */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold">Titlu Dashboard</h1>
      <p className="text-muted-foreground">Descriere</p>
    </div>
    {/* Optional: Action buttons */}
  </div>

  {/* KPI Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* 4 KPI Cards */}
  </div>

  {/* Main Content */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Content cards */}
  </div>
</div>
\`\`\`

### 2. Responsive Grid System
\`\`\`css
/* Mobile First Approach */
.grid-responsive-stats {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

.grid-responsive-content {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
}

.grid-responsive-navigation {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}
\`\`\`

### 3. Card Hover Effects
\`\`\`css
.card-hover {
  @apply transition-all duration-200 hover:shadow-lg hover:scale-105;
}

.card-hover-border {
  @apply border-2 hover:border-primary-200;
}
\`\`\`

## Icon Guidelines

### 1. Icon Sizing
\`\`\`css
/* Standard Sizes */
.icon-sm { @apply h-4 w-4; }      /* 16px - UI elements */
.icon-md { @apply h-6 w-6; }      /* 24px - Actions */
.icon-lg { @apply h-8 w-8; }      /* 32px - Navigation */
.icon-xl { @apply h-12 w-12; }    /* 48px - Avatars */
\`\`\`

### 2. Icon Positioning
\`\`\`css
/* In Buttons */
.icon-button-left { @apply mr-2 h-4 w-4; }
.icon-button-right { @apply ml-2 h-4 w-4; }

/* In Cards */
.icon-card-header { @apply h-4 w-4 text-muted-foreground; }

/* In Quick Actions */
.icon-quick-action { @apply h-6 w-6 mb-2; }
\`\`\`

### 3. Icon Colors
\`\`\`css
.icon-muted { @apply text-muted-foreground; }
.icon-primary { @apply text-primary; }
.icon-success { @apply text-green-600; }
.icon-warning { @apply text-yellow-600; }
.icon-error { @apply text-red-600; }
\`\`\`

## Spacing System

### 1. Container Spacing
\`\`\`css
.container-spacing { @apply space-y-6; }     /* Between major sections */
.grid-spacing { @apply gap-6; }              /* Between grid items */
.card-spacing { @apply space-y-4; }          /* Inside cards */
.inline-spacing { @apply space-x-2; }        /* Inline elements */
\`\`\`

### 2. Padding System
\`\`\`css
.padding-sm { @apply p-3; }                  /* Small cards */
.padding-md { @apply p-4; }                  /* Standard cards */
.padding-lg { @apply p-6; }                  /* Large cards */
.padding-container { @apply p-4; }           /* Page containers */
\`\`\`

## Typography Rules

### 1. Font Weights
\`\`\`css
.font-light { font-weight: 300; }            /* Rarely used */
.font-normal { font-weight: 400; }           /* Body text */
.font-medium { font-weight: 500; }           /* Subtitles */
.font-semibold { font-weight: 600; }         /* Card titles */
.font-bold { font-weight: 700; }             /* Main titles */
\`\`\`

### 2. Text Colors
\`\`\`css
.text-primary { @apply text-foreground; }
.text-secondary { @apply text-muted-foreground; }
.text-success { @apply text-green-600; }
.text-warning { @apply text-yellow-600; }
.text-error { @apply text-red-600; }
\`\`\`

## Animation Guidelines

### 1. Transition Standards
\`\`\`css
.transition-standard { @apply transition-all duration-200; }
.transition-slow { @apply transition-all duration-300; }
.transition-fast { @apply transition-all duration-150; }
\`\`\`

### 2. Hover Animations
\`\`\`css
.hover-scale { @apply hover:scale-105; }
.hover-shadow { @apply hover:shadow-lg; }
.hover-lift { @apply hover:shadow-lg hover:scale-105; }
\`\`\`

## Accessibility Standards

### 1. Color Contrast
- **Text pe fundal alb**: Minimum 4.5:1 ratio
- **Text mare (18px+)**: Minimum 3:1 ratio
- **Interactive elements**: Minimum 3:1 ratio pentru border/background

### 2. Focus States
\`\`\`css
.focus-visible {
  @apply focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2;
}
\`\`\`

### 3. Screen Reader Support
- Folosim `aria-label` pentru butoane cu doar iconuri
- `aria-describedby` pentru context adițional
- `role` attributes pentru componente custom

## Reguli de Implementare

### 1. Component Structure
- Întotdeauna folosim componente Shadcn/UI ca bază
- Customizări prin Tailwind classes, nu CSS custom
- Props pentru variante, nu hardcoding

### 2. Responsive Design
- Mobile-first approach
- Testăm pe 320px, 768px, 1024px, 1440px
- Touch targets minimum 44px pe mobile

### 3. Performance
- Lazy loading pentru componente mari
- Optimizăm imagini și iconuri
- Evităm re-renders inutile

### 4. Maintenance
- Documentăm toate customizările
- Folosim design tokens pentru culori
- Testăm cross-browser (Chrome, Firefox, Safari, Edge)

## Checklist pentru Noi Componente

- [ ] Respectă paleta de culori role-based
- [ ] Folosește spacing system standard
- [ ] Are hover states definite
- [ ] Este responsive pe toate breakpoint-urile
- [ ] Are focus states pentru accessibility
- [ ] Folosește iconuri Lucide React
- [ ] Respectă typography hierarchy
- [ ] Are loading states dacă e necesar
- [ ] Este documentat în acest ghid
