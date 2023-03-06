import { waitFor } from "@testing-library/react";
import { vi } from 'vitest';
import { MidiControlChangeSubscriber, publishMidiControlChange } from "..";
import { MIDI_CC } from "../../topics";

describe('MidiControlChangeSubscriber', () => {
    it('correctly invokes the provided handler function when the subscribed topic is published', async () => {
        const handler = vi.fn(() => null);
        const data = { controlChangeNumber: 65, value: 65 };
        new MidiControlChangeSubscriber(handler);

        expect(handler).not.toHaveBeenCalled();

        PubSub.publish(MIDI_CC, data);

        await waitFor(() => {
            expect(handler).toHaveBeenCalledWith(MIDI_CC, data);
        });
    });

    it('correctly unsubscribes', () => {
        const handler = vi.fn(() => null);
        const data = { controlChangeNumber: 65, value: 65 }
        const midiControlChangeSubscriber = new MidiControlChangeSubscriber(handler);
        midiControlChangeSubscriber.unsubscribe();

        PubSub.publish(MIDI_CC, data);

        setTimeout(() => {
            expect(handler).not.toHaveBeenCalled();
        }, 0);
    });
});

describe('publishMidiControlChange', () => {
    it('publishes to the correct topic with the correct data', async () => {
        const handler = vi.fn(() => null);
        const data = { controlChangeNumber: 65, value: 65 };
        PubSub.subscribe(MIDI_CC, handler);

        publishMidiControlChange(data);

        await waitFor(() => {
            expect(handler).toHaveBeenCalledWith(MIDI_CC, data);
        });
    });
});