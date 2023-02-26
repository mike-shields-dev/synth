import { SynthParameterGroup } from "../shared/SynthParameterGroup";
import { Slider } from "../shared/Slider";
import { synthConfig } from "../../config";
import * as scalers from "../../utils/Scalers";

interface Props { 
    focus: string;
    updateFocus: (id: string) => void;
}

function Filter({ focus, updateFocus }: Props) {
    return (
<SynthParameterGroup
          group="filter"
          title="Filter"
          isFocused={focus === "filter"}
          updateFocus={updateFocus}
        >
          {(isFocused: boolean) => <>
            <Slider
              isFocused={isFocused}
              controlChangeNumber={70}
              displayName='frequency'
              groupName="filterEnvelope"
              initVal={+synthConfig.filterEnvelope.baseFrequency}
              parameter='baseFrequency'
              scalers={{
                out: scalers.controlChangeToFilterFrequency,
                in: scalers.filterFrequencyToControlChange,
              }}
            />
            <Slider
              isFocused={isFocused}
              controlChangeNumber={71}
              displayName="resonance"
              groupName="filter"
              initVal={+synthConfig.filter.Q}
              parameter="Q"
              scalers={{
                out: scalers.controlChangeToFilterQ,
                in: scalers.filterQToControlChange,
              }}
            />
          </>}
        </SynthParameterGroup>
    )
}

export { Filter };