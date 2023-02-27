interface MidiNoteOn {
    noteNumber: number;
    velocity: number;
}

type MidiNoteOnHandler = (message: string, payload: MidiNoteOn) => void;

export type { MidiNoteOn, MidiNoteOnHandler };