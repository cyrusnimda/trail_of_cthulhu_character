import { useTranslation } from 'react-i18next'
import { OCCUPATIONS } from '../data/occupations'
import { INVESTIGATIVE_SKILLS, ALL_INVESTIGATIVE_SKILLS } from '../data/skills'
import { GENERAL_SKILLS } from '../data/generalSkills'
import { PILLAR_CATEGORIES } from '../data/drives'

export default function SummaryStep({
    character, investigativePool, generalPool, investigativeSpent, generalSpent, goNext, goPrev
}) {
    const { t } = useTranslation()
    const {
        name, playerName, age, occupation, creditRating, mode, players,
        drive, pillars, investigativeSkills, generalSkills
    } = character

    const selectedOccupation = OCCUPATIONS.find(o => o.id === occupation)

    const allocatedInvestigative = ALL_INVESTIGATIVE_SKILLS.filter(s => (investigativeSkills[s.id] || 0) > 0)
    const allocatedGeneral = GENERAL_SKILLS.filter(s => (generalSkills[s.id] || 0) > 0)

    const health = generalSkills['health'] || 0
    const stability = generalSkills['stability'] || 0
    const sanity = stability

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="font-display text-3xl text-gold-400 glow-gold mb-2">{t('summary_step.title')}</h2>
                <p className="text-parchment-400/70 text-sm font-body">{t('summary_step.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column: personal info */}
                <div className="space-y-4">
                    <div className="card">
                        <h3 className="section-title">{t('summary_step.sections.identity')}</h3>
                        <div className="space-y-2 text-sm font-body">
                            <div className="flex justify-between">
                                <span className="text-parchment-400/60">{t('summary_step.fields.name')}</span>
                                <span className="text-parchment-200 font-medium">{name || '—'}</span>
                            </div>
                            {playerName && (
                                <div className="flex justify-between">
                                    <span className="text-parchment-400/60">{t('summary_step.fields.player')}</span>
                                    <span className="text-parchment-200">{playerName}</span>
                                </div>
                            )}
                            {age && (
                                <div className="flex justify-between">
                                    <span className="text-parchment-400/60">{t('summary_step.fields.age')}</span>
                                    <span className="text-parchment-200">{age}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-parchment-400/60">{t('summary_step.fields.occupation')}</span>
                                <span className="text-parchment-200">{selectedOccupation ? t(`occupations.${selectedOccupation.id}.name`) : '—'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-parchment-400/60">{t('summary_step.fields.credit')}</span>
                                <span className="text-parchment-200">{creditRating} — {t(`rules.credit_labels.${creditRating}`)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-parchment-400/60">{t('summary_step.fields.mode')}</span>
                                <span className={mode === 'pulp' ? 'text-gold-400' : 'text-mythos-400'}>
                                    {mode === 'pulp' ? t('header.mode.pulp') : t('header.mode.purist')}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-parchment-400/60">{t('summary_step.fields.players')}</span>
                                <span className="text-parchment-200">{players}</span>
                            </div>
                        </div>
                    </div>

                    {/* Derived stats */}
                    <div className="card">
                        <h3 className="section-title">{t('summary_step.sections.derived')}</h3>
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-void-700 rounded-lg py-3">
                                <div className="font-display text-2xl font-bold text-blood-400">{health}</div>
                                <div className="text-xs text-parchment-400/50 font-body">{t('skills.general.health.name')}</div>
                            </div>
                            <div className="bg-void-700 rounded-lg py-3">
                                <div className="font-display text-2xl font-bold text-mythos-400">{stability}</div>
                                <div className="text-xs text-parchment-400/50 font-body">{t('skills.general.stability.name')}</div>
                            </div>
                            <div className="bg-void-700 rounded-lg py-3">
                                <div className="font-display text-2xl font-bold text-gold-400">{sanity}</div>
                                <div className="text-xs text-parchment-400/50 font-body">{t('skills.general.sanity.name')}</div>
                            </div>
                        </div>
                    </div>

                    {/* Drive / Pillars */}
                    <div className="card">
                        <h3 className="section-title">{mode === 'pulp' ? t('personal.drive.title') : t('personal.pillars.title')}</h3>
                        {mode === 'pulp' ? (
                            <div>
                                <div className="text-parchment-200 font-body font-medium text-sm">{drive ? t(`drives.${drive}.name`) : '—'}</div>
                                {drive && (
                                    <p className="text-parchment-400/60 text-xs font-body mt-1">{t(`drives.${drive}.description`)}</p>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-2 text-sm font-body">
                                {PILLAR_CATEGORIES.map(cat => (
                                    <div key={cat.id}>
                                        <span className="text-parchment-400/50 text-xs">{cat.icon} {t(`pillars_cat.${cat.id}.name`)}:</span>
                                        <div className="text-parchment-200">{pillars[cat.id] || '—'}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Points summary */}
                    <div className="card bg-void-700/30">
                        <h3 className="section-title">{t('summary_step.sections.points')}</h3>
                        <div className="space-y-2 text-sm font-body">
                            <div className="flex justify-between items-center">
                                <span className="text-parchment-400/60">{t('summary_step.points.investigative')}</span>
                                <span className={investigativeSpent > investigativePool ? 'text-blood-400' : 'text-gold-400'}>
                                    {Number.isInteger(investigativeSpent) ? investigativeSpent : investigativeSpent.toFixed(1)} / {investigativePool}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-parchment-400/60">{t('summary_step.points.general')}</span>
                                <span className={generalSpent > generalPool ? 'text-blood-400' : 'text-gold-400'}>
                                    {Number.isInteger(generalSpent) ? generalSpent : generalSpent.toFixed(1)} / {generalPool}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle: investigative skills */}
                <div className="card">
                    <h3 className="section-title">{t('investigative_step.title')}</h3>
                    {Object.entries(INVESTIGATIVE_SKILLS).map(([cat, data]) => {
                        const catSkills = data.skills.filter(s => (investigativeSkills[s.id] || 0) > 0)
                        if (catSkills.length === 0) return null
                        return (
                            <div key={cat} className="mb-4">
                                <div className="text-xs text-parchment-400/40 uppercase tracking-wide font-body mb-1">{t(`skills.categories.${cat}`)}</div>
                                <div className="space-y-1">
                                    {catSkills.map(skill => (
                                        <div key={skill.id} className="flex justify-between text-sm font-body py-0.5">
                                            <span className="text-parchment-300">{t(`skills.investigative.${skill.id}.name`)}</span>
                                            <span className="text-gold-400 font-display font-bold">{investigativeSkills[skill.id]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                    {allocatedInvestigative.length === 0 && (
                        <p className="text-parchment-400/30 text-sm font-body italic">{t('summary_step.no_skills')}</p>
                    )}
                </div>

                {/* Right: general skills */}
                <div className="card">
                    <h3 className="section-title">{t('general_step.title')}</h3>
                    <div className="space-y-1">
                        {allocatedGeneral.map(skill => (
                            <div key={skill.id} className="flex justify-between text-sm font-body py-0.5">
                                <span className={`${skill.isPool ? 'text-gold-300 font-medium' : 'text-parchment-300'}`}>
                                    {t(`skills.general.${skill.id}.name`)}
                                </span>
                                <span className={`font-display font-bold ${skill.isPool ? 'text-gold-400' : 'text-parchment-200'}`}>
                                    {generalSkills[skill.id]}
                                </span>
                            </div>
                        ))}
                        {allocatedGeneral.length === 0 && (
                            <p className="text-parchment-400/30 text-sm font-body italic">{t('summary_step.no_skills')}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-6">
                <button onClick={goPrev} className="btn-secondary">{t('personal.back')}</button>
                <button onClick={goNext} className="btn-primary">
                    {t('summary_step.view_sheet')}
                </button>
            </div>
        </div>
    )
}
