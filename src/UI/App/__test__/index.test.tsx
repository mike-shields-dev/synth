import { render, screen } from '@testing-library/react';
import App from '../index';

describe('App', () => {
    beforeEach(() => {
        render(<App />)
    });

    it('matches snapshot', () => {
        const { container } = render(<App />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders the SynthUI', () => {
        expect(screen.getByRole('form', {name: 'synth controls'})).toBeInTheDocument();
    });

    it('renders a SynthParameterGroup for the oscillator', () => {
        expect(screen.getByRole('region', { name: 'Oscillator' })).toBeInTheDocument();
    });

    it('renders a SynthParameterGroup for the filter', () => {
        expect(screen.getByRole('region', { name: 'Filter' })).toBeInTheDocument();
    });

    it('renders a SynthParameterGroup for the filter', () => {
        expect(screen.getByRole('region', { name: 'Filter Envelope' })).toBeInTheDocument();
    });

    it('renders a SynthParameterGroup form the (amp) envelope', () => {
        expect(screen.getByRole('region', { name: 'Amp Envelope' })).toBeInTheDocument();
    })
});