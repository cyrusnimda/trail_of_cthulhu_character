# Especificación de calidad y operación

## Localización

### I18N-001 - Idiomas soportados

**Estado:** `implementado`

La interfaz DEBE ofrecer inglés (`en`) y español (`es`), con inglés como idioma
de respaldo. La detección inicial PUEDE usar las preferencias del navegador.

### I18N-002 - Cambio de idioma

**Estado:** `implementado`

El cambio de idioma DEBE actualizar inmediatamente los textos traducidos y NO
DEBE modificar el personaje ni el paso actual. La librería PUEDE recordar la
preferencia de idioma mediante su mecanismo de detección.

### I18N-003 - Cobertura de contenido

**Estado:** `parcial`

Todo texto visible propio de la aplicación, incluidos nombres y descripciones de
catálogos, DEBE provenir de claves presentes en ambos locales. Los metadatos del
documento DEBERÍAN reflejar el idioma activo.

La línea base tiene excepciones conocidas en placeholders, badges, una acción,
IDs de catálogo y metadatos; ver `GAP-006`, `GAP-007` y `GAP-008`.

## Compatibilidad y presentación

### QUAL-001 - Aplicación cliente

**Estado:** `implementado`

La aplicación DEBE ejecutarse como SPA React en navegadores modernos con
JavaScript. NO requiere backend, base de datos, autenticación ni APIs externas.

### QUAL-002 - Diseño adaptable

**Estado:** `implementado`

El flujo completo DEBE ser utilizable en móvil y escritorio. El contenido DEBE
adaptar columnas, pestañas y etiquetas sin cambiar las reglas de negocio.

Puntos de comprobación manual:

- selector de modo y datos personales en móvil y escritorio;
- selector de categorías de investigación antes y después de `lg`;
- resumen y ficha en una y varias columnas;
- cabecera y progreso en viewport estrecho.

### QUAL-003 - Accesibilidad de interacción

**Estado:** `parcial`

Las acciones DEBEN usar controles de teclado nativos y el estado deshabilitado
DEBE exponerse mediante `disabled`. Los controles con icono DEBEN tener nombre
accesible y los campos DEBERÍAN asociar etiqueta y control.

La línea base usa botones e inputs nativos, pero no satisface completamente los
nombres, asociaciones y semántica de selección; ver `GAP-011`.

## Impresión

### QUAL-004 - Salida impresa

**Estado:** `implementado`

La hoja de estilos de impresión DEBE ocultar elementos marcados `no-print`, usar
fondo de cuerpo blanco y color base negro, y solicitar que la ficha permanezca
unida. Los colores explícitos y fondos de los descendientes se conservan. No se
garantiza paginación, colores impresos, tamaño de página ni nombre de archivo
idénticos entre navegadores.

## Persistencia y privacidad

### QUAL-005 - Persistencia del personaje

**Estado:** `implementado`

Los datos del personaje solo DEBEN residir en memoria en la línea base. La
aplicación NO DEBE enviarlos a un servidor ni almacenarlos en `localStorage`,
`sessionStorage`, cookies o IndexedDB.

La preferencia de idioma gestionada por i18next no se considera dato del
personaje.

## Verificación

### QUAL-006 - Construcción y pruebas

**Estado:** `implementado`

El repositorio DEBE poder verificarse con:

```bash
npm test
npm run build
```

Las pruebas unitarias y de componentes DEBEN residir junto al código mediante el
patrón `*.test.js` o `*.test.jsx`. No existen gates de lint, tipos, cobertura o
E2E en la línea base.
