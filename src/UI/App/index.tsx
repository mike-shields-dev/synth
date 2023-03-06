import { useState } from 'react';
import { PolySynth } from '../../Synth';
import { AmpEnvelope, FilterEnvelope, Oscillator, SynthUI } from '../components';
import { Filter } from '../components/Filter';
import { useMidiAccess } from '../hooks/useMidiAccess';
import './index.module.css';

if (typeof AudioContext !== 'undefined') {
  new PolySynth(); 
}

function App() {
  
  useMidiAccess();
  const [focus, setFocus] = useState('oscillator');

  function updateFocus(id: string) {
    setFocus(id);
  }

  return (
    <>
    <div className="App">
        <SynthUI>
        <Oscillator {...{ focus, updateFocus }} />
        <Filter {...{ focus, updateFocus }} />
        <FilterEnvelope {...{ focus, updateFocus }} />
        <AmpEnvelope {...{ focus, updateFocus }} />
      </SynthUI>
    </div>
    </>
  )
}

export default App
