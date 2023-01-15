import React, { useState } from "react";
import { useSessionStorage } from "usehooks-ts";

interface ParameterChange {
    parameter: string;
    value: number;
}
interface Props {
    controlChangeNumber: number;
    displayName: string;
    groupName: string;
    initVal: number;
    onParameterChange: (p: ParameterChange) => void;
    parameter: string;
    scalers: {
        out: (n: number) => number;
        in: (n: number) => number;
    };
}

function Slider({
    controlChangeNumber,
    displayName, 
    groupName,
    initVal,
    onParameterChange,
    parameter,
    scalers,
}: Props) {
    const [focus] = useSessionStorage('focus', '');
    const [inputVal, setInputVal] = useState(scalers.in(initVal));
    const outputVal = scalers.out(inputVal)

    console.log(focus)

    function onChange(e: React.ChangeEvent) {
        const { value } = e.target as HTMLInputElement;
        setInputVal(+value);
        onParameterChange({
            parameter: `${groupName}::${parameter}`,
            value: outputVal,
        });
    }
    
    return (
        <div data-testid="Slider">
            <label htmlFor={`${groupName}::${parameter}`}>
                {displayName}
            </label> 
                <input
                    id={`${groupName}::${parameter}`}
                    max={127}
                    min={0}
                    onChange={onChange}
                    step={0.05}
                    type="range"
                    value={inputVal}
                />
            <output htmlFor={`${groupName}::${parameter}`}>
                {scalers.out(inputVal)}
            </output>
        </div>
    )
};

export { Slider };
