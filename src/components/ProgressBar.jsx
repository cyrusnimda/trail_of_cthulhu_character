export default function ProgressBar({ steps, currentStep, onStepClick }) {
    return (
        <div className="bg-void-900/60 border-b border-void-700 px-4 py-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between relative">
                    {/* Connecting line */}
                    <div className="absolute top-4 left-0 right-0 h-px bg-void-600 z-0" />
                    <div
                        className="absolute top-4 left-0 h-px bg-gold-500/50 z-0 transition-all duration-500"
                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((s, i) => {
                        const isDone = i < currentStep
                        const isActive = i === currentStep
                        const isClickable = i <= currentStep

                        return (
                            <button
                                key={s.id}
                                onClick={() => isClickable && onStepClick(i)}
                                disabled={!isClickable}
                                className={`relative z-10 flex flex-col items-center gap-1.5 group
                  ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            >
                                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold
                  transition-all duration-300
                  ${isActive ? 'bg-gold-500 text-void-950 shadow-lg shadow-gold-500/40 scale-110' : ''}
                  ${isDone ? 'bg-gold-600/40 text-gold-400 border border-gold-500/50 group-hover:bg-gold-500/30' : ''}
                  ${!isActive && !isDone ? 'bg-void-700 text-parchment-400/40 border border-void-500' : ''}
                `}>
                                    {isDone ? '✓' : i + 1}
                                </div>
                                <span className={`text-xs font-body whitespace-pre-line text-center leading-tight hidden sm:block
                  ${isActive ? 'text-gold-400 font-medium' : ''}
                  ${isDone ? 'text-parchment-400/70' : ''}
                  ${!isActive && !isDone ? 'text-parchment-400/30' : ''}
                `}>
                                    {s.label}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
