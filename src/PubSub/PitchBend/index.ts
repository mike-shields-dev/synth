import { PITCH_BEND } from "../topics";
import { PitchBendHandler } from "./types";

function publishPitchBend(data: number) {
    PubSub.publish(PITCH_BEND, data);
}

class PitchBendSubscriber {
    private subscription: string;
    
    constructor(handler: PitchBendHandler) {
        this.subscription = PubSub.subscribe(PITCH_BEND, handler);
    }

    public unsubscribe() {
        PubSub.unsubscribe(this.subscription);
    }
}

export { PitchBendSubscriber, publishPitchBend };