import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import InvestigativeSkillsStep from './InvestigativeSkillsStep'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'

// Mock context/props
const mockCharacter = {
    investigativeSkills: {},
    occupation: 'antiquarian' // Investigative: archaeology, art_history, history, languages, library_use, occult, theology
}

const mockUpdateCharacter = vi.fn()

describe('InvestigativeSkillsStep', () => {
    const renderComponent = (props = {}) => {
        return render(
            <I18nextProvider i18n={i18n}>
                <InvestigativeSkillsStep
                    character={mockCharacter}
                    updateCharacter={mockUpdateCharacter}
                    investigativePool={16}
                    investigativeRemaining={16}
                    goNext={vi.fn()}
                    goPrev={vi.fn()}
                    {...props}
                />
            </I18nextProvider>
        )
    }

    it('renders the title and pool', () => {
        renderComponent()
        expect(screen.getByText(/Habilidades de Investigación/i)).toBeInTheDocument()
        expect(screen.getByText(/16/i)).toBeInTheDocument()
    })

    it('displays occupational skills with a badge', () => {
        renderComponent()
        // Archaeology is occupational for antiquarian
        const archaeology = screen.getByText(/Arqueología/i)
        expect(archaeology).toBeInTheDocument()

        // Find the badge next to it - usually "OCUPACIONAL" in Spanish
        const badges = screen.getAllByText(/OCUP./i)
        expect(badges.length).toBeGreaterThan(0)
    })

    it('calls updateCharacter when a skill is increased', async () => {
        renderComponent()

        // Find plus button for any skill (e.g., first one in Academic)
        const plusButtons = screen.getAllByText('+')
        fireEvent.click(plusButtons[0])

        expect(mockUpdateCharacter).toHaveBeenCalled()
    })
})
