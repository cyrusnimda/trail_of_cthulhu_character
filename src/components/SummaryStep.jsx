import { OCCUPATIONS } from '../data/occupations'
import { INVESTIGATIVE_SKILLS, ALL_INVESTIGATIVE_SKILLS } from '../data/skills'
import { GENERAL_SKILLS } from '../data/generalSkills'
import { PULP_DRIVES, PILLAR_CATEGORIES } from '../data/drives'
import { CREDIT_RATING } from '../data/rules'

export default function SummaryStep({
    character, investigativePool, generalPool, investigativeSpent, generalSpent, goNext, goPrev
}) {
    const {
        name, playerName, age, occupation, creditRating, mode, players,
        drive, pillars, investigativeSkills, generalSkills
    } = character

    const selectedOccupation = OCCUPATIONS.find(o => o.id === occupation)
    const selectedDrive = PULP_DRIVES.find(d => d.id === drive)

    const allocatedInvestigative = ALL_INVESTIGATIVE_SKILLS.filter(s => (investigativeSkills[s.id] || 0) > 0)
    const allocatedGeneral = GENERAL_SKILLS.filter(s => (generalSkills[s.id] || 0) > 0)

    const health = generalSkills['health'] || 0
    const stability = generalSkills['stability'] || 0
    const sanity = stability

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="font-display text-3xl text-gold-400 glow-gold mb-2">Resumen del Personaje</h2>
                <p className="text-parchment-400/70 text-sm font-body">Revisa tu personaje antes de generar la hoja final</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column: personal info */}
                <div className="space-y-4">
                    <div className="card">
                        <h3 className="section-title">Identidad</h3>
                        <div className="space-y-2 text-sm font-body">
                            <div className="flex justify-between">
                                <span className="text-parchment-400/60">Nombre</span>
                                <span className="text-parchment-200 font-medium">{name || '—'}</span>
                            </div>
                            {playerName && (
                                <div className="flex justify-between">
                                    <span className="text-parchment-400/60">Jugador</span>
                                    <span className="text-parchment-200">{playerName}</span>
                                </div>
                            )}
                            {age && (
                                <div className="flex justify-between">
                                    <span className="text-parchment-400/60">Edad</span>
                                    <span className="text-parchment-200">{age}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-parchment-400/60">Ocupación</span>
                                <span className="text-parchment-200">{selectedOccupation?.name || '—'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-parchment-400/60">Crédito</span>
                                <span className="text-parchment-200">{creditRating} — {CREDIT_RATING.labels[creditRating]}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-parchment-400/60">Modo</span>
                                <span className={mode === 'pulp' ? 'text-gold-400' : 'text-mythos-400'}>
                                    {mode === 'pulp' ? '⚡ Pulp' : '🌑 Purista'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-parchment-400/60">Jugadores</span>
                                <span className="text-parchment-200">{players}</span>
                            </div>
                        </div>
                    </div>

                    {/* Derived stats */}
                    <div className="card">
                        <h3 className="section-title">Stats Derivados</h3>
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-void-700 rounded-lg py-3">
                                <div className="font-display text-2xl font-bold text-blood-400">{health}</div>
                                <div className="text-xs text-parchment-400/50 font-body">Salud</div>
                            </div>
                            <div className="bg-void-700 rounded-lg py-3">
                                <div className="font-display text-2xl font-bold text-mythos-400">{stability}</div>
                                <div className="text-xs text-parchment-400/50 font-body">Estabilidad</div>
                            </div>
                            <div className="bg-void-700 rounded-lg py-3">
                                <div className="font-display text-2xl font-bold text-gold-400">{sanity}</div>
                                <div className="text-xs text-parchment-400/50 font-body">Cordura</div>
                            </div>
                        </div>
                    </div>

                    {/* Drive / Pillars */}
                    <div className="card">
                        <h3 className="section-title">{mode === 'pulp' ? '⚡ Impulso' : '🌑 Pilares de Cordura'}</h3>
                        {mode === 'pulp' ? (
                            <div>
                                <div className="text-parchment-200 font-body font-medium text-sm">{selectedDrive?.name || '—'}</div>
                                {selectedDrive && (
                                    <p className="text-parchment-400/60 text-xs font-body mt-1">{selectedDrive.description}</p>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-2 text-sm font-body">
                                {PILLAR_CATEGORIES.map(cat => (
                                    <div key={cat.id}>
                                        <span className="text-parchment-400/50 text-xs">{cat.icon} {cat.name}:</span>
                                        <div className="text-parchment-200">{pillars[cat.id] || '—'}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Points summary */}
                    <div className="card bg-void-700/30">
                        <h3 className="section-title">Puntos Gastados</h3>
                        <div className="space-y-2 text-sm font-body">
                            <div className="flex justify-between items-center">
                                <span className="text-parchment-400/60">Investigativos</span>
                                <span className={investigativeSpent > investigativePool ? 'text-blood-400' : 'text-gold-400'}>
                                    {investigativeSpent} / {investigativePool}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-parchment-400/60">Generales</span>
                                <span className={generalSpent > generalPool ? 'text-blood-400' : 'text-gold-400'}>
                                    {generalSpent} / {generalPool}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle: investigative skills */}
                <div className="card">
                    <h3 className="section-title">Habilidades Investigativas</h3>
                    {Object.entries(INVESTIGATIVE_SKILLS).map(([cat, data]) => {
                        const catSkills = data.skills.filter(s => (investigativeSkills[s.id] || 0) > 0)
                        if (catSkills.length === 0) return null
                        return (
                            <div key={cat} className="mb-4">
                                <div className="text-xs text-parchment-400/40 uppercase tracking-wide font-body mb-1">{data.label}</div>
                                <div className="space-y-1">
                                    {catSkills.map(skill => (
                                        <div key={skill.id} className="flex justify-between text-sm font-body py-0.5">
                                            <span className="text-parchment-300">{skill.name}</span>
                                            <span className="text-gold-400 font-display font-bold">{investigativeSkills[skill.id]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                    {allocatedInvestigative.length === 0 && (
                        <p className="text-parchment-400/30 text-sm font-body italic">Sin habilidades asignadas</p>
                    )}
                </div>

                {/* Right: general skills */}
                <div className="card">
                    <h3 className="section-title">Habilidades Generales</h3>
                    <div className="space-y-1">
                        {allocatedGeneral.map(skill => (
                            <div key={skill.id} className="flex justify-between text-sm font-body py-0.5">
                                <span className={`${skill.isPool ? 'text-gold-300 font-medium' : 'text-parchment-300'}`}>
                                    {skill.name}
                                </span>
                                <span className={`font-display font-bold ${skill.isPool ? 'text-gold-400' : 'text-parchment-200'}`}>
                                    {generalSkills[skill.id]}
                                </span>
                            </div>
                        ))}
                        {allocatedGeneral.length === 0 && (
                            <p className="text-parchment-400/30 text-sm font-body italic">Sin habilidades asignadas</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-6">
                <button onClick={goPrev} className="btn-secondary">← Atrás</button>
                <button onClick={goNext} className="btn-primary">
                    Ver Hoja de Personaje →
                </button>
            </div>
        </div>
    )
}
