import React from 'react';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { Slider } from '../Slider';
import { SynthParameterGroup } from '../SynthParameterGroup';
import { SynthUI } from '../SynthUI';
import * as scalers from '../../utils/Scalers';
import './index.module.css';

function App() {
  const [focus, setFocus] = useSessionStorage('focus', "");

  function updateFocus(id: string) {
    setFocus(id);
  }
  
  function onChange(e: React.ChangeEvent) {
    const { value } = e.target as HTMLInputElement;
    console.log(value);
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
            onChange={onChange}
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
            onChange={onChange} 
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
            onChange={onChange} 
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
            onChange={onChange} 
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
            onChange={onChange} 
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
            onChange={onChange} 
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
            onChange={onChange} 
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
            onChange={onChange} 
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
            onChange={onChange} 
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
            onChange={onChange} 
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
