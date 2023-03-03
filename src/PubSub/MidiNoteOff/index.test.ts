import { MidiNoteOffSubscriber, publishMidiNoteOff } from ".";
import { MIDI_NOTE_OFF } from "../topics";
import { vi } from 'vitest';

describe('MidiNoteOffSubscriber', () => {
    it('correctly invokes the provided handler function when the subscribed topic is published', async () => {
        const handler = vi.fn(() => null);
        const payload = { noteNumber: 65 };
        new MidiNoteOffSubscriber(handler);
        
        expect(handler).not.toHaveBeenCalled();

        PubSub.publish(MIDI_NOTE_OFF, payload);

        setTimeout(() => {
            expect(handler).toHaveBeenCalledWith(MIDI_NOTE_OFF, payload);
        }, 0);
    });

    it('correctly unsubscribes', () => {
        const handler = vi.fn(() => null);
        const payload = { noteNumber: 65 };
        const midiNoteOffSubscriber = new MidiNoteOffSubscriber(handler);

        midiNoteOffSubscriber.unsubscribe();

        PubSub.publish(MIDI_NOTE_OFF, payload);

        setTimeout(() => {
            expect(handler).not.toHaveBeenCalled();
        }, 0);
    });
});

describe('publishMidiNoteOff', () => {
    it('publishes to the correct topic with the correct payload', () => {
        const handler = vi.fn(() => null);
        const payload = { noteNumber: 65 };

        PubSub.subscribe(MIDI_NOTE_OFF, handler);

        publishMidiNoteOff(payload);

        setTimeout(() => {
            expect(handler).toHaveBeenCalledWith(MIDI_NOTE_OFF, payload);
        }, 0);
    });
});