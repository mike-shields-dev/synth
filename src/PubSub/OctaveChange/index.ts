import PubSub from 'pubsub-js';
import { OCTAVE_CHANGE } from '../topics';
import { OctaveChangeHandler } from './types';

function publishOctaveChange(data: number) {
    PubSub.publish(OCTAVE_CHANGE, data);
}

class OctaveChangeSubscriber {
    private subscription: string;

    constructor(handler: OctaveChangeHandler) {
        this.subscription = PubSub.subscribe(
            OCTAVE_CHANGE,
            handler
        )
    }

    public unsubscribe() {
        PubSub.unsubscribe(this.subscription);
    }
}

export { publishOctaveChange, OctaveChangeSubscriber };
