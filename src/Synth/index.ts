import * as Tone from 'tone';
import { MidiControlChange, MidiControlChangeSubscriber, MidiNoteOff, MidiNoteOn } from '../PubSub';
import * as scalers from '../utils/Scalers'

class Synth {
    private synth: Tone.PolySynth<Tone.MonoSynth>;
    private activeNotes: number[] = [];
    #focus: string;

    constructor() {
        this.synth = new Tone.PolySynth(Tone.MonoSynth);
        this.synth.toDestination();
        this.#focus = "";
    }

    public get config() {
        return this.synth.get();
    }

    public set focus(focus: string) {
        this.#focus = focus;
    };

    public get focus() {
        return this.#focus;
    }

    public onMidiControlChange(data: MidiControlChange) {
        const focus = this.focus;

        if (focus === "filter") return this.updateFilter(data);
        if (focus === "filterEnvelope") return this.updateFilterEnvelope(data);
        if (focus === "ampEnvelope") return this.updateAmpEnvelope(data);
    }

    public updateFilter(data: MidiControlChange) {
        console.log("updateFilter");
        
        const { controlChangeNumber: cc, value } = data;

        if (cc === 70) return this.updateFilterFrequency(value);
        if (cc === 71) return this.updateFilterResonance(value);
    }

    public updateFilterFrequency(value: number) {
        this.synth.set({ filterEnvelope: { baseFrequency: scalers.controlChangeToFilterFrequency(value) } });
    }

    public updateFilterResonance(value: number) {
        this.synth.set({ filter: { Q: scalers.controlChangeToFilterQ(value) } });
    }

    public updateFilterEnvelope(data: MidiControlChange) {
        const { controlChangeNumber: cc, value } = data;

        if (cc === 70) return this.updateFilterEnvelopeAttack(value);
        if (cc === 71) return this.updateFilterEnvelopeDecay(value);
        if (cc === 72) return this.updateFilterEnvelopeSustain(value);
        if (cc === 73) return this.updateFilterEnvelopeRelease(value);
        if (cc === 74) return this.updateFilterEnvelopeAmount(value);
    }

    public updateFilterEnvelopeAttack(value: number) {
        this.synth.set({ filterEnvelope: { attack: scalers.controlChangeToEnvelopeAttack(value) } });
    }

    public updateFilterEnvelopeDecay(value: number) {
        this.synth.set({ filterEnvelope: { decay: scalers.controlChangeToEnvelopeDecay(value) } });
    }

    public updateFilterEnvelopeSustain(value: number) {
        this.synth.set({ filterEnvelope: { sustain: scalers.controlChangeToEnvelopeSustain(value) } });
    }

    public updateFilterEnvelopeRelease(value: number) {
        this.synth.set({ filterEnvelope: { release: scalers.controlChangeToEnvelopeRelease(value) } });
    }

    public updateFilterEnvelopeAmount(value: number) {
        this.synth.set({ filterEnvelope: { octaves: scalers.controlChangeToEnvelopeAmount(value) } });
    }

    public updateAmpEnvelope(data: MidiControlChange) {
        const { controlChangeNumber: cc, value } = data;

        if (cc === 70) return this.updateAmpEnvelopeAttack(value);
        if (cc === 71) return this.updateAmpEnvelopeDecay(value);
        if (cc === 72) return this.updateAmpEnvelopeSustain(value);
        if (cc === 73) return this.updateAmpEnvelopeRelease(value);
    }

    public updateAmpEnvelopeAttack(value: number) {
        this.synth.set({ envelope: { attack: scalers.controlChangeToEnvelopeAttack(value) } });
    }

    public updateAmpEnvelopeDecay(value: number) {
        this.synth.set({ envelope: { decay: scalers.controlChangeToEnvelopeDecay(value) } });
    }

    public updateAmpEnvelopeSustain(value: number) {
        this.synth.set({ envelope: { sustain: scalers.controlChangeToEnvelopeSustain(value) } });
    }

    public updateAmpEnvelopeRelease(value: number) {
        this.synth.set({ envelope: { attack: scalers.controlChangeToEnvelopeRelease(value) } });
    }

    public onNoteOn(data: MidiNoteOn) {
        if (this.activeNotes.includes(data.noteNumber)) return;

        this.addActiveNote(data.noteNumber);

        const velocity = data.velocity / 127;

        this.synth.triggerAttack(
            Tone.Frequency(data.noteNumber, 'midi').toFrequency(),
            Tone.now(),
            velocity
        );
    }

    public onNoteOff(data: MidiNoteOff) {
        this.removeActiveNote(data.noteNumber);

        this.synth.triggerRelease(Tone.Frequency(data.noteNumber, 'midi').toFrequency());
    }

    public toDestination() {
        this.synth.toDestination();
    }

    private removeActiveNote(noteNumber: number) {
        this.activeNotes = this.activeNotes.filter(activeNote => activeNote !== noteNumber);
    }

    private addActiveNote(noteNumber: number) {
        this.activeNotes = [noteNumber, ...this.activeNotes];
    }
}

const synth = new Synth();

export { synth };
