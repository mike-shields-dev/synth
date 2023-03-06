interface MidiNoteOn {
    noteNumber: number;
    velocity: number;
}

type MidiNoteOnHandler = (message: string, data: MidiNoteOn) => void;

export type { MidiNoteOn, MidiNoteOnHandler };
