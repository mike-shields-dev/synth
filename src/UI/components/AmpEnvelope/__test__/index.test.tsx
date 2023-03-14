import { AmpEnvelope } from '..';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

const validProps = {
    updateFocus: vi.fn(), 
    focus: 'ampEnvelope',
}

describe('AmpEnvelope', () => {
    it('matches snapshot', () => {
        const { container } = render(<AmpEnvelope {...validProps} />);

        expect(container).toMatchSnapshot();
    });

    it('gets focus when the user clicks on it', () => {
        render(<AmpEnvelope {...validProps} />);
        
        const ampEnvelopeEl = screen.getByText('Amp Envelope');

        fireEvent.click(ampEnvelopeEl);

        expect(validProps.updateFocus).toHaveBeenCalledWith('ampEnvelope');

        console.log(ampEnvelopeEl);
    });
});