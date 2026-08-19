# Especificación del generador de investigadores

## Propósito

Este directorio aplica **Spec-as-Source**: las decisiones funcionales y las reglas
del producto se mantienen aquí, versionadas junto al código. La implementación y
las pruebas deben poder trazarse hasta un requisito estable.

La línea base inicial se derivó del comportamiento ejecutable existente el
2026-08-19. Por ello documenta lo que el producto hace hoy, aunque no siempre
coincida con las reglas de mesa esperadas. Las contradicciones encontradas no se
resuelven por suposición: se registran en [brechas.md](./brechas.md).

## Mapa de la especificación

| Documento | Contenido |
|---|---|
| [producto.md](./producto.md) | Alcance, flujo y requisitos funcionales |
| [reglas-de-dominio.md](./reglas-de-dominio.md) | Modelo, catálogos, fórmulas y restricciones |
| [calidad.md](./calidad.md) | Localización, persistencia, impresión, accesibilidad y compatibilidad |
| [trazabilidad.md](./trazabilidad.md) | Relación entre requisitos, código y pruebas |
| [brechas.md](./brechas.md) | Inconsistencias, deuda y decisiones pendientes |

`CLAUDE.md` describe la arquitectura para contribuidores, pero no sustituye a
esta especificación funcional.

## Convenciones normativas

Los términos **DEBE**, **NO DEBE**, **DEBERÍA** y **PUEDE** son normativos.
**DEBERÍA** expresa una expectativa que puede incumplirse solo por una excepción
conocida y registrada.

Los requisitos usan IDs que no deben reutilizarse:

| Prefijo | Área |
|---|---|
| `PROD` | Alcance y flujo del producto |
| `SETUP` | Configuración de partida |
| `INFO` | Datos personales y ocupación |
| `INV` | Habilidades de investigación |
| `GEN` | Habilidades generales |
| `OUT` | Resumen, ficha e impresión |
| `DOM` | Modelo y reglas de dominio |
| `I18N` | Localización |
| `QUAL` | Requisitos no funcionales |

Cada requisito de la línea base tiene uno de estos estados:

| Estado | Significado |
|---|---|
| `implementado` | Existe evidencia en el código actual |
| `parcial` | Solo parte del contrato está implementada |
| `pendiente` | Contrato acordado todavía sin implementación |
| `retirado` | Ya no forma parte del producto; el ID se conserva |

La cobertura automatizada es independiente del estado. Un requisito puede estar
implementado y no tener pruebas.

## Política de cambio

Todo cambio de comportamiento DEBE seguir este orden:

1. Actualizar o añadir el requisito y sus criterios de aceptación.
2. Actualizar la implementación.
3. Añadir o actualizar las pruebas automatizadas.
4. Actualizar `trazabilidad.md` y resolver o añadir entradas en `brechas.md`.

No se DEBE cambiar una regla únicamente en comentarios, textos de interfaz o
constantes inactivas. Cuando una decisión modifique comportamiento ya publicado,
el cambio DEBE quedar descrito en el requisito afectado.

## Criterio de conformidad

Una entrega es conforme cuando:

- todos los requisitos afectados conservan criterios de aceptación verificables;
- la matriz de trazabilidad apunta a la implementación real;
- `npm test` finaliza correctamente;
- `npm run build` finaliza correctamente;
- no se introducen divergencias conocidas sin registrarlas en `brechas.md`.
