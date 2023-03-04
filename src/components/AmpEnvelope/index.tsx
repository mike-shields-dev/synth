import { synthConfig } from "../../config";
import * as scalers from "../../utils/Scalers";
import { Slider } from "../_shared/Slider";
import { SynthParameterGroup } from "../_shared/SynthParameterGroup";

interface Props {
    focus: string;
    updateFocus: (id: string) => void;
}

function AmpEnvelope({ focus, updateFocus }: Props) {
    return (
        <SynthParameterGroup
        group="ampEnvelope"
        isFocused={focus === "ampEnvelope"}
        updateFocus={updateFocus}
      >
        {(isFocused: boolean) => <>
          <Slider
            isFocused={isFocused}
            controlChangeNumber={70}
            group="envelope"
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
            group="envelope"
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
            group="envelope"
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
            group="envelope"
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
