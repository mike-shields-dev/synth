import { waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { publishUiControlChange, UiControlChangeSubscriber } from ".";
import { UI_CC } from "../topics";

describe('UiControlChangeSubscriber', () => {
    it('correctly invokes the provided handler function when the subscribed topic is published', async () => {
        const spy = vi.fn();
        const data = { controlChangeNumber: 70, value: 65 };
        new UiControlChangeSubscriber(spy);

        expect(spy).not.toHaveBeenCalled();

        PubSub.publish(UI_CC, data);

        await waitFor(() => {
            expect(spy).toHaveBeenCalled();
        });
    });

    it('correctly unsubscribes', async () => {
        const spy = vi.fn();
        const data = { noteNumber: 65 };
        const midiNoteOffSubscriber = new UiControlChangeSubscriber(spy);

        midiNoteOffSubscriber.unsubscribe();

        PubSub.publish(UI_CC, data);

        await waitFor(() => {
            expect(spy).not.toHaveBeenCalled();
        });
    });
});

describe('publishUiChange', () => {
    it('publishes to the correct topic with the correct data', async () => {
        const spy = vi.fn();
        const data = {
            controlChangeNumber: 70,
            value: 27,
        }

        PubSub.subscribe(UI_CC, spy);

        publishUiControlChange(data);

        setTimeout(() => {
            expect(spy).toHaveBeenCalled();
        }, 5);
    });
});