import * as Tone from 'tone';
import { MidiNoteOff, MidiNoteOffSubscriber, MidiNoteOn, MidiNoteOnSubscriber } from '../PubSub';

class PolySynth {
    private synth = new Tone.PolySynth;
    #activeNotes: number[] = [];

    constructor() {
        new MidiNoteOnSubscriber((_: string, data: MidiNoteOn) => {
            this.onNoteOn(data);
        });

        new MidiNoteOffSubscriber((_: string, data: MidiNoteOff) => {
            this.onNoteOff(data);
        })

        this.synth.toDestination();
    }

    private removeActiveNote(noteNumber: number) {
        this.#activeNotes = this.#activeNotes.filter(activeNote => activeNote !== noteNumber);
    }

    private addActiveNote(noteNumber: number) {
        this.#activeNotes = [noteNumber, ...this.#activeNotes];
    }

    public get activeNotes() {
        return this.#activeNotes;
    }

    public onNoteOn(data: MidiNoteOn) {
        if (this.#activeNotes.includes(data.noteNumber)) return;
        
        this.addActiveNote(data.noteNumber);

        const frequency = Tone.Frequency(data.noteNumber, 'midi').toFrequency();
        const velocity = data.velocity / 127;
        
        this.synth.triggerAttack(frequency, '1n', velocity);
    }


    public onNoteOff(data: MidiNoteOff) {
        this.removeActiveNote(data.noteNumber);

        const frequency = Tone.Frequency(data.noteNumber, 'midi').toFrequency();
        
        this.synth.triggerRelease(frequency);
    }

    public toDestination() {
        this.synth.toDestination();
    }
}

export { PolySynth };
