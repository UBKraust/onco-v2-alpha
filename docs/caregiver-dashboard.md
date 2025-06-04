# Caregiver Dashboard - Documentație UI/UX

## Prezentare Generală
Dashboard-ul Aparținător este destinat monitorizării și oferă suport persoanei dragi în procesul de tratament oncologic.

## Structura Dashboard-ului

### 1. Header Section
- **Titlu Principal**: "Dashboard Aparținător"
- **Subtitlu**: "Monitorizează și oferă suport persoanei dragi"
- **Tipografie**: Aceeași structură ca celelalte dashboard-uri

### 2. KPI Cards (Grid 4 coloane)
\`\`\`
Grid Layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
\`\`\`

#### Card-uri specifice îngrijitorului:
1. **Starea Pacientului**
   - Icon: Heart
   - Valoare: "Stabilă" (text-green-600)
   - Info: Ultima actualizare: acum 2 ore

2. **Programări**
   - Icon: Calendar
   - Valoare: 2
   - Info: Următoarea: Mâine la 10:00

3. **Mesaje**
   - Icon: MessageSquare
   - Valoare: 5
   - Info: 3 necitite

4. **Alerte**
   - Icon: AlertTriangle
   - Valoare: 1 (text-yellow-600)
   - Info: Medicație întârziată

### 3. Main Content Grid (2 coloane)
\`\`\`
Grid Layout: grid-cols-1 lg:grid-cols-2 gap-6
\`\`\`

#### Activitate Recentă
- **Timeline cu indicatori colorați**:
  - Verde: Medicația administrată
  - Albastru: Simptome înregistrate
  - Mov: Consultație completată
- **Format**: `flex items-start space-x-3 p-3 border rounded-lg`

#### Acțiuni Rapide pentru Aparținători
- **Butoane specifice**:
  - Contactează Echipa Medicală (Primary)
  - Trimite Mesaj Navigator (Outline)
  - Vezi Programări (Outline)
  - Raport Zilnic (Outline)

### 4. Informații Pacient Section
- **Grid 4 coloane**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`
- **Card-uri informative**:
  1. Tratament Curent - Protocol CHOP
  2. Medic Curant - Dr. Emily Carter
  3. Navigator - Ana Ionescu
  4. Urgențe - Contact 24/7

## Paleta de Culori Specifică

### Caregiver Theme:
- **Success States**: `text-green-600` pentru stare stabilă
- **Warning States**: `text-yellow-600` pentru alerte moderate
- **Status Indicators**: Culori semantice pentru timeline

### Activity Timeline Colors:
- **Verde**: `bg-green-500` - acțiuni pozitive/complete
- **Albastru**: `bg-blue-500` - informații/înregistrări
- **Mov**: `bg-purple-500` - consultații/evenimente medicale

## Componente UI Specifice

### Timeline Indicators:
\`\`\`typescript
<div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
\`\`\`

### Information Cards:
\`\`\`typescript
<div className="p-4 border rounded-lg">
  <h4 className="font-medium">Titlu</h4>
  <p className="text-sm text-muted-foreground">Descriere</p>
  <Badge className="mt-2">Status</Badge>
</div>
\`\`\`

### Action Buttons Layout:
- **Full width**: `w-full justify-start`
- **Icon positioning**: `mr-2 h-4 w-4`
- **Primary action**: Primul buton cu styling principal
- **Secondary actions**: Outline variant

## Layout Patterns Specifice

### Activity Timeline:
- **Container**: `space-y-4` pentru spațiere între evenimente
- **Item Layout**: `flex items-start space-x-3`
- **Visual Indicator**: Punct colorat în stânga
- **Content**: Titlu bold + descriere muted

### Information Grid:
- **Responsive**: 1→2→4 coloane
- **Card Styling**: `p-4 border rounded-lg`
- **Content Hierarchy**: Titlu → Descriere → Badge

## Interactivitate Specifică

### Contact Actions:
- **Phone Integration**: Butoane pentru apeluri directe
- **Messaging**: Integrare cu sistemul de mesagerie
- **Emergency**: Acces rapid la contacte de urgență

### Status Monitoring:
- **Real-time Updates**: Indicatori pentru actualizări recente
- **Visual Feedback**: Culori pentru diferite tipuri de status
- **Timestamp Display**: Informații temporale clare

## Reguli de Consistență Caregiver

1. **Status Colors**: Verde=bun, Galben=atenție, Roșu=urgent
2. **Timeline**: Întotdeauna cu indicator colorat în stânga
3. **Contact Buttons**: Primary pentru acțiuni urgente
4. **Information Cards**: Layout consistent cu padding și border
5. **Timestamps**: Format relativ (acum X ore/minute)
6. **Emergency Access**: Întotdeauna vizibil și accesibil

## Accessibility pentru Aparținători

### Clear Communication:
- **Status Indicators**: Culori + text pentru claritate
- **Action Buttons**: Etichete descriptive
- **Emergency Info**: Contrast înalt și vizibilitate

### Simplified Navigation:
- **Large Touch Targets**: Butoane mari pentru acțiuni importante
- **Clear Hierarchy**: Informații prioritizate vizual
- **Consistent Patterns**: Layout predictibil
