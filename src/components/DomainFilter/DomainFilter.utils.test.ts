import {
	getClassificationsFromDomains,
	getCountriesFromDomains,
	getSubClassificationsFromDomains,
} from './DomainFilter.utils'

const MOCK_DOMAINS = [
	'US_OK-WOK',
	'FR_NK-WOL',
	'FR_OK-NPP',
	'EN_NK-NRP',
	'EN_BL-WOL',
]

describe('DomainFilter utils', () => {
	describe('getCountriesFromDomains', () => {
		it('should return unique country codes from domains', () => {
			// Given
			const domains = MOCK_DOMAINS

			// When
			const result = getCountriesFromDomains(domains)

			// Then
			expect(result).toEqual(['US', 'FR', 'EN'])
		})

		it('should return an empty array if no domains are provided', () => {
			// Given
			const domains: string[] = []

			// When
			const result = getCountriesFromDomains(domains)

			// Then
			expect(result).toEqual([])
		})
	})
	describe('getClassificationsFromDomains', () => {
		it('should return unique classifications from domains', () => {
			// Given
			const domains = MOCK_DOMAINS

			// When
			const result = getClassificationsFromDomains(domains)

			// Then
			expect(result).toEqual(['OK', 'NK', 'BL'])
		})

		it('should return an empty array if no domains are provided', () => {
			// Given
			const domains: string[] = []

			// When
			const result = getClassificationsFromDomains(domains)

			// Then
			expect(result).toEqual([])
		})
	})
	describe('getSubClassificationsFromDomains', () => {
		it('should return unique sub-classifications from domains', () => {
			// Given
			const domains = MOCK_DOMAINS

			// When
			const result = getSubClassificationsFromDomains(domains)

			// Then
			expect(result).toEqual(['WOK', 'WOL', 'NPP', 'NRP'])
		})

		it('should return an empty array if no domains are provided', () => {
			// Given
			const domains: string[] = []

			// When
			const result = getSubClassificationsFromDomains(domains)

			// Then
			expect(result).toEqual([])
		})
	})
})
