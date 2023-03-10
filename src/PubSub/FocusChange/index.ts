import PubSub from "pubsub-js";
import { FOCUS } from '../topics';
import { FocusChangeHandler } from "./types";

function publishFocusChange(data: string) {
    PubSub.publish(FOCUS, data);
}

class FocusChangeSubscriber {
    private subscription: string;

    constructor(focusHandler: FocusChangeHandler) {
        this.subscription = PubSub.subscribe(
            FOCUS,
            focusHandler,
        );
    }

    public unsubscribe() {
        PubSub.unsubscribe(this.subscription);
    }
}

export {
    publishFocusChange,
    FocusChangeSubscriber
};
