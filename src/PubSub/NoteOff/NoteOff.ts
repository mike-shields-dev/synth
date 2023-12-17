import PubSub from "pubsub-js";
import { NOTE_OFF } from "../topics";

interface NoteOff {
    noteNumber: number;
}

type NoteOffHandler = (message: string, data: NoteOff) => void;


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
export type { NoteOff };
