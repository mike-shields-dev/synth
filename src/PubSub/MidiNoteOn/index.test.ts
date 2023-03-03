import { MidiNoteOnSubscriber, publishMidiNoteOn } from ".";
import { MIDI_NOTE_ON } from "../topics";
import { vi } from 'vitest';

describe('MidiNoteOffSubscriber', () => {
    it('correctly invokes the provided handler function when the subscribed topic is published', async () => {
        const handler = vi.fn(() => null);
        const payload = { noteNumber: 65, velocity: 65 };
        new MidiNoteOnSubscriber(handler);
        
        expect(handler).not.toHaveBeenCalled();

        PubSub.publish(MIDI_NOTE_ON, payload);

        setTimeout(() => {
            expect(handler).toHaveBeenCalledWith(MIDI_NOTE_ON, payload);
        }, 0);
    });

    it('correctly unsubscribes', () => {
        const handler = vi.fn(() => null);
        const payload = { noteNumber: 65 };
        const midiNoteOffSubscriber = new MidiNoteOnSubscriber(handler);

        midiNoteOffSubscriber.unsubscribe();

        PubSub.publish(MIDI_NOTE_ON, payload);

        setTimeout(() => {
            expect(handler).not.toHaveBeenCalled();
        }, 0)
    });
});

describe('publishMidiNoteOn', () => {
    it('publishes to the correct topic with the correct payload', () => {
        const handler = vi.fn(() => null);
        const payload = {
            noteNumber: 65,
            velocity: 65,
        }

        PubSub.subscribe(MIDI_NOTE_ON, handler);

        publishMidiNoteOn(payload);

        setTimeout(() => {
            expect(handler).toHaveBeenCalledWith(MIDI_NOTE_ON, payload);
        }, 0)
    });
});