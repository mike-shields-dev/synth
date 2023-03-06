import { useEffect, useState } from "react";
import { MidiControlChange, MidiControlChangeSubscriber, publishUiChange } from "../../../../PubSub";
import { camelCaseToTitleCase } from "../../../../utils/camelCaseToTitleCase";
import { SliderProps } from "./types";

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

    function onMidiControlChange(
        message: string,
        data: MidiControlChange
    ) {
        if (data.controlChangeNumber === controlChangeNumber) {
            
            setValue(data.value);

            publishUiChange({
                group, 
                parameter,
                value: outputValue,
            });
        }
    };

    useEffect(() => {
        if (!isFocused) return;

        const midiControlChangeSubscription =
            new MidiControlChangeSubscriber(onMidiControlChange)

        return () => {
            midiControlChangeSubscription.unsubscribe()
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
