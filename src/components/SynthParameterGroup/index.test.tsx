import { describe, it, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import { SynthParameterGroup } from '.';

const validProps = {
    name: 'form-name'
}

describe('SynthParameterGroup', () => {
    it('renders a form with the give name prop', () => {
        render(<SynthParameterGroup {...validProps} />);

        expect(
            screen.getByRole('form', { name: validProps.name })
        ).toBeInTheDocument();
    });
});