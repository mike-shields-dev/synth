import { describe, it, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import { SynthParameterGroup } from '.';

const validProps = {
    groupName: 'form-name', 
    children: <div>Child</div>
}

describe('SynthParameterGroup', () => {
    beforeEach(() => {
        render(< SynthParameterGroup {...validProps} />);
    });

    it(`renders a form with the name groupName`, () => {
        expect(
            screen.getByRole('form', { name: validProps.groupName })
        ).toBeInTheDocument();
    });

    it('renders children', () => {
        expect(screen.getByText(/child/i)).toBeInTheDocument();
    });
});