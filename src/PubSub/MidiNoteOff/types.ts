interface MidiNoteOff {
    noteNumber: number;
}

type MidiNoteOffHandler = (message: string, data: MidiNoteOff) => void;

export type { MidiNoteOff, MidiNoteOffHandler };
