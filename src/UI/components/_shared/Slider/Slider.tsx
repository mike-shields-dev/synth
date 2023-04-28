import { useEffect, useState } from "react";
import { ControlChange, ControlChangeSubscriber, publishControlChange } from "../../../../PubSub";
import { camelCaseToTitleCase } from "../../../../utils/camelCaseToTitleCase";
import css from './Slider.module.css';

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

function Slider({
    controlChangeNumber,
    initVal,
    group,
    isFocused,
    parameter,
    scalers,
}: SliderProps) { 
    const [value, setValue] = useState(scalers.in(initVal));
    const outputValue = scalers.out(value);

    function onControlChange(
        message: string,
        data: ControlChange
    ) {
        if (data.controlChangeNumber === controlChangeNumber) {
            setValue(data.value);
        }
    };

    function onSliderChange(e: React.FormEvent<HTMLInputElement>) {
        if (!isFocused) return;
        const { value } = e.currentTarget;
        
        setValue(+value);
        publishControlChange({
            controlChangeNumber,
            value: +value,
        });
    }

    useEffect(() => {
        if (!isFocused) return;

        const midiControlChangeSubscription =
            new ControlChangeSubscriber(onControlChange)

        return () => {
            midiControlChangeSubscription.unsubscribe()
        };
    }, [isFocused]);

    return (
        <div className={css.Slider}>
            <label htmlFor={`${group}-${parameter}`}>
                {camelCaseToTitleCase(parameter)}
            </label>
            <input
                id={`${group}-${parameter}`}
                max={127}
                min={0}
                onChange={onSliderChange}
                step={0.05}
                type="range"
                value={value}
            />
            <output
                aria-label={`${camelCaseToTitleCase(group)} ${parameter}`}
                htmlFor={`${group}-${parameter}`}
            >
                {outputValue}
            </output>
        </div>
    );
};

export default Slider;
