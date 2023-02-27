import { useState } from 'react';
import { AmpEnvelope } from '../components';
import { Filter } from '../components/Filter';
import { FilterEnvelope } from '../components';
import { Oscillator } from '../components';
import { SynthUI } from '../components';
import { useMidiAccess } from '../hooks/useMidiAccess';
import './index.module.css';

function App() {
  const [focus, setFocus] = useState('oscillator');
  useMidiAccess();

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


