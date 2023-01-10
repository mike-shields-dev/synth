import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from "@testing-library/react";
import { SynthParameterGroup } from '.';

const validProps = {
    children: (
        <div>
            <label htmlFor='parameter'>Parameter</label>
            <input id="parameter" type="range" />,
        </div>
    ),
    groupName: 'form-name', 
    handleFocus: vi.fn(),
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
        expect(
            screen.getByRole('slider', {name: /parameter/i})
        ).toBeInTheDocument();
    });

    it('invokes handleFocus when a child component is focused', () => {
        const parameterInput = 
            screen.getByRole('slider', { name: /parameter/i});

        expect(validProps.handleFocus).not.toHaveBeenCalled();
        
        fireEvent.focus(parameterInput);

        expect(validProps.handleFocus).toHaveBeenCalledTimes(1);
    });
});