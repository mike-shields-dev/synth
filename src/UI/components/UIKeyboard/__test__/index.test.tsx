import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { UIKeyboard } from "..";
import { NOTE_OFF, NOTE_ON } from "../../../../PubSub/topics";


describe('UIKeyboard', () => {
    beforeEach(() => {
        render(<UIKeyboard />);
    });

    it('matches snapshot', () => {
        const { container } = render(<UIKeyboard />)
        
        expect(container).toMatchSnapshot();
    });

    it('renders 12 buttons, one for each piano key of an octave', () => {
        expect(screen.getAllByRole('button')).toHaveLength(12);
    });

    it('each key publishes a note on message with the correct noteNumber', async () => {
        const spy = vi.fn();
        const keys = screen.getAllByRole('button', { name: 'key' });
        const subscriber = PubSub.subscribe(NOTE_ON, spy);

        for(const key of keys) {
            const keyValue = Number(key.getAttribute('value'));
            await act(() => fireEvent.mouseDown(key))

            await waitFor(() => {
                expect(spy).toHaveBeenCalledWith(NOTE_ON, {
                    noteNumber: keyValue,
                    velocity: 80,
                });
            });
        };

        PubSub.unsubscribe(subscriber);
    });

    it('each key publishes a note off message with the correct note number', async () => {
        const spy = vi.fn();
        const keys = screen.getAllByRole('button', { name: 'key' });
        const subscriber = PubSub.subscribe(NOTE_OFF, spy);

        for(const key of keys) {
            const keyValue = Number(key.getAttribute('value'));
            await act(() => fireEvent.mouseUp(key))

            await waitFor(() => {
                expect(spy).toHaveBeenCalledWith(NOTE_OFF, {
                    noteNumber: keyValue,
                });
            });
        };

        PubSub.unsubscribe(subscriber);
    });
});