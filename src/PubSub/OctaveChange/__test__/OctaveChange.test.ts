import { waitFor } from '@testing-library/react';
import PubSub from 'pubsub-js';
import { vi } from 'vitest';
import { OCTAVE_CHANGE } from '../../topics';
import { OctaveChangeSubscriber, publishOctaveChange } from '../OctaveChange';

describe('octaveChangeSubscriber', () => {
    it('subscribes to the correct TOPIC and invokes the handler function providing the correct data', async () => {
        const spy = vi.fn();
        const data = 4;
        new OctaveChangeSubscriber(spy);

        PubSub.publish(OCTAVE_CHANGE, data);

        await waitFor(() => {
            expect(spy).toHaveBeenCalledWith(OCTAVE_CHANGE, data);
        });
    });

    it('correctly unsubscribes', async () => {
        const spy = vi.fn();
        const data = 2;
        const subscriber = new OctaveChangeSubscriber(spy);

        subscriber.unsubscribe();

        PubSub.publish(OCTAVE_CHANGE, data);

        await waitFor(() => {
            expect(spy).not.toHaveBeenCalled();
        });
    });
});

describe('publishOctaveChange', () => {
    it('publishes to the correct TOPIC with the correct data', async () => {
        const spy = vi.fn();
        const subscriber = PubSub.subscribe('transpose', spy)
        const data = 1;

        PubSub.subscribe(OCTAVE_CHANGE, spy)

        publishOctaveChange(data);

        await waitFor(() => {
            expect(spy).toHaveBeenCalledWith(OCTAVE_CHANGE, data);
        });

        PubSub.unsubscribe(subscriber);
    });
});

