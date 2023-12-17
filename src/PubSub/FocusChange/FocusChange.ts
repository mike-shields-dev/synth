import PubSub from "pubsub-js";
import { FOCUS } from '../topics';

type FocusChangeHandler = (message: string, data: string) => void;

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