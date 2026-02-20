import { GENERAL_SKILLS } from '../data/generalSkills'
import { OCCUPATIONS } from '../data/occupations'

function GeneralSkillRow({ skill, value, isOccupational, remaining, onChange }) {
    const canIncrease = remaining > 0
    const canDecrease = value > (skill.min || 0)

    return (
        <div className={isOccupational ? 'skill-row-occupational' : 'skill-row'}>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-body text-parchment-200">{skill.name}</span>
                    {isOccupational && <span className="badge-gold text-xs shrink-0">Ocup.</span>}
                    {skill.isPool && <span className="badge-mythos text-xs shrink-0">Pool</span>}
                </div>
                <p className="text-xs text-parchment-400/40 font-body truncate">{skill.description}</p>
            </div>
            <div className="flex items-center gap-2 ml-3 shrink-0">
                <button
                    onClick={() => canDecrease && onChange(value - 1)}
                    disabled={!canDecrease}
                    className="counter-btn-minus"
                >−</button>
                <span className={`w-6 text-center font-display text-sm font-bold ${value > 0 ? 'text-gold-400' : 'text-parchment-400/30'}`}>
                    {value}
                </span>
                <button
                    onClick={() => canIncrease && onChange(value + 1)}
                    disabled={!canIncrease}
                    className="counter-btn-plus"
                >+</button>
            </div>
        </div>
    )
}

export default function GeneralSkillsStep({
    character, updateCharacter, generalPool, generalRemaining, goNext, goPrev
}) {
    const { generalSkills, occupation } = character

    const selectedOccupation = OCCUPATIONS.find(o => o.id === occupation)
    const occupationalSkills = selectedOccupation?.generalSkills || []

    const handleSkillChange = (skillId, value) => {
        updateCharacter({
            generalSkills: { ...generalSkills, [skillId]: value }
        })
    }

    const poolPercentage = Math.max(0, (generalRemaining / generalPool) * 100)
    const isOverspent = generalRemaining < 0

    // Group skills: pool skills first, then occupational, then rest
    const poolSkills = GENERAL_SKILLS.filter(s => s.isPool)
    const combatSkills = GENERAL_SKILLS.filter(s => ['firearms', 'scuffling', 'weapons', 'athletics', 'fleeing'].includes(s.id))
    const otherSkills = GENERAL_SKILLS.filter(s => !s.isPool && !['firearms', 'scuffling', 'weapons', 'athletics', 'fleeing'].includes(s.id))

    const renderGroup = (title, skills) => (
        <div className="mb-6">
            <h4 className="text-xs text-parchment-400/50 uppercase tracking-widest font-body mb-2 px-3">{title}</h4>
            <div className="space-y-1">
                {skills.map(skill => (
                    <GeneralSkillRow
                        key={skill.id}
                        skill={skill}
                        value={generalSkills[skill.id] || 0}
                        isOccupational={occupationalSkills.includes(skill.id)}
                        remaining={generalRemaining}
                        onChange={(val) => handleSkillChange(skill.id, val)}
                    />
                ))}
            </div>
        </div>
    )

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="font-display text-3xl text-gold-400 glow-gold mb-2">Habilidades Generales</h2>
                <p className="text-parchment-400/70 text-sm font-body">
                    Distribuye tus puntos de habilidades generales. Salud y Estabilidad son tus pools de vida y cordura.
                </p>
            </div>

            {/* Pool display */}
            <div className={`card mb-6 ${isOverspent ? 'border-blood-500/50' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <div className="text-xs text-parchment-400/60 font-body uppercase tracking-wide">Pool General</div>
                        <div className={`font-display text-4xl font-bold ${isOverspent ? 'text-blood-400' : generalRemaining === 0 ? 'text-gold-400' : 'text-parchment-200'}`}>
                            {generalRemaining}
                            <span className="text-lg text-parchment-400/40 font-normal"> / {generalPool}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                        {['health', 'stability', 'sanity'].map(stat => {
                            const val = generalSkills[stat] || 0
                            const labels = { health: 'Salud', stability: 'Estabilidad', sanity: 'Cordura' }
                            const colors = { health: 'text-blood-400', stability: 'text-mythos-400', sanity: 'text-gold-400' }
                            return (
                                <div key={stat} className="bg-void-700 rounded-lg px-3 py-2">
                                    <div className={`font-display text-xl font-bold ${colors[stat]}`}>{stat === 'sanity' ? val : val}</div>
                                    <div className="text-xs text-parchment-400/50 font-body">{labels[stat]}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="h-2 bg-void-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-300 ${isOverspent ? 'bg-blood-500' : 'bg-gold-500'}`}
                        style={{ width: `${100 - poolPercentage}%` }}
                    />
                </div>
                {isOverspent && (
                    <p className="text-blood-400 text-xs font-body mt-2">⚠ Has excedido el pool de puntos generales</p>
                )}
            </div>

            <div className="card">
                {renderGroup('Pools de Vida y Cordura', poolSkills)}
                {renderGroup('Combate y Acción', combatSkills)}
                {renderGroup('Otras Habilidades', otherSkills)}
            </div>

            <div className="flex justify-between mt-6">
                <button onClick={goPrev} className="btn-secondary">← Atrás</button>
                <button
                    onClick={goNext}
                    disabled={isOverspent}
                    className="btn-primary"
                >
                    Siguiente: Resumen →
                </button>
            </div>
        </div>
    )
}
