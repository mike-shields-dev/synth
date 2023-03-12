
interface SliderProps {
    controlChangeNumber: number;
    group: string;
    initVal: number;
    isFocused: boolean;
    parameter: string;
    scalers: {
        in: (n: number) => number;
        out: (n: number) => number;
    };
};

export type { SliderProps };
