import { useState, useCallback } from 'react'
import SetupStep from './components/SetupStep'
import PersonalInfoStep from './components/PersonalInfoStep'
import InvestigativeSkillsStep from './components/InvestigativeSkillsStep'
import GeneralSkillsStep from './components/GeneralSkillsStep'
import SummaryStep from './components/SummaryStep'
import CharacterSheetStep from './components/CharacterSheetStep'
import ProgressBar from './components/ProgressBar'
import { getInvestigativePool, getGeneralPool } from './data/rules'
import { ALL_INVESTIGATIVE_SKILLS } from './data/skills'
import { GENERAL_SKILLS } from './data/generalSkills'
import { OCCUPATIONS } from './data/occupations'

const STEPS = [
    { id: 'setup', label: 'Configuración', icon: '⚙️' },
    { id: 'personal', label: 'Personaje', icon: '👤' },
    { id: 'investigative', label: 'Habilidades\nInvestigativas', icon: '🔍' },
    { id: 'general', label: 'Habilidades\nGenerales', icon: '⚔️' },
    { id: 'summary', label: 'Resumen', icon: '📋' },
    { id: 'sheet', label: 'Hoja', icon: '📜' },
]

const createInitialInvestigativeSkills = () => {
    const skills = {}
    ALL_INVESTIGATIVE_SKILLS.forEach(s => { skills[s.id] = 0 })
    return skills
}

const createInitialGeneralSkills = () => {
    const skills = {}
    GENERAL_SKILLS.forEach(s => { skills[s.id] = s.min || 0 })
    return skills
}

const initialCharacter = {
    // Setup
    players: 4,
    mode: 'purist',
    // Personal
    name: '',
    playerName: '',
    age: '',
    occupation: '',
    creditRating: 3,
    drive: '',
    pillars: { person: '', place: '', belief: '' },
    // Skills
    investigativeSkills: createInitialInvestigativeSkills(),
    generalSkills: createInitialGeneralSkills(),
}

export default function App() {
    const [step, setStep] = useState(0)
    const [character, setCharacter] = useState(initialCharacter)

    const updateCharacter = useCallback((updates) => {
        setCharacter(prev => ({ ...prev, ...updates }))
    }, [])

    const investigativePool = getInvestigativePool(character.players)
    const generalPool = getGeneralPool(character.mode)

    const investigativeSpent = Object.entries(character.investigativeSkills).reduce((acc, [id, value]) => {
        return acc + (value * 1.0) // Investigative is 1:1
    }, 0)

    const selectedOccupationObject = OCCUPATIONS.find(o => o.id === character.occupation)
    const occupationalGeneralSkills = selectedOccupationObject?.generalSkills || []

    const generalSpent = Object.entries(character.generalSkills).reduce((acc, [id, value]) => {
        const isOccupational = occupationalGeneralSkills.includes(id)
        const cost = isOccupational ? 0.5 : 1.0
        return acc + (value * cost)
    }, 0)

    const investigativeRemaining = investigativePool - investigativeSpent
    const generalRemaining = generalPool - generalSpent

    const goNext = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
    const goPrev = () => setStep(s => Math.max(s - 1, 0))
    const goToStep = (i) => setStep(i)

    const stepProps = {
        character,
        updateCharacter,
        investigativePool,
        generalPool,
        investigativeSpent,
        generalSpent,
        investigativeRemaining,
        generalRemaining,
        goNext,
        goPrev,
    }

    const renderStep = () => {
        switch (step) {
            case 0: return <SetupStep {...stepProps} />
            case 1: return <PersonalInfoStep {...stepProps} />
            case 2: return <InvestigativeSkillsStep {...stepProps} />
            case 3: return <GeneralSkillsStep {...stepProps} />
            case 4: return <SummaryStep {...stepProps} />
            case 5: return <CharacterSheetStep {...stepProps} />
            default: return null
        }
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="border-b border-void-700 bg-void-900/80 backdrop-blur-sm sticky top-0 z-50 no-print">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="font-display text-gold-400 text-lg font-bold leading-none glow-gold">
                                Trail of Cthulhu
                            </h1>
                            <p className="text-parchment-400/60 text-xs font-body mt-0.5">Generador de Personajes</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-parchment-400/50 font-body">
                        <span className={`px-2 py-1 rounded-full border text-xs font-medium ${character.mode === 'pulp'
                            ? 'bg-gold-500/10 border-gold-500/30 text-gold-400'
                            : 'bg-mythos-600/20 border-mythos-500/30 text-mythos-400'
                            }`}>
                            {character.mode === 'pulp' ? '⚡ Pulp' : '🌑 Purista'}
                        </span>
                        <span className="text-parchment-400/40">·</span>
                        <span>{character.players} jugador{character.players !== 1 ? 'es' : ''}</span>
                    </div>
                </div>
            </header>

            {/* Progress */}
            <div className="no-print">
                <ProgressBar steps={STEPS} currentStep={step} onStepClick={goToStep} />
            </div>

            {/* Main content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="animate-fade-in">
                    {renderStep()}
                </div>
            </main>

            {/* Footer */}
            <footer className="no-print border-t border-void-700 mt-16 py-6 text-center">
                <p className="text-parchment-400/30 text-xs font-body">
                    Trail of Cthulhu es propiedad de Pelgrane Press · Sistema GUMSHOE
                </p>
            </footer>
        </div>
    )
}
