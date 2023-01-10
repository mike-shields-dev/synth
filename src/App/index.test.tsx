import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './index'

describe('App', () => {
    it('matches snapshot', () => {
        const app = render(<App />);

        expect(app).toMatchSnapshot();
    });
});