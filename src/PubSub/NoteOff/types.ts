interface NoteOff {
    noteNumber: number;
}

type NoteOffHandler = (message: string, data: NoteOff) => void;

export type { NoteOff, NoteOffHandler };
