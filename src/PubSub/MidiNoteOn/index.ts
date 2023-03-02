import PubSub from "pubsub-js";
import { MIDI_NOTE_ON } from "../topics";
import { MidiNoteOn, MidiNoteOnHandler } from "./types";

function publishMidiNoteOn(payload: MidiNoteOn) {
    PubSub.publish(MIDI_NOTE_ON, payload)
}

class MidiNoteOnSubscriber {
    private subscription: any;

    constructor(noteOnHandler: MidiNoteOnHandler) {
        this.subscription = PubSub.subscribe(
            MIDI_NOTE_ON,
            noteOnHandler,
        )
    }

    public unsubscribe() {
        PubSub.unsubscribe(this.subscription);
    };
}

export { publishMidiNoteOn, MidiNoteOnSubscriber };
