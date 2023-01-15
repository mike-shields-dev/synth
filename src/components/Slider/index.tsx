import React, { useState } from "react";

interface Props {
    displayName: string;
    groupName: string;
    initVal: number;
    onChange: (e: React.ChangeEvent) => void;
    parameter: string;
    scalers: {
        out: (n: number) => number;
        in: (n: number) => number;
    };
}

function Slider({
    displayName, 
    groupName,
    initVal,
    parameter,
    scalers,
}: Props) {
    const [inputVal, setInputVal] = useState(scalers.in(initVal));
    
    return (
        <div data-testid="Slider">
            <label htmlFor={`${groupName}::${parameter}`}>
                {displayName}
            </label> 
                <input
                    id={`${groupName}::${parameter}`}
                    max={127}
                    min={0}
                    onChange={e => setInputVal(+e.target.value)}
                    step={0.05}
                    type="range"
                    value={inputVal}
                />
            <output
                htmlFor={`${groupName}::${parameter}`}
            >
                {scalers.out(inputVal)}
            </output>
        </div>
    )
};

export { Slider };
