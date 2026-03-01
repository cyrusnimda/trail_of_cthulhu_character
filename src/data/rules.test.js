import { describe, it, expect } from 'vitest'
import {
    getInvestigativePool,
    getGeneralPool,
    calculateInvestigativeSpent,
    calculateGeneralSpent
} from './rules'

describe('Game Rules', () => {
    describe('Investigative Pools', () => {
        it('should return 24 points for 2 players', () => {
            expect(getInvestigativePool(2)).toBe(24)
        })

        it('should return 16 points for 4 players', () => {
            expect(getInvestigativePool(4)).toBe(16)
        })

        it('should return 16 points for more than 4 players', () => {
            expect(getInvestigativePool(6)).toBe(16)
        })
    })

    describe('General Pools', () => {
        it('should return 55 points for purist mode', () => {
            expect(getGeneralPool('purist')).toBe(55)
        })

        it('should return 65 points for pulp mode', () => {
            expect(getGeneralPool('pulp')).toBe(65)
        })
    })

    describe('Investigative Skill Costs', () => {
        const occupationalSkills = ['archaeology', 'history']

        it('should cost 1 point for non-occupational skills', () => {
            const skills = { 'anthropology': 2 }
            expect(calculateInvestigativeSpent(skills, occupationalSkills)).toBe(2)
        })

        it('should cost 0.5 points for occupational skills', () => {
            const skills = { 'archaeology': 2 }
            expect(calculateInvestigativeSpent(skills, occupationalSkills)).toBe(1)
        })

        it('should calculate mixed costs correctly', () => {
            const skills = {
                'anthropology': 2, // 2 * 1.0 = 2
                'archaeology': 2   // 2 * 0.5 = 1
            }
            expect(calculateInvestigativeSpent(skills, occupationalSkills)).toBe(3)
        })
    })

    describe('General Skill Costs', () => {
        const occupationalSkills = ['athletics', 'driving']

        it('should cost 1 point for non-occupational skills', () => {
            const skills = { 'health': 2 }
            expect(calculateGeneralSpent(skills, occupationalSkills)).toBe(2)
        })

        it('should cost 0.5 points for occupational skills', () => {
            const skills = { 'athletics': 2 }
            expect(calculateGeneralSpent(skills, occupationalSkills)).toBe(1)
        })

        it('should calculate mixed costs correctly', () => {
            const skills = {
                'health': 2,    // 2 * 1.0 = 2
                'athletics': 2  // 2 * 0.5 = 1
            }
            expect(calculateGeneralSpent(skills, occupationalSkills)).toBe(3)
        })
    })
})
