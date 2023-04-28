import PubSub from "pubsub-js";
import { NOTE_ON } from "../topics";

interface NoteOn {
    noteNumber: number;
    velocity: number;
}

type NoteOnHandler = (message: string, data: NoteOn) => void;

function publishNoteOn(data: NoteOn) {
    PubSub.publish(NOTE_ON, data)
}

class NoteOnSubscriber {
    private subscription: string;

    constructor(handler: NoteOnHandler) {
        this.subscription = PubSub.subscribe(
            NOTE_ON,
            handler,
        )
    }

    public unsubscribe() {
        PubSub.unsubscribe(this.subscription);
    };
}

export { publishNoteOn, NoteOnSubscriber };
export type { NoteOn };
