# Biblioteca de Componente - OncoLink

## Componente Shadcn/UI Folosite

### 1. Layout Components
\`\`\`typescript
// Card Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Usage Pattern:
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

### 2. Interactive Components
\`\`\`typescript
// Button Component
import { Button } from "@/components/ui/button"

// Variants folosite:
<Button>Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="secondary">Tertiary</Button>
<Button size="sm">Small</Button>
<Button className="w-full justify-start">Full Width</Button>

// Badge Component
import { Badge } from "@/components/ui/badge"

// Variants folosite:
<Badge>Default</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge className="bg-green-600">Success</Badge>
\`\`\`

### 3. Navigation Components
\`\`\`typescript
// Tabs System
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Usage în Navigator Dashboard:
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList className="grid w-full grid-cols-7">
    <TabsTrigger value="overview">
      <Users className="h-4 w-4" />
      Prezentare
    </TabsTrigger>
    // ... alte tab-uri
  </TabsList>
  <TabsContent value="overview">
    {/* Content */}
  </TabsContent>
</Tabs>
\`\`\`

### 4. Form Components
\`\`\`typescript
// Input Components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

// Select Components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
\`\`\`

### 5. Feedback Components
\`\`\`typescript
// Progress Component
import { Progress } from "@/components/ui/progress"

// Usage în Admin Dashboard:
<div className="space-y-2">
  <div className="flex items-center justify-between">
    <span className="text-sm">Performanță Server</span>
    <Badge className="bg-green-600">Optimă</Badge>
  </div>
  <Progress value={92} className="h-2" />
</div>

// Avatar Component
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Usage în Patient Dashboard:
<Avatar className="w-12 h-12">
  <AvatarImage src="/placeholder-user.jpg" />
  <AvatarFallback className="bg-pink-500">MP</AvatarFallback>
</Avatar>
\`\`\`

### 6. Utility Components
\`\`\`typescript
// Separator
import { Separator } from "@/components/ui/separator"

// Scroll Area
import { ScrollArea } from "@/components/ui/scroll-area"
\`\`\`

## Iconuri Lucide React

### 1. Iconuri Principale Folosite
\`\`\`typescript
// Navigation & UI
import { Users, Calendar, FileText, Activity, Bell, Settings, ArrowRight, ChevronDown, Menu, X, Search } from 'lucide-react'

// Medical & Health
import { Heart, Stethoscope, Pill, Thermometer, Activity, TrendingUp, TrendingDown } from 'lucide-react'

// Communication
import { MessageSquare, Phone, Mail, Send, MessageCircle, Video } from 'lucide-react'

// Status & Alerts
import { AlertTriangle, CheckCircle, XCircle, Info, FileWarningIcon as Warning, Shield } from 'lucide-react'

// Actions
import { Plus, Edit, Trash2, Download, Upload, Save, Copy, Share, PrinterIcon as Print } from 'lucide-react'

// System
import { Database, Server, Wifi, Power, Settings, Cog, PenToolIcon as Tool } from 'lucide-react'
\`\`\`

### 2. Pattern de Folosire Iconuri
\`\`\`typescript
// În Butoane
<Button>
  <Icon className="mr-2 h-4 w-4" />
  Text Buton
</Button>

// În Card Headers
<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
  <CardTitle>Titlu</CardTitle>
  <Icon className="h-4 w-4 text-muted-foreground" />
</CardHeader>

// În Quick Actions
<Button className="h-20 flex-col">
  <Icon className="h-6 w-6 mb-2" />
  Text Action
</Button>

// În Navigation
<TabsTrigger value="tab" className="flex items-center gap-2">
  <Icon className="h-4 w-4" />
  Tab Name
</TabsTrigger>
\`\`\`

## Componente Custom Dezvoltate

### 1. QuickActionsCard
\`\`\`typescript
// Locație: components/ui/quick-actions-card.tsx
// Folosit în: Navigator Dashboard
// Funcționalitate: Grid de acțiuni rapide cu iconuri și text
\`\`\`

### 2. PatientQuickActions
\`\`\`typescript
// Locație: components/patient/patient-quick-actions.tsx
// Folosit în: Patient Dashboard
// Funcționalitate: Acțiuni specifice pacientului
\`\`\`

### 3. QuickMessageWidget
\`\`\`typescript
// Locație: components/patient/quick-message-widget.tsx
// Folosit în: Patient Dashboard
// Funcționalitate: Widget pentru mesaje rapide
\`\`\`

### 4. NavigatorDashboard
\`\`\`typescript
// Locație: components/navigator/navigator-dashboard.tsx
// Funcționalitate: Dashboard complet cu tabs și management state
\`\`\`

## Patterns de Layout

### 1. Dashboard Header Pattern
\`\`\`typescript
const DashboardHeader = ({ title, subtitle, actions }) => (
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
    {actions && <div className="flex gap-2">{actions}</div>}
  </div>
)
\`\`\`

### 2. KPI Cards Grid Pattern
\`\`\`typescript
const KPIGrid = ({ cards }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {cards.map((card, index) => (
      <Card key={index}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
          <card.icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{card.value}</div>
          <p className="text-xs text-muted-foreground">{card.description}</p>
        </CardContent>
      </Card>
    ))}
  </div>
)
\`\`\`

### 3. Navigation Cards Pattern
\`\`\`typescript
const NavigationCard = ({ href, title, description, icon: Icon, color }) => (
  <Link href={href} className="group">
    <Card className={`h-full transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-${color}-200`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`w-16 h-16 bg-${color}-100 rounded-full flex items-center justify-center group-hover:bg-${color}-200 transition-colors`}>
            <Icon className={`h-8 w-8 text-${color}-600`} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-2">{description}</p>
          </div>
          <div className={`flex items-center text-${color}-600 text-sm font-medium`}>
            Accesează Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
)
\`\`\`

## State Management Patterns

### 1. Tab Management
\`\`\`typescript
const [activeTab, setActiveTab] = useState("overview")

// În Navigator Dashboard pentru switching între secțiuni
\`\`\`

### 2. Patient Selection
\`\`\`typescript
const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)

const handleSelectPatient = (patientId: string) => {
  setSelectedPatientId(patientId)
  setActiveTab("patient-details")
}
\`\`\`

### 3. Loading States
\`\`\`typescript
const { data, loading, error } = useCustomHook()

if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage />
\`\`\`

## Responsive Design Patterns

### 1. Grid Breakpoints
\`\`\`css
/* Stats Grid */
grid-cols-1 md:grid-cols-2 lg:grid-cols-4

/* Content Grid */
grid-cols-1 lg:grid-cols-2

/* Navigation Grid */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
\`\`\`

### 2. Text Responsive
\`\`\`css
/* Titles */
text-xl md:text-2xl lg:text-3xl

/* Descriptions */
text-sm md:text-base
\`\`\`

### 3. Spacing Responsive
\`\`\`css
/* Padding */
p-4 md:p-6 lg:p-8

/* Margins */
space-y-4 md:space-y-6 lg:space-y-8
\`\`\`

## Testing Patterns

### 1. Component Testing
\`\`\`typescript
// Test pentru existența elementelor
expect(screen.getByText('Dashboard Navigator')).toBeInTheDocument()

// Test pentru interactivitate
fireEvent.click(screen.getByRole('button', { name: /urgențe/i }))
\`\`\`

### 2. Accessibility Testing
\`\`\`typescript
// Test pentru ARIA labels
expect(screen.getByLabelText('Caută pacient')).toBeInTheDocument()

// Test pentru keyboard navigation
fireEvent.keyDown(element, { key: 'Enter' })
\`\`\`

## Performance Optimization

### 1. Lazy Loading
\`\`\`typescript
const LazyComponent = lazy(() => import('./HeavyComponent'))

<Suspense fallback={<LoadingSpinner />}>
  <LazyComponent />
</Suspense>
\`\`\`

### 2. Memoization
\`\`\`typescript
const MemoizedCard = memo(({ data }) => (
  <Card>{/* content */}</Card>
))
\`\`\`

### 3. Virtual Scrolling
\`\`\`typescript
// Pentru liste mari de pacienți
import { VirtualGrid } from "@/components/ui/virtual-grid"
