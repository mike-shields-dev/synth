import { useSessionStorage } from '../../hooks/useSessionStorage';
import * as scalers from '../../utils/Scalers';
import { Slider } from '../Slider';
import { SynthParameterGroup } from '../SynthParameterGroup';
import { SynthUI } from '../SynthUI';
import './index.module.css';

function App() {
  const [focus, setFocus] = useSessionStorage('focus', "");

  function updateFocus(id: string) {
    setFocus(id);
  }
  
  function onParameterChange(parameterChange: any) {
    console.log(parameterChange.parameter, parameterChange.value);
  }

  return (
    <div className="App">
      <SynthUI>
        <SynthParameterGroup 
          groupName="oscillator"
          headerName="Oscillator"
          isFocused={focus === "oscillator"}
          updateFocus={updateFocus}
        >
        </SynthParameterGroup>

        <SynthParameterGroup 
          groupName="filter"
          headerName="Filter"
          isFocused={focus === "filter"}
          updateFocus={updateFocus}
        >
          <Slider 
            displayName='frequency'
            groupName="filter"
            initVal={+synthConfig.filterEnvelope.baseFrequency}
            onParameterChange={onParameterChange}
            parameter='frequency'
            scalers={{
                out: scalers.controlChangeToFilterFrequency,
                in: scalers.filterFrequencyToControlChange,
            }}
          />
          <Slider 
            displayName="resonance" 
            groupName="filter"
            initVal={+synthConfig.filter.Q}
            onParameterChange={onParameterChange} 
            parameter="Q"
            scalers={{
              out: scalers.controlChangeToFilterQ,
              in: scalers.filterQToControlChange,
            }}
          />
        </SynthParameterGroup>

        <SynthParameterGroup 
          groupName="filterEnvelope"
          headerName="Filter Envelope"
          isFocused={focus === "filterEnvelope"}
          updateFocus={updateFocus}
        >
          <Slider 
            displayName="Attack" 
            groupName="filterEnvelope" 
            initVal={+synthConfig.filterEnvelope.attack}
            onParameterChange={onParameterChange} 
            parameter="attack"
            scalers={{
              out: scalers.controlChangeToEnvelopeAttack,
              in: scalers.envelopeAttackToControlChange,
            }}
          />
          <Slider 
            displayName="Decay" 
            groupName="filterEnvelope" 
            initVal={+synthConfig.filterEnvelope.decay}
            onParameterChange={onParameterChange} 
            parameter="decay"
            scalers={{
              out: scalers.controlChangeToEnvelopeDecay,
              in: scalers.envelopeDecayToControlChange,
            }}
          />
          <Slider 
            displayName="Sustain" 
            groupName="filterEnvelope" 
            initVal={+synthConfig.filterEnvelope.sustain}
            onParameterChange={onParameterChange} 
            parameter="sustain"
            scalers={{
              out: scalers.controlChangeToEnvelopeSustain,
              in: scalers.envelopeSustainToControlChange,
            }}
          />
          <Slider 
            displayName="Release" 
            groupName="filterEnvelope" 
            initVal={+synthConfig.filterEnvelope.release}
            onParameterChange={onParameterChange} 
            parameter="release"
            scalers={{
              out: scalers.controlChangeToEnvelopeRelease,
              in: scalers.envelopeReleaseToControlChange,
            }}
          />
        </SynthParameterGroup>

        <SynthParameterGroup 
          groupName="envelope"
          headerName="Amp Envelope"
          isFocused={focus === "envelope"}
          updateFocus={updateFocus}
        >
          <Slider 
            displayName="Attack" 
            groupName="envelope" 
            initVal={+synthConfig.envelope.attack}
            onParameterChange={onParameterChange} 
            parameter="attack"
            scalers={{
              out: scalers.controlChangeToEnvelopeAttack,
              in: scalers.envelopeAttackToControlChange,
            }}
          />
          <Slider 
            displayName="Decay" 
            groupName="envelope" 
            initVal={+synthConfig.envelope.decay}
            onParameterChange={onParameterChange} 
            parameter="decay"
            scalers={{
              out: scalers.controlChangeToEnvelopeDecay,
              in: scalers.envelopeDecayToControlChange,
            }}
          />
          <Slider 
            displayName="Sustain" 
            groupName="envelope"
            initVal={+synthConfig.envelope.sustain}
            onParameterChange={onParameterChange} 
            parameter="sustain"
            scalers={{
              out: scalers.controlChangeToEnvelopeSustain,
              in: scalers.envelopeSustainToControlChange,
            }}
          />
          <Slider 
            displayName="Release" 
            groupName="envelope" 
            initVal={+synthConfig.envelope.release}
            onParameterChange={onParameterChange} 
            parameter="release"
            scalers={{
              out: scalers.controlChangeToEnvelopeRelease,
              in: scalers.envelopeReleaseToControlChange,
            }}
          />
        </SynthParameterGroup>
      </SynthUI> 
    </div>
  )
}

const synthConfig = {
  oscillator: {
      type: "sawtooth",
      volume: 1,
      phase: 0,
      mute: false,
      onstop: () => null,
  },
  filter: {
      type: 'lowpass',
      detune: 0,
      frequency: 0,
      gain: 1,
      Q: 6,
      rolloff: -12,
  }, 
  envelope: {
      attack: 0.0001,
      attackCurve: "linear",
      decay: 0.5,
      decayCurve: "linear",
      sustain: 1,
      release: 1,
      releaseCurve: "linear",
  },
  detune: 0,
  filterEnvelope: {
      attack: 0.5,
      attackCurve: "linear",
      baseFrequency: 2000,
      decay: 0.5,
      decayCurve: 'linear',
      exponent: 1,
      octaves: 2,
      sustain: 1,
      release: 1,
      releaseCurve: 'linear',
  },
  onsilence: () => null,
  portamento: 0,
  volume: 0,
}

export default App
