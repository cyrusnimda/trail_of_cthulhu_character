// Trail of Cthulhu - Investigative Skills
// Grouped by category per GUMSHOE rules

export const INVESTIGATIVE_SKILLS = {
    academic: {
        label: 'Académicas',
        color: 'blue',
        skills: [
            { id: 'anthropology', name: 'Antropología', description: 'Conocimiento de culturas humanas, rituales y comportamiento social.' },
            { id: 'archaeology', name: 'Arqueología', description: 'Identificar y fechar artefactos, excavar yacimientos, conocer civilizaciones antiguas.' },
            { id: 'architecture', name: 'Arquitectura', description: 'Diseño de edificios, estructuras ocultas, planos y construcción histórica.' },
            { id: 'art_history', name: 'Historia del Arte', description: 'Identificar estilos artísticos, períodos, artistas y autenticidad de obras.' },
            { id: 'biology', name: 'Biología', description: 'Conocimiento de organismos vivos, anatomía, botánica y zoología.' },
            { id: 'cryptography', name: 'Criptografía', description: 'Descifrar códigos, cifrados y mensajes ocultos.' },
            { id: 'geology', name: 'Geología', description: 'Identificar minerales, rocas, formaciones geológicas y terrenos.' },
            { id: 'history', name: 'Historia', description: 'Conocimiento de eventos históricos, figuras y períodos pasados.' },
            { id: 'languages', name: 'Idiomas', description: 'Leer, escribir y hablar idiomas adicionales (especificar cuáles).' },
            { id: 'law', name: 'Derecho', description: 'Conocimiento del sistema legal, procedimientos judiciales y regulaciones.' },
            { id: 'library_use', name: 'Uso de Biblioteca', description: 'Localizar información en archivos, bibliotecas y registros.' },
            { id: 'medicine', name: 'Medicina', description: 'Diagnóstico de enfermedades, tratamientos y anatomía humana.' },
            { id: 'occult', name: 'Ocultismo', description: 'Conocimiento de magia, folklore, superstición y tradiciones esotéricas.' },
            { id: 'physics', name: 'Física', description: 'Leyes naturales, mecánica, electricidad y ciencias físicas.' },
            { id: 'theology', name: 'Teología', description: 'Religiones del mundo, textos sagrados, rituales y creencias.' },
        ]
    },
    interpersonal: {
        label: 'Interpersonales',
        color: 'green',
        skills: [
            { id: 'assess_honesty', name: 'Evaluar Honestidad', description: 'Detectar mentiras y evaluar la sinceridad de las personas.' },
            { id: 'bargain', name: 'Negociar', description: 'Obtener mejores precios, condiciones favorables en tratos.' },
            { id: 'cop_talk', name: 'Jerga Policial', description: 'Comunicarse efectivamente con policías y funcionarios de la ley.' },
            { id: 'flattery', name: 'Halagar', description: 'Obtener información o favores mediante elogios y adulación.' },
            { id: 'intimidation', name: 'Intimidación', description: 'Obtener cooperación mediante amenazas o presión psicológica.' },
            { id: 'oral_history', name: 'Historia Oral', description: 'Obtener información de personas mayores o comunidades mediante conversación.' },
            { id: 'reassurance', name: 'Tranquilizar', description: 'Calmar a personas asustadas o angustiadas para obtener información.' },
            { id: 'streetwise', name: 'Callejeo', description: 'Moverse por el hampa, obtener información en ambientes criminales.' },
        ]
    },
    technical: {
        label: 'Técnicas',
        color: 'orange',
        skills: [
            { id: 'astronomy', name: 'Astronomía', description: 'Conocimiento de cuerpos celestes, constelaciones y fenómenos astronómicos.' },
            { id: 'chemistry', name: 'Química', description: 'Identificar sustancias, realizar análisis químicos y síntesis.' },
            { id: 'craft', name: 'Artesanía', description: 'Crear objetos físicos, reparar artefactos y trabajo manual especializado.' },
            { id: 'evidence_collection', name: 'Recolección de Evidencias', description: 'Encontrar, preservar y analizar evidencias físicas en escenas.' },
            { id: 'forensics', name: 'Forense', description: 'Examinar cadáveres, determinar causas de muerte y analizar crímenes.' },
            { id: 'locksmith', name: 'Cerrajería', description: 'Abrir cerraduras, identificar mecanismos de seguridad.' },
            { id: 'mechanical_repair', name: 'Reparación Mecánica', description: 'Reparar y mantener maquinaria, vehículos y dispositivos mecánicos.' },
            { id: 'photography', name: 'Fotografía', description: 'Tomar, revelar y analizar fotografías como evidencia.' },
            { id: 'pharmacy', name: 'Farmacia', description: 'Identificar medicamentos, venenos y sustancias farmacológicas.' },
        ]
    }
}

export const ALL_INVESTIGATIVE_SKILLS = [
    ...INVESTIGATIVE_SKILLS.academic.skills,
    ...INVESTIGATIVE_SKILLS.interpersonal.skills,
    ...INVESTIGATIVE_SKILLS.technical.skills,
]

export const getSkillById = (id) => ALL_INVESTIGATIVE_SKILLS.find(s => s.id === id)
export const getCategoryForSkill = (id) => {
    for (const [cat, data] of Object.entries(INVESTIGATIVE_SKILLS)) {
        if (data.skills.find(s => s.id === id)) return cat
    }
    return null
}
