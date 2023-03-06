import { waitFor } from "@testing-library/react";
import { vi } from 'vitest';
import { MidiNoteOffSubscriber, publishMidiNoteOff } from "..";
import { MIDI_NOTE_OFF } from "../../topics";

describe('MidiNoteOffSubscriber', () => {
    it('correctly invokes the provided handler function when the subscribed topic is published', async () => {
        const handler = vi.fn(() => null);
        const data = { noteNumber: 65 };
        new MidiNoteOffSubscriber(handler);

        expect(handler).not.toHaveBeenCalled();

        PubSub.publish(MIDI_NOTE_OFF, data);

        await waitFor(() => {
            expect(handler).toHaveBeenCalledWith(MIDI_NOTE_OFF, data);
        });
    });

    it('correctly unsubscribes', async () => {
        const handler = vi.fn(() => null);
        const data = { noteNumber: 65 };
        const midiNoteOffSubscriber = new MidiNoteOffSubscriber(handler);

        midiNoteOffSubscriber.unsubscribe();

        PubSub.publish(MIDI_NOTE_OFF, data);

        await waitFor(() => {
            expect(handler).not.toHaveBeenCalled();
        });
    });
});

describe('publishMidiNoteOff', () => {
    it('publishes to the correct topic with the correct data', async () => {
        const handler = vi.fn(() => null);
        const data = { noteNumber: 65 };

        PubSub.subscribe(MIDI_NOTE_OFF, handler);

        publishMidiNoteOff(data);

        await waitFor(() => {
            expect(handler).toHaveBeenCalledWith(MIDI_NOTE_OFF, data);
        });
    });
});