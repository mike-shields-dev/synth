import { render, screen } from '@testing-library/react';
import App from './index';
import WMT from 'web-midi-test';

describe('App', () => {
    beforeEach(() => {
        global.navigator.requestMIDIAccess = WMT.requestMIDIAccess; 
        render(<App />)
    });

    it('matches snapshot', () => {
        const { container } = render(<App />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders the SynthUI', () => {
        expect(screen.getByTestId(/SynthUI/i)).toBeInTheDocument();
    });

    it('renders a SynthParameterGroup for the oscillator', () => {
        expect(screen.getByRole('form', { name: 'oscillator' })).toBeInTheDocument();
    });

    it('renders a SynthParameterGroup for the filter', () => {
        expect(screen.getByRole('form', { name: 'filter' })).toBeInTheDocument();
    });

    it('renders a SynthParameterGroup for the filter', () => {
        expect(screen.getByRole('form', { name: 'filterEnvelope' })).toBeInTheDocument();
    });

    it('renders a SynthParameterGroup for the filter', () => {
        expect(screen.getByRole('form', { name: 'envelope' })).toBeInTheDocument();
    });

    it('renders a SynthParameterGroup form the (amp) envelope', () => {
        expect(screen.getByRole('form', { name: 'envelope' })).toBeInTheDocument();
    })
});