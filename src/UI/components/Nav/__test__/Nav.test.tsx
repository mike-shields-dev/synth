import Nav from '../Nav';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
 
const validProps = {
    focus: 'oscillator',
    updateFocus: vi.fn()
}

describe('Nav', () => {
    it('matches snapshot', () => {
        const { container } = render(<Nav {...validProps} />);

        expect(container).toMatchSnapshot();
    });

    it('renders a link for each section in the Synth controls', () => {
        render(<Nav {...validProps} />)
        
        const links = [
            { id: 'oscillator', displayName: 'Oscillator' },
            { id: 'filter', displayName: 'Filter' },
            { id: 'filterEnvelope', displayName: 'Filter Env' },
            { id: 'ampEnvelope', displayName: 'Amp Env' },
        ];

        links.forEach(link =>
            expect(screen.getByRole('link', {
                name: `Go to ${link.id} section`
            })).toBeInTheDocument()
        );
    });

    it('each link causes the correct synth controls section to be focused when clicked', async () => {
        render(<Nav {...validProps} />)

        const links = [
            { id: 'oscillator', displayName: 'Oscillator' },
            { id: 'filter', displayName: 'Filter' },
            { id: 'filterEnvelope', displayName: 'Filter Env' },
            { id: 'ampEnvelope', displayName: 'Amp Env' },
        ];
        
        for (const link of links) {
            fireEvent.click(screen.getByRole('link', {
                name: `Go to ${link.id} section`
            }));

            expect(validProps.updateFocus).toHaveBeenCalledWith(link.id);
        } 
    });
});