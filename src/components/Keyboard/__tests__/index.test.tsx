import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Keyboard } from '../';
import { MIDI_NOTE_OFF, MIDI_NOTE_ON } from '../../../PubSub/topics';

describe("Keyboard", () => {
    beforeEach(() => {
        render(<Keyboard />)
    });

    it('matches snapshot', () => {
        const { container } = render(<Keyboard />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders 12 buttons for each key of an octave', () => {
        expect(screen.getAllByRole('button')).toHaveLength(12);
    });

    it(`each key has the correct note name for it's name attribute`, () => {
        const expectedNoteNames = ['C','D','E','F','G','A','B','Db','Eb','Gb','Ab','Bb'];
        const foundNoteNames = screen.getAllByRole('button').map((key) => key.getAttribute("name"));

        expect(expectedNoteNames).toEqual(foundNoteNames);
    });

    it('each button/key publishes to the MIDI_NOTE_ON topic when activated', async () => {
        const keys = screen.getAllByRole('button');
        const handler = vi.fn(() => null);

        PubSub.subscribe(MIDI_NOTE_ON, handler);

        for (const key of keys) {
            fireEvent.mouseDown(key)
        }

        await waitFor(() => {
            expect(handler).toHaveBeenCalledTimes(keys.length);
        });
    });

    it('each button/key publishes to the MIDI_NOTE_ON topic when deactivated', async () => {
        const keys = screen.getAllByRole('button');
        const handler = vi.fn(() => null);

        PubSub.subscribe(MIDI_NOTE_OFF, handler);

        for (const key of keys) {
            fireEvent.mouseUp(key)
            fireEvent.mouseLeave(key)
        }

        await waitFor(() => {
            expect(handler).toHaveBeenCalledTimes(keys.length * 2);
        });
    });
});