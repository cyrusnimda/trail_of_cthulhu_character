# Brechas y decisiones pendientes

Este registro señala comportamientos de la línea base que requieren una decisión
de producto. Mientras estén abiertos, los requisitos describen el comportamiento
as-built y siguen siendo el contrato de compatibilidad. Una brecha solo se cierra
cuando existe una decisión y se actualizan specs, código y pruebas. El orden no
implica que deba corregirse sin validar antes la regla de negocio.

| ID | Severidad | Hallazgo | Requisitos afectados | Decisión necesaria |
|---|---|---|---|---|
| `GAP-001` | alta | Setup ofrece 1 jugador, pero no hay entrada para 1 en la tabla; se aplican 16 puntos por fallback. | `SETUP-002`, `DOM-002` | Confirmar la reserva correcta para juego en solitario. |
| `GAP-002` | alta | `rules.js` comenta que cada habilidad ocupacional de investigación requiere rating 1, pero la UI permite avanzar con 0. | `INV-003` | Decidir si el mínimo debe aplicarse o retirar la regla declarativa. |
| `GAP-003` | media | La UI describe las habilidades ocupacionales como ilimitadas, pero el control fija máximo 99. | `INV-002` | Confirmar si 99 es un límite real o solo técnico. |
| `GAP-004` | alta | Sanity se compra y consume puntos, pero Resumen y Ficha muestran Sanity igual a Stability. | `GEN-004`, `OUT-002`, `DOM-013` | Definir una única fuente para Sanity y su coste. |
| `GAP-005` | alta | Paquetes ocupacionales contienen IDs de investigación inexistentes (`psychology`, `astrology`, `natural_history`, `track`) y usan `mechanical_repair` como habilidad general aunque solo existe en investigación. | `INFO-002`, `DOM-007`, `DOM-008`, `DOM-009` | Corregir IDs o ampliar los catálogos y locales. |
| `GAP-006` | media | Ejemplos y placeholders de Pilares permanecen en español al usar inglés. | `INFO-004`, `I18N-003` | Trasladar ejemplos a los locales. |
| `GAP-007` | media | El badge `Pool` y el botón siguiente de Investigación pueden quedar en inglés en la interfaz española. | `INV-001`, `GEN-001`, `I18N-003` | Añadir y consumir claves localizadas. |
| `GAP-008` | media | `<html lang>`, title y metadatos SEO permanecen en español al cambiar idioma; códigos regionales pueden no marcar ningún selector activo. | `I18N-001`, `I18N-003` | Definir actualización dinámica y normalización de idioma. |
| `GAP-009` | media | Cambiar ocupación conserva ratings por encima del máximo no ocupacional y puede provocar gasto negativo sin normalización. | `INFO-002`, `INV-002`, `DOM-006` | Elegir entre conservar, limitar, reiniciar o solicitar confirmación. |
| `GAP-010` | baja | El texto de Setup afirma que la reserva aumenta con más jugadores, pero la tabla baja de 24 a 16. | `SETUP-002`, `DOM-002`, `I18N-003` | Corregir la explicación localizada. |
| `GAP-011` | media | Labels e inputs no están asociados; contadores carecen de nombre contextual y selectores no exponen semántica de radio/pressed. | `QUAL-003` | Definir y probar el nivel de accesibilidad objetivo. |
| `GAP-012` | media | La impresión no define tema claro completo, `@page`, eliminación del fondo ni ajuste de color. | `OUT-004`, `QUAL-004` | Acordar criterios visuales y navegadores soportados. |
| `GAP-013` | baja | Los `default` de habilidades generales están definidos pero nunca se usan; el personaje inicia con solo Health y Stability en 1. | `SETUP-001`, `DOM-008` | Confirmar si `default` es documentación o rating inicial. |
| `GAP-014` | baja | `AGE_MODIFIERS`, `getDerivedStats`, `PULP_RULES`, `PURIST_RULES` y parte de `CREDIT_RATING` son código inactivo. | `DOM-013` a `DOM-015` | Eliminar datos muertos o diseñar su activación mediante una spec nueva. |
| `GAP-015` | resuelta | El README prometía secciones de Background/Equipment y exportación PDF directa que no existían. Se alineó con la spec el 2026-08-19. | Alcance, `OUT-004` | Sin acción pendiente. |
| `GAP-016` | baja | Volver a un paso anterior bloquea de nuevo todos los posteriores porque no se conserva el paso máximo visitado. | `PROD-002` | Confirmar si es comportamiento deliberado. |

## Riesgos de cobertura

La mayoría de los requisitos se derivan por inspección y no tienen prueba
automatizada. Hasta cubrir las prioridades de `trazabilidad.md`, una refactorización
puede cambiar comportamiento sin detectar una divergencia de la spec.
