import { render, screen } from "@testing-library/react";
import { Slider } from ".";

const validProps = {
    groupName: "groupName",
    parameter: "parameter",
    displayName: "displayName",
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

    it('renders a single input with the type "range"', () => {
        expect(screen.getAllByRole("slider")).toHaveLength(1);
    });

    it('renders an associated input label with the given displayName', () => {
        expect(screen.getByRole("slider", { name: validProps.displayName })).toBeInTheDocument();
    });
});