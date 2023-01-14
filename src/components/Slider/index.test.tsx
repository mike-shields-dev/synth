import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Slider } from ".";

const validProps = {
    displayName: "displayName",
    groupName: "groupName",
    onChange: vi.fn(),
    parameter: "parameter",
}

describe("Slider", () => {
    it('matches snapshot', () => {
        const { container } = render(<Slider {...validProps} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    beforeEach(() => render(< Slider {...validProps} />));

    it('renders a Slider component', () => {
        expect(screen.getByTestId("Slider")).toBeInTheDocument();
    });

    it('renders a single range input', () => {
        expect(screen.getAllByRole("slider")).toHaveLength(1);
    });

    it('renders a range input with a min value of 0', () => {
        expect(screen.getByRole('slider').getAttribute('min')).toEqual('0');
    });

    it('renders a range input with a max value of 127', () => {
        expect(screen.getByRole('slider').getAttribute('max')).toEqual('127');
    });

    it('renders an associated input label with the given displayName', () => {
        expect(screen.getByRole("slider", { name: validProps.displayName })).toBeInTheDocument();
    });

    it('the range input invokes the given onChange event handler', () => {
        expect(validProps.onChange).toHaveBeenCalledTimes(0);
        
        fireEvent.change(
            screen.getByRole("slider", { name: validProps.displayName }),
            { target: { value: 60 } }
        );

        expect(validProps.onChange).toHaveBeenCalledTimes(1);
    });
});