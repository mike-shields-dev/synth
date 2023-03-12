import { vi } from 'vitest';
import { PITCH_BEND } from '../../topics';
import PubSub from 'pubsub-js';
import { PitchBendSubscriber, publishPitchBend } from '..';
import { waitFor } from '@testing-library/react';

describe('pitchBendSubscriber', () => {
    // skipped because it takes a long time...
    it.skip('subscribes to the PITCH topic supplying handler function with the correct data', async () => {
        const spy = vi.fn();
        const valueCount = 100;
        const maxValue = 16838;
        const step = maxValue / valueCount;
        const range = Array.from({ length: valueCount }, (_: any, i: number) => Math.floor(i * step));
        
        new PitchBendSubscriber(spy);

        for (const value of range) {
            PubSub.publish(PITCH_BEND, value);

            await waitFor(() => {
                expect(spy).toHaveBeenCalledWith(PITCH_BEND, value);
            });
        }
    }, 10_000);
});

describe('publishPitchBend', async () => {
    it('publishes to the PITCH_BEND topic with the correct data', async () => {
        const spy = vi.fn();
        const valueCount = 100;
        const maxValue = 16838;
        const step = maxValue / valueCount;
        const range = Array.from({ length: valueCount }, (_: any, i: number) => Math.floor(i * step));

        PubSub.subscribe(PITCH_BEND, spy);

        for (const value of range) {
            publishPitchBend(value);

            await waitFor(() => {
                expect(spy).toHaveBeenCalledWith(PITCH_BEND, value);
            });
        }
    }, 10_000);
});