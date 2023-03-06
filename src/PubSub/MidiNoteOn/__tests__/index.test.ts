import { waitFor } from "@testing-library/react";
import { vi } from 'vitest';
import { MidiNoteOnSubscriber, publishMidiNoteOn } from "..";
import { MIDI_NOTE_ON } from "../../topics";

describe('MidiNoteOnSubscriber', () => {
    it('correctly invokes the provided handler function when the subscribed topic is published', async () => {
        const handler = vi.fn();
        const data = { noteNumber: 65, velocity: 65 };
        new MidiNoteOnSubscriber(handler);

        expect(handler).not.toHaveBeenCalled();

        PubSub.publish(MIDI_NOTE_ON, data);

        await waitFor(() => {
            expect(handler).toHaveBeenCalledWith(MIDI_NOTE_ON, data);
        });
    });

    it('correctly unsubscribes', async () => {
        const handler = vi.fn();
        const data = { noteNumber: 65 };
        const midiNoteOffSubscriber = new MidiNoteOnSubscriber(handler);

        midiNoteOffSubscriber.unsubscribe();

        PubSub.publish(MIDI_NOTE_ON, data);

        await waitFor(() => {
            expect(handler).not.toHaveBeenCalled();
        });
    });
});

describe('publishMidiNoteOn', () => {
    it('publishes to the MIDI_NOTE_ON topic with the correct data', async () => {
        const handler = vi.fn();
        const data = {
            noteNumber: 65,
            velocity: 65,
        }

        PubSub.subscribe(MIDI_NOTE_ON, handler);

        publishMidiNoteOn(data);

        await waitFor(() => {
            expect(handler).toHaveBeenCalledWith(MIDI_NOTE_ON, data);
        });
    });
});