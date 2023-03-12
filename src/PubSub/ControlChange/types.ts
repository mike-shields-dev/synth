interface ControlChange {
    controlChangeNumber: number;
    value: number;
}

type ControlChangeHandler = (message: string, data: ControlChange) => void;

export type {
    ControlChange,
    ControlChangeHandler,
};
