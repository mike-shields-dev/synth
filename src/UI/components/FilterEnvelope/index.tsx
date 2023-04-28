import * as scalers from "../../../utils/Scalers";
import { Slider } from "../_shared/Slider/Slider";
import { SynthParameterGroup } from "../_shared/SynthParameterGroup";
import config from "../../../config";

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
            initVal={+config.filterEnvelope.attack}
            parameter="A"
            scalers={{
              out: scalers.controlChangeToFilterEnvelopeAttack,
              in: scalers.filterEnvelopeAttackToControlChange,
            }}
          />
          <Slider
            controlChangeNumber={71}
            group="filterEnvelope"
            initVal={+config.filterEnvelope.decay}
            isFocused={isFocused}
            parameter="D"
            scalers={{
              out: scalers.controlChangeToFilterEnvelopeDecay,
              in: scalers.filterEnvelopeDecayToControlChange,
            }}
          />
          <Slider
            controlChangeNumber={72}
            group="filterEnvelope"
            isFocused={isFocused}
            initVal={+config.filterEnvelope.sustain}
            parameter="S"
            scalers={{
              out: scalers.controlChangeToFilterEnvelopeSustain,
              in: scalers.filterEnvelopeSustainToControlChange,
            }}
          />
          <Slider
            controlChangeNumber={73}
            group="filterEnvelope"
            initVal={+config.filterEnvelope.release}
            isFocused={isFocused}
            parameter="R"
            scalers={{
              out: scalers.controlChangeToFilterEnvelopeRelease,
              in: scalers.filterEnvelopeReleaseToControlChange,
            }}
          />
          <Slider
            controlChangeNumber={74}
            group="filterEnvelope"
            initVal={+config.filterEnvelope.octaves}
            isFocused={isFocused}
            parameter="Amnt"
            scalers={{
              out: scalers.controlChangeToFilterEnvelopeAmount,
              in: scalers.filterEnvelopeAmountToControlChange,
            }}
          />
        </>}
      </SynthParameterGroup>

    )
}

export { FilterEnvelope };
