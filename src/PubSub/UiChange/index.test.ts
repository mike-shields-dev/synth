import { UiChangeSubscriber, publishUiChange } from ".";
import { UI_CHANGE } from "../topics";
import { vi } from 'vitest';

describe('UiChangeSubscriber', () => {
    it('correctly invokes the provided handler function when the subscribed topic is published', async () => {
        const handler = vi.fn(() => null);
        const payload = { group: 'filter', parameter: 'frequency', value: 500 };
        
        new UiChangeSubscriber(handler);
        
        expect(handler).not.toHaveBeenCalled();

        PubSub.publish(UI_CHANGE, payload);

        setTimeout(() => {
            expect(handler).toHaveBeenCalledWith(UI_CHANGE, payload);
        }, 0);
    });

    it('correctly unsubscribes', () => {
        const handler = vi.fn(() => null);
        
        const payload = { noteNumber: 65 };
        
        const midiNoteOffSubscriber = new UiChangeSubscriber(handler);

        midiNoteOffSubscriber.unsubscribe();

        PubSub.publish(UI_CHANGE, payload);

        setTimeout(() => {
            expect(handler).not.toHaveBeenCalled();
        }, 0)
    });
});

describe('publishUiChange', () => {
    it('publishes to the correct topic with the correct payload', () => {
        const handler = vi.fn(() => null);

        const payload = {
            group: 'filter',
            parameter: 'frequency',
            value: 500,
        }

        PubSub.subscribe(UI_CHANGE, handler);

        publishUiChange(payload);

        setTimeout(() => {
            expect(handler).toHaveBeenCalled();
        }, 0)
    });
});