import PubSub from "pubsub-js";
import { MidiNoteOff, MidiNoteOffHandler} from './types';

function publishMidiNoteOff(payload: MidiNoteOff) {
    PubSub.publish('midiNoteOff', payload)
}

class MidiNoteOffSubscriber {
    private subscription: string;

    constructor(noteOffHandler: MidiNoteOffHandler) {
        this.subscription = PubSub.subscribe(
            'midiNoteOn',
            noteOffHandler,
        )
    }

    public unsubscribe() {
        PubSub.unsubscribe(this.subscription);
    };
}

export { publishMidiNoteOff, MidiNoteOffSubscriber };