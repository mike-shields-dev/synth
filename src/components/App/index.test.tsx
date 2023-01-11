import { render, screen } from '@testing-library/react';
import App from './index';

describe('App', () => {
    beforeEach(() => { render(<App />) });

    it('matches snapshot', () => {
        const { container } = render(<App />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders the Synth', () => {
        expect(screen.getByTestId(/synth/i)).toBeInTheDocument();
    });
});