import { waitFor } from "@testing-library/react";
import { vi } from 'vitest';
import { MidiNoteOnSubscriber, publishMidiNoteOn } from "..";
import { MIDI_NOTE_ON } from "../../topics";

describe('MidiNoteOnSubscriber', () => {
    it('subscribes to the correct TOPIC and invokes the handler function providing the correct data', async () => {
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
        const spy = vi.fn();
        const data = { noteNumber: 65 };
        const subscriber = new MidiNoteOnSubscriber(spy);

        subscriber.unsubscribe();

        PubSub.publish(MIDI_NOTE_ON, data);

        await waitFor(() => {
            expect(spy).not.toHaveBeenCalled();
        });
    });
});

describe('publishMidiNoteOn', () => {
    it('publishes to the correct TOPIC with the correct data', async () => {
        const spy = vi.fn();
        const data = {
            noteNumber: 65,
            velocity: 65,
        }

        PubSub.subscribe(MIDI_NOTE_ON, spy);

        publishMidiNoteOn(data);

        await waitFor(() => {
            expect(spy).toHaveBeenCalledWith(MIDI_NOTE_ON, data);
        });
    });
});