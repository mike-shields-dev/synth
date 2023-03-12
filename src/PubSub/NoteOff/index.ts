import PubSub from "pubsub-js";
import { MIDI_NOTE_OFF } from "../topics";
import { NoteOff, NoteOffHandler } from './types';

function publishNoteOff(data: NoteOff) {
    PubSub.publish(MIDI_NOTE_OFF, data)
}

class NoteOffSubscriber {
    private subscription: string;

    constructor(noteOffHandler: NoteOffHandler) {
        this.subscription = PubSub.subscribe(
            MIDI_NOTE_OFF,
            noteOffHandler,
        )
    }

    public unsubscribe() {
        PubSub.unsubscribe(this.subscription);
    };
}

export { publishNoteOff, NoteOffSubscriber };
