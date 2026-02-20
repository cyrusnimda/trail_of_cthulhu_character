import { useRef } from 'react'
import { OCCUPATIONS } from '../data/occupations'
import { INVESTIGATIVE_SKILLS } from '../data/skills'
import { GENERAL_SKILLS } from '../data/generalSkills'
import { PULP_DRIVES, PILLAR_CATEGORIES } from '../data/drives'
import { CREDIT_RATING } from '../data/rules'

export default function CharacterSheetStep({ character, goPrev }) {
    const sheetRef = useRef(null)

    const {
        name, playerName, age, occupation, creditRating, mode, players,
        drive, pillars, investigativeSkills, generalSkills
    } = character

    const selectedOccupation = OCCUPATIONS.find(o => o.id === occupation)
    const selectedDrive = PULP_DRIVES.find(d => d.id === drive)

    const health = generalSkills['health'] || 0
    const stability = generalSkills['stability'] || 0
    const sanity = stability

    const handlePrint = () => window.print()

    const allocatedInvestigative = {}
    Object.entries(INVESTIGATIVE_SKILLS).forEach(([cat, data]) => {
        const catSkills = data.skills.filter(s => (investigativeSkills[s.id] || 0) > 0)
        if (catSkills.length > 0) allocatedInvestigative[cat] = { ...data, skills: catSkills }
    })

    const allocatedGeneral = GENERAL_SKILLS.filter(s => (generalSkills[s.id] || 0) > 0)

    return (
        <div>
            {/* Controls */}
            <div className="no-print flex justify-between items-center mb-6">
                <button onClick={goPrev} className="btn-secondary">← Volver al Resumen</button>
                <div className="flex gap-3">
                    <button onClick={handlePrint} className="btn-primary flex items-center gap-2">
                        🖨️ Imprimir / Guardar PDF
                    </button>
                </div>
            </div>

            {/* Character Sheet */}
            <div
                ref={sheetRef}
                className="print-sheet bg-void-900 border border-gold-600/30 rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
                style={{ maxWidth: '900px', margin: '0 auto' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-void-950 via-void-800 to-void-950 border-b border-gold-600/30 p-8">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="text-gold-600/40 font-display text-xs uppercase tracking-widest mb-1">Trail of Cthulhu · Sistema GUMSHOE</div>
                            <h1 className="font-display text-4xl font-bold text-gold-400 glow-gold leading-none">
                                {name || 'Sin Nombre'}
                            </h1>
                            {selectedOccupation && (
                                <div className="text-parchment-400/80 font-body text-lg mt-1">{selectedOccupation.name}</div>
                            )}
                            <div className="flex items-center gap-3 mt-2 text-sm font-body text-parchment-400/50">
                                {playerName && <span>Jugador: {playerName}</span>}
                                {age && <><span>·</span><span>Edad: {age}</span></>}
                                <span>·</span>
                                <span>Crédito: {creditRating} ({CREDIT_RATING.labels[creditRating]})</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`text-2xl font-display font-bold ${mode === 'pulp' ? 'text-gold-400' : 'text-mythos-400'}`}>
                                {mode === 'pulp' ? '⚡ PULP' : '🌑 PURISTA'}
                            </div>
                            <div className="text-xs text-parchment-400/40 font-body mt-1">{players} jugador{players !== 1 ? 'es' : ''}</div>
                        </div>
                    </div>
                </div>

                {/* Derived stats bar */}
                <div className="bg-void-800 border-b border-void-600 px-8 py-4">
                    <div className="grid grid-cols-3 gap-6 text-center">
                        {[
                            { label: 'SALUD', value: health, color: 'text-blood-400', bg: 'bg-blood-500/10 border-blood-500/30' },
                            { label: 'ESTABILIDAD', value: stability, color: 'text-mythos-400', bg: 'bg-mythos-600/10 border-mythos-500/30' },
                            { label: 'CORDURA', value: sanity, color: 'text-gold-400', bg: 'bg-gold-500/10 border-gold-500/30' },
                        ].map(stat => (
                            <div key={stat.label} className={`rounded-xl border py-4 ${stat.bg}`}>
                                <div className={`font-display text-5xl font-bold ${stat.color}`}>{stat.value}</div>
                                <div className="text-xs text-parchment-400/50 font-body uppercase tracking-widest mt-1">{stat.label}</div>
                                <div className="flex justify-center gap-1 mt-2">
                                    {Array.from({ length: stat.value }).map((_, i) => (
                                        <div key={i} className={`w-3 h-3 rounded-full border ${stat.color.replace('text-', 'border-')} opacity-40`} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main content */}
                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Investigative skills */}
                    <div>
                        <h2 className="font-display text-gold-500 text-sm uppercase tracking-widest border-b border-gold-600/30 pb-2 mb-4">
                            Habilidades Investigativas
                        </h2>
                        {Object.entries(allocatedInvestigative).length > 0 ? (
                            Object.entries(allocatedInvestigative).map(([cat, data]) => (
                                <div key={cat} className="mb-4">
                                    <div className="text-xs text-parchment-400/40 uppercase tracking-wide font-body mb-1">{data.label}</div>
                                    <div className="space-y-1">
                                        {data.skills.map(skill => {
                                            const isOcc = selectedOccupation?.investigativeSkills.includes(skill.id)
                                            return (
                                                <div key={skill.id} className={`flex justify-between items-center py-1 px-2 rounded ${isOcc ? 'bg-gold-500/8 border-l-2 border-gold-500/50' : ''}`}>
                                                    <span className="text-sm font-body text-parchment-300">{skill.name}</span>
                                                    <span className="font-display font-bold text-gold-400">{investigativeSkills[skill.id]}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-parchment-400/30 text-sm italic font-body">Sin habilidades asignadas</p>
                        )}
                    </div>

                    {/* General skills + Drive/Pillars */}
                    <div>
                        <h2 className="font-display text-gold-500 text-sm uppercase tracking-widest border-b border-gold-600/30 pb-2 mb-4">
                            Habilidades Generales
                        </h2>
                        <div className="space-y-1 mb-6">
                            {allocatedGeneral.map(skill => {
                                const isOcc = selectedOccupation?.generalSkills.includes(skill.id)
                                return (
                                    <div key={skill.id} className={`flex justify-between items-center py-1 px-2 rounded ${isOcc ? 'bg-gold-500/8 border-l-2 border-gold-500/50' : ''}`}>
                                        <span className={`text-sm font-body ${skill.isPool ? 'text-gold-300 font-medium' : 'text-parchment-300'}`}>
                                            {skill.name}
                                        </span>
                                        <span className={`font-display font-bold ${skill.isPool ? 'text-gold-400' : 'text-parchment-200'}`}>
                                            {generalSkills[skill.id]}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Drive / Pillars */}
                        <div className="border-t border-void-600 pt-4">
                            <h2 className="font-display text-gold-500 text-sm uppercase tracking-widest mb-3">
                                {mode === 'pulp' ? '⚡ Impulso' : '🌑 Pilares de Cordura'}
                            </h2>
                            {mode === 'pulp' ? (
                                <div className="bg-gold-500/8 border border-gold-500/20 rounded-lg p-3">
                                    <div className="font-body font-semibold text-parchment-200">{selectedDrive?.name || '—'}</div>
                                    {selectedDrive && (
                                        <p className="text-xs text-parchment-400/60 font-body mt-1">{selectedDrive.description}</p>
                                    )}
                                    {selectedDrive && (
                                        <p className="text-xs text-gold-400/70 font-body mt-1 italic">{selectedDrive.stabilityBonus}</p>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {PILLAR_CATEGORIES.map(cat => (
                                        <div key={cat.id} className="bg-mythos-600/10 border border-mythos-500/20 rounded-lg p-2">
                                            <div className="text-xs text-parchment-400/40 font-body">{cat.icon} {cat.name}</div>
                                            <div className="text-sm text-parchment-200 font-body">{pillars[cat.id] || '—'}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Occupation ability */}
                        {mode === 'pulp' && selectedOccupation && (
                            <div className="border-t border-void-600 pt-4 mt-4">
                                <h2 className="font-display text-gold-500 text-sm uppercase tracking-widest mb-2">Habilidad Especial</h2>
                                <div className="bg-gold-500/5 border border-gold-500/15 rounded-lg p-3">
                                    <div className="text-xs text-gold-500/70 font-body uppercase tracking-wide mb-1">{selectedOccupation.name}</div>
                                    <p className="text-xs text-parchment-400/70 font-body">{selectedOccupation.pulpAbility}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-void-600 px-8 py-4 bg-void-950/50">
                    <div className="flex justify-between items-center text-xs text-parchment-400/30 font-body">
                        <span>Trail of Cthulhu © Pelgrane Press · Sistema GUMSHOE</span>
                        <span className="ornament">✦ ✦ ✦</span>
                        <span>Generado con Trail Character Generator</span>
                    </div>
                </div>
            </div>

            <div className="no-print mt-8 text-center">
                <p className="text-parchment-400/40 text-xs font-body">
                    Usa Ctrl+P / Cmd+P o el botón de imprimir para guardar como PDF
                </p>
            </div>
        </div>
    )
}
