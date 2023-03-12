import * as Tone from 'tone';
import {
    MidiControlChange, MidiControlChangeSubscriber,
    MidiNoteOff, MidiNoteOffSubscriber,
    MidiNoteOn, MidiNoteOnSubscriber,
    UiControlChangeSubscriber
} from '../PubSub';
import { FocusChangeSubscriber } from '../PubSub/FocusChange';
import { OctaveChangeSubscriber } from '../PubSub/OctaveChange';
import * as scaler from '../utils/Scalers';

interface ScaleIndex {
    [key: string]: (value: number) => void;
}

const SYNTH = new Tone.PolySynth(Tone.MonoSynth);
SYNTH.toDestination();

let activeNotes: number[] = [];
let focus = "";
let octave = 0;

new MidiNoteOnSubscriber(onNoteOn);
new MidiNoteOffSubscriber(onNoteOff);
new FocusChangeSubscriber(onFocusChange)
new MidiControlChangeSubscriber(onControlChange);
new UiControlChangeSubscriber(onControlChange);
new OctaveChangeSubscriber(onOctaveChange);

function onNoteOn(topic: string, data: MidiNoteOn) {
    if (activeNotes.includes(data.noteNumber)) return;

    const volume = (1 / 127) * data.velocity; 
    activeNotes = [data.noteNumber, ...activeNotes];

    SYNTH.triggerAttack(
        Tone.Frequency(data.noteNumber + (octave * 12), 'midi').toNote(),
        Tone.now(),
        volume
    );
}

function onNoteOff(topic: string, data: MidiNoteOff) {
    if (!activeNotes.includes(data.noteNumber)) return;

    activeNotes = activeNotes.filter(note => note !== data.noteNumber);

    SYNTH.triggerRelease(Tone.Frequency(data.noteNumber + (octave * 12), 'midi').toNote());
}

function onFocusChange(topic: string, data: string) {
    focus = data;
}


function onControlChange(topic: string, data: MidiControlChange) {
    if (focus === "filter") return updateFilter(data);
    if (focus === "filterEnvelope") return updateFilterEnvelope(data);
    if (focus === "ampEnvelope") return updateAmpEnvelope(data);
}

function updateFilter(data: MidiControlChange) {
    const { controlChangeNumber: cc, value } = data;

    if (cc === 70) return updateFilterFrequency(value);
    if (cc === 71) return updateFilterResonance(value);
}

function updateFilterFrequency(value: number) {
    SYNTH.set({
        filterEnvelope: {
            baseFrequency: scaler.controlChangeToFilterFrequency(value)
        }
    });
}

function updateFilterResonance(value: number) {
    SYNTH.set({
        filter: {
            Q: scaler.controlChangeToFilterResonance(value)
        }
    })
}

function updateFilterEnvelope(data: MidiControlChange) {
    const { controlChangeNumber: cc, value } = data;

    if (cc === 70) return updateFilterEnvelopeParam("attack", value);
    if (cc === 71) return updateFilterEnvelopeParam("decay", value);
    if (cc === 72) return updateFilterEnvelopeParam("sustain", value);
    if (cc === 73) return updateFilterEnvelopeParam("release", value);
    if (cc === 74) return updateFilterEnvelopeParam("amount", value);
}

function updateFilterEnvelopeParam(param: string, value: number) {
    const scalers: ScaleIndex = {
        attack: scaler.controlChangeToFilterEnvelopeAttack,
        decay: scaler.controlChangeToFilterEnvelopeDecay,
        sustain: scaler.controlChangeToFilterEnvelopeSustain,
        release: scaler.controlChangeToAmpEnvelopeRelease,
        amount: scaler.controlChangeToFilterEnvelopeAmount,
    }

    SYNTH.set({
        filterEnvelope: {
            [param]: scalers[param](value)
        }
    });
}

function updateAmpEnvelope(data: MidiControlChange) {
    const { controlChangeNumber: cc, value } = data;

    if (cc === 70) return updateAmpEnvelopeParam("attack", value);
    if (cc === 71) return updateAmpEnvelopeParam("decay", value);
    if (cc === 72) return updateAmpEnvelopeParam("sustain", value);
    if (cc === 73) return updateAmpEnvelopeParam("release", value);
}

function updateAmpEnvelopeParam(param: string, value: number) {

    const scalers: ScaleIndex = {
        attack: scaler.controlChangeToAmpEnvelopeAttack,
        decay: scaler.controlChangeToAmpEnvelopeDecay,
        sustain: scaler.controlChangeToAmpEnvelopeSustain,
        release: scaler.controlChangeToAmpEnvelopeRelease
    };

    SYNTH.set({
        envelope: {
            [param]: scalers[param](value)
        }
    });
}

function onOctaveChange(topic: string, data: number) {
    octave = data;
}
