# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trail of Cthulhu character generator — a React web app implementing GUMSHOE system rules for creating tabletop RPG investigators. Supports Purist and Pulp game modes with full English/Spanish localization.

## Commands

```bash
npm run dev        # Start Vite dev server (port 5173)
npm run build      # Production build to dist/
npm run preview    # Preview production build
npm run test       # Run all tests (Vitest)
npm run test:ui    # Vitest interactive UI
npx vitest run src/data/rules.test.js   # Run a single test file
```

## Architecture

### State Management

All character state lives in `App.jsx` via `useState(initialCharacter)`. A single `updateCharacter` callback is passed down to every step component. Pool calculations (investigative/general points remaining) are computed at the App level and passed as props.

### Step Flow

Six-step wizard rendered conditionally by step index in `App.jsx`:

```
SetupStep → PersonalInfoStep → InvestigativeSkillsStep → GeneralSkillsStep → SummaryStep → CharacterSheetStep
```

Every step receives a unified `stepProps` object: `{ character, updateCharacter, investigativePool, investigativeSpent, investigativeRemaining, generalPool, generalSpent, generalRemaining, goNext, goPrev }`.

### Game Data Layer (`src/data/`)

Static game rules with no database. Key files:

- **`rules.js`** — Pool sizes by player count, skill cost multipliers (0.5x for occupational), derived stat calculations. This is the source of truth for all game mechanics.
- **`occupations.js`** — 20 occupations, each with `investigativeSkills[]`, `generalSkills[]`, `creditRating { min, max }`, and `pulpAbility`.
- **`skills.js`** / **`generalSkills.js`** — Skill definitions grouped by category.
- **`drives.js`** — Pulp drives and Purist pillar categories.

Occupational skills are determined by array membership in the selected occupation object, not by a flag on the skill itself.

### Mode Branching (Purist vs Pulp)

The `character.mode` field (`'purist'` | `'pulp'`) drives conditional behavior throughout:
- Purist requires 3 Pillars of Sanity (person/place/belief); Pulp uses a Drive selection
- Pulp adds +10 to the general skill point pool
- UI accent colors differ (mythos purple for Purist, gold for Pulp)

### Internationalization

Uses i18next with browser language detection (`src/i18n.js`). Translations in `src/locales/en.json` and `src/locales/es.json`. All user-visible strings use `t()` lookups. Skill/occupation names use deep keys like `skills.investigative.archaeology.name`.

## Styling

Tailwind CSS with a custom dark theme defined in `tailwind.config.js`:
- **Colors:** `void` (dark purples for backgrounds), `parchment` (light text), `gold` (primary accent), `blood` (warnings/required), `mythos` (purist mode accent)
- **Fonts:** `Cinzel` for headings (`font-display`), `Inter` for body (`font-body`)
- **Custom components** defined in `src/index.css` `@layer components`: `.card`, `.btn-primary`, `.btn-secondary`, `.skill-row`, `.counter-btn-plus/minus`, `.pool-display`, `.section-title`, `.badge-*`, etc.
- Print styles hide `.no-print` elements and switch to white background.

## Testing

Vitest with jsdom environment and `@testing-library/react`. Globals enabled (no need to import `describe`/`it`/`expect`). Test files live alongside source: `src/data/rules.test.js`, `src/components/*.test.jsx`.
