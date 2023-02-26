import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SynthParameterGroup } from '.';

const validProps = {
    group: 'Group Name',
    updateFocus: vi.fn(),
    isFocused: true,
}

const ValidChild = () => <div>valid child</div>;

describe('SynthParameterGroup', () => {
    beforeEach(() => render(
        <SynthParameterGroup {...validProps}>
            { (isFocused) => <ValidChild /> }
        </SynthParameterGroup>)
    );

    afterEach(() => vi.restoreAllMocks());

    it(`renders a form with the name groupName`, () => {
        expect(
            screen.getByRole('form', { name: validProps.group })
        ).toBeInTheDocument();
    });

    it('renders a heading within the form with the given header name', () => {
        const header = screen.getByRole('heading');

        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(within(header).getByText(validProps.group)).toBeInTheDocument();
    });

    it('renders children', () => {
        expect(
            screen.getByText(/valid child/i)
        ).toBeInTheDocument();
    });

    it('invokes updateFocus callback, when a child component is focused', () => {
        const child = screen.getByText(validProps.group);

        expect(validProps.updateFocus).toHaveBeenCalledTimes(0);
        
        fireEvent.focus(child);

        expect(validProps.updateFocus).toHaveBeenCalledTimes(1);
        expect(validProps.updateFocus).toHaveBeenCalledWith(validProps.group);
    });

    it('invokes updateFocus when the user clicks anywhere within the component', () => {
        const formElement = screen.getByRole('form', { name: validProps.group });

        expect(validProps.updateFocus).toHaveBeenCalledTimes(0);
        
        fireEvent.click(formElement);

        expect(validProps.updateFocus).toHaveBeenCalledTimes(1);
        expect(validProps.updateFocus).toHaveBeenCalledWith(validProps.group);
    });
});