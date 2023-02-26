import PubSub from "pubsub-js";
import { useEffect, useState } from "react";
import { MIDIMessage } from '../../../types/MIDIMessage';

interface Props {
    controlChangeNumber: number;
    displayName: string;
    groupName: string;
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
    isFocused,
    displayName,
    groupName,
    initVal,
    parameter,
    scalers,
}: Props) {
    const [value, setValue] = useState(scalers.in(initVal));


    useEffect(() => {
        PubSub.publish('uiControlChange', {
            controlChangeNumber,
            value,
        })
    }, [value]);

    function onMidiMessage(message: string, payload: MIDIMessage) {
        if (!isFocused) return;
        
        const {
            statusByte,
            dataByte1: controlChange,
            dataByte2: value
        } = payload;
        
        if (statusByte === 176 && controlChange === controlChangeNumber) {
            setValue(value);
        }
    }

    useEffect(() => {
        const sub = PubSub.subscribe('midiMessage', onMidiMessage);
        return () => { PubSub.unsubscribe(sub) };
    }, [isFocused])

    return (
        <div>
            <label htmlFor={`${groupName}::${parameter}`}>
                {displayName}
            </label>
            <input
                id={`${groupName}::${parameter}`}
                max={127}
                min={0}
                onChange={(e) => setValue(+e.currentTarget.value)}
                onInput={(e) => setValue(+e.currentTarget.value)}
                step={0.05}
                type="range"
                value={value}
            />
            <output 
                aria-label={`${groupName}::${parameter}`}
                htmlFor={`${groupName}::${parameter}`}
            >
                {scalers.out(value)}
            </output>
        </div>
    )
};

export { Slider };
