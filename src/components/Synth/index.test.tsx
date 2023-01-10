import { render, screen } from '@testing-library/react';
import { Synth } from '.';

const child = <div>Child</div>;

describe('Synth', () => {
    it('renders the provided children', () => {
        render(<Synth>{child}</Synth>);
        
        expect(screen.getByText(/child/i)).toBeInTheDocument();
    });
});