import { waitFor } from "@testing-library/react";
import { vi } from 'vitest';
import { NoteOnSubscriber, publishNoteOn } from "..";
import { NOTE_ON } from "../../topics";

describe('NoteOnSubscriber', () => {
    it('subscribes to the correct TOPIC and invokes the handler function providing the correct data', async () => {
        const handler = vi.fn();
        const data = { noteNumber: 65, velocity: 65 };
        new NoteOnSubscriber(handler);

        expect(handler).not.toHaveBeenCalled();

        PubSub.publish(NOTE_ON, data);

        await waitFor(() => {
            expect(handler).toHaveBeenCalledWith(NOTE_ON, data);
        });
    });

    it('correctly unsubscribes', async () => {
        const spy = vi.fn();
        const data = { noteNumber: 65 };
        const subscriber = new NoteOnSubscriber(spy);

        subscriber.unsubscribe();

        PubSub.publish(NOTE_ON, data);

        await waitFor(() => {
            expect(spy).not.toHaveBeenCalled();
        });
    });
});

describe('publishNoteOn', () => {
    it('publishes to the correct TOPIC with the correct data', async () => {
        const spy = vi.fn();
        const data = {
            noteNumber: 65,
            velocity: 65,
        }

        PubSub.subscribe(NOTE_ON, spy);

        publishNoteOn(data);

        await waitFor(() => {
            expect(spy).toHaveBeenCalledWith(NOTE_ON, data);
        });
    });
});