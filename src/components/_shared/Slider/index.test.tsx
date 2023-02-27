import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Slider } from '.';

const validProps = {
    controlChangeNumber: 70,
    group: 'groupName',
    initVal: 240,
    isFocused: true,
    parameter: 'parameter',
    scalers: {
        in: vi.fn((n) => n / 2),
        out: vi.fn((n) => n * 2),
    }
}

describe('Slider', () => {
    it('matches snapshot', () => {
        const { container } = render(<Slider {...validProps} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    beforeEach(() => render(< Slider {...validProps} />));
    afterEach(() => vi.resetAllMocks());

    it('renders a Slider component', () => {
        expect(screen.getByRole('slider', { name: 'Parameter' })).toBeInTheDocument();
    });

    it('renders a single range input', () => {
        expect(screen.getAllByRole('slider')).toHaveLength(1);
    });

    it('renders a range input with a min value of 0', () => {
        expect(screen.getByRole('slider')
            .getAttribute('min'))
            .toEqual('0');
    });

    it('renders a range input with a max value of 127', () => {
        expect(screen.getByRole('slider')
            .getAttribute('max'))
            .toEqual('127');
    });

    it('renders an output element', () => {
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders an output element associated with the input element', ()=> {
        expect(screen.getByRole('status')
            .getAttribute('for'))
            .toBe(`${validProps.group}-${validProps.parameter}`);
    });

    it('renders an output element that has a scaled value', () => {
        // to do...
    });
});