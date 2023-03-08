import { useState } from 'react';
import { AmpEnvelope, FilterEnvelope, Oscillator, SynthUI } from '../components';
import { Filter } from '../components/Filter';
import { useMidiAccess } from '../hooks/useMidiAccess';
import './index.module.css';
import * as Tone from 'tone';
import { synth } from '../../Synth';


function App() {
  const [focus, setFocus] = useState('oscillator');
  useMidiAccess();

  function updateFocus(id: string) {
    setFocus(id);
    synth.focus = id;
  }

  return (
    <>
    <div className="App">
        <button onClick={async () => await Tone.start()}>Audio</button>
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
