import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Slider } from '..';
import { MIDI_CC } from '../../../../PubSub/topics';

const validProps = {
    controlChangeNumber: 70,
    group: 'groupName',
    initVal: 65,
    isFocused: true,
    parameter: 'parameter',
    scaler: vi.fn((n) => n * 2),
}

describe('Slider', () => {
    it('matches snapshot', () => {
        const { container } = render(<Slider {...validProps} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    beforeEach(() => render(< Slider {...validProps} />));
    afterEach(() => vi.resetAllMocks());

    it('renders a single slider with the give parameter name', () => {
        expect(screen.getAllByRole('slider')).toHaveLength(1);
        expect(screen.getByRole('slider', { name: /parameter/i })).toBeInTheDocument();
    });

    it('renders a slider with the given initial value', () => {
        expect(screen.getByRole('slider', { name: /Parameter/i })).toHaveValue(`${validProps.initVal}`);
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

    it(`the slider value updates on user input via the GUI`, async () => {
        const slider = screen.getByRole('slider', { name: /Parameter/i });
        const newVal = 99;

        fireEvent.change(slider, { target: { value: newVal } });

        await waitFor(() => {
            expect(slider).toHaveValue(`${newVal}`);
        });
    });

    it(`the slider value updates when a MIDI Control Change is published with the correct payload`, async () => {
        const slider = screen.getByRole('slider', { name: /Parameter/i });
        const payload = {
            controlChangeNumber: validProps.controlChangeNumber,
            value: 99,
        };

        PubSub.publish(MIDI_CC, payload);
        
        await waitFor(() => {
            expect(slider).toHaveValue(`${payload.value}`)
        });
    });

    it('renders a single output', () => {
        expect(screen.getAllByRole('status')).toHaveLength(1);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('the output is associated with the slider', ()=> {
        expect(screen.getByRole('status')
            .getAttribute('for'))
            .toBe(`${validProps.group}-${validProps.parameter}`);
    });

    it('the output displays the scaled value of the slider', async () => {        
        expect(screen.getByRole('status')).toHaveValue(`${validProps.scaler(validProps.initVal)}`);
    });

    it('the output value updates when a MIDI Control Change is published with the correct payload', async () => {
        const outputDisplay = screen.getByRole('status');
        const payload = {
            controlChangeNumber: validProps.controlChangeNumber,
            value: 99,
        };

        PubSub.publish(MIDI_CC, payload);

        await waitFor(() => {
            expect(outputDisplay).toHaveValue(`${validProps.scaler(validProps.initVal)}`);
        });
    });

    it('the output value updates on user input via the GUI', async () => {
        const outputDisplay = screen.getByRole('status');
        const slider = screen.getByRole('slider');
        const newVal = 55;

        fireEvent.change(slider, { target: { value: 55 } });

        await waitFor(() => {
            expect(outputDisplay).toHaveValue(`${validProps.scaler(newVal)}`);
        });
    });
});