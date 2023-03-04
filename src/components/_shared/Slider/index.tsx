import { useState, useEffect } from "react";
import { MidiControlChange, MidiControlChangeSubscriber, publishUiChange } from "../../../PubSub";
import { camelCaseToTitleCase } from "../../../utils/camelCaseToTitleCase";

interface Props {
    controlChangeNumber: number;
    group: string;
    initVal: number;
    isFocused: boolean;
    parameter: string;
    scaler: (n: number) => number;
};

function Slider({
    controlChangeNumber,
    initVal,
    group,
    isFocused,
    parameter,
    scaler,
}: Props) {
    const [value, setValue] = useState(initVal);
    const outputValue = scaler(value);

    useEffect(() => {
        publishUiChange({
            group, 
            parameter,
            value: outputValue,
        });
    }, [value]);

    function onMidiControlChange(
        message: string,
        payload: MidiControlChange
    ) {
        if (payload.controlChangeNumber === controlChangeNumber) {
            setValue(payload.value);
        }
    };

    useEffect(() => {
        if (!isFocused) return;

        const midiControlChangeSubscription =
            new MidiControlChangeSubscriber(onMidiControlChange);

        return () => {
            midiControlChangeSubscription.unsubscribe();
        };
    }, [isFocused]);

    return (
        <div>
            <label htmlFor={`${group}-${parameter}`}>
                {camelCaseToTitleCase(parameter)}
            </label>
            <input
                id={`${group}-${parameter}`}
                max={127}
                min={0}
                onChange={(e) => setValue(+e.currentTarget.value)}
                onInput={(e) => setValue(+e.currentTarget.value)}
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

export { Slider };
