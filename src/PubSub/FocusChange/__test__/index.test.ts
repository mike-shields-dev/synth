import { waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { FocusChangeSubscriber, publishFocusChange } from "..";
import { FOCUS } from "../../topics";

describe("FocusChangeSubscriber", () => {
    it('correctly subscribes to publishFocusChange', async () => {
        const spy = vi.fn();
        const data = 'filter';
        new FocusChangeSubscriber(spy);

        expect(spy).not.toHaveBeenCalled();

        PubSub.publish(FOCUS, data);

        await waitFor(() => {
            expect(spy).toHaveBeenCalled();
        });
    });

    it("correctly unsubscribes", async () => {
        const spy = vi.fn();
        const data = 'filter'
        const subscriber = new FocusChangeSubscriber(spy);

        subscriber.unsubscribe();

        PubSub.publish(FOCUS, data);

        await waitFor(() => {
            expect(spy).not.toHaveBeenCalled();
        });
    });
});

describe('publishFocusChange', () => {
    it('correctly publishes', async () => {
        const spy = vi.fn();
        const data = 'filter'

        PubSub.subscribe(FOCUS, spy);

        publishFocusChange(data);

        await waitFor(() => {
            expect(spy).toHaveBeenCalledWith(FOCUS, data);
        });
    })

});