import { useTranslation, Trans } from 'react-i18next'
import { getInvestigativePool, getGeneralPool } from '../data/rules'

const PLAYER_OPTIONS = [1, 2, 3, 4, 5, 6]

export default function SetupStep({ character, updateCharacter, goNext }) {
    const { t } = useTranslation()
    const { players, mode } = character

    const invPool = getInvestigativePool(players)
    const genPool = getGeneralPool(mode)

    return (
        <div className="max-w-2xl mx-auto">
            {/* Title */}
            <div className="text-center mb-10">
                <h2 className="font-display text-3xl text-gold-400 glow-gold mb-2">
                    {t('setup.title')}
                </h2>
                <p className="text-parchment-400/70 font-body text-sm">
                    {t('setup.subtitle')}
                </p>
            </div>

            <div className="space-y-6">
                {/* Player count */}
                <div className="card">
                    <h3 className="section-title">{t('setup.players.title')}</h3>
                    <p className="text-parchment-400/60 text-sm mb-4 font-body">
                        {t('setup.players.description')}
                    </p>
                    <div className="grid grid-cols-6 gap-2">
                        {PLAYER_OPTIONS.map(n => (
                            <button
                                key={n}
                                onClick={() => updateCharacter({ players: n })}
                                className={`
                  py-3 rounded-lg font-display text-lg font-bold transition-all duration-200
                  ${players === n
                                        ? 'bg-gold-500 text-void-950 shadow-lg shadow-gold-500/30 scale-105'
                                        : 'bg-void-700 text-parchment-300 hover:bg-void-600 border border-void-500 hover:border-gold-600/50'
                                    }
                `}
                            >
                                {n}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-void-700/50 rounded-lg border border-void-500">
                        <div className="flex justify-between text-sm font-body">
                            <span className="text-parchment-400/70">{t('setup.players.pool')}</span>
                            <span className="text-gold-400 font-semibold">{t('setup.players.points', { count: invPool })}</span>
                        </div>
                    </div>
                </div>

                {/* Mode selection */}
                <div className="card">
                    <h3 className="section-title">{t('setup.mode.title')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Purist */}
                        <button
                            onClick={() => updateCharacter({ mode: 'purist' })}
                            className={`
                p-5 rounded-xl border-2 text-left transition-all duration-200
                ${mode === 'purist'
                                    ? 'border-mythos-500 bg-mythos-600/20 shadow-lg shadow-mythos-600/20'
                                    : 'border-void-500 bg-void-700/50 hover:border-mythos-600/50 hover:bg-mythos-600/10'
                                }
              `}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">🌑</span>
                                <div>
                                    <div className="font-display text-parchment-200 font-semibold">{t('setup.mode.purist.name')}</div>
                                    {mode === 'purist' && (
                                        <div className="badge-mythos mt-0.5">{t('setup.mode.purist.selected')}</div>
                                    )}
                                </div>
                            </div>
                            <div className="text-parchment-400/70 text-xs font-body leading-relaxed">
                                <Trans i18nKey="setup.mode.purist.description">
                                    Investigadores ordinarios ante horrores cósmicos. Más letal y aterrador.
                                    Requiere <strong className="text-parchment-300">3 Pilares de Cordura</strong>.
                                    El Mythos destruye mentes.
                                </Trans>
                            </div>
                            <div className="mt-3 pt-3 border-t border-void-500 text-xs text-parchment-400/50 font-body">
                                {t('setup.mode.purist.pool', { count: getGeneralPool('purist') })}
                            </div>
                        </button>

                        {/* Pulp */}
                        <button
                            onClick={() => updateCharacter({ mode: 'pulp' })}
                            className={`
                p-5 rounded-xl border-2 text-left transition-all duration-200
                ${mode === 'pulp'
                                    ? 'border-gold-500 bg-gold-500/10 shadow-lg shadow-gold-500/20'
                                    : 'border-void-500 bg-void-700/50 hover:border-gold-600/50 hover:bg-gold-500/5'
                                }
              `}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">⚡</span>
                                <div>
                                    <div className="font-display text-parchment-200 font-semibold">{t('setup.mode.pulp.name')}</div>
                                    {mode === 'pulp' && (
                                        <div className="badge-gold mt-0.5">{t('setup.mode.pulp.selected')}</div>
                                    )}
                                </div>
                            </div>
                            <div className="text-parchment-400/70 text-xs font-body leading-relaxed">
                                <Trans i18nKey="setup.mode.pulp.description">
                                    Héroes de acción al estilo años 30. Más resistentes y capaces.
                                    <strong className="text-parchment-300"> Impulsos</strong> en lugar de Pilares.
                                    Más puntos de habilidades generales.
                                </Trans>
                            </div>
                            <div className="mt-3 pt-3 border-t border-void-500 text-xs text-parchment-400/50 font-body">
                                {t('setup.mode.pulp.pool', { count: getGeneralPool('pulp') })}
                                <span className="text-gold-600 ml-1">{t('setup.mode.pulp.bonus')}</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Summary */}
                <div className="card bg-void-700/30">
                    <h3 className="section-title">{t('setup.summary.title')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-void-800 rounded-lg border border-void-600">
                            <div className="pool-display text-gold-400">{invPool}</div>
                            <div className="text-xs text-parchment-400/60 font-body mt-1">{t('setup.summary.investigative')}</div>
                            <div className="text-xs text-parchment-400/40 font-body">
                                {t(`setup.summary.players_${players === 1 ? 'one' : 'other'}`, { count: players })}
                            </div>
                        </div>
                        <div className="text-center p-4 bg-void-800 rounded-lg border border-void-600">
                            <div className={`pool-display ${mode === 'pulp' ? 'text-gold-400' : 'text-parchment-300'}`}>{genPool}</div>
                            <div className="text-xs text-parchment-400/60 font-body mt-1">{t('setup.summary.general')}</div>
                            <div className="text-xs text-parchment-400/40 font-body">
                                {t(`setup.summary.mode_${mode}`)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button onClick={goNext} className="btn-primary">
                        {t('setup.next')}
                    </button>
                </div>
            </div>
        </div>
    )
}
