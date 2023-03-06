import { synthConfig } from "../../../config";
import * as scalers from "../../../utils/Scalers";
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
            scalers={{
              out: scalers.controlChangeToEnvelopeAttack,
              in: scalers.envelopeAttackToControlChange,
            }}
          />
          <Slider
            controlChangeNumber={71}
            group="filterEnvelope"
            initVal={+synthConfig.filterEnvelope.decay}
            isFocused={isFocused}
            parameter="decay"
            scalers={{
              out: scalers.controlChangeToEnvelopeDecay,
              in: scalers.envelopeDecayToControlChange,
            }}
          />
          <Slider
            controlChangeNumber={72}
            group="filterEnvelope"
            isFocused={isFocused}
            initVal={+synthConfig.filterEnvelope.sustain}
            parameter="sustain"
            scalers={{
              out: scalers.controlChangeToEnvelopeSustain,
              in: scalers.envelopeSustainToControlChange,
            }}
          />
          <Slider
            controlChangeNumber={73}
            group="filterEnvelope"
            initVal={+synthConfig.filterEnvelope.release}
            isFocused={isFocused}
            parameter="release"
            scalers={{
              out: scalers.controlChangeToEnvelopeRelease,
              in: scalers.envelopeReleaseToControlChange,
            }}
          />
          <Slider
            controlChangeNumber={74}
            group="filterEnvelope"
            initVal={+synthConfig.filterEnvelope.octaves}
            isFocused={isFocused}
            parameter="amount"
            scalers={{
              out: scalers.controlChangeToEnvelopeAmount,
              in: scalers.envelopeAmountToControlChange,
            }}
          />
        </>}
      </SynthParameterGroup>

    )
}

export { FilterEnvelope };
