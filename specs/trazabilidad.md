# Matriz de trazabilidad

## Lectura

`Cobertura` describe evidencia automatizada, no el estado de implementación:

- `sí`: el contrato principal está comprobado;
- `parcial`: existe alguna prueba, pero faltan criterios relevantes;
- `no`: solo existe evidencia por inspección del código.

## Producto y flujo

| Requisito | Implementación | Prueba | Cobertura |
|---|---|---|---|
| `PROD-001` | `src/App.jsx` | - | no |
| `PROD-002` | `src/components/ProgressBar.jsx` | - | no |
| `PROD-003` | `src/App.jsx` | - | no |
| `SETUP-001` | `src/App.jsx`, `src/data/generalSkills.js` | - | no |
| `SETUP-002` | `src/components/SetupStep.jsx`, `src/data/rules.js` | `src/data/rules.test.js` | parcial |
| `SETUP-003` | `src/components/SetupStep.jsx`, `src/data/rules.js` | `src/data/rules.test.js` | parcial |
| `INFO-001` | `src/components/PersonalInfoStep.jsx` | - | no |
| `INFO-002` | `src/components/PersonalInfoStep.jsx`, `src/data/occupations.js` | - | no |
| `INFO-003` | `src/components/PersonalInfoStep.jsx` | - | no |
| `INFO-004` | `src/components/PersonalInfoStep.jsx`, `src/data/drives.js` | - | no |
| `INFO-005` | `src/components/PersonalInfoStep.jsx`, `src/data/drives.js` | - | no |
| `INFO-006` | `src/components/PersonalInfoStep.jsx` | - | no |
| `INV-001` | `src/components/InvestigativeSkillsStep.jsx`, `src/data/skills.js` | `src/components/InvestigativeSkillsStep.test.jsx` | parcial |
| `INV-002` | `src/components/InvestigativeSkillsStep.jsx` | `src/components/InvestigativeSkillsStep.test.jsx` | parcial |
| `INV-003` | `src/components/InvestigativeSkillsStep.jsx` | - | no |
| `GEN-001` | `src/components/GeneralSkillsStep.jsx`, `src/data/generalSkills.js` | - | no |
| `GEN-002` | `src/components/GeneralSkillsStep.jsx` | - | no |
| `GEN-003` | `src/components/GeneralSkillsStep.jsx` | - | no |
| `GEN-004` | `src/components/GeneralSkillsStep.jsx` | - | no |
| `OUT-001` | `src/components/SummaryStep.jsx` | - | no |
| `OUT-002` | `src/components/SummaryStep.jsx`, `src/components/CharacterSheetStep.jsx` | - | no |
| `OUT-003` | `src/components/CharacterSheetStep.jsx` | - | no |
| `OUT-004` | `src/components/CharacterSheetStep.jsx`, `src/index.css` | - | no |

## Dominio

| Requisito | Implementación | Prueba | Cobertura |
|---|---|---|---|
| `DOM-001` | `src/App.jsx` | - | no |
| `DOM-002` | `src/data/rules.js` | `src/data/rules.test.js` | parcial |
| `DOM-003` | `src/data/rules.js` | `src/data/rules.test.js` | parcial |
| `DOM-004` | `src/data/rules.js` | `src/data/rules.test.js` | parcial |
| `DOM-005` | `src/App.jsx` | - | no |
| `DOM-006` | `src/App.jsx`, `src/data/occupations.js` | `src/data/rules.test.js` | parcial |
| `DOM-007` | `src/data/skills.js`, `src/locales/*.json` | - | no |
| `DOM-008` | `src/data/generalSkills.js`, `src/App.jsx` | - | no |
| `DOM-009` | `src/data/occupations.js` | - | no |
| `DOM-010` | `src/data/occupations.js` | - | no |
| `DOM-011` | `src/data/drives.js`, `src/components/PersonalInfoStep.jsx` | - | no |
| `DOM-012` | `src/data/drives.js`, `src/components/PersonalInfoStep.jsx` | - | no |
| `DOM-013` | `src/components/SummaryStep.jsx`, `src/components/CharacterSheetStep.jsx` | - | no |
| `DOM-014` | `src/data/rules.js`, `src/components/PersonalInfoStep.jsx` | - | no |
| `DOM-015` | `src/data/rules.js`, `src/data/drives.js`, `src/data/occupations.js` | - | no |

## Calidad

| Requisito | Implementación | Prueba | Cobertura |
|---|---|---|---|
| `I18N-001` | `src/i18n.js`, `src/components/LanguageSwitcher.jsx` | - | no |
| `I18N-002` | `src/components/LanguageSwitcher.jsx` | - | no |
| `I18N-003` | `src/locales/en.json`, `src/locales/es.json`, `src/components/*.jsx` | `src/components/InvestigativeSkillsStep.test.jsx` | parcial |
| `QUAL-001` | `src/main.jsx`, `package.json` | - | no |
| `QUAL-002` | `src/components/*.jsx`, `src/index.css`, `tailwind.config.js` | - | no |
| `QUAL-003` | `src/components/*.jsx` | - | no |
| `QUAL-004` | `src/index.css`, `src/components/CharacterSheetStep.jsx` | - | no |
| `QUAL-005` | `src/App.jsx`, `src/i18n.js` | - | no |
| `QUAL-006` | `package.json`, `vite.config.js`, `src/setupTests.js` | suite Vitest; build manual | parcial |

## Prioridad de pruebas faltantes

1. Integridad de catálogos y claves de traducción (`DOM-007` a `DOM-011`).
2. Validación de Información personal (`INFO-001` a `INFO-006`).
3. Límites, saldos fraccionarios y avance (`INV-002`, `INV-003`, `GEN-002`,
   `GEN-003`).
4. Cambio de modo y ocupación con ratings existentes (`SETUP-003`, `DOM-006`).
5. Coherencia de estadísticas y salida (`OUT-002`, `DOM-013`).
6. Navegación completa, localización e impresión.
