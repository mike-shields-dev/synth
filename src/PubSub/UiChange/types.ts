interface UiChange {
    group: string;
    parameter: string;
    value: number;
}

type UiChangeHandler = (message: string, data: UiChange) => void;

export type {
    UiChange,
    UiChangeHandler,
};
