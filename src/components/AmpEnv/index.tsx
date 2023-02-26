import { SynthParameterGroup } from "../shared/SynthParameterGroup";
import { Slider } from "../shared/Slider";
import { synthConfig } from "../../config";
import * as scalers from "../../utils/Scalers";

interface Props {
    focus: string;
    updateFocus: (id: string) => void;
}

function AmpEnvelope({ focus, updateFocus }: Props) {
    return (
        <SynthParameterGroup
        group="envelope"
        title="Amp Envelope"
        isFocused={focus === "envelope"}
        updateFocus={updateFocus}
      >
        {(isFocused: boolean) => <>
          <Slider
            isFocused={isFocused}
            controlChangeNumber={70}
            displayName="Attack"
            groupName="envelope"
            initVal={+synthConfig.envelope.attack}
            parameter="attack"
            scalers={{
              out: scalers.controlChangeToEnvelopeAttack,
              in: scalers.envelopeAttackToControlChange,
            }}
          />
          <Slider
            isFocused={isFocused}
            controlChangeNumber={71}
            displayName="Decay"
            groupName="envelope"
            initVal={+synthConfig.envelope.decay}
            parameter="decay"
            scalers={{
              out: scalers.controlChangeToEnvelopeDecay,
              in: scalers.envelopeDecayToControlChange,
            }}
          />
          <Slider
            isFocused={isFocused}
            controlChangeNumber={72}
            displayName="Sustain"
            groupName="envelope"
            initVal={+synthConfig.envelope.sustain}
            parameter="sustain"
            scalers={{
              out: scalers.controlChangeToEnvelopeSustain,
              in: scalers.envelopeSustainToControlChange,
            }}
          />
          <Slider
            isFocused={isFocused}
            controlChangeNumber={73}
            displayName="Release"
            groupName="envelope"
            initVal={+synthConfig.envelope.release}
            parameter="release"
            scalers={{
              out: scalers.controlChangeToEnvelopeRelease,
              in: scalers.envelopeReleaseToControlChange,
            }}
          />
        </>}
      </SynthParameterGroup>
    )
}

export { AmpEnvelope };