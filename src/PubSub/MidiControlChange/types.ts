interface MidiControlChange {
    controlChangeNumber: number;
    value: number;
}

type MidiControlChangeHandler = (message: string, data: MidiControlChange) => void;

export type {
    MidiControlChange,
    MidiControlChangeHandler,
};
