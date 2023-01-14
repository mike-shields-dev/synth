import React from 'react';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { Slider } from '../Slider';
import { SynthParameterGroup } from '../SynthParameterGroup';
import { SynthUI } from '../SynthUI';
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
          <input type="range" />
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
            onChange={onChange} 
            parameter='frequency'
          />
          <Slider 
            displayName="resonance" 
            groupName="filter" 
            onChange={onChange} 
            parameter="Q"
          />
          <Slider 
            displayName="slope" 
            groupName="filter" 
            onChange={onChange} 
            parameter="rolloff"
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
            onChange={onChange} 
            parameter="attack"
          />
          <Slider 
            displayName="Decay" 
            groupName="filterEnvelope" 
            onChange={onChange} 
            parameter="decay"
          />
          <Slider 
            displayName="Sustain" 
            groupName="filterEnvelope" 
            onChange={onChange} 
            parameter="sustain"
          />
          <Slider 
            displayName="Release" 
            groupName="filterEnvelope" 
            onChange={onChange} 
            parameter="release"
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
            onChange={onChange} 
            parameter="attack"
          />
          <Slider 
            displayName="Decay" 
            groupName="envelope" 
            onChange={onChange} 
            parameter="decay"
          />
          <Slider 
            displayName="Sustain" 
            groupName="envelope" 
            onChange={onChange} 
            parameter="sustain"
          />
          <Slider 
            displayName="Release" 
            groupName="envelope" 
            onChange={onChange} 
            parameter="release"
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
