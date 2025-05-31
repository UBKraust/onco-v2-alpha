# Reguli de implementare UI/UX în V0 pentru OncoLink

## 1. Scope & Componente
- Modificările de UI trebuie să fie scoped (limitate) la pagini sau componente specifice, fără a afecta layout-ul global.
- **Nu modificați** fișiere globale precum `layout.tsx`, `app/globals.css`, `theme.config.ts`, fără aprobare explicită.
- Lucrați DOAR în directoarele:
  - `/navigator/patients/`
  - `/navigator/patients/[id]/`
  - `/components/patients/`
- Orice modificare la UI global (meniuri, header, sidebar, paletă de culori, fonturi) se face doar în sprinturi dedicate și după review.

## 2. Scoped Editing în V0.dev
- În V0, când lucrați la UI pentru un tab/pagină, setați „Scope" la `/patients/` sau `/patients/[id]/`.
- Nu propagați modificări la layout-ul general când lucrați pe componente sau taburi specifice.

## 3. Organizare componente
- Clonați/creați componentele custom pentru pagini/taburi în `components/patients/` sau directoare similare, pentru a nu impacta componentele comune.
- Marcați clar în comentarii și documentație că modificările sunt locale/contextuale.

## 4. Documentare reguli în proiect
- Acest document sau secțiunea relevantă trebuie inclusă în README.md principal sau ca `rules.md` în repo.
- Recomandat: Folosiți secțiuni de tip „⚠️ IMPORTANT" pentru a atrage atenția asupra regulilor de scope și review.

## 5. Exemple de scope
- Este permis: Modificare doar la `/patients`, fără impact asupra layout-ului general.
- Nu este permis: Schimbare la header global, font global, spațiere globală, fără task dedicat.

## 6. Convenții de denumire
- Folosiți kebab-case pentru numele fișierelor (ex: `patient-card.tsx`)
- Folosiți PascalCase pentru numele componentelor (ex: `PatientCard`)
- Folosiți camelCase pentru numele variabilelor și funcțiilor (ex: `handlePatientSelect`)

## 7. Structura componentelor
- Fiecare componentă trebuie să aibă o interfață TypeScript pentru props
- Folosiți comentarii pentru a explica logica complexă
- Separați logica de business de UI când este posibil (folosiți hooks)

## 8. Accesibilitate
- Toate componentele trebuie să respecte standardele WCAG 2.1 AA
- Folosiți atribute aria pentru a îmbunătăți accesibilitatea
- Testați contrastul culorilor pentru text și fundal

## 9. Performanță
- Evitați re-renderizări inutile (folosiți useMemo, useCallback)
- Optimizați imaginile și resursele media
- Folosiți lazy loading pentru componentele mari

---

**Orice abatere de la aceste reguli trebuie anunțată și discutată în echipă înainte de commit!**
