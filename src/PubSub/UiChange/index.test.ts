import { vi } from 'vitest';
import { publishUiChange, UiChangeSubscriber } from ".";
import { UI_CHANGE } from "../topics";

describe('UiChangeSubscriber', () => {
    it('correctly invokes the provided handler function when the subscribed topic is published', async () => {
        const handler = vi.fn(() => null);
        const data = { group: 'filter', parameter: 'frequency', value: 500 };
        new UiChangeSubscriber(handler);

        expect(handler).not.toHaveBeenCalled();

        PubSub.publish(UI_CHANGE, data);

        setTimeout(() => {
            expect(handler).toHaveBeenCalledWith(UI_CHANGE, data);
        }, 0);
    });

    it('correctly unsubscribes', () => {
        const handler = vi.fn(() => null);
        const data = { noteNumber: 65 };
        const midiNoteOffSubscriber = new UiChangeSubscriber(handler);

        midiNoteOffSubscriber.unsubscribe();

        PubSub.publish(UI_CHANGE, data);

        setTimeout(() => {
            expect(handler).not.toHaveBeenCalled();
        }, 0)
    });
});

describe('publishUiChange', () => {
    it('publishes to the correct topic with the correct data', () => {
        const handler = vi.fn(() => null);
        const data = {
            group: 'filter',
            parameter: 'frequency',
            value: 500,
        }
        PubSub.subscribe(UI_CHANGE, handler);

        publishUiChange(data);

        setTimeout(() => {
            expect(handler).toHaveBeenCalledWith(UI_CHANGE, data);
        }, 0)
    });
});