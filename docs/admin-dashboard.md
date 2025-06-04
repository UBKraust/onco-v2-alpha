# Admin Dashboard - Documentație UI/UX

## Prezentare Generală
Dashboard-ul Administrator este destinat gestionării sistemului și monitorizării activității globale a platformei OncoLink.

## Structura Dashboard-ului

### 1. Header Section
- **Titlu Principal**: "Dashboard Administrator"
- **Subtitlu**: "Administrează sistemul și monitorizează activitatea globală"
- **Tipografie**: 
  - H1: `text-3xl font-bold`
  - Subtitlu: `text-muted-foreground`

### 2. KPI Cards (Grid 4 coloane)
\`\`\`
Grid Layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
\`\`\`

#### Card-uri incluse:
1. **Total Utilizatori**
   - Icon: Users
   - Valoare: 1,247
   - Trend: +12% față de luna trecută

2. **Pacienți Activi**
   - Icon: TrendingUp
   - Valoare: 892
   - Trend: +8% față de luna trecută

3. **Navigatori**
   - Icon: Shield
   - Valoare: 45
   - Status: Activi în sistem

4. **Alerte Sistem**
   - Icon: AlertTriangle
   - Valoare: 3 (text-red-600)
   - Status: Necesită atenție

### 3. Main Content Grid (2 coloane)
\`\`\`
Grid Layout: grid-cols-1 lg:grid-cols-2 gap-6
\`\`\`

#### Activitate Sistem Card
- **Progress Bars** pentru:
  - Utilizatori conectați: Badge "234 activi"
  - Sesiuni noi: Badge outline "1,456"
  - Performanță server: Badge verde "Optimă"
  - Backup-uri: Badge secondary "Actualizate"

#### Acțiuni Administrative Card
- **Butoane cu Link-uri**:
  - Gestionează Pacienți (`/admin/patients`)
  - Echipa Medicală (`/admin/team`)
  - Alerte Sistem (`/admin/alerts`)
  - Configurări Sistem
  - Backup Manual
  - Securitate & Audit

## Paleta de Culori Folosită

### Badge Colors:
- **Verde**: `bg-green-600` - pentru status pozitiv
- **Roșu**: `text-red-600` - pentru alerte critice
- **Outline**: `variant="outline"` - pentru informații neutre
- **Secondary**: `variant="secondary"` - pentru status secundar

### Icon Colors:
- **Muted**: `text-muted-foreground` - pentru iconuri în header
- **Contextual**: Culori specifice pentru alerte (roșu, portocaliu, galben, albastru)

## Componente UI Folosite

### Shadcn/UI Components:
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Button`
- `Badge`
- `Progress`

### Lucide Icons:
- `Users`, `UserCheck`, `AlertTriangle`, `Activity`
- `TrendingUp`, `Clock`, `Shield`, `Database`
- `Settings`

## Layout Patterns

### Responsive Design:
- **Mobile**: `grid-cols-1` - o coloană
- **Tablet**: `md:grid-cols-2` - două coloane
- **Desktop**: `lg:grid-cols-4` - patru coloane pentru KPI-uri
- **Desktop**: `lg:grid-cols-2` - două coloane pentru conținut principal

### Spacing:
- **Container**: `space-y-6` - spațiere verticală între secțiuni
- **Grid Gap**: `gap-6` - spațiere între elemente grid
- **Card Content**: `space-y-4` - spațiere în interiorul card-urilor

## Interactivitate

### Butoane:
- **Primary**: Butoane cu fundal solid pentru acțiuni principale
- **Outline**: `variant="outline"` pentru acțiuni secundare
- **Full Width**: `w-full justify-start` pentru butoane în sidebar
- **Icon + Text**: Iconuri în partea stângă cu `mr-2 h-4 w-4`

### Hover States:
- Toate butoanele au hover states automate prin Tailwind
- Card-urile pot avea hover effects pentru interactivitate

## Reguli de Consistență

1. **Iconuri**: Întotdeauna 16x16px (`h-4 w-4`) în butoane și header-uri
2. **Spațiere**: Folosim sistemul de spacing Tailwind (4, 6, 8, etc.)
3. **Tipografie**: Hierarchy clară cu text-3xl pentru titluri principale
4. **Badge-uri**: Culori semantice (verde=bun, roșu=atenție, etc.)
5. **Grid**: Responsive design cu breakpoint-uri standard
