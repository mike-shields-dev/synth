interface UiControlChange {
    group: string;
    parameter: string;
    value: number;
}

type UiControlChangeHandler = (message: string, payload: UiControlChange) => void;

export type {
    UiControlChange,
    UiControlChangeHandler,
};