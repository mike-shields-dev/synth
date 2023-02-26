import { useEffect, useState } from 'react';
import { AmpEnvelope } from '../components/AmpEnv';
import { Filter } from '../components/Filter';
import { FilterEnvelope } from '../components/FilterEnvelope';
import { Oscillator } from '../components/Oscillator';
import { SynthUI } from '../components/SynthUI';
import { useMidiAccess } from '../hooks/useMidiAccess';
import './index.module.css';

interface UIControlChange {
  groupName: string;
  parameter: string;
  value: number;
}

function App() {
  const [focus, setFocus] = useState('oscillator');
useMidiAccess();

  function updateFocus(id: string) {
    setFocus(id);
  }

  function onUIControlChange(message: string, payload: UIControlChange) {
    console.log('onUIControlChange', payload)
  }

  useEffect(() => {
    const sub = PubSub.subscribe('uiControlChange', onUIControlChange)

    return () => { PubSub.unsubscribe(sub) };
  }, [])

  return (
    <div className="App">
      <SynthUI>
        <Oscillator {...{ focus, updateFocus }} />
        <Filter {...{ focus, updateFocus }} />
        <FilterEnvelope {...{ focus, updateFocus }} />
        <AmpEnvelope {...{ focus, updateFocus }} />
      </SynthUI>
    </div>
  )
}

export default App
