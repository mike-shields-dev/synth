import { SynthParameterGroup } from "../shared/SynthParameterGroup";
import { Slider } from "../shared/Slider";
import { synthConfig } from "../../config";
import * as scalers from "../../utils/Scalers";

interface Props {
    focus: string;
    updateFocus: (id: string) => void;
}

function FilterEnvelope({ focus, updateFocus }: Props) {
    return (
        <SynthParameterGroup
        group="filterEnvelope"
        title="Filter Envelope"
        isFocused={focus === "filterEnvelope"}
        updateFocus={updateFocus}
      >
        {(isFocused: boolean) => <>
          <Slider
            isFocused={isFocused}
            controlChangeNumber={70}
            displayName="Attack"
            groupName="filterEnvelope"
            initVal={+synthConfig.filterEnvelope.attack}
            parameter="attack"
            scalers={{
              out: scalers.controlChangeToEnvelopeAttack,
              in: scalers.envelopeAttackToControlChange,
            }}
          />
          <Slider
            controlChangeNumber={71}
            displayName="Decay"
            groupName="filterEnvelope"
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
            displayName="Sustain"
            groupName="filterEnvelope"
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
            displayName="Release"
            groupName="filterEnvelope"
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
            displayName="Amount"
            groupName="filterEnvelope"
            initVal={+synthConfig.filterEnvelope.octaves}
            isFocused={isFocused}
            parameter="octaves"
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