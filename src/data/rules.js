// Trail of Cthulhu - Game Rules & Point Pools

// Investigative skill points by player count
// Per GUMSHOE rules: more players = more points to ensure everyone can contribute
export const INVESTIGATIVE_POOLS = {
    2: 24,
    3: 18,
    4: 16,
    5: 16,
    6: 16,
}

// General skill points (constant regardless of player count)
export const GENERAL_POOL_BASE = 55
export const GENERAL_POOL_PULP_BONUS = 10 // Pulp mode grants extra points

// Credit Rating ranges
export const CREDIT_RATING = {
    min: 0,
    max: 8,
    labels: {
        0: 'Indigente',
        1: 'Pobre',
        2: 'Clase trabajadora',
        3: 'Clase media baja',
        4: 'Clase media',
        5: 'Clase media alta',
        6: 'Acomodado',
        7: 'Rico',
        8: 'Muy rico',
    }
}

// Derived stats
export const getDerivedStats = (generalSkills, mode) => {
    const health = generalSkills['health'] || 1
    const stability = generalSkills['stability'] || 1
    const sanity = stability // Sanity starts equal to Stability

    return {
        health,
        stability,
        sanity,
        maxHealth: health,
        maxStability: stability,
        maxSanity: sanity,
    }
}

// Get total investigative points for given player count
export const getInvestigativePool = (players) => {
    return INVESTIGATIVE_POOLS[players] || INVESTIGATIVE_POOLS[4]
}

// Get total general points for given mode
export const getGeneralPool = (mode) => {
    return GENERAL_POOL_BASE + (mode === 'pulp' ? GENERAL_POOL_PULP_BONUS : 0)
}

// Occupational skill rules:
// - Must spend at least 1 point in each occupational investigative skill
// - No maximum for occupational skills
// - Non-occupational investigative skills: max 2 points each
export const MAX_NON_OCCUPATIONAL_INVESTIGATIVE = 2

// Skill Costs (in build points per rating point)
export const COSTS = {
    INVESTIGATIVE: 1.0,
    OCCUPATIONAL_INVESTIGATIVE: 0.5,
    OCCUPATIONAL_GENERAL: 0.5,
    NON_OCCUPATIONAL_GENERAL: 1.0,
}

export const calculateInvestigativeSpent = (investigativeSkills, occupationalSkills) => {
    return Object.entries(investigativeSkills).reduce((acc, [id, value]) => {
        const isOccupational = occupationalSkills.includes(id)
        const cost = isOccupational ? COSTS.OCCUPATIONAL_INVESTIGATIVE : COSTS.INVESTIGATIVE
        return acc + (value * cost)
    }, 0)
}

export const calculateGeneralSpent = (generalSkills, occupationalSkills) => {
    return Object.entries(generalSkills).reduce((acc, [id, value]) => {
        const isOccupational = occupationalSkills.includes(id)
        const cost = isOccupational ? COSTS.OCCUPATIONAL_GENERAL : COSTS.NON_OCCUPATIONAL_GENERAL
        return acc + (value * cost)
    }, 0)
}

// Age modifiers (optional rule)
export const AGE_MODIFIERS = {
    young: { label: 'Joven (< 30)', generalBonus: 0, investigativeBonus: 0 },
    adult: { label: 'Adulto (30-50)', generalBonus: 0, investigativeBonus: 0 },
    middle: { label: 'Maduro (50-65)', generalBonus: 2, investigativeBonus: 2, generalPenalty: 'athletics' },
    elder: { label: 'Mayor (> 65)', generalBonus: 4, investigativeBonus: 4, generalPenalty: 'athletics' },
}

// Pulp mode specifics
export const PULP_RULES = {
    extraGeneralPoints: 10,
    startingHealthBonus: 0, // Represented via extra general points
    startingStabilityBonus: 0,
    hasDrives: true,
    hasPillarsOfSanity: false,
    description: 'Modo Pulp: Los investigadores son héroes de acción más resistentes. Más puntos de habilidades generales, Impulsos en lugar de Pilares de Cordura.',
}

// Purist mode specifics
export const PURIST_RULES = {
    extraGeneralPoints: 0,
    hasDrives: false,
    hasPillarsOfSanity: true,
    pillarsRequired: 3,
    description: 'Modo Purista: Investigadores ordinarios ante horrores cósmicos. Más letal y aterrador. Requiere 3 Pilares de Cordura.',
}
