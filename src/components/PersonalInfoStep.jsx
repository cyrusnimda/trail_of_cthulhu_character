import { OCCUPATIONS } from '../data/occupations'
import { PULP_DRIVES, PILLAR_CATEGORIES } from '../data/drives'
import { CREDIT_RATING } from '../data/rules'

export default function PersonalInfoStep({ character, updateCharacter, goNext, goPrev }) {
    const { name, playerName, age, occupation, creditRating, drive, pillars, mode } = character

    const selectedOccupation = OCCUPATIONS.find(o => o.id === occupation)

    const canProceed = name.trim() && occupation &&
        (mode === 'pulp' ? drive : (pillars.person && pillars.place && pillars.belief))

    const handlePillarChange = (category, value) => {
        updateCharacter({ pillars: { ...pillars, [category]: value } })
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="font-display text-3xl text-gold-400 glow-gold mb-2">Información Personal</h2>
                <p className="text-parchment-400/70 text-sm font-body">Define quién es tu investigador</p>
            </div>

            <div className="space-y-6">
                {/* Basic info */}
                <div className="card">
                    <h3 className="section-title">Datos Básicos</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-parchment-400/70 font-body mb-1.5">
                                Nombre del Personaje <span className="text-blood-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => updateCharacter({ name: e.target.value })}
                                placeholder="Ej: Dr. Henry Armitage"
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-parchment-400/70 font-body mb-1.5">
                                Nombre del Jugador
                            </label>
                            <input
                                type="text"
                                value={playerName}
                                onChange={e => updateCharacter({ playerName: e.target.value })}
                                placeholder="Tu nombre"
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-parchment-400/70 font-body mb-1.5">Edad</label>
                            <input
                                type="number"
                                value={age}
                                onChange={e => updateCharacter({ age: e.target.value })}
                                placeholder="Ej: 42"
                                min="18"
                                max="90"
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-parchment-400/70 font-body mb-1.5">
                                Nivel de Crédito ({CREDIT_RATING.labels[creditRating]})
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min={selectedOccupation ? selectedOccupation.creditRating.min : 0}
                                    max={selectedOccupation ? selectedOccupation.creditRating.max : 8}
                                    value={creditRating}
                                    onChange={e => updateCharacter({ creditRating: parseInt(e.target.value) })}
                                    className="flex-1 accent-gold-500"
                                />
                                <span className="font-display text-gold-400 text-xl w-6 text-center">{creditRating}</span>
                            </div>
                            {selectedOccupation && (
                                <p className="text-xs text-parchment-400/50 font-body mt-1">
                                    Rango para {selectedOccupation.name}: {selectedOccupation.creditRating.min}–{selectedOccupation.creditRating.max}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Occupation */}
                <div className="card">
                    <h3 className="section-title">Ocupación <span className="text-blood-400">*</span></h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4">
                        {OCCUPATIONS.map(occ => (
                            <button
                                key={occ.id}
                                onClick={() => {
                                    updateCharacter({
                                        occupation: occ.id,
                                        creditRating: Math.min(Math.max(creditRating, occ.creditRating.min), occ.creditRating.max)
                                    })
                                }}
                                className={`
                  px-3 py-2 rounded-lg text-xs font-body text-left transition-all duration-150
                  ${occupation === occ.id
                                        ? 'bg-gold-500/20 border border-gold-500/60 text-gold-300'
                                        : 'bg-void-700 border border-void-500 text-parchment-400/80 hover:border-gold-600/40 hover:text-parchment-200'
                                    }
                `}
                            >
                                {occ.name}
                            </button>
                        ))}
                    </div>

                    {selectedOccupation && (
                        <div className="p-4 bg-void-700/50 rounded-lg border border-gold-500/20 animate-fade-in">
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                    <h4 className="font-display text-gold-400 font-semibold">{selectedOccupation.name}</h4>
                                    <p className="text-parchment-400/70 text-xs font-body mt-1">{selectedOccupation.description}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-body">
                                <div>
                                    <span className="text-parchment-400/50 uppercase tracking-wide text-xs">Habilidades Investigativas:</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {selectedOccupation.investigativeSkills.map(s => (
                                            <span key={s} className="badge-gold">{s.replace(/_/g, ' ')}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-parchment-400/50 uppercase tracking-wide text-xs">Habilidades Generales:</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {selectedOccupation.generalSkills.map(s => (
                                            <span key={s} className="badge bg-void-600 text-parchment-400/80 border border-void-400">{s.replace(/_/g, ' ')}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {mode === 'pulp' && (
                                <div className="mt-3 pt-3 border-t border-void-500">
                                    <span className="text-gold-500/70 text-xs uppercase tracking-wide">⚡ Habilidad Pulp:</span>
                                    <p className="text-parchment-400/70 text-xs mt-1">{selectedOccupation.pulpAbility}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Drive or Pillars */}
                {mode === 'pulp' ? (
                    <div className="card">
                        <h3 className="section-title">⚡ Impulso (Drive) <span className="text-blood-400">*</span></h3>
                        <p className="text-parchment-400/60 text-xs font-body mb-4">
                            ¿Qué motiva a tu investigador a enfrentarse a los horrores del Mythos?
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {PULP_DRIVES.map(d => (
                                <button
                                    key={d.id}
                                    onClick={() => updateCharacter({ drive: d.id })}
                                    className={`
                    p-3 rounded-lg text-left transition-all duration-150 border
                    ${drive === d.id
                                            ? 'bg-gold-500/15 border-gold-500/50 text-parchment-200'
                                            : 'bg-void-700/50 border-void-500 text-parchment-400/80 hover:border-gold-600/30'
                                        }
                  `}
                                >
                                    <div className="font-body font-medium text-sm">{d.name}</div>
                                    <div className="text-xs text-parchment-400/50 mt-0.5 leading-relaxed">{d.description}</div>
                                    {drive === d.id && (
                                        <div className="text-xs text-gold-400/80 mt-1.5 italic">{d.stabilityBonus}</div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="card">
                        <h3 className="section-title">🌑 Pilares de Cordura <span className="text-blood-400">*</span></h3>
                        <p className="text-parchment-400/60 text-xs font-body mb-4">
                            Define las tres anclas que mantienen la cordura de tu investigador. Deben ser una persona, un lugar y una creencia.
                        </p>
                        <div className="space-y-4">
                            {PILLAR_CATEGORIES.map(cat => (
                                <div key={cat.id}>
                                    <label className="block text-sm font-body font-medium text-parchment-300 mb-1">
                                        {cat.icon} {cat.name}
                                    </label>
                                    <p className="text-xs text-parchment-400/50 font-body mb-2">{cat.description}</p>
                                    <input
                                        type="text"
                                        value={pillars[cat.id]}
                                        onChange={e => handlePillarChange(cat.id, e.target.value)}
                                        placeholder={`Ej: ${cat.examples[0]}`}
                                        className="input-field"
                                    />
                                    <p className="text-xs text-parchment-400/30 font-body mt-1">
                                        Ejemplos: {cat.examples.slice(0, 3).join(', ')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-between">
                    <button onClick={goPrev} className="btn-secondary">← Atrás</button>
                    <button
                        onClick={goNext}
                        disabled={!canProceed}
                        className="btn-primary"
                    >
                        Siguiente: Habilidades Investigativas →
                    </button>
                </div>
            </div>
        </div>
    )
}
