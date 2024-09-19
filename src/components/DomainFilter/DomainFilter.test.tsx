import DomainFilter from './DomainFilter';
import { render, screen } from '@testing-library/react';

// TODO fix tests
describe('DomainFilter', () => {
  it('should allow the user to filter', () => {
    render(<DomainFilter />);

    expect(screen.getAllByRole('listbox')).toHaveLength(3);
  })

  it('should render', async () => {
    render(<DomainFilter />);

    expect(await screen.findByText('do')).toBeTruthy();
  });
})
