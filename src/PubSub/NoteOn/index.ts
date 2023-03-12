import PubSub from "pubsub-js";
import { NOTE_ON } from "../topics";
import { NoteOn, NoteOnHandler } from "./types";

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
