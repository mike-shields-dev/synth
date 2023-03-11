import * as scalers from "../../../utils/Scalers";
import { Slider } from "../_shared/Slider";
import { SynthParameterGroup } from "../_shared/SynthParameterGroup";
import config from "../../../config";
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
          initVal={+config.filterEnvelope.baseFrequency}
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
          initVal={+config.filter.Q}
          parameter="resonance"
          scalers={{
            out: scalers.controlChangeToFilterResonance,
            in: scalers.filterResonanceToControlChange,
          }}
        />
      </>}
    </SynthParameterGroup>
  )
}

export { Filter };
