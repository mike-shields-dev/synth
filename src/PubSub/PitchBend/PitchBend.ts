import { PITCH_BEND } from "../topics";

type PitchBendHandler = (topic: string, data: number) => void; 

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