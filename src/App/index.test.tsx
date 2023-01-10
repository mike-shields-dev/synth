import { render, screen } from '@testing-library/react';
import App from './index';

describe('App', () => {
    beforeEach(() => { render(<App />) });

    it('matches snapshot', () => {
        expect(screen.getByTestId(/app/i)).toMatchSnapshot();
    });

    it('renders the Synth', () => {
        expect(screen.getByTestId(/synth/i)).toBeInTheDocument();
    });
});