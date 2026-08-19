# Especificación funcional del producto

## Alcance

El producto es una aplicación web de una sola página para crear un investigador
de *Trail of Cthulhu*. Guía al usuario por seis pasos, calcula los puntos de
construcción y genera una ficha imprimible en inglés o español.

Quedan fuera de alcance en la línea base:

- cuentas y autenticación;
- almacenamiento o recuperación de personajes;
- colaboración entre usuarios;
- importación o exportación estructurada de datos;
- simulación de tiradas, combate o sesiones;
- aplicación automática de habilidades Pulp y bonificaciones de Drives;
- generación directa de un archivo PDF fuera del diálogo de impresión.

## Flujo global

### PROD-001 - Flujo de creación

**Estado:** `implementado`

La aplicación DEBE presentar, en este orden, los pasos Configuración, Información
personal, Habilidades de investigación, Habilidades generales, Resumen y Ficha.
Solo un paso DEBE estar visible a la vez.

**Criterios de aceptación:**

- Al iniciar la aplicación se muestra Configuración.
- Siguiente avanza como máximo un paso y Atrás retrocede como máximo un paso.
- La navegación se limita al intervalo de pasos disponible.
- Un cambio de paso desplaza la ventana al inicio.

### PROD-002 - Navegación por progreso

**Estado:** `implementado`

El indicador de progreso DEBE permitir abrir el paso actual o cualquier paso
anterior, y NO DEBE permitir saltar directamente a un paso posterior.

**Criterios de aceptación:**

- Los pasos anteriores muestran estado completado.
- Al volver a un paso anterior se conserva el estado del personaje.
- Después de volver atrás, los pasos posteriores vuelven a estar bloqueados hasta
  avanzar secuencialmente.
- El indicador no se imprime.

### PROD-003 - Estado de la sesión

**Estado:** `implementado`

El personaje DEBE mantenerse en memoria durante la sesión de la página. Cada
actualización DEBE mezclar las propiedades de primer nivel y conservar las no
incluidas en la actualización.

**Criterios de aceptación:**

- Navegar entre pasos no elimina datos introducidos.
- Cambiar modo u ocupación conserva las asignaciones existentes.
- Recargar la página restaura el personaje inicial; no existe persistencia del
  personaje en esta línea base.

## Configuración

### SETUP-001 - Valores iniciales

**Estado:** `implementado`

Un personaje nuevo DEBE usar cuatro jugadores y modo Purista. Sus datos de texto
y ocupación DEBEN estar vacíos, Credit Rating DEBE ser 3, las habilidades de
investigación DEBEN iniciar en 0 y las habilidades generales DEBEN iniciar en su
valor `min` declarado.

**Criterios de aceptación:**

- Health y Stability empiezan en 1.
- Las demás habilidades generales, incluida Sanity, empiezan en 0.
- El coste general inicial es 2 puntos.

### SETUP-002 - Número de jugadores

**Estado:** `implementado`

El usuario DEBE poder seleccionar entre 1 y 6 jugadores. El cambio DEBE
recalcular inmediatamente la reserva de investigación según `DOM-002` y NO DEBE
alterar el resto del personaje.

### SETUP-003 - Modo de juego

**Estado:** `implementado`

El usuario DEBE poder seleccionar `purist` o `pulp`. El modo DEBE determinar la
reserva general y el requisito narrativo de Información personal.

**Criterios de aceptación:**

- Purista usa 55 puntos generales y exige tres Pilares.
- Pulp usa 65 puntos generales y exige un Drive.
- Cambiar de modo conserva Drive, Pilares, ocupación y habilidades ya asignadas.
- Se puede avanzar desde Configuración sin validación adicional.

## Información personal

### INFO-001 - Datos básicos

**Estado:** `implementado`

El nombre del investigador DEBE ser obligatorio y contener al menos un carácter
distinto de espacio. El nombre del jugador y la edad PUEDEN omitirse.

**Criterios de aceptación:**

- Un nombre vacío o compuesto solo por espacios bloquea Siguiente.
- La edad se almacena como texto numérico y el control declara un rango de 18 a
  90, pero la navegación no valida su presencia ni su rango.
- Los datos introducidos se conservan al cambiar de paso.

### INFO-002 - Selección de ocupación

**Estado:** `implementado`

El usuario DEBE seleccionar una ocupación para avanzar. La interfaz DEBE mostrar
su descripción, rango de Credit Rating y paquetes de habilidades. En modo Pulp
DEBE mostrar también su habilidad Pulp descriptiva.

**Criterios de aceptación:**

- Seleccionar otra ocupación conserva los ratings de habilidades.
- El coste ocupacional se recalcula con el paquete de la nueva ocupación.
- La habilidad Pulp no modifica mecánicamente el personaje.

### INFO-003 - Credit Rating

**Estado:** `implementado`

Sin ocupación, Credit Rating DEBE aceptar valores de 0 a 8. Con ocupación, DEBE
usar el rango de esa ocupación. Al seleccionar una ocupación, el valor existente
DEBE limitarse al mínimo o máximo aplicable.

### INFO-004 - Requisito Purista

**Estado:** `implementado`

En modo Purista se DEBEN solicitar tres Pilares de Sanidad de texto libre:
persona, lugar y creencia. Los tres valores DEBEN ser verdaderos para avanzar.

**Criterios de aceptación:**

- No se selecciona un Drive visible en este modo.
- Un valor compuesto solo por espacios satisface la validación de la línea base.
- Los Pilares no producen efectos mecánicos.

### INFO-005 - Requisito Pulp

**Estado:** `implementado`

En modo Pulp se DEBE seleccionar exactamente un Drive del catálogo para avanzar.
Se DEBEN mostrar su descripción y su bonificación narrativa de Stability.

**Criterios de aceptación:**

- No se editan Pilares visibles en este modo.
- Seleccionar otro Drive reemplaza el ID seleccionado.
- La bonificación del Drive no se aplica automáticamente.

### INFO-006 - Condición de avance

**Estado:** `implementado`

Siguiente DEBE habilitarse solo cuando hay nombre no vacío, ocupación y el
requisito correspondiente al modo actual. Player name, edad y Credit Rating no
añaden condiciones de avance.

## Habilidades de investigación

### INV-001 - Presentación del catálogo

**Estado:** `implementado`

Las habilidades DEBEN mostrarse por categorías académica, interpersonal y
técnica. Al entrar al paso, la categoría académica DEBE quedar seleccionada.

**Criterios de aceptación:**

- Cambiar de categoría no modifica ratings.
- Salir y volver al paso selecciona de nuevo la categoría académica.
- El total de una categoría es la suma de ratings, no su coste de construcción.
- Las habilidades ocupacionales tienen identificación visual diferenciada.

### INV-002 - Modificación de ratings

**Estado:** `implementado`

Cada rating DEBE modificarse en incrementos enteros de 1. El mínimo DEBE ser 0,
el máximo no ocupacional DEBE ser 2 y el máximo práctico ocupacional DEBE ser 99.

**Criterios de aceptación:**

- Restar en 0 está deshabilitado.
- Sumar en el máximo aplicable está deshabilitado.
- Sumar está deshabilitado cuando los puntos restantes son 0 o negativos.
- El control comprueba que quedan puntos, pero no que alcancen para el incremento;
  por ello puede producir temporalmente un saldo de -0.5.

### INV-003 - Condición de avance

**Estado:** `implementado`

El usuario PUEDE avanzar con puntos sin gastar y sin asignar puntos a todas las
habilidades ocupacionales. NO DEBE poder avanzar cuando el saldo es negativo.

## Habilidades generales

### GEN-001 - Presentación del catálogo

**Estado:** `implementado`

La interfaz DEBE agrupar primero Health, Sanity y Stability; después Firearms,
Scuffling, Weapons, Athletics y Fleeing; y finalmente las habilidades restantes.
Las habilidades ocupacionales y de reserva DEBEN distinguirse visualmente.

### GEN-002 - Modificación de ratings

**Estado:** `implementado`

Cada rating general DEBE modificarse en incrementos enteros de 1. NO DEBE existir
un máximo. El mínimo de cada habilidad DEBE ser su propiedad `min` o 0.

**Criterios de aceptación:**

- Health y Stability no pueden bajar de 1.
- Sanity y las demás habilidades pueden bajar hasta 0.
- Sumar está deshabilitado cuando el saldo es 0 o negativo.
- El incremento puede producir un saldo temporal de -0.5 en el mismo caso
  descrito por `INV-002`.

### GEN-003 - Condición de avance

**Estado:** `implementado`

El usuario PUEDE avanzar con puntos generales sin gastar. NO DEBE poder avanzar
cuando el saldo general es negativo.

### GEN-004 - Visualización de estadísticas durante la asignación

**Estado:** `implementado`

El paso DEBE mostrar los ratings editables actuales de Health, Stability y
Sanity, además de la reserva total y el saldo restante.

## Resumen y ficha

### OUT-001 - Resumen

**Estado:** `implementado`

El resumen DEBE mostrar identidad, configuración, ocupación, Credit Rating,
estadísticas, requisito narrativo del modo, puntos gastados y habilidades con
rating mayor que 0.

**Criterios de aceptación:**

- Las habilidades de investigación se agrupan por categoría.
- Los costes fraccionarios se muestran con un decimal cuando sea necesario.
- El gasto superior a la reserva se destaca como error.
- El resumen no añade una validación independiente antes de abrir la ficha.

### OUT-002 - Estadísticas finales

**Estado:** `implementado`

En Resumen y Ficha, Health DEBE usar `generalSkills.health`, Stability DEBE usar
`generalSkills.stability` y Sanity DEBE mostrarse igual a Stability.

El rating editable `generalSkills.sanity` PUEDE aparecer en la lista de
habilidades y consumir puntos, pero no modifica la estadística Sanity final.

### OUT-003 - Ficha de personaje

**Estado:** `implementado`

La ficha DEBE mostrar nombre del investigador, ocupación, Player name y edad
cuando existan, Credit Rating, modo, jugadores, estadísticas, habilidades
asignadas, el Drive o los Pilares y, en Pulp, la habilidad de la ocupación. No
incluye los totales de puntos gastados que aparecen en el Resumen.

**Criterios de aceptación:**

- Un nombre vacío usa el texto localizado para investigador sin nombre.
- Cada punto de Health, Stability y Sanity se representa con un círculo.
- Las habilidades ocupacionales se resaltan según la ocupación actual.
- El usuario puede volver al Resumen.

### OUT-004 - Impresión

**Estado:** `implementado`

La acción Imprimir/Guardar PDF DEBE invocar el diálogo de impresión del
navegador. La aplicación NO DEBE prometer una descarga PDF programática.

**Criterios de aceptación:**

- Cabecera, progreso, controles y pie global no aparecen en impresión.
- La ficha se marca para evitar saltos internos de página cuando el navegador lo
  permita.
- El resultado final depende de las opciones de impresión del navegador.
