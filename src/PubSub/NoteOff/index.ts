import PubSub from "pubsub-js";
import { NOTE_OFF } from "../topics";
import { NoteOff, NoteOffHandler } from './types';

function publishNoteOff(data: NoteOff) {
    PubSub.publish(NOTE_OFF, data)
}

class NoteOffSubscriber {
    private subscription: string;

    constructor(noteOffHandler: NoteOffHandler) {
        this.subscription = PubSub.subscribe(
            NOTE_OFF,
            noteOffHandler,
        )
    }

    public unsubscribe() {
        PubSub.unsubscribe(this.subscription);
    };
}

export { publishNoteOff, NoteOffSubscriber };
