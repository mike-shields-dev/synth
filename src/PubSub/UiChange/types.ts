interface UiChange {
    group: string;
    parameter: string;
    value: number;
}

type UiChangeHandler = (message: string, payload: UiChange) => void;

export type {
    UiChange,
    UiChangeHandler,
};
