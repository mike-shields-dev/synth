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
          isFocused={focus === "filter"}
          updateFocus={updateFocus}
        >
          {(isFocused: boolean) => <>
            <Slider
              isFocused={isFocused}
              controlChangeNumber={70}
              group="filter"
              initVal={+synthConfig.filterEnvelope.baseFrequency}
              parameter='frequency'
              scalers={{
                out: scalers.controlChangeToFilterFrequency,
                in: scalers.filterFrequencyToControlChange,
              }}
            />
            <Slider
              isFocused={isFocused}
              controlChangeNumber={71}
              group="filter"
              initVal={+synthConfig.filter.Q}
              parameter="resonance"
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