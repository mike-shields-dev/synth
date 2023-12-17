import { useState } from 'react';
import { Nav, AmpEnvelope, Filter, FilterEnvelope, Oscillator, SynthUI, UIKeyboard } from '../components';
import useMidiAccess from '../hooks/useMidiAccess/useMidiAccess';
import { publishFocusChange } from '../../PubSub';
import css from './App.module.css';

function App() {
  const [focus, setFocus] = useState('oscillator');
  useMidiAccess();

  function updateFocus(focus: string) {
    setFocus(focus);
    publishFocusChange(focus);
  }

  return (
    <>
      <div className={css.App}>

        <div className={css.App__Header}>
          <Nav {...{ focus, updateFocus }} />
        </div>

        <div className={css.App__Main}>
          <SynthUI>
            <Oscillator {...{ focus, updateFocus }} />
            <Filter {...{ focus, updateFocus }} />
            <FilterEnvelope {...{ focus, updateFocus }} />
            <AmpEnvelope {...{ focus, updateFocus }} />
          </SynthUI>
        </div>

        <div className={css.App__Footer}>
          <UIKeyboard />
        </div>
      </div>
    </>
  )
}

export default App;
