import { Filter } from '../Filter';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

const validProps = {
    updateFocus: vi.fn(), 
    focus: 'filter',
}

describe('Filter', () => {
    it('matches snapshot', () => {
        const { container } = render(<Filter {...validProps} />);

        expect(container).toMatchSnapshot();
    });

    it('gets focus when the user clicks on it', () => {
        render(<Filter {...validProps} />);
        
        const filterEl = screen.getByText('Filter');

        fireEvent.click(filterEl);

        expect(validProps.updateFocus).toHaveBeenCalledWith('filter');
    });
});