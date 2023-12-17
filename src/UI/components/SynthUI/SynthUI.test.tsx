import { render, screen } from '@testing-library/react';
import { SynthUI } from './SynthUI';

const children = [
    <div key={0}>Child1</div>, 
    <div key={1}>Child2</div>,     
];

describe('SynthUI', () => {
    it('renders the provided children', () => {
        render(<SynthUI>{children}</SynthUI>);
        
        expect(screen.getByText(/child1/i)).toBeInTheDocument();
        expect(screen.getByText(/child2/i)).toBeInTheDocument();
    });
});