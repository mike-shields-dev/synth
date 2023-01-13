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
                type="range"
            />
        </div>
    )
};

export { Slider };