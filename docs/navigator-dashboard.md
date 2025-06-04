# Navigator Dashboard - Documentație UI/UX

## Prezentare Generală
Dashboard-ul Navigator este destinat gestionării pacienților și coordonării îngrijirii medicale.

## Structura Dashboard-ului

### 1. Header Section
- **Titlu Principal**: "Dashboard Navigator" (text-blue-600)
- **Subtitlu**: "Gestionează pacienții și coordonează îngrijirea medicală"
- **Action Buttons**:
  - Urgențe: `variant="outline"` cu Phone icon
  - Mesaje: `bg-blue-500 hover:bg-blue-600` cu MessageSquare icon

### 2. Tab Navigation
\`\`\`
TabsList: grid w-full grid-cols-7
\`\`\`

#### Tab-uri incluse:
1. **Prezentare** - Users icon
2. **Pacienți** - Users icon
3. **Alerte** - AlertTriangle icon
4. **Calendar** - Calendar icon
5. **Note** - FileText icon
6. **Simptome** - Activity icon
7. **Setări** - Settings icon

### 3. KPI Cards (Grid 4 coloane)
\`\`\`
Grid Layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
\`\`\`

#### Card-uri incluse:
1. **Pacienți Activi**
   - Icon: Users
   - Valoare: 24
   - Trend: +2 față de luna trecută

2. **Programări Astăzi**
   - Icon: Calendar
   - Valoare: 8
   - Info: Următoarea la 10:30

3. **Alerte Critice**
   - Icon: AlertTriangle
   - Valoare: 3 (text-red-600)
   - Status: Necesită atenție imediată

4. **Aderență Medie**
   - Icon: TrendingUp
   - Valoare: 87% (text-green-600)
   - Trend: +5% față de săptămâna trecută

### 4. Main Content Areas

#### Pacienți cu Prioritate Înaltă
- **Lista de pacienți** cu:
  - Nume pacient
  - Condiție medicală
  - Prioritate (Badge cu culori semantice)
  - Ultimul contact
  - Buton "Contactează"

#### Activitate Recentă
- **Timeline** cu:
  - Indicator colorat (w-2 h-2 bg-blue-500 rounded-full)
  - Acțiune efectuată
  - Pacient și timp

## Tab Content Specific

### Overview Tab
- Componenta `NavigatorOverview`
- Callback pentru selectarea pacientului

### Patients Tab
- Componenta `PatientManagement`
- Funcționalitate de gestionare pacienți

### Alerts Tab
- Componenta `AlertsManagement`
- Gestionarea alertelor critice

### Calendar Tab
- Componenta `CalendarAppointmentsView`
- Vizualizare programări

### Notes Tab
- Componenta `PatientNotesManager`
- Gestionarea notelor pacienților

### Symptoms Tab
- Componenta `EnhancedSymptomsTracker`
- Monitorizarea simptomelor

### Settings Tab
- **Grid 2 coloane** pentru setări:
  - Notificări (Alerte critice, Email zilnic, SMS urgențe)
  - Preferințe (Mod întunecat, Actualizare automată, Limba)

## Paleta de Culori Specifică

### Navigator Theme:
- **Primary**: `text-blue-600` pentru titlu
- **Buttons**: `bg-blue-500 hover:bg-blue-600`
- **Success**: `text-green-600` pentru metrici pozitive
- **Alert**: `text-red-600` pentru alerte critice

### Badge Variants:
- **Destructive**: Pentru prioritate critică
- **Default**: Pentru prioritate înaltă
- **Secondary**: Pentru prioritate medie

## Componente UI Specifice

### Tab System:
- `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger`
- Iconuri integrate în tab-uri
- State management pentru tab activ

### Patient Cards:
- Layout flex pentru informații pacient
- Badge-uri pentru prioritate
- Butoane de acțiune integrate

### Activity Timeline:
- Indicatori vizuali colorați
- Informații structurate (acțiune • pacient • timp)
- Spațiere consistentă

## State Management

### Patient Selection:
\`\`\`typescript
const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
const [activeTab, setActiveTab] = useState("overview")
\`\`\`

### Navigation Logic:
- Selectarea pacientului schimbă tab-ul la "patient-details"
- Buton "Înapoi" pentru revenirea la overview
- Callback-uri pentru comunicarea între componente

## Reguli de Interacțiune

1. **Tab Navigation**: Click pe tab schimbă conținutul
2. **Patient Selection**: Click pe pacient deschide detaliile
3. **Back Navigation**: Buton explicit pentru întoarcere
4. **Action Buttons**: Hover states și feedback vizual
5. **Real-time Updates**: Componente care se actualizează automat
