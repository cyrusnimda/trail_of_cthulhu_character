export default function ProgressBar({ steps, currentStep, onStepClick }) {
    // Every step is an equal-width column, so the circle centers sit at the middle of
    // each column. The connector is drawn as one segment per gap between consecutive
    // circles, stopping short of both, so it never runs behind a (translucent) circle.
    const stepPct = 100 / steps.length
    const gap = 20 // px: half the circle (w-8, scaled to 110% when active) plus a hair

    return (
        <div className="bg-void-900/60 border-b border-void-700 px-4 py-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-start relative">
                    {/* Connecting line, one segment between each pair of circles */}
                    {steps.slice(0, -1).map((s, i) => (
                        <div
                            key={`line-${s.id}`}
                            className={`absolute top-4 h-px z-0 transition-colors duration-500
                  ${i < currentStep ? 'bg-gold-500/50' : 'bg-void-600'}`}
                            style={{
                                left: `calc(${(i + 0.5) * stepPct}% + ${gap}px)`,
                                width: `calc(${stepPct}% - ${2 * gap}px)`,
                            }}
                        />
                    ))}

                    {steps.map((s, i) => {
                        const isDone = i < currentStep
                        const isActive = i === currentStep
                        const isClickable = i <= currentStep

                        return (
                            <button
                                key={s.id}
                                onClick={() => isClickable && onStepClick(i)}
                                disabled={!isClickable}
                                className={`relative z-10 flex-1 flex flex-col items-center gap-1.5 group
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
