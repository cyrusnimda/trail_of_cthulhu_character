import { useState } from 'react'
import { INVESTIGATIVE_SKILLS, ALL_INVESTIGATIVE_SKILLS } from '../data/skills'
import { OCCUPATIONS } from '../data/occupations'
import { MAX_NON_OCCUPATIONAL_INVESTIGATIVE } from '../data/rules'

function SkillCounter({ skill, value, isOccupational, remaining, onChange }) {
    const max = isOccupational ? 99 : MAX_NON_OCCUPATIONAL_INVESTIGATIVE
    const canIncrease = remaining > 0 && value < max
    const canDecrease = value > 0

    return (
        <div className={isOccupational ? 'skill-row-occupational' : 'skill-row'}>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-body text-parchment-200 truncate">{skill.name}</span>
                    {isOccupational && (
                        <span className="badge-gold text-xs shrink-0">Ocup.</span>
                    )}
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

export default function InvestigativeSkillsStep({
    character, updateCharacter, investigativePool, investigativeRemaining, goNext, goPrev
}) {
    const [activeCategory, setActiveCategory] = useState('academic')
    const { investigativeSkills, occupation } = character

    const selectedOccupation = OCCUPATIONS.find(o => o.id === occupation)
    const occupationalSkills = selectedOccupation?.investigativeSkills || []

    const handleSkillChange = (skillId, value) => {
        updateCharacter({
            investigativeSkills: { ...investigativeSkills, [skillId]: value }
        })
    }

    const poolPercentage = Math.max(0, (investigativeRemaining / investigativePool) * 100)
    const isOverspent = investigativeRemaining < 0

    const categoryData = INVESTIGATIVE_SKILLS[activeCategory]

    const categoryTotals = Object.entries(INVESTIGATIVE_SKILLS).reduce((acc, [cat, data]) => {
        acc[cat] = data.skills.reduce((sum, s) => sum + (investigativeSkills[s.id] || 0), 0)
        return acc
    }, {})

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="font-display text-3xl text-gold-400 glow-gold mb-2">Habilidades Investigativas</h2>
                <p className="text-parchment-400/70 text-sm font-body">
                    Distribuye tus puntos. Las habilidades ocupacionales no tienen límite máximo.
                    Las no ocupacionales tienen un máximo de {MAX_NON_OCCUPATIONAL_INVESTIGATIVE} puntos.
                </p>
            </div>

            {/* Pool display */}
            <div className={`card mb-6 ${isOverspent ? 'border-blood-500/50' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <div className="text-xs text-parchment-400/60 font-body uppercase tracking-wide">Pool Investigativo</div>
                        <div className={`font-display text-4xl font-bold ${isOverspent ? 'text-blood-400' : investigativeRemaining === 0 ? 'text-gold-400' : 'text-parchment-200'}`}>
                            {investigativeRemaining}
                            <span className="text-lg text-parchment-400/40 font-normal"> / {investigativePool}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        {isOverspent && (
                            <div className="badge-blood">¡Excedido!</div>
                        )}
                        {investigativeRemaining === 0 && !isOverspent && (
                            <div className="badge-gold">✓ Completo</div>
                        )}
                        {investigativeRemaining > 0 && (
                            <div className="text-xs text-parchment-400/50 font-body">Puntos restantes</div>
                        )}
                    </div>
                </div>
                <div className="h-2 bg-void-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-300 ${isOverspent ? 'bg-blood-500' : 'bg-gold-500'}`}
                        style={{ width: `${100 - poolPercentage}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Category tabs */}
                <div className="lg:col-span-1">
                    <div className="space-y-2">
                        {Object.entries(INVESTIGATIVE_SKILLS).map(([cat, data]) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`
                  w-full text-left px-4 py-3 rounded-lg transition-all duration-150 border
                  ${activeCategory === cat
                                        ? 'bg-gold-500/15 border-gold-500/40 text-gold-300'
                                        : 'bg-void-700/50 border-void-500 text-parchment-400/70 hover:border-gold-600/30 hover:text-parchment-200'
                                    }
                `}
                            >
                                <div className="font-body font-medium text-sm">{data.label}</div>
                                <div className="text-xs text-parchment-400/40 mt-0.5">
                                    {categoryTotals[cat]} pts · {data.skills.length} habilidades
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Occupational skills legend */}
                    <div className="mt-4 p-3 bg-void-700/30 rounded-lg border border-void-600">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-4 bg-gold-500/60 rounded" />
                            <span className="text-xs text-parchment-400/60 font-body">= Habilidad Ocupacional</span>
                        </div>
                        <p className="text-xs text-parchment-400/40 font-body">Sin límite máximo de puntos</p>
                    </div>
                </div>

                {/* Skills list */}
                <div className="lg:col-span-3">
                    <div className="card">
                        <h3 className="section-title">{categoryData.label}</h3>
                        <div className="space-y-1">
                            {categoryData.skills.map(skill => (
                                <SkillCounter
                                    key={skill.id}
                                    skill={skill}
                                    value={investigativeSkills[skill.id] || 0}
                                    isOccupational={occupationalSkills.includes(skill.id)}
                                    remaining={investigativeRemaining}
                                    onChange={(val) => handleSkillChange(skill.id, val)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-6">
                <button onClick={goPrev} className="btn-secondary">← Atrás</button>
                <button
                    onClick={goNext}
                    disabled={isOverspent}
                    className="btn-primary"
                >
                    Siguiente: Habilidades Generales →
                </button>
            </div>
        </div>
    )
}
