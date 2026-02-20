// Trail of Cthulhu - Drives (Pulp) and Pillars of Sanity (Purist)

// Pulp Drives: What motivates the investigator to face the darkness
export const PULP_DRIVES = [
    {
        id: 'thrill',
        name: 'Emoción de la Aventura',
        description: 'Vives para la adrenalina. El peligro te atrae en lugar de repelerte.',
        stabilityBonus: 'Recuperas 1 punto de Estabilidad adicional cuando superas un combate.',
    },
    {
        id: 'duty',
        name: 'Deber',
        description: 'Tienes una obligación que cumplir, ya sea hacia tu país, tu fe o tu código de honor.',
        stabilityBonus: 'Recuperas 1 punto de Estabilidad cuando cumples con tu deber.',
    },
    {
        id: 'revenge',
        name: 'Venganza',
        description: 'Alguien o algo destruyó algo que amabas. Encontrarás justicia.',
        stabilityBonus: 'Recuperas 2 puntos de Estabilidad cuando avanzas hacia tu venganza.',
    },
    {
        id: 'love',
        name: 'Amor',
        description: 'Proteges a alguien que amas o buscas reunirte con él/ella.',
        stabilityBonus: 'Recuperas 1 punto de Estabilidad cuando proteges a tu ser querido.',
    },
    {
        id: 'greed',
        name: 'Codicia',
        description: 'El dinero y el poder te motivan. Siempre hay algo que ganar.',
        stabilityBonus: 'Recuperas 1 punto de Estabilidad cuando obtienes una recompensa significativa.',
    },
    {
        id: 'patriotism',
        name: 'Patriotismo',
        description: 'Sirves a tu nación con orgullo. El bien de tu país es tu bien.',
        stabilityBonus: 'Recuperas 1 punto de Estabilidad cuando sirves a los intereses de tu nación.',
    },
    {
        id: 'faith',
        name: 'Fe',
        description: 'Tu creencia religiosa o espiritual te da fortaleza ante lo inexplicable.',
        stabilityBonus: 'Recuperas 2 puntos de Estabilidad cuando tu fe es confirmada o puesta a prueba.',
    },
    {
        id: 'curiosity',
        name: 'Curiosidad',
        description: 'Necesitas saber. Los misterios te consumen hasta que los resuelves.',
        stabilityBonus: 'Recuperas 1 punto de Estabilidad cuando descubres una verdad oculta importante.',
    },
    {
        id: 'protection',
        name: 'Protección',
        description: 'Proteges a los inocentes de las amenazas que ellos no pueden ver.',
        stabilityBonus: 'Recuperas 2 puntos de Estabilidad cuando salvas a alguien de un peligro sobrenatural.',
    },
    {
        id: 'knowledge',
        name: 'Conocimiento',
        description: 'La verdad, por oscura que sea, debe ser conocida y documentada.',
        stabilityBonus: 'Recuperas 1 punto de Estabilidad cuando documentas un descubrimiento importante.',
    },
    {
        id: 'justice',
        name: 'Justicia',
        description: 'El mal debe ser castigado. Eres el equilibrio entre la ley y el caos.',
        stabilityBonus: 'Recuperas 2 puntos de Estabilidad cuando llevas a un criminal ante la justicia.',
    },
    {
        id: 'survival',
        name: 'Supervivencia',
        description: 'Simplemente quieres salir vivo. Eso es suficiente motivación.',
        stabilityBonus: 'Recuperas 1 punto de Estabilidad al final de cada sesión que sobrevivas.',
    },
]

// Purist Pillars of Sanity: What keeps the investigator sane
// Must choose 3: a person, a place, and a belief/ideal
export const PILLAR_CATEGORIES = [
    {
        id: 'person',
        name: 'Una Persona',
        description: 'Alguien cuya existencia y bienestar ancla tu cordura.',
        examples: ['Tu cónyuge o pareja', 'Un hijo o familiar cercano', 'Tu mejor amigo', 'Un mentor o maestro', 'Un paciente o protegido'],
        icon: '👤',
    },
    {
        id: 'place',
        name: 'Un Lugar',
        description: 'Un lugar que representa seguridad, hogar o normalidad para ti.',
        examples: ['Tu hogar de infancia', 'Tu ciudad natal', 'Tu despacho o laboratorio', 'Una iglesia o templo', 'Un lugar de la naturaleza'],
        icon: '🏠',
    },
    {
        id: 'belief',
        name: 'Una Creencia o Ideal',
        description: 'Un principio, fe o ideal que da sentido a tu existencia.',
        examples: ['La fe religiosa', 'La ciencia y el método racional', 'El progreso humano', 'La justicia', 'El amor romántico', 'El arte y la belleza'],
        icon: '✨',
    },
]
