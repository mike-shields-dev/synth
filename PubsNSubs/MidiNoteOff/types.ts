interface MidiNoteOff {
    noteNumber: number;
}

type MidiNoteOffHandler = (message: string, payload: MidiNoteOff) => void;

export type { MidiNoteOff, MidiNoteOffHandler };