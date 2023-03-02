interface MidiControlChange {
    controlChangeNumber: number;
    value: number;
}

type MidiControlChangeHandler = (message: string, payload: MidiControlChange) => void;

export type {
    MidiControlChange,
    MidiControlChangeHandler,
};