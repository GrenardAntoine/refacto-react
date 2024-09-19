import DomainFilter from './DomainFilter'
import { render, screen } from '@testing-library/react'

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: () => ['FR_NK-WOL']
}))

describe('DomainFilter', () => {
	describe('rendering', () => {
    it('should render without crashing',  () => {
      // Given
      render(<DomainFilter />)

      // When
      const result = screen.getByText('FR')

      // Then
      expect(result).toBeTruthy()
    })
    it('should have three selects', () => {
      // Given
      render(<DomainFilter />)

      // When
      const selects = screen.getAllByRole('listbox')

      // Then
      expect(selects).toHaveLength(3)
    })
		it('should populate select with correct data', () => {
			// Given
			render(<DomainFilter />)

			// When
			const firstOption = screen.getByText('FR')
			const secondOption = screen.getByText('NK')
			const thirdOption = screen.getByText('WOL')

			// Then
			expect(firstOption).toBeTruthy()
			expect(secondOption).toBeTruthy()
			expect(thirdOption).toBeTruthy()
		})
	})
})
