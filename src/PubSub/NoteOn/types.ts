interface NoteOn {
    noteNumber: number;
    velocity: number;
}

type NoteOnHandler = (message: string, data: NoteOn) => void;

export type { NoteOn, NoteOnHandler };
