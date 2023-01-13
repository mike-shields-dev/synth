import { useSessionStorage } from '../../hooks/useSessionStorage';
import { SynthParameterGroup } from '../SynthParameterGroup';
import { SynthUI } from '../SynthUI';
import './index.module.css';

function App() {
  const [focus, setFocus] = useSessionStorage('focus', "");

  function updateFocus(id: string) {
    setFocus(id);
  } 

  return (
    <div className="App">
      <SynthUI>
        <SynthParameterGroup 
          groupName="oscillator" 
          updateFocus={updateFocus}
          isFocused={focus === "oscillator"}
        >
          <input type="range" />
        </SynthParameterGroup>

        <SynthParameterGroup 
          groupName="filter"
          updateFocus={updateFocus}
          isFocused={focus === "filter"}
        >
          <input type="range" />
        </SynthParameterGroup>

        <SynthParameterGroup 
          groupName="filterEnvelope"
          updateFocus={updateFocus}
          isFocused={focus === "filterEnvelope"}
        >
          <input type="range" />
        </SynthParameterGroup>

        <SynthParameterGroup 
          groupName="envelope"
          updateFocus={updateFocus}
          isFocused={focus === "envelope"}
        >
          <input type="range" />
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
