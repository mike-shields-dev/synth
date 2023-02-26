import { SynthParameterGroup } from "../shared/SynthParameterGroup";

interface Props {
    focus: string;
    updateFocus: (id: string) => void;
}

function Oscillator({focus, updateFocus}: Props) {
    return (
        <SynthParameterGroup
            group="oscillator"
            title="Oscillator"
            isFocused={focus === "oscillator"}
            updateFocus={updateFocus}
        >
            {(isFocused: boolean) => <></>}
        </SynthParameterGroup>
    )
}

export { Oscillator };
