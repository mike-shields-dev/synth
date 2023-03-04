import { synthConfig } from "../../config";
import * as scalers from "../../utils/Scalers";
import { Slider } from "../_shared/Slider";
import { SynthParameterGroup } from "../_shared/SynthParameterGroup";

interface Props {
    focus: string;
    updateFocus: (id: string) => void;
}

function FilterEnvelope({ focus, updateFocus }: Props) {
    return (
        <SynthParameterGroup
        group="filterEnvelope"
        isFocused={focus === "filterEnvelope"}
        updateFocus={updateFocus}
      >
        {(isFocused: boolean) => <>
          <Slider
            isFocused={isFocused}
            controlChangeNumber={70}
            group="filterEnvelope"
            initVal={+synthConfig.filterEnvelope.attack}
            parameter="attack"
            scaler={scalers.controlChangeToEnvelopeAttack}
          />
          <Slider
            controlChangeNumber={71}
            group="filterEnvelope"
            initVal={+synthConfig.filterEnvelope.decay}
            isFocused={isFocused}
            parameter="decay"
            scaler={scalers.controlChangeToEnvelopeDecay}
          />
          <Slider
            controlChangeNumber={72}
            group="filterEnvelope"
            isFocused={isFocused}
            initVal={+synthConfig.filterEnvelope.sustain}
            parameter="sustain"
            scaler={scalers.controlChangeToEnvelopeSustain}
          />
          <Slider
            controlChangeNumber={73}
            group="filterEnvelope"
            initVal={+synthConfig.filterEnvelope.release}
            isFocused={isFocused}
            parameter="release"
            scaler={scalers.controlChangeToEnvelopeRelease}
          />
          <Slider
            controlChangeNumber={74}
            group="filterEnvelope"
            initVal={+synthConfig.filterEnvelope.octaves}
            isFocused={isFocused}
            parameter="amount"
            scaler={scalers.controlChangeToEnvelopeAmount}
          />
        </>}
      </SynthParameterGroup>

    )
}

export { FilterEnvelope };
