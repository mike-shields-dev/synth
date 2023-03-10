import { synthConfig } from "../../../config";
import * as scalers from "../../../utils/Scalers";
import { Slider } from "../_shared/Slider";
import { SynthParameterGroup } from "../_shared/SynthParameterGroup";
import { synth } from '../../../Synth';

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
            updateSynth={synth.updateAmpEnvelopeAttack.bind(synth)}
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
            updateSynth={synth.updateAmpEnvelopeDecay.bind(synth)}
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
            updateSynth={synth.updateAmpEnvelopeSustain.bind(synth)}
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
            updateSynth={synth.updateAmpEnvelopeRelease.bind(synth)}
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
