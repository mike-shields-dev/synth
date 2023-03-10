import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Slider } from '.';
import { MIDI_CC } from '../../../../PubSub/topics';

const validProps = {
    controlChangeNumber: 70,
    group: 'groupName',
    initVal: 240,
    updateSynth: vi.fn(),
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

    it('renders a range input with the correctly scaled value', () => {
        const slider = screen.getByRole('slider', { name: 'Parameter' });
        const scaledValue = validProps.scalers.in(validProps.initVal)

        expect(slider).toHaveValue(`${scaledValue}`);
    });

    it('renders an output element', () => {
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders an output element associated with the input element', ()=> {
        expect(screen.getByRole('status')
            .getAttribute('for'))
            .toBe(`${validProps.group}-${validProps.parameter}`);
    });

    it('renders an output element that has a scaled value', async () => {
        const slider = screen.getByRole('slider', { name: 'Parameter' });
        const newValue = 23;
        const scaledValue = validProps.scalers.out(newValue)

        fireEvent.change(slider, { target: { value: newValue } });

        expect(await screen.findByText(scaledValue)).toBeInTheDocument();
    });

    it('invokes the provided updateSynth function when the user moves the slider', async () => {
        const slider = screen.getByRole('slider', { name: 'Parameter' });
        const newValue = 64;
        
        fireEvent.change(slider, { target: { value: newValue } });

        expect(validProps.updateSynth).toHaveBeenCalledTimes(1);
        expect(validProps.updateSynth).toHaveBeenCalledWith(newValue);
    });

    it('updates the slider value when a MIDI control change is received', async () => {
        const newValue = 88;

        PubSub.publish(MIDI_CC, {
            controlChangeNumber: validProps.controlChangeNumber,
            value: newValue,
        });

        await waitFor(() => {
            expect(screen.getByRole('slider')).toHaveValue(`${newValue}`);
        });
    });
});