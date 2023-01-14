interface Props {
    groupName: string;
    parameter: string;
    displayName: string;
}

function Slider({
    groupName,
    parameter,
    displayName
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
                step={0.05}
                type="range"
            />
        </div>
    )
};

export { Slider };