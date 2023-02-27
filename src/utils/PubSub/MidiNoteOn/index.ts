import PubSub from "pubsub-js";
import { MidiNoteOn, MidiNoteOnHandler } from "./types";

function publishMidiNoteOn(payload: MidiNoteOn) {
    PubSub.publish('midiNoteOn', payload)
}

class MidiNoteOnSubscriber {
    private subscription: any;

    constructor(noteOnHandler: MidiNoteOnHandler) {
        this.subscription = PubSub.subscribe(
            'midiNoteOn',
            noteOnHandler,
        )
    }

    public unsubscribe() {
        PubSub.unsubscribe(this.subscription);
    };
}

export { publishMidiNoteOn, MidiNoteOnSubscriber };