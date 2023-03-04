import { useEffect, useState } from "react";
import { MidiControlChange, MidiControlChangeSubscriber, publishUiChange } from "../../../PubSub";
import { camelCaseToTitleCase } from "../../../utils/camelCaseToTitleCase";
import { formatNumber } from "../../../utils/formatNumber";


interface Props {
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
}: Props) {
    const [value, setValue] = useState(scalers.in(initVal));
    const outputValue: string = formatNumber(scalers.out(value)) || "";
    const [integers, decimals]: string[] = outputValue?.split(".");

    useEffect(() => {
        publishUiChange({
            group,
            parameter,
            value: Number(outputValue),
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
                <span>
                    <span>{integers}</span>
                    <span style={{ color: "yellow" }}>{integers && decimals ? "." : ""}</span>
                    <span style={{ opacity: 0.6 }}>{decimals}</span>
                </span>
            </output>
        </div>
    );
};

export { Slider };
