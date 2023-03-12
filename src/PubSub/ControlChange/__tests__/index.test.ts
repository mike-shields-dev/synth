import { waitFor } from "@testing-library/react";
import { vi } from 'vitest';
import { ControlChangeSubscriber, publishControlChange } from "..";
import { CONTROL } from "../../topics";

describe('ControlChangeSubscriber', () => {
    it('correctly invokes the provided handler function when the subscribed topic is published', async () => {
        const handler = vi.fn(() => null);
        const data = { controlChangeNumber: 65, value: 65 };
        new ControlChangeSubscriber(handler);

        expect(handler).not.toHaveBeenCalled();

        PubSub.publish(CONTROL, data);

        await waitFor(() => {
            expect(handler).toHaveBeenCalledWith(CONTROL, data);
        });
    });

    it('correctly unsubscribes', () => {
        const handler = vi.fn(() => null);
        const data = { controlChangeNumber: 65, value: 65 }
        const midiControlChangeSubscriber = new ControlChangeSubscriber(handler);
        midiControlChangeSubscriber.unsubscribe();

        PubSub.publish(CONTROL, data);

        setTimeout(() => {
            expect(handler).not.toHaveBeenCalled();
        }, 0);
    });
});

describe('publishControlChange', () => {
    it('publishes to the correct topic with the correct data', async () => {
        const handler = vi.fn(() => null);
        const data = { controlChangeNumber: 65, value: 65 };
        PubSub.subscribe(CONTROL, handler);

        publishControlChange(data);

        await waitFor(() => {
            expect(handler).toHaveBeenCalledWith(CONTROL, data);
        });
    });
});