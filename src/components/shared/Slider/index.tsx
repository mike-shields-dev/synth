import PubSub from "pubsub-js";
import { useEffect, useState } from "react";
import { MidiControlChangeSubscriber } from "../../../../PubSub/MidiControlChange";
import { MidiControlChange } from "../../../../PubSub/MidiControlChange/types";
import { camelCaseToTitleCase } from "../../../utils/camelCaseToTitleCase";
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
}

function Slider({
    controlChangeNumber,
    initVal,
    group,
    isFocused,
    parameter,
    scalers,
}: Props) {
    const [value, setValue] = useState(scalers.in(initVal));
    const outputValue = scalers.out(value);

    useEffect(() => {
        PubSub.publish('uiControlChange', {
            group,
            parameter,
            value: outputValue,
        })
    }, [value]);

    function onMidiControlChange(
        message: string, 
        payload: MidiControlChange
    ) {
        if (!isFocused) return;
        
        if (payload.controlChangeNumber === controlChangeNumber) {
            setValue(payload.value);
        }
    }

    useEffect(() => {
        const midiControlChangeSubscription = 
        new MidiControlChangeSubscriber(onMidiControlChange)
        
        return () => { 
            midiControlChangeSubscription.unsubscribe()
        };

    }, [isFocused])

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
                {scalers.out(value)}
            </output>
        </div>
    )
};

export { Slider };
