# Patient Dashboard - Documentație UI/UX

## Prezentare Generală
Dashboard-ul Pacient oferă acces la dosarul medical, monitorizarea simptomelor, programări și comunicarea cu echipa medicală.

## Structura Dashboard-ului

### 1. Header Section cu Avatar
- **Layout**: `flex items-center justify-between`
- **Titlu**: "Dashboard Principal" (text-3xl font-bold)
- **Subtitlu**: "Bine ai revenit! Aici găsești un rezumat al activității medicale."
- **Avatar Section**:
  - Avatar 48x48px (`w-12 h-12`)
  - Nume utilizator: "Maria Popescu"
  - Status: "Utilizator Activ"
  - Culoare avatar: `bg-pink-500`

### 2. Quick Stats (Grid 4 coloane)
\`\`\`
Grid Layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
\`\`\`

#### Card-uri incluse:
1. **Programări**
   - Icon: Calendar
   - Valoare: 3
   - Info: Următoarea: Mâine la 10:00

2. **Documente**
   - Icon: FileText
   - Valoare: 12
   - Info: Ultimul adăugat ieri

3. **Activitate**
   - Icon: Activity
   - Valoare: 5
   - Info: Înregistrări astăzi

4. **Notificări**
   - Icon: Bell
   - Valoare: 2
   - Info: Noi mesaje

### 3. Main Content Grid (2 coloane)
\`\`\`
Grid Layout: grid-cols-1 lg:grid-cols-2 gap-6
\`\`\`

#### Activitate Recentă
- **Lista de activități** cu:
  - Control Medical - Dr. Emily Carter (Badge "Mâine 10:00")
  - Rezultate Analize - Laborator Central (Badge outline "Disponibile")
  - Consultație Nutriționist - Sarah Miller, RD (Badge secondary)

#### Sarcini Zilnice
- **Checklist** cu:
  - CheckCircle icon pentru sarcini complete
  - Checkbox gol pentru sarcini incomplete
  - Text cu line-through pentru sarcini finalizate

### 4. Quick Actions Section
\`\`\`
Grid Layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4
\`\`\`

#### Butoane de acțiune:
1. **Monitorizare Simptome** - Primary button (h-20 flex-col)
2. **Programări** - Outline button
3. **Dosar Medical** - Outline button
4. **Resurse** - Outline button

### 5. Navigation Cards (Grid 3 coloane)
\`\`\`
Grid Layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
\`\`\`

#### Card-uri de navigare cu hover effects:
1. **Dashboard Pacient** (Pink theme)
2. **Dashboard Navigator** (Blue theme)
3. **Dashboard Administrator** (Purple theme)
4. **Dashboard Îngrijitor** (Green theme)
5. **Platformă Training** (Orange theme)
6. **Design System** (Gray theme)

## Paleta de Culori Specifică

### Patient Theme:
- **Primary**: Pink (`bg-pink-500`, `text-pink-600`)
- **Hover**: `hover:border-pink-200`, `group-hover:bg-pink-200`

### Role-based Colors:
- **Patient**: Pink (`from-pink-500 to-pink-600`)
- **Navigator**: Blue (`from-blue-500 to-blue-600`)
- **Admin**: Purple (`from-purple-500 to-purple-600`)
- **Caregiver**: Green (`from-green-500 to-green-600`)
- **Training**: Orange (`from-orange-500 to-orange-600`)
- **Design**: Gray (`from-gray-500 to-gray-600`)

## Componente UI Specifice

### Avatar Component:
\`\`\`typescript
<Avatar className="w-12 h-12">
  <AvatarImage src="/placeholder-user.jpg" />
  <AvatarFallback className="bg-pink-500">MP</AvatarFallback>
</Avatar>
\`\`\`

### Navigation Cards cu Hover:
\`\`\`css
hover:shadow-lg hover:scale-105 border-2 hover:border-{color}-200
transition-all duration-200
\`\`\`

### Quick Action Buttons:
- **Height**: `h-20` pentru butoane mari
- **Layout**: `flex-col` pentru icon + text vertical
- **Icon Size**: `h-6 w-6 mb-2`

## Interactive Elements

### Hover States:
- **Cards**: Scale și shadow pe hover
- **Buttons**: Color transitions
- **Navigation**: Border color changes

### Link Structure:
\`\`\`typescript
<Link href="/patient" className="group">
  <Card className="hover:shadow-lg hover:scale-105">
    // Card content
  </Card>
</Link>
\`\`\`

### Icon + Text Pattern:
- Iconuri în partea stângă: `mr-2 h-4 w-4`
- Iconuri deasupra textului: `h-6 w-6 mb-2`
- Arrow indicators: `ml-2 h-4 w-4`

## Layout Patterns

### Responsive Breakpoints:
- **Mobile**: Single column layout
- **Tablet**: 2 columns pentru stats și content
- **Desktop**: 4 columns pentru stats, 3 pentru navigation

### Spacing System:
- **Container**: `space-y-6` între secțiuni majore
- **Grid**: `gap-6` pentru spacing uniform
- **Card Content**: `space-y-4` în interiorul card-urilor
- **Inline Elements**: `space-x-2` pentru elemente orizontale

## Accessibility Features

### Semantic HTML:
- Proper heading hierarchy (h1, h2, h3)
- Link elements pentru navigare
- Button elements pentru acțiuni

### Visual Hierarchy:
- Font sizes: `text-3xl` → `text-xl` → `text-sm`
- Font weights: `font-bold` → `font-semibold` → `font-medium`
- Color contrast pentru text și background

## Reguli de Consistență

1. **Icon Sizing**: 16px pentru UI elements, 24px pentru actions
2. **Button Heights**: 20 (h-20) pentru quick actions, standard pentru altele
3. **Card Hover**: Întotdeauna scale + shadow + border color
4. **Color Themes**: Fiecare rol are culoarea sa specifică
5. **Spacing**: Multipli de 4 (4, 6, 8, 12, etc.)
6. **Typography**: Hierarchy clară cu contrast adecvat
