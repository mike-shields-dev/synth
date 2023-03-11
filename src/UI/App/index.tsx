import { useState } from 'react';
import { AmpEnvelope, FilterEnvelope, Oscillator, SynthUI } from '../components';
import { Filter } from '../components/Filter';
import { useMidiAccess } from '../hooks/useMidiAccess';
import './index.module.css';
import { publishFocusChange } from '../../PubSub/FocusChange';
import { UIKeyboard } from '../components/UIKeyboard';


function App() {
  const [focus, setFocus] = useState('oscillator');
  useMidiAccess();

  function updateFocus(focus: string) {
    setFocus(focus);
    publishFocusChange(focus);
  }

  return (
    <>
      <div className="App">
        <SynthUI>
          <Oscillator {...{ focus, updateFocus }} />
          <Filter {...{ focus, updateFocus }} />
          <FilterEnvelope {...{ focus, updateFocus }} />
          <AmpEnvelope {...{ focus, updateFocus }} />
          <UIKeyboard />
        </SynthUI>
      </div>
    </>
  )
}

export default App
