# Reglas de dominio

## Modelo del personaje

### DOM-001 - Estructura de estado

**Estado:** `implementado`

El estado lógico del personaje DEBE contener:

| Campo | Tipo efectivo | Valor inicial |
|---|---|---|
| `players` | número | `4` |
| `mode` | `purist` o `pulp` | `purist` |
| `name` | texto | vacío |
| `playerName` | texto | vacío |
| `age` | texto | vacío |
| `occupation` | ID de ocupación | vacío |
| `creditRating` | número | `3` |
| `drive` | ID de Drive | vacío |
| `pillars.person` | texto | vacío |
| `pillars.place` | texto | vacío |
| `pillars.belief` | texto | vacío |
| `investigativeSkills` | mapa ID a rating | todos a `0` |
| `generalSkills` | mapa ID a rating | cada `min` o `0` |

No existe un esquema de serialización público en la línea base.

## Reservas y costes

### DOM-002 - Reserva de investigación

**Estado:** `implementado`

La reserva DEBE obtenerse de la siguiente tabla:

| Jugadores | Puntos |
|---:|---:|
| 2 | 24 |
| 3 | 18 |
| 4 | 16 |
| 5 | 16 |
| 6 | 16 |

Si no existe una entrada verdadera para el valor recibido, incluida la selección
de 1 jugador, la función DEBE usar la reserva de 4 jugadores: 16 puntos.

### DOM-003 - Reserva general

**Estado:** `implementado`

La reserva general DEBE calcularse así:

```text
reservaGeneral = 55 + (modo == "pulp" ? 10 : 0)
```

Todo valor de modo distinto de `pulp` recibe 55 puntos.

### DOM-004 - Coste de habilidades

**Estado:** `implementado`

Cada punto de rating DEBE costar:

| Clase | Ocupacional | No ocupacional |
|---|---:|---:|
| Investigación | 0.5 | 1 |
| General | 0.5 | 1 |

El gasto DEBE ser la suma de `rating * coste` para todas las propiedades
enumerables del mapa recibido. Los cálculos no normalizan IDs desconocidos,
valores negativos ni valores no numéricos.

### DOM-005 - Puntos restantes

**Estado:** `implementado`

```text
investigaciónRestante = reservaInvestigación - gastoInvestigación
generalRestante       = reservaGeneral - gastoGeneral
```

Los saldos y gastos PUEDEN contener medios puntos. La reserva total se mantiene
como entero.

### DOM-006 - Determinación ocupacional

**Estado:** `implementado`

Una habilidad DEBE ser ocupacional si su ID pertenece al array correspondiente
de la ocupación actualmente seleccionada. Al cambiar de ocupación se DEBEN
recalcular todos los costes sin modificar ratings.

## Catálogos

### DOM-007 - Habilidades de investigación

**Estado:** `implementado`

El catálogo renderizable DEBE estar definido por `src/data/skills.js` y contener
IDs únicos distribuidos en tres categorías:

| Categoría | Cantidad |
|---|---:|
| Académicas | 15 |
| Interpersonales | 8 |
| Técnicas | 9 |

El catálogo de código, y no este documento, es la fuente canónica de IDs y orden.
Cada ID renderizable DEBE tener nombre y descripción en los locales soportados.

### DOM-008 - Habilidades generales

**Estado:** `implementado`

El catálogo canónico DEBE ser `src/data/generalSkills.js`, con 23 IDs únicos.
Cada habilidad DEBE declarar `min`; `default` es metadato inactivo y NO DEBE
usarse para inicializar el personaje en la línea base.

Health, Sanity y Stability DEBEN declarar `isPool`. Health y Stability DEBEN
tener mínimo 1; Sanity, mínimo 0.

### DOM-009 - Ocupaciones

**Estado:** `parcial`

El catálogo canónico DEBE ser `src/data/occupations.js` y contener 20
ocupaciones. Cada registro DEBE incluir ID único, rango de Credit Rating, arrays
de habilidades de investigación y generales, y habilidad Pulp descriptiva.

Todo ID de un paquete ocupacional DEBERÍA existir en el catálogo de la clase
correspondiente. La implementación no cumple completamente esta integridad; ver
`GAP-005`.

### DOM-010 - Rangos de Credit Rating

**Estado:** `implementado`

| Ocupación | ID | Rango |
|---|---|---:|
| Antiquarian | `antiquarian` | 2-6 |
| Author | `author` | 1-5 |
| Clergy | `clergy` | 2-5 |
| Criminal | `criminal` | 1-4 |
| Dilettante | `dilettante` | 4-8 |
| Doctor | `doctor` | 3-6 |
| Engineer | `engineer` | 2-5 |
| Entertainer | `entertainer` | 1-5 |
| Journalist | `journalist` | 1-4 |
| Lawyer | `lawyer` | 3-7 |
| Military Officer | `military_officer` | 2-5 |
| Nurse | `nurse` | 1-3 |
| Occultist | `occultist` | 1-4 |
| Parapsychologist | `parapsychologist` | 2-4 |
| Police Detective | `police_detective` | 2-4 |
| Professor | `professor` | 2-5 |
| Scientist | `scientist` | 2-5 |
| Soldier | `soldier` | 1-3 |
| Spy | `spy` | 2-6 |
| Tribal Member | `tribal_member` | 0-2 |

### DOM-011 - Drives Pulp

**Estado:** `implementado`

El catálogo canónico DEBE ser `src/data/drives.js` y contener 12 Drives con ID,
nombre, descripción y texto de bonificación de Stability. El generador solo
selecciona y presenta este contenido; NO DEBE alterar ratings por estas
bonificaciones.

### DOM-012 - Pilares Puristas

**Estado:** `implementado`

Los Pilares DEBEN ser exactamente `person`, `place` y `belief`. Son textos libres
sin longitud máxima, unicidad ni efecto mecánico.

## Estadísticas derivadas

### DOM-013 - Valores de ficha

**Estado:** `implementado`

Para Resumen y Ficha:

```text
Health    = generalSkills.health || 0
Stability = generalSkills.stability || 0
Sanity    = Stability
```

La función exportada `getDerivedStats` no forma parte del camino ejecutable
actual y no constituye una segunda regla normativa.

## Reglas declaradas inactivas

### DOM-014 - Edad

**Estado:** `implementado`

La edad NO DEBE modificar reservas, habilidades ni estadísticas en la línea
base. `AGE_MODIFIERS` es información inactiva.

### DOM-015 - Reglas narrativas

**Estado:** `implementado`

Las habilidades Pulp de ocupación, las bonificaciones de Drives y los objetos
`PULP_RULES` y `PURIST_RULES` son informativos. La aplicación NO DEBE ejecutar
recuperaciones, rerolls, equipo, acciones de combate ni efectos de sesión.
