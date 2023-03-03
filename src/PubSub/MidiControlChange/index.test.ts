import { MidiControlChangeSubscriber, publishMidiControlChange } from ".";
import { MIDI_CC } from "../topics";
import { vi } from 'vitest';

describe('MidiControlChangeSubscriber', () => {
    it('correctly invokes the provided handler function when the subscribed topic is published', async () => {
        const handler = vi.fn(() => null);
        const payload = { controlChangeNumber: 65, value: 65 };
        new MidiControlChangeSubscriber(handler);
        
        expect(handler).not.toHaveBeenCalled();

        PubSub.publish(MIDI_CC, payload);

        setTimeout(() => {
            expect(handler).toHaveBeenCalledWith(MIDI_CC, payload);
        }, 0);
    });

    it('correctly unsubscribes', () => {
        const handler = vi.fn(() => null);
        const payload = { controlChangeNumber: 65, value: 65 }
        const midiControlChangeSubscriber = new MidiControlChangeSubscriber(handler);
        midiControlChangeSubscriber.unsubscribe();

        PubSub.publish(MIDI_CC, payload);

        setTimeout(() => {
            expect(handler).not.toHaveBeenCalled();
        }, 0);
    });
});

describe('publishMidiControlChange', () => {
    it('publishes to the correct topic with the correct payload', () => {
        const handler = vi.fn(() => null);
        const payload = { controlChangeNumber: 65, value: 65 };
        PubSub.subscribe(MIDI_CC, handler);

        publishMidiControlChange(payload);

        setTimeout(() => {
            expect(handler).toHaveBeenCalledWith(MIDI_CC, payload);
        }, 0)
    });
});