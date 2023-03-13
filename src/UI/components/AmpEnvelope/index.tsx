import config from "../../../config";
import * as scalers from "../../../utils/Scalers";
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
            initVal={+config.envelope.attack}
            parameter="A"
            scalers={{
              out: scalers.controlChangeToAmpEnvelopeAttack,
              in: scalers.envelopeAttackToControlChange,
            }}
          />
          <Slider
            isFocused={isFocused}
            controlChangeNumber={71}
            group="envelope"
            initVal={+config.envelope.decay}
            parameter="D"
            scalers={{
              out: scalers.controlChangeToAmpEnvelopeDecay,
              in: scalers.envelopeDecayToControlChange,
            }}
          />
          <Slider
            isFocused={isFocused}
            controlChangeNumber={72}
            group="envelope"
            initVal={+config.envelope.sustain}
            parameter="S"
            scalers={{
              out: scalers.controlChangeToAmpEnvelopeSustain,
              in: scalers.envelopeSustainToControlChange,
            }}
          />
          <Slider
            isFocused={isFocused}
            controlChangeNumber={73}
            group="release"
            initVal={+config.envelope.release}
            parameter="R"
            scalers={{
              out: scalers.controlChangeToAmpEnvelopeRelease,
              in: scalers.envelopeReleaseToControlChange,
            }}
          />
        </>}
      </SynthParameterGroup>
    )
}

export { AmpEnvelope };
