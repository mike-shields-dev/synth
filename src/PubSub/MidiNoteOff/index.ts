import PubSub from "pubsub-js";
import { MIDI_NOTE_OFF } from "../topics";
import { MidiNoteOff, MidiNoteOffHandler } from './types';

function publishMidiNoteOff(data: MidiNoteOff) {
    PubSub.publish(MIDI_NOTE_OFF, data)
}

class MidiNoteOffSubscriber {
    private subscription: string;

    constructor(noteOffHandler: MidiNoteOffHandler) {
        this.subscription = PubSub.subscribe(
            MIDI_NOTE_OFF,
            noteOffHandler,
        )
    }

    public unsubscribe() {
        PubSub.unsubscribe(this.subscription);
    };
}

export { publishMidiNoteOff, MidiNoteOffSubscriber };
