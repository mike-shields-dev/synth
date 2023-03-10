import * as Tone from 'tone';
import { MidiControlChange, MidiControlChangeSubscriber, MidiNoteOff, MidiNoteOffSubscriber, MidiNoteOn, MidiNoteOnSubscriber } from '../PubSub';
import { FocusChangeSubscriber } from '../PubSub/FocusChange';
import * as scalers from '../utils/Scalers';

const synth = new Tone.PolySynth(Tone.MonoSynth);
const activeNotes: number[] = [];
let focus = "";


function onFocusChange(topic: string, data: string) {
    focus = data;
}

function onControlChange(topic: string, data: MidiControlChange) {    
    if (focus === "filter") return updateFilter(data);
    if (focus === "filterEnvelope") return updateFilterEnvelope(data);
    if (focus === "envelope") return updateAmpEnvelope(data);
}

function updateFilter(data: MidiControlChange) {
    const { controlChangeNumber: cc, value } = data;

    if (cc === 70) return updateFilterFrequency(value);
    if (cc === 71) return updateFilterResonance(value);
}

function updateFilterFrequency(value: number) {
    synth.set({
        filterEnvelope: {
            baseFrequency: scalers.controlChangeToFilterFrequency(value)
        }
    })
}

function updateFilterResonance(value: number) {
    synth.set({
        filter: {
            Q: scalers.controlChangeToFilterQ(value)
        }
    })
}

function updateFilterEnvelope(data: MidiControlChange) {
    console.log("filterEnvelope");
    
    const { controlChangeNumber: cc, value } = data;

    if (cc === 70) return updateFilterEnvelopeParam("attack", value);
    if (cc === 71) return updateFilterEnvelopeParam("decay", value);
    if (cc === 72) return updateFilterEnvelopeParam("sustain", value);
    if (cc === 73) return updateFilterEnvelopeParam("release", value);
    if (cc === 74) return updateFilterEnvelopeParam("amount", value);
}

function updateFilterEnvelopeParam(param: string, value: number) {
    synth.set({ filterEnvelope: { [param]: scalers.controlChangeToEnvelopeAttack(value) } });
}

function updateAmpEnvelope(data: MidiControlChange) {
    const { controlChangeNumber: cc, value } = data;

    if (cc === 70) return updateAmpEnvelopeParam("attack", value);
    if (cc === 71) return updateAmpEnvelopeParam("decay", value);
    if (cc === 72) return updateAmpEnvelopeParam("sustain", value);
    if (cc === 73) return updateAmpEnvelopeParam("release", value);
}

function updateAmpEnvelopeParam(param: string, value: number) {
    synth.set({ envelope: { [param]: scalers.controlChangeToEnvelopeAttack(value) } });
}

function onNoteOn(topic: string, data: MidiNoteOn) {
    if (activeNotes.includes(data.noteNumber)) return;

    activeNotes.push(data.noteNumber);

    synth.triggerAttack(Tone.Frequency(data.noteNumber, 'midi').toFrequency());
}

function onNoteOff(topic: string, data: MidiNoteOff) {
    if (!activeNotes.includes(data.noteNumber)) return;
    activeNotes.splice(activeNotes.indexOf(data.noteNumber), 1);

    synth.triggerRelease(Tone.Frequency(data.noteNumber, 'midi').toFrequency());
}

new FocusChangeSubscriber(onFocusChange)
new MidiControlChangeSubscriber(onControlChange);
new MidiNoteOffSubscriber(onNoteOff);
new MidiNoteOnSubscriber(onNoteOn);



synth.toDestination();

export { activeNotes, focus }