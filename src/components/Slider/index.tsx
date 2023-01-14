import React from "react";

interface Props {
    displayName: string;
    groupName: string;
    onChange: (e: React.ChangeEvent) => void;
    parameter: string;
}

function Slider({
    displayName, 
    groupName,
    onChange,
    parameter,
}: Props) {
    return (
        <div data-testid="Slider">
            <label htmlFor={`${groupName}:${parameter}`}>
                {displayName}
            </label> 
            <input
                id={`${groupName}:${parameter}`}
                max={127}
                min={0}
                onChange={onChange}
                step={0.05}
                type="range"
            />
        </div>
    )
};

export { Slider };
